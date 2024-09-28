// import {useEffect, useRef, useState} from 'react';
// import Hls from 'hls.js';
// import {useGetStream} from "../hooks/stream.ts";
// import {MatchStatus} from "../types/match";
//
// const VideoPlayer = ({streamKey, matchStatus}: { streamKey: string, matchStatus: MatchStatus }) => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [hasStarted, setHasStarted] = useState(false);
//     const src = `${import.meta.env.VITE_STREAM_BASE_URL}/live/${streamKey}/index.m3u8`;
//
//     const getStreamQuery = useGetStream(src, hasStarted);
//
//     const loadStream = () => {
//         setIsLoading(true);
//         const video = videoRef.current;
//
//         if (!video) return;  // Ensure the video element exists
//
//         if (video.canPlayType('application/vnd.apple.mpegurl')) {
//             video.src = src;
//         } else if (Hls.isSupported()) {
//             const hls = new Hls();
//             hls.loadSource(src);
//             hls.attachMedia(video);  // Attach the video element safely
//         } else {
//             console.error("HLS is not supported in this browser.");
//         }
//     };
//
//     useEffect(() => {
//         const video = videoRef.current;
//
//         if (!video) return;
//
//         const handleLoadedData = () => {
//             setIsLoading(false);
//         };
//
//         const handleWaiting = () => {
//             setIsLoading(true);
//         };
//
//         video.addEventListener('loadeddata', handleLoadedData);
//         video.addEventListener('waiting', handleWaiting);
//
//         return () => {
//             video.removeEventListener('loadeddata', handleLoadedData);
//             video.removeEventListener('waiting', handleWaiting);
//         };
//     }, [videoRef.current]);
//
//     const handlePlayClick = () => {
//         setHasStarted(true);
//         loadStream();
//     };
//
//     const handleReload = () => {
//         // Reload the stream without reloading the page
//         setIsLoading(true);
//         loadStream();
//     };
//
//     if (matchStatus === "SCHEDULED") {
//         return (
//             <div className={"w-full max-lg:h-52 h-[500px] flex gap-3 bg-gray-700 justify-center items-center"}>
//                 <h1 className={"w-2/3 text-center"}>O'yin boshlangach, shu joyda jonli efir paydo bo'ladi!</h1>
//             </div>
//         );
//     }
//
//     if (matchStatus === "FINISHED") {
//         return null;
//     }
//
//     if (getStreamQuery.isError) {
//         return (
//             <div className={"w-full max-lg:h-52 h-[500px] flex flex-col gap-3 bg-gray-700 justify-center items-center"}>
//                 <h1>Jonli efir namoyish etilmayapti</h1>
//                 <button
//                     className={"bg-blue-600 px-4 py-2 max-lg:text-sm rounded-md text-white"}
//                     onClick={handleReload}  // Reload the video on click
//                 >
//                     Qayta yuklash
//                 </button>
//             </div>
//         );
//     }
//
//     return (
//         <div className="relative w-full max-lg:h-52 h-[500px] flex justify-center items-center">
//             {!hasStarted && (
//                 <button
//                     onClick={handlePlayClick}
//                     className="bg-blue-600 px-6 py-3 text-white rounded-md z-10"
//                 >
//                     Play
//                 </button>
//             )}
//
//             {isLoading && hasStarted && (
//                 <div className="absolute inset-0 flex justify-center items-center bg-gray-700 z-10">
//                     <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"
//                          role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                 </div>
//             )}
//
//             <video
//                 ref={videoRef}
//                 controls
//                 className="w-full h-full"
//                 style={{visibility: hasStarted && !isLoading ? 'visible' : 'hidden'}}
//                 autoPlay={true}
//             >
//                 Your browser does not support HLS playback.
//             </video>
//         </div>
//     );
// };
//
// export default VideoPlayer;
