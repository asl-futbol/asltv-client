import {IoIosFootball} from "react-icons/io";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={"bg-[#2C2E36] px-4 py-4 text-white w-full shadow-xl"}>
            <Link to={"/"} className={"flex gap-1 items-center"}>
                <IoIosFootball className={"text-2xl"}/>
                <h1 className={"text-xl "}>LIVE TV</h1>
            </Link>
        </div>
    );
};

export default Navbar;