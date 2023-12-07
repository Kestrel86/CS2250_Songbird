import "../assets/css/songbird.css";
import "../assets/imgNotFound.jpg";
import React, { useState, useEffect } from "react";

const imgnotfound = require("../assets/imgNotFound.jpg");

// arbitrary hash function - used to generate keys for react elements
const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function Songbird(props) {
  //sets the token for use. This is incredibly important as no fetch requests to api can be made without the token
  const spotifyToken = props.token;
  //set if the player is active or not 
  const [isActive, setActive] = useState(false);
  //used to keep track of progress bar
  const [time, setTime] = useState(Date.now());
  //will set player for the playback sdk
  const [player, setPlayer] = useState(undefined);
  //set volume at lower amount due to how loud unchanged one is
  const [volume, setVolume] = useState(10);

  //if the fetches go wrong the website will not error out and will put these in place of components
  const [playlistsContents, setPlaylistsContents] = useState(
    <div key="playlists">Bad Playlist Juju</div>
  );
  const [tracksContents, setTracksContents] = useState(
    <div key="tracks">Bad Tracks Juju</div>
  );
  const [progressBarContents, setProgressBarContents] = useState(
    <div key="progressbar">Bad progressbar Juju</div>
  );
  const [songImageContents, setSongImageContents] = useState(
    <div key="songIcon">Bad songIcon Juju</div>
  );
  /*sets up the webplaybackSDK, taken from tutorial on documentation due to how particular spotify api is.
    webplaybackSDK only works with Spotify premium so without that the player will not play any music. 
    webplaybackSDK is the only method that allows full songs from Spotify to be listened to*/
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);
    //SpotifyWebPlaybackSDKReady is set with auth token taken
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(spotifyToken);
        },
        //volume is taken in percentage for the api
        volume: volume / 100,
      });

      setPlayer(player);

      //will add listener using device id and will transfer playback
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        TransferPlayback(spotifyToken, device_id);
      });
      //if player disconnects will console log to user
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      //connects player and activates element. This makes the player have focus and without it, the player acts unexpectedly
      player.connect();
      player.activateElement();

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        //if the player is being used then it the state is set as active and if the player is not being used then it the state is set as inactive
        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });
    };
  // rerenders with changes of the spotify token
  }, [spotifyToken]);

  //used for progress bar, set at 5 seconds per to prevent Spotify rate limiting.
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //if player is not null then it will set the components
  useEffect(() => {
    if (!!player) {
      Playlist(spotifyToken).then((res) => {
        setPlaylistsContents(res);
      });
      Tracks(spotifyToken).then((res) => {
        setTracksContents(res);
      });
      ProgressBar(spotifyToken, player).then((res) => {
        setProgressBarContents(res);
      });
      SongIcon(player).then((res) => {
        setSongImageContents(res);
      });
    }
  }, [player, spotifyToken, isActive, time]);

  //returns the components to user for them to be able to see all the content
  return (
    <div className="App">
      <div className="PlaylistContainer">{playlistsContents}</div>
      <div className="PlayerTrackContainer">
        <div className="PlayerContainer">
          {progressBarContents}
          <div className="ControlsContainer">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={(event) => {
                var v = event.target.valueAsNumber;
                setPlayerVolume(spotifyToken, v);
                setVolume(v);
              }}
            />
          </div>
          {songImageContents}
        </div>
        {tracksContents}
      </div>
    </div>
  );
}
//all fetch requests require token from spotify to be allowed to be fetched. All are the same format with only difference being if they are a get or put request

//used for setting the tracks below the player. If no playlist is selected and nothing is playing, there is no tracks to put below
const getCurrentlyPlayingData = (access_token) => {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
  }).then((response) => {
    return response.json().catch((err) => {
      return { context: undefined };
    });
  });
};
//important for audio to be played from the website. If not implemented then web player has to be set as current player from the actual Spotify app
const TransferPlayback = (access_token, device_id) => {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${access_token}` },
    body: JSON.stringify({ device_ids: [device_id] }),
  }).then((response) => {
    return response.json().catch((err) => {
      return { body: undefined };
    });
  });
};
//will pause the player when called
const PausePlayback = (access_token) => {
  return fetch(`https://api.spotify.com/v1/me/player/pause`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${access_token}` },
  }).catch((err) => {
    return new Promise();
  });
};
//allows for playlists to be picked within the website. Will set the playlist at the first song within the playlist.
const ChangePlaylist = (access_token, playlist_uri) => {
  return fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${access_token}` },
    body: JSON.stringify({ context_uri: playlist_uri, position_ms: 0 }),
  }).catch((err) => {
    return new Promise();
  });
};
//sets the player volume based on the slider 
const setPlayerVolume = (access_token, percent) => {
  return fetch(
    `https://api.spotify.com/v1/me/player/volume?volume_percent=${percent}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}` },
    }
  ).then((response) => {
    return response.json().catch((err) => {
      return { body: undefined };
    });
  });
};
//gets the data of playlists that will be displayed to the user
const getPlaylistData = (access_token) => {
  return fetch(`https://api.spotify.com/v1/me/playlists`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
  }).then((response) => response.json());
};
//gets the data of tracks that will be displayed to the user
const getTrackData = (access_token, playlist_id) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
  }).then((response) => {
    return response.json().catch((err) => {
      return { items: undefined };
    });
  });
};
//gets the duration of the track. used for keeping track of where the song is at during playback
const getTrackDuration = (access_token, id) => {
  return fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
  }).then((response) => response.json());
};
/*calls a fetch of the playlist data of the user. Only public playlists are being fetched as it is within our scopes of the api.
  scopes could include private playlists but they will not be able to played on using webplaybackSDK even with premium*/
const Playlist = (access_token) => {
  return getPlaylistData(access_token).then((playlists) => {
    //if the user has no public playlists then component is set as a message informing the user
    if (!playlists.items) {
      return (
        <div>
          No Playlists {typeof playlists} {Object.keys(playlists)}{" "}
        </div>
      );
    } else {
      return (
        //playlist data is each mapped to an image, a title of playlist and who made the playlist
        <div key="playlists" id="playlists">
          {playlists.items.map((item) => {
            return (
              <div
              /*when user clicks on playlist the player will pause what is currently playing and set the chosen playlist to be played
                playback is paused to nullify any unexpected behavior*/
                onClick={() => {
                  PausePlayback(access_token).then(() => {
                    ChangePlaylist(access_token, item.uri);
                  });
                }}
                //since number of playlists is unknown until fetch is called and react elements require a unique key, a hash is called based on the item
                key={cyrb53(JSON.stringify(item))}
                className="playlist_entry"
              >
                <img
                  key={cyrb53(JSON.stringify(item.images))}
                  className="playlist_img"
                  alt={item.name + " playlist image"}
                  src={item.images.length? item.images[item.images.length - 1].url : imgnotfound}
                />
                <span
                  key={cyrb53(JSON.stringify({name: item.name,description: item.description,}))}
                  className="playlist_text"
                >
                  {item.name} {item.owner.display_name}
                </span>
                <br />
              </div>
            );
          })}
        </div>
      );
    }
  });
};
//calls fetch of tracks within a picked playlist
const Tracks = (access_token) => {
  //fetches if anything is currently playing to the user. If not prompts user to pick a playlist
  return getCurrentlyPlayingData(access_token).then((nowplaying) => {
    if (!nowplaying || !nowplaying.context) {
      return <div>Pick a playlist!</div>;
    }
    //sets the id of the playlist picked so the tracks of the playlist can be found
    const playlist_id = nowplaying.context.uri.split(":")[2];

    //if there is no tracks in selected playlist then will return there is no tracks to user
    return getTrackData(access_token, playlist_id).then((tracks) => {
      if (!tracks.items) {
        return <div>No tracks in this playlist/album </div>;
      }
      return (
        <div id="tracks">
          {tracks.items.map((item) => {
            if (item === null) {
              return <div></div>;
            }
            //since the amount of tracks is unknown until the fetch is made and react elements require a unique key, a hash is called based on the item
            return (
              <div key={cyrb53(JSON.stringify(item))} className="tracks_entry">
                <img
                  key={cyrb53(JSON.stringify(item.track.album))}
                  className="tracks_img"
                  alt={item.track.name + " tracks image"}
                  src={item.track.album.images[item.track.album.images.length - 1].url}
                />
                <span key={cyrb53(item.track.name)} className="tracks_text">
                  {item.track.name} {item.track.artists.name}
                </span>
                <br />
              </div>
            );
          })}
        </div>
      );
    });
  });
};
//returns a progress bar that tracks how duration and position a song is in as well as buttons to pause/play, skip and go back
const ProgressBar = (access_token, player) => {
  return player.getCurrentState().then((state) => {
    //if the player is not playing anything then the player state is not set or a song has not been chosen yet and will return an blank progress bar
    if (!state || !state.track_window.current_track) {
      return (
        <div key="progressbar" id="progressbar">
          <span key="progressBarCurrent" id="progressBarCurrent">
            Nothing Playing!
          </span>
          <br />
          <progress
            key="progressMeter"
            id="progressBarMeter"
            value={0}
            max={60}
          >
            {0}%
          </progress>
          <br />
          <button key="progressBarBack" id="progressBarBack">
            Back{" "}
          </button>
          <button key="progressBarPause" id="progressBarPause">
            Play{" "}
          </button>
          <button key="progressBarSkip" id="progressBarSkip">
            Skip
          </button>
        </div>
      );
    }
    //gets how long a track so the progress bar can properly adjust and keep track of position in the song
    return getTrackDuration(
      access_token,
      state.track_window.current_track.uri.substring(14)
    ).then((trackDuration) => {
      var progress = Math.round(
        (state.position / trackDuration.duration_ms) * 100
      );
      //puts current song playing and buttons that will call a put request to the player. These buttons allow for pause/play, skip and previous
      return (
        <div key="progressbar" id="progressbar">
          <span key="progressBarCurrent" id="progressBarCurrent">
            {state.track_window.current_track.name}
          </span>
          <br />
          <progress
            key="progressMeter"
            id="progressBarMeter"
            value={0.6 * progress}
            max={60}
          >
            {progress} %
          </progress>
          <br />
          <button
            key="progressBarBack"
            id="progressBarBack"
            onClick={() => {
              player.previousTrack();
            }}
          >
            Back{" "}
          </button>
          <button
            key="progressBarPause"
            id="progressBarPause"
            onClick={() => {
              player.togglePlay();
            }}
          >
            {state.paused ? "Play" : "Pause"}{" "}
          </button>
          <button
            key="progressBarSkip"
            id="progressBarSkip"
            onClick={() => {
              player.nextTrack();
            }}
          >
            Skip
          </button>
        </div>
      );
    });
  });
};
//gets the current song's image and sets it onto the player for the user to see
const SongIcon = (player) => {
  //if the player is not playing anything then the player state is not set or a song has not been chosen yet and will return a prompt to pick a song
  return player.getCurrentState().then((state) => {
    if (!state || !state.track_window.current_track) {
      return (
        <div key="songIcon" id="songIcon">
          <span key="songIconImg">Play a song!</span>
        </div>
      );
    }
    //if there is a song playing then the current song image is put inside the player for the user to see
    return (
      <div key="songIcon" id="songIcon">
        <img
          key="songIconImg"
          id="songIconImg"
          src={state.track_window.current_track.album.images[state.track_window.current_track.album.images.length - 1].url}
          alt={state.track_window.current_track.name}
        ></img>
      </div>
    );
  });
};

export default Songbird;
