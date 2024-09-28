import {MatchStatus, MatchType} from "../../types/match";
import {useNavigate} from "react-router-dom";

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
            className={`${data.status === "LIVE" ? "border-[5px] border-[#FF0000] py-7 shadow-[0px_0px_10px_0.5px_#FF0000]" : "border-[2px] border-white"} rounded-[15px] flex justify-between items-center py-5 px-7 font-lexend bg-[#222222] bg-contain bg-no-repeat bg-left`}
            style={{backgroundImage: `url(/apl.svg)`}}
        >
            <div className={"flex flex-col items-center"}>
                <img src={data?.homeClub?.logo?.url} alt="#" className={"size-20 max-lg:size-14"}/>
                <span className={"text-center  text-xs font-lexend"}>{data?.homeClub?.name}</span>
            </div>

            {
                data?.status === "SCHEDULED" ?
                    <div className={"flex justify-center flex-col text-xs gap-4 items-center"}>
                        <span className={"text-[#6FFF00] underline"}>LALIGA</span>

                        <div
                            className={"bg-[#273C75] px-2 flex flex-col items-center rounded-[5px] border border-white w-[100px]"}
                        >
                            <span>21-sentabr</span>
                            <span>22:30</span>
                        </div>

                        <span>12 : 02 : 34</span>
                    </div> :
                    data.status === "LIVE" ?
                        <div className={"flex justify-center flex-col text-xs gap-4 items-center"}>
                            <span className={"text-[#6FFF00] underline"}>LALIGA</span>

                            <div
                                className={"bg-[#FF1616] rounded-[5px] flex justify-center gap-1 px-5 py-1"}
                            >
                                <img src="/play.svg" alt={"#"}/>
                                <span>LIVE</span>
                            </div>

                        </div> :
                        <h1>Fuck off!</h1>
            }

            <div className={"flex flex-col items-center"}>
                <img src={data?.awayClub?.logo?.url} alt="#" className={"size-20 max-lg:size-14"}/>
                <span className={"text-center text-xs font-lexend"}>{data?.awayClub?.name}</span>
            </div>
        </div>
    );
};

export default MatchCard;