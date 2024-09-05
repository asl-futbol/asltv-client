import {Route, Routes} from "react-router-dom";
import {Home, Stream} from "./pages";
import WebApp from "@twa-dev/sdk";

const App = () => {

    const platform = WebApp.platform
    console.log(platform)

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