import React from "react";

function Video() {
  const videoId = "EColTNIbOko";
  const onPlayerReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&showinfo=0&rel=0&start=10`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Video;
