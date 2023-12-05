import React from "react";
import "../assets/css/home.css";

// export default function Home() {
//   return (
//     <>
//       <div>
//         <h1>Welcome To My React Website</h1>
//         <h3>Please make use of the Navbar to navigate to the other websites</h3>
//       </div>
//     </>
//   );
// }

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1 className="title">Welcome to SongBird, Our Music Web App!</h1>
      </header>
      <section className="project-introduction">
        <p>
          SongBird is a music streaming platform designed to offer an immersive and enjoyable
          musical experience. Whether you're into chart-toppers or indie gems, we've got your
          playlist covered.
        </p>
        <p>
          This project is part of the CS2250 class, where we explore the principles of software
          development and create our version of a music streaming service.
        </p>
      </section>
      <section className="project-features">
        {/* Add pictures and descriptions of project features */}
        <div className="feature">
          {/*<img src="path/to/feature-image1.jpg" alt="Feature 1" />*/}
          <p>Feature 1: Explore Diverse Genres</p>
        </div>
        <div className="feature">
          {/*<img src="path/to/feature-image2.jpg" alt="Feature 2" />*/}
          <p>Feature 2: Create Personalized Playlists</p>
        </div>
        {/* Add more features as needed */}
      </section>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Home;
