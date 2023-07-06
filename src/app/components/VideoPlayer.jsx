// import React, { useEffect, useRef } from "react";

// const VideoPlayer = ({ src }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       video.play().catch((error) => {
//         console.error("Error playing video:", error);
//       });
//     }
//   }, []);

//   return <video ref={videoRef} src={src} autoPlay muted />;
// };

// export default VideoPlayer;
