import {useEffect, useRef} from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const LiveStreamPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const plyrRef = useRef<Plyr | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource('http://localhost:8000/live/f574174f-8bbc-473a-ab10-8f74b7e17471/index.m3u8');
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (!plyrRef.current) {
                        plyrRef.current = new Plyr(video, {
                            controls: [
                                'play-large',
                                'play',
                                'progress',
                                'current-time',
                                'mute',
                                'volume',
                                'fullscreen',
                            ],
                        });
                    }
                });
                hlsRef.current = hls;
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = 'http://localhost:8000/live/anything/index.m3u8';
                if (!plyrRef.current) {
                    plyrRef.current = new Plyr(video, {
                        controls: [
                            'play-large',
                            'play',
                            'progress',
                            'current-time',
                            'mute',
                            'volume',
                            'fullscreen',
                        ],
                    });
                }
            } else {
                console.error('This browser does not support HLS.');
            }
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
            if (plyrRef.current) {
                plyrRef.current.destroy();
            }
        };
    }, []);

    return (
        <video
            ref={videoRef}
            className="plyr__video-embed"
            playsInline
            controls
        />
    );
};

export default LiveStreamPlayer;
