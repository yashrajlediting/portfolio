import React, { useState } from "react";
import "./styles.css";

const videos = {
  podcasts: ["https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862700/hd7nwyd0dczyp8gssera.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862697/kfpndrtbxxvokpgjcgta.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862695/mihorefssd5qmlsvj02m.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862696/r31rxtt2vmiq5wizp9nk.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862696/cl8mnyl0lgv0msfje2ov.mp4"],
  reels: ["https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862686/jan6xgamqviub2jhsw62.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862685/drz3pbet1fkmjbmlcooz.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862674/ef72yyd8jhpcgeocbtos.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862661/eev4opgyausqkntl0rcv.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862660/itwfhrxefzpycoj12ap9.mp4"],
  clips: ["https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862664/k9zas9mrivbv5jbzto5a.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862664/qayrinmzeo0ud99xxn0r.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862661/lm7vdt4vj5bsq1gkqtt5.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862692/chsgug9550ycoogrmcja.mp4", "https://res.cloudinary.com/dk1tyz7og/video/upload/v1741862661/g114wthtgkrw6je3wcpl.mp4"],
};

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVertical, setIsVertical] = useState(false);

const openVideo = (video) => {
  setSelectedVideo(video);

  // Create a temporary video element to check dimensions
  const tempVideo = document.createElement("video");
  tempVideo.src = video;
  
  tempVideo.onloadedmetadata = () => {
    const isVerticalVideo = tempVideo.videoHeight > tempVideo.videoWidth;
    setIsVertical(isVerticalVideo);
  };
};

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container">
      <h1>Portfolio</h1>
      <Section title="Podcasts" videos={videos.podcasts} openVideo={openVideo} />
      <Section title="Scripted Reels" videos={videos.reels} openVideo={openVideo} />
      <Section title="Podcast Clips" videos={videos.clips} openVideo={openVideo} />

      {/* Clients Section */}
      <div className="section clients">
        <h2>Previous Clients</h2>
        <div className="clients-container">
          <Client name="Tanner Chidester" handle="@tanner.chidester" followers="459K" image="client1.png" />
          <Client name="Rose Lopiano" handle="@theplantlifechoseus" followers="31.6K" image="client2.png" />
          <Client name="Ryan Horst" handle="@ryanhorst_" followers="8.5K" image="client3.png" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="section contact">
        <h2>Contact Me</h2>
        <img src="yourphoto.jpg" alt="Yashraj Lobiyal" className="profile-pic" />
        <p>Yashraj Lobiyal</p>
        <p>Email: yashrajlediting@gmail.com</p>
        <p>
          Instagram:{" "}
          <a href="https://instagram.com/storytelleryash" target="_blank" rel="noopener noreferrer">
            @yashrajlobiyal
          </a>
        </p>
      </div>

      {/* Video Player Overlay */}
      {selectedVideo && (
        <>
          <div className="video-overlay" onClick={closeVideo}></div>
            <div className={isVertical ? "video-player-container vertical" : "video-player-container horizontal"}>
            <button className="close-button" onClick={closeVideo}>✕</button>
            <video src={selectedVideo} autoPlay playsInline controls onClick={(e) => e.stopPropagation()}></video>
          </div>
        </>
      )}
    </div>
  );
};

const Section = ({ title, videos, openVideo }) => (
  <div className="section">
    <h2>{title}</h2>
    <div className="grid">
      {videos.map((video, index) => (
        <video 
          key={index} 
          src={video} 
          muted 
          loop
          onMouseEnter={(e) => e.target.play()} 
          onMouseLeave={(e) => e.target.pause()} 
          onClick={() => openVideo(video)}
        ></video>
      ))}
    </div>
  </div>
);

const Client = ({ name, handle, followers, image }) => {
  const instaUsername = handle.replace("@", ""); // Remove '@' for link
  return (
    <div className="client">
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>
        <a 
          href={`https://instagram.com/${instaUsername}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="insta-link"
        >
          {handle}
        </a> ({followers})
      </p>
    </div>
  );
};

export default App;
