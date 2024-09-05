import React, {useEffect, useRef} from 'react';
import Hls from 'hls.js';

const HLSVideoPlayer: React.FC<{ src: string }> = ({src}) => {
    const videoRef = useRef<HTMLVideoElement | any>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video?.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
        } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
            console.error("HLS is not supported in this browser.");
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            className="w-full h-96 max-h-[80vh]"
            poster="https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/03/barcelonavrealmadrid.jpg"
        >
            Your browser does not support HLS playback.
        </video>
    );
};

export default HLSVideoPlayer