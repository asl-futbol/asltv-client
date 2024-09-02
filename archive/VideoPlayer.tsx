import {useEffect, useRef} from 'react';
import Hls from 'hls.js';

// @ts-ignore
const LiveStreamPlayer = () => {
    const videoRef = useRef<any>(null);
    const videoSrc = "http://localhost:8000/live/anything/index.m3u8";

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
            });

            return () => {
                hls.destroy();
            };
        } else {
            if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = videoSrc;
                videoRef.current.addEventListener('loadedmetadata', () => {
                    videoRef.current.play();
                });
            }
        }
    }, [videoSrc]);

    return (
        <div>
            <h2>Live Stream</h2>
            <video ref={videoRef} controls className={"size-72"}/>
        </div>
    );
}

