import {FaPlay} from "react-icons/fa";
import {FiPauseCircle} from "react-icons/fi";
import {useGetStream} from "../hooks/stream.ts";
import {MatchType} from "../types/match";
import {useEffect, useRef, useState} from "react";
import Hls from "hls.js";
import {queryClient} from "../main.tsx";
import {QueryKeys} from "../hooks/queryKeys.ts";

// @ts-ignore
const VideoPlayer = ({status, stream, poster}: MatchType) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const src = `${import.meta.env.VITE_STREAM_BASE_URL}/live/${stream?.key}/index.m3u8`;
    const getStreamQuery = useGetStream(src, isPlaying);

    const loadStream = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
        } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
            console.error("HLS is not supported in this browser.");
        }

        const handleLoadedData = () => {
            setIsLoading(false);
        };

        const handleWaiting = () => {
            setIsLoading(true);
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('waiting', handleWaiting);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('waiting', handleWaiting);
        };
    };

    useEffect(() => {
        loadStream();
    }, [getStreamQuery.isFetchedAfterMount]);

    const handleReload = () => {
        window.location.reload()
    };

    if (getStreamQuery.isError) {
        return (
            <div className="w-full max-lg:h-52 h-[500px] flex flex-col gap-3 bg-gray-700 justify-center items-center">
                <h1>Jonli efir namoyish etilmayapti</h1>
                <button
                    className="bg-blue-600 px-4 py-2 max-lg:text-sm rounded-md text-white"
                    onClick={handleReload}
                >
                    Qayta yuklash
                </button>
            </div>
        );
    }

    if (getStreamQuery.isFetchedAfterMount) {
        return (
            <video
                ref={videoRef}
                controls
                className="w-full h-full"
                autoPlay={true}
            >
                Your browser does not support HLS playback.
            </video>
        );
    }

    if (status === "SCHEDULED") {
        return (
            <div className="w-full max-lg:h-52 h-[500px] flex gap-3 bg-gray-700 justify-center items-center">
                <h1 className="w-2/3 text-center">O'yin boshlangach, shu joyda jonli efir paydo bo'ladi!</h1>
            </div>
        );
    }

    if (status === "FINISHED") {
        return null;
    }

    return (
        <div
            className={`h-[200px] w-full bg-cover bg-center flex justify-center items-center ${(getStreamQuery.isFetching || isLoading) ? "animate-pulse" : ""}`}
            style={{
                backgroundImage: `url(${poster})`,
            }}
        >
            {
                !isPlaying ?
                    <div
                        onClick={() => {
                            if (getStreamQuery.isFetching) {
                                return null
                            }
                            setIsPlaying(true)
                        }}
                        className="size-12 rounded-full backdrop-blur-2xl flex justify-center items-center"
                    >
                        <FaPlay className="text-xl ml-1"/>
                    </div>
                    : <div
                        onClick={() => {
                            queryClient.cancelQueries({
                                queryKey: [QueryKeys.GET_STREAM]
                            })
                            setIsPlaying(false)
                        }}
                        className="size-12 rounded-full backdrop-blur-2xl flex justify-center items-center"
                    >
                        <FiPauseCircle className="text-3xl"/>
                    </div>
            }
        </div>
    );
};

export default VideoPlayer;
