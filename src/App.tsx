import {Route, Routes} from "react-router-dom";
import {Home, Stream} from "./pages";
import WebApp from "@twa-dev/sdk";

const App = () => {

    const platform = WebApp.platform

    if (platform !== "android" && platform !== "ios" && platform !== "android_x") {
        return (
            <div className={"text-white"}>
                <h1>You have to use from website!</h1>
                <button className={"bg-blue-600 rounded p-2"} onClick={() => WebApp.openLink("https://kun.uz")}>
                    open
                </button>
            </div>
        )
    }

    return (
        <div className={"text-white"}>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={"/stream/:streamId"} element={<Stream/>}/>
            </Routes>
        </div>
    );
};

export default App;