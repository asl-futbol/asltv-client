import {Route, Routes} from "react-router-dom";
import {Home, Stream} from "./pages";

const App = () => {
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