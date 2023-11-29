import "../assets/css/App.css";
import "../assets/imgNotFound.jpg";

function App() {
  return (
    <div className="App">
      <div className="PlaylistContainer">{Playlist()}</div>
      <div className="PlayerTrackContainer">
        <div className="PlayerContainer">
          {ProgressBar()}
          {SongIcon()}
        </div>
        {Tracks()}
      </div>
    </div>
  );
}

async function getPlaylistData(userid, access_token) {
  // GET request using fetch with async/await
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userid}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${access_token.access_token}`,
      },
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}

function Playlist() {
  // playlists is some GET @ api
  // taken example from the spotify API example
  // make sure this checks error code right when actually getting the Response obj

  //var playlists = getPlaylistData(userid, access_token)
  var playlists = {
    href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    limit: 20,
    next: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    offset: 0,
    previous: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    total: 4,
    items: [
      {
        collaborative: false,
        description: "desc",
        external_urls: {
          spotify: "external url spotify",
        },
        href: "href",
        id: "id",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            height: 300,
            width: 300,
          },
        ],
        name: "playlist name",
        owner: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
          display_name: "author",
        },
        public: false,
        snapshot_id: "string",
        tracks: {
          href: "string",
          total: 0,
        },
        type: "always 'playlist' i think",
        uri: "playlist url",
      },
      {
        collaborative: false,
        description: "desc2",
        external_urls: {
          spotify: "external url spotify",
        },
        href: "href",
        id: "id",
        images: [],
        name: "playlist name 2",
        owner: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
          display_name: "author2",
        },
        public: false,
        snapshot_id: "string",
        tracks: {
          href: "string",
          total: 0,
        },
        type: "always 'playlist' i think",
        uri: "playlist url2",
      },
    ],
  };

  if (playlists.items === undefined) {
    return (
      <div>
        No Playlists {typeof playlists} {Object.keys(playlists)}{" "}
      </div>
    );
  }

  return (
    <div id="playlists">
      {playlists.items.map((item) => {
        return (
          <div className="playlist_entry">
            <img
              className="playlist_img"
              alt={item.name + " playlist image"}
              width="50px"
              height="50px"
              src={
                item.images.length
                  ? item.images[item.images.length - 1].url
                  : require("../assets/imgNotFound.jpg")
              }
            />
            <span className="playlist_text">
              {item.name} {item.description} {item.owner.display_name}
            </span>
            <br />
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar() {
  var progvalue = 70;
  var maxvalue = 100;
  var currentSongName = "42 - Seinabo Sey";
  var paused = false;
  return (
    <div id="progressBar">
      <span id="progressBarCurrent">{currentSongName}</span>
      <br />
      <progress id="progressBarMeter" value={progvalue} max={maxvalue}>
        {progvalue / maxvalue}%
      </progress>
      <br />
      <span id="progressBarBack">Back </span>
      <span
        id="progressBarPause"
        style={{ display: paused ? "none" : "inline" }}
      >
        Pause{" "}
      </span>
      <span
        id="progressBarPlay"
        style={{ display: !paused ? "none" : "inline" }}
      >
        Play{" "}
      </span>
      <span id="progressBarSkip">Skip</span>
    </div>
  );
}

function SongIcon() {
  var cursong = require("../assets/imgNotFound.jpg"); //img src
  var cursongtitle = "cursongtitle";
  return (
    <div id="songIcon">
      <img id="songIconImg" src={cursong} alt={cursongtitle}></img>
    </div>
  );
}

function Tracks() {
  var tracks = {
    href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    limit: 20,
    next: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    offset: 0,
    previous: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    total: 4,
    items: [
      {
        added_at: "string",
        added_by: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
        },
        is_local: false,
        track: {
          album: {
            album_type: "compilation",
            total_tracks: 9,
            available_markets: ["CA", "BR", "IT"],
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "2up3OPMp9Tb4dAKM2erWXQ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            release_date: "1981-12",
            release_date_precision: "year",
            restrictions: {
              reason: "market",
            },
            type: "album",
            uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            artists: [
              {
                external_urls: {
                  spotify: "string",
                },
                href: "string",
                id: "string",
                name: "string",
                type: "artist",
                uri: "string",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              followers: {
                href: "string",
                total: 0,
              },
              genres: ["Prog rock", "Grunge"],
              href: "string",
              id: "string",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                  height: 300,
                  width: 300,
                },
              ],
              name: "string",
              popularity: 0,
              type: "artist",
              uri: "string",
            },
          ],
          available_markets: ["string"],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {
            isrc: "string",
            ean: "string",
            upc: "string",
          },
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          is_playable: false,
          linked_from: {},
          restrictions: {
            reason: "string",
          },
          name: "string",
          popularity: 0,
          preview_url: "string",
          track_number: 0,
          type: "track",
          uri: "string",
          is_local: false,
        },
      },
      {
        added_at: "string",
        added_by: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
        },
        is_local: false,
        track: {
          album: {
            album_type: "compilation",
            total_tracks: 9,
            available_markets: ["CA", "BR", "IT"],
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "2up3OPMp9Tb4dAKM2erWXQ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            release_date: "1981-12",
            release_date_precision: "year",
            restrictions: {
              reason: "market",
            },
            type: "album",
            uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            artists: [
              {
                external_urls: {
                  spotify: "string",
                },
                href: "string",
                id: "string",
                name: "string",
                type: "artist",
                uri: "string",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              followers: {
                href: "string",
                total: 0,
              },
              genres: ["Prog rock", "Grunge"],
              href: "string",
              id: "string",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                  height: 300,
                  width: 300,
                },
              ],
              name: "string",
              popularity: 0,
              type: "artist",
              uri: "string",
            },
          ],
          available_markets: ["string"],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {
            isrc: "string",
            ean: "string",
            upc: "string",
          },
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          is_playable: false,
          linked_from: {},
          restrictions: {
            reason: "string",
          },
          name: "string",
          popularity: 0,
          preview_url: "string",
          track_number: 0,
          type: "track",
          uri: "string",
          is_local: false,
        },
      },
      {
        added_at: "string",
        added_by: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
        },
        is_local: false,
        track: {
          album: {
            album_type: "compilation",
            total_tracks: 9,
            available_markets: ["CA", "BR", "IT"],
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "2up3OPMp9Tb4dAKM2erWXQ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            release_date: "1981-12",
            release_date_precision: "year",
            restrictions: {
              reason: "market",
            },
            type: "album",
            uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            artists: [
              {
                external_urls: {
                  spotify: "string",
                },
                href: "string",
                id: "string",
                name: "string",
                type: "artist",
                uri: "string",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              followers: {
                href: "string",
                total: 0,
              },
              genres: ["Prog rock", "Grunge"],
              href: "string",
              id: "string",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                  height: 300,
                  width: 300,
                },
              ],
              name: "string",
              popularity: 0,
              type: "artist",
              uri: "string",
            },
          ],
          available_markets: ["string"],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {
            isrc: "string",
            ean: "string",
            upc: "string",
          },
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          is_playable: false,
          linked_from: {},
          restrictions: {
            reason: "string",
          },
          name: "string",
          popularity: 0,
          preview_url: "string",
          track_number: 0,
          type: "track",
          uri: "string",
          is_local: false,
        },
      },
      {
        added_at: "string",
        added_by: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
        },
        is_local: false,
        track: {
          album: {
            album_type: "compilation",
            total_tracks: 9,
            available_markets: ["CA", "BR", "IT"],
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "2up3OPMp9Tb4dAKM2erWXQ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            release_date: "1981-12",
            release_date_precision: "year",
            restrictions: {
              reason: "market",
            },
            type: "album",
            uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            artists: [
              {
                external_urls: {
                  spotify: "string",
                },
                href: "string",
                id: "string",
                name: "string",
                type: "artist",
                uri: "string",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              followers: {
                href: "string",
                total: 0,
              },
              genres: ["Prog rock", "Grunge"],
              href: "string",
              id: "string",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                  height: 300,
                  width: 300,
                },
              ],
              name: "string",
              popularity: 0,
              type: "artist",
              uri: "string",
            },
          ],
          available_markets: ["string"],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {
            isrc: "string",
            ean: "string",
            upc: "string",
          },
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          is_playable: false,
          linked_from: {},
          restrictions: {
            reason: "string",
          },
          name: "string",
          popularity: 0,
          preview_url: "string",
          track_number: 0,
          type: "track",
          uri: "string",
          is_local: false,
        },
      },
    ],
  };

  if (tracks.items === undefined) {
    return <div>No tracks </div>;
  }

  return (
    <div id="tracks">
      {tracks.items.map((item) => {
        return (
          <div className="tracks_entry">
            <img
              className="tracks_img"
              alt={item.track.name + " tracks image"}
              src={
                item.track.images
                  ? item.track.images[item.track.images.length - 1].url
                  : require("../assets/imgNotFound.jpg")
              }
            />
            <span className="tracks_text">
              {item.track.name} {item.track.artists.name}
            </span>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default App;
