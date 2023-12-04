import "../assets/css/songbird.css";
import "../assets/imgNotFound.jpg";
import React, {useState, useEffect	} from "react";

const imgnotfound = require("../assets/imgNotFound.jpg")

/* arbitrary hash function - used to generate keys for react elements */
const cyrb53 = (str, seed = 0) => {
	let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
	for(let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function Songbird (props) {
	const spotifyToken = props.token;

	const [isActive, setActive] = useState(false);
	const [isPaused, setPaused] = useState(false);

	const [player, setPlayer] = useState(undefined);

	const [playlistsContents, setPlaylistsContents] = useState((<div key="playlists">Bad Playlist Juju</div>));
	const [tracksContents, setTracksContents] = useState((<div key="tracks">Bad Tracks Juju</div>));
	const [progressBarContents, setProgressBarContents] = useState((<div key="progressbar">Bad progressbar Juju</div>));
	const [songImageContents, setSongImageContents] = useState((<div key="songIcon">Bad songIcon Juju</div>));

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: cb => { cb(spotifyToken); },
				volume: 0.5
			});

			setPlayer(player);

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.connect();

			player.addListener('player_state_changed', ( state => {
				if (!state) {
					return;
				}

				setPaused(state.paused);

				player.getCurrentState().then(state => { 
					(!state)? setActive(false) : setActive(true)
				});
			}));
		};
	}, [spotifyToken]);

	/* this does need to be a separate useEffect hook, different dependencies
	 * IMPORTANT: this is async. this is why we need the state variables, 
	 * since this is the react-onic (pythonic but for react) way to pass
	 * data back to the general scope. no, there's not a really better way to do this,
	 * except obviously callbacks from a separate file altogether possibly.
	 * it depends on spotifyToken, so it needs to be separate from other hooks, otherwise
	 * it might run before that token is set
	 */
	useEffect(() => {
		if (player !== undefined){
			Playlist(spotifyToken).then((res) => {
				setPlaylistsContents(res);
			})
			.catch((err) => {
				setPlaylistsContents((<div>Bad Juju</div>));
			});
			Tracks(spotifyToken).then((res) => {
				setTracksContents(res);
			})
			.catch((err) => {
				setTracksContents((<div>Bad Juju</div>));
			});
			ProgressBar(spotifyToken, player).then((res) => {
				setProgressBarContents(res);
			})
			.catch((err) => {
				setProgressBarContents((<div>BadJuju</div>));
			});
			SongIcon(player).then((res) => {
				setSongImageContents(res);
			})
			.catch((err) => {
				setSongImageContents((<div>BadJuju</div>));
			});
		}
	}, [player, spotifyToken]);

	return (			
		<div className="App">
			<div className="PlaylistContainer">
				{playlistsContents}
			</div>
			<div className="PlayerTrackContainer">
				<div className="PlayerContainer">
					{progressBarContents}
					{songImageContents}
				</div>
				{tracksContents}
			</div>
		</div>
	);
}

const getPlaylistData = (access_token) =>{
	return fetch(`https://api.spotify.com/v1/me/playlists`, {
		method: "GET", headers: { Authorization: `Bearer ${access_token}` }
	}).then(response => response.json())
}

const Playlist = (access_token) => {
	// playlists is some GET @ api
	// taken example from the spotify API example
	// make sure this checks error code right when actually getting the Response obv
	return getPlaylistData(access_token).then((playlists) => {
		if (playlists.items === undefined){
			return (<div>No Playlists {typeof playlists} {Object.keys(playlists)} </div>)
		} else {
			return (
				<div key="playlists" id="playlists">
					{playlists.items.map(item => {
						return (
							<div key={cyrb53(JSON.stringify(item))} className="playlist_entry">
								<img key={cyrb53(JSON.stringify(item.images))} className="playlist_img" alt={item.name + " playlist image"} src={item.images.length ? item.images[item.images.length-1].url : imgnotfound}/>
								<span key={cyrb53(JSON.stringify({"name" : item.name, "description" : item.description}))} className="playlist_text">{item.name} {item.description} {item.owner.display_name}</span>
								<br/>
							</div>
						)
				})}
				</div>
			);
		}
	})	
}

const getTrackData = (access_token, playlist_id) =>{
	return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
		method: "GET", headers: { Authorization: `Bearer ${access_token}` }
	}).then(response => response.json())
}

const Tracks = (access_token) => {	
	return getCurrentlyPlayingData(access_token).then((nowplaying) => {
		if (nowplaying.context === undefined){
			return (<div>Pick a playlist or album!</div>)
		}
		const playlist_id = nowplaying.context.uri.split(":")[2];
		
		return getTrackData(access_token, playlist_id).then((tracks) => {
			if (tracks.items === undefined){
				return (<div>No tracks in this playlist/album </div>)
			}

			return (
				<div id="tracks">
					{tracks.items.map(item => {
						return (
							<div key={cyrb53(JSON.stringify(item))} className="tracks_entry">
								<img key={cyrb53(JSON.stringify(item.track.album))} className="tracks_img" alt={item.track.name + " tracks image"} src={item.track.album.images[item.track.album.images.length-1].url}/>
								<span key={cyrb53(item.track.name)} className="tracks_text">{item.track.name} {item.track.artists.name}</span>
								<br/>
							</div>
						)
				})}
				</div>
			);
		})
	});
}

const getCurrentlyPlayingData = (access_token) =>{
	return fetch(`https://api.spotify.com/v1/me/player`, {
		method: "GET", headers: { Authorization: `Bearer ${access_token}` }
	}).then(response => response.json())
}

const ProgressBar = (access_token, player) => {
	return getCurrentlyPlayingData(access_token).then((nowplaying) => {
		if (nowplaying.item === undefined) {
			return (<div key="progressbar" id="progressbar">
			<span key="progressBarCurrent" id="progressBarCurrent">Nothing Playing!</span>
			<br/>
			<progress key="progressMeter" id="progressBarMeter"value={0} max={180}>{0}%</progress>
			<br/>
			<button key="progressBarBack" id="progressBarBack">Back  </button>
			<button key="progressBarPause" id="progressBarPause">Play  </button>
			<button key="progressBarSkip" id="progressBarSkip">Skip</button>
		</div>)
		}
		return (
		<div key="progressbar" id="progressbar">
			<span key="progressBarCurrent" id="progressBarCurrent">{nowplaying.item.name}</span>
			<br/>
			<progress key="progressMeter" id="progressBarMeter"value={nowplaying.progress_ms} max={nowplaying.item.duration_ms}>{nowplaying.progress_ms/nowplaying.item.duration_ms}%</progress>
			<br/>
			<button key="progressBarBack" id="progressBarBack" onClick={() => { player.previousTrack() }}>Back </button>
			<button key="progressBarPause" id="progressBarPause"onClick={() => { player.togglePlay() }}>{nowplaying.is_playing ? "Pause" : "Play"}  </button>
			<button key="progressBarSkip" id="progressBarSkip" onClick={() => { player.nextTrack() }}>Skip</button>
		</div>)
	});
}

const SongIcon = (player) => {
	return player.getCurrentState().then((state) => {
		var handleClick = () => {

			player.togglePlay().then(() => {
				console.log('Toggled playback!');
			  });
		};

		if (!state) {
			return (<div key="songIcon" id="songIcon"><img onClick={handleClick}key="songIconImg" id="songIconImg" href={imgnotfound} alt="not found"></img></div>)
		}

		var current_track = state.track_window.current_track;

		return (
			<div key="songIcon" id="songIcon">
				<img key="songIconImg" id="songIconImg" onClick={handleClick} src={current_track.album.images[current_track.album.images.length-1].url} alt={current_track.name}></img>
			</div>
		);
	});
}


export default Songbird;