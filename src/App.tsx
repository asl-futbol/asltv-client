import {useRef} from 'react';

const App = () => {
    const videoRef = useRef<any>(null);

    const handleFullscreen = () => {
        const video = videoRef.current;

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Safari
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen(); // IE/Edge
        }
    };

    return (
        <div>
            <video
                ref={videoRef}
                onClick={handleFullscreen}
                style={{width: '100%', height: '100vh', objectFit: 'cover'}}
                controls
            >
                <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default App;
