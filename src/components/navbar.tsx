import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={"bg-[#2B2E36] py-3 flex justify-center text-white w-full"}>
            <Link to={"/"} className={"flex gap-1 items-center"}>
                <img src="/logo.svg" alt="#" className={"w-[61px] h-[36px]"}/>
                <h1 className={"text-[18px]"}>LIVE TV</h1>
            </Link>
        </div>
    );
};

export default Navbar;