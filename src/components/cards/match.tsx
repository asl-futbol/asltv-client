import {Link} from "react-router-dom";

const MatchCard = ({status}: { status: "LIVE" | "SCHEDULED" }) => {
    return (
        <Link to={"/stream/12"}
              className={`select-none grid grid-cols-3 gap-5 cursor-pointer text-base  items-center border-2 ${status === "LIVE" ? "border-[#32B846]" : "border-orange-400"}  p-5 rounded-md`}>
            <div className={"flex flex-col items-center"}>
                <img src="/real_madrid.svg" alt="#" className={"size-16 max-lg:size-14"}/>
                <span className={"text-center w-24 leading-5"}>Real Madrid</span>
            </div>

            {
                status === "LIVE"
                    ?
                    <div
                        className={"flex text-xs gap-1 justify-center items-center bg-red-500 text-white py-[3px] px-[6px] rounded-md"}>
                        <img src={'/live.svg'} alt={"#"} className={"animate-pulse"}/>
                        <h1 className={"font-semibold"}>jonli efir</h1>
                    </div>
                    :
                    <div className={"flex flex-col text-sm items-center gap-0 text-white/80"}>
                        <span>18.03.2024</span>
                        <span>20:00</span>
                    </div>
            }

            <div className={"flex flex-col items-center"}>
                <img src="/barcelona.svg" alt="#" className={"size-16 max-lg:size-14"}/>
                <span className={"text-center w-24 leading-5"}>Barcelona</span>
            </div>
        </Link>
    );
};

export default MatchCard;