import {useEffect, useRef} from 'react';
import Hls from 'hls.js';
import {useGetStream} from "../hooks/stream.ts";
import {MatchStatus} from "../types/match";

const VideoPlayer = ({streamKey, matchStatus}: { streamKey: string, matchStatus: MatchStatus }) => {
    const videoRef = useRef<HTMLVideoElement | any>(null);
    const src = `${import.meta.env.VITE_STREAM_BASE_URL}/live/${streamKey}/index.m3u8`;

    if (matchStatus === "SCHEDULED") {
        return <div
            className={"w-full max-lg:h-52 h-[500px] flex  gap-3 bg-gray-700 justify-center items-center"}
        >
            <h1 className={"w-2/3 text-center"}>O'yin boshlangach, shu joyda jonli efir paydo bo'ladi!</h1>
        </div>
    }

    if (matchStatus === "FINISHED") {
        return null
    }

    const getStreamQuery = useGetStream(src);

    const loadStream = () => {
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
    };

    useEffect(() => {
        loadStream();
    }, [streamKey]);

    const handleReload = () => {
        window.location.reload()
    };

    if (getStreamQuery.isError) {
        return (
            <div className={"w-full max-lg:h-52 h-[500px] flex flex-col gap-3 bg-gray-700 justify-center items-center"}>
                <h1>Jonli efir namoyish etilmayapti</h1>
                <button
                    className={"bg-blue-600 px-4 py-2 max-lg:text-sm rounded-md text-white"}
                    onClick={handleReload}  // Trigger reload on click
                >
                    Qayta yuklash
                </button>
            </div>
        );
    }

    return (
        <video
            ref={videoRef}
            controls
            className="w-full max-lg:h-52 h-[500px]"
        >
            Your browser does not support HLS playback.
        </video>
    );
};

export default VideoPlayer;
