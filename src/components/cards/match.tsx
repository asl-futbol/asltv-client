import {useNavigate} from "react-router-dom";
import {MatchStatus, MatchType} from "../../types/match";
import dateFormat from "dateformat";

const MatchCard = ({data}: { data: MatchType }) => {

    const navigate = useNavigate();

    const onNavigate = (id: number, status: MatchStatus) => {
        if (status !== "LIVE") {
            return null
        }

        navigate(`/match/${id}`);
    }

    return (
        <div
            onClick={() => onNavigate(data?.id, data?.status)}
            className={`select-none grid grid-cols-3 gap-5 cursor-pointer text-base  items-center border-2 ${data?.status === "LIVE" ? "border-[#32B846]" : "border-orange-400"}  p-5 rounded-md`}
        >
            <div className={"flex flex-col items-center"}>
                <img src={data?.homeClub?.logo?.url} alt="#" className={"size-16 max-lg:size-14"}/>
                <span className={"text-center w-24 leading-5"}>{data?.homeClub?.name}</span>
            </div>

            {
                data?.status === "LIVE"
                    ?
                    <div
                        className={"flex text-xs gap-1 justify-center items-center bg-red-500 text-white py-[3px] px-[6px] rounded-md"}>
                        <img src={'/live.svg'} alt={"#"} className={"animate-pulse"}/>
                        <h1 className={"font-semibold"}>jonli efir</h1>
                    </div>
                    :
                    <div className={"flex flex-col text-sm items-center gap-0 text-white/80"}>
                        <span>{dateFormat(data?.date, "dd/mm/yyyy")}</span>
                        <span>{dateFormat(data?.date, "HH:MM")}</span>
                    </div>
            }

            <div className={"flex flex-col items-center"}>
                <img src={data?.awayClub?.logo?.url} alt="#" className={"size-16 max-lg:size-14"}/>
                <span className={"text-center w-24 leading-5"}>{data?.awayClub?.name}</span>
            </div>
        </div>
    );
};

export default MatchCard;