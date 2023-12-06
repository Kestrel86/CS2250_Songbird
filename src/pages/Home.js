import React from "react";
import "../assets/css/home.css";
import spotify from "../assets/spotifyImg.png";
import songbird from "../assets/songbird.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="title_box">
        <h1 className="title">Welcome to SongBird, Our Music Web App!</h1>
      </div>
      <section className="project-introduction">
        <p>
          SongBird is a music streaming platform designed to offer an immersive
          and enjoyable musical experience. Whether you're into chart-toppers or
          indie gems, we've got your playlist covered literally.
        </p>
        <p>
          This project is part of the CS2250 class, where we explore the
          principles of web development and create our version of a music
          streaming service.
        </p>
      </section>
      <section className="project-features">
        <div className="feature">
          {<img className="feature-1" src={spotify} alt="Feature 1" />}
          <p>Explore your Playlists by Connection with the Spotify API</p>
        </div>
        <div className="feature">
          {<img className="feature-1" src={songbird} alt="Feature 1" />}
          <p>
            Play Your Featured Playlists and Favorite Playlists through our
            Music Player
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
