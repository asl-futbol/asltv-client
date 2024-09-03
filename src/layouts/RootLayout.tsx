import {Navbar} from "../components";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
    return (
        <div className={"flex flex-col gap-6 text-white"}>
            <Navbar/>

            <div className={"px-0"}>
                <Outlet/>
            </div>
        </div>
    );
};

export default RootLayout;