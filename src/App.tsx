import {Route, Routes} from "react-router-dom";
import {Home, Stream} from "./pages";
import WebApp from "@twa-dev/sdk";
import {Forbidden} from "./components";

const App = () => {
    const platform = WebApp.platform
    const user = WebApp?.initDataUnsafe?.user
    console.log(user)

    if (platform !== "android" && platform !== "ios" && platform !== "android_x") {
        return <Forbidden/>
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