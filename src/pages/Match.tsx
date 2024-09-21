import React from 'react';
import {MdOutlineArrowBackIos} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import "plyr-react/plyr.css";
import {useGetSingleMatch} from "../hooks/match.ts";
import {MatchType} from "../types/match";
import Loader from "../components/loader.tsx";
import {USER_ID_TELEGRAM} from "../api";
import Viewers from "../components/viewers.tsx";
import {VideoPlayer} from "../components";

const Match: React.FC = () => {
    const navigate = useNavigate();

    const {matchId} = useParams();

    if (!matchId) {
        return <h1>Match ID is missed!</h1>
    }

    const getSingleMatchQuery = useGetSingleMatch(+matchId!)
    const singleMatchData: MatchType = getSingleMatchQuery.data?.data?.info

    if (getSingleMatchQuery.isLoading) {
        return <Loader/>
    }

    if (getSingleMatchQuery.isError) {
        return <h1 className={"text-center text-white/80"}>Nimadir xato ketdi, keyinroq qayta urining!</h1>
    }

   
    return (
        <div className="flex flex-col gap-1 text-white">
            <div className={"max-lg:fixed w-full flex flex-col bg-[#272727]"}>
                <div className={"flex gap-3  items-center h-full p-3 bg-[#2C2E36]"}>
                    <MdOutlineArrowBackIos className={"text-xl cursor-pointer"} onClick={() => navigate('/')}/>
                    <div className={"flex flex-col gap-1"}>
                        <span
                            className={"text-base font-bold text-white/90"}
                        >
                            {singleMatchData?.homeClub?.name} vs {singleMatchData?.awayClub?.name}
                        </span>
                    </div>
                </div>

                <VideoPlayer streamKey={singleMatchData?.stream?.key} matchStatus={singleMatchData?.status}/>

                <div className={"flex flex-col px-5 border-b border-gray-400 py-3"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"text-base"}>Jonli efir</h1>
                        <Viewers matchId={+matchId} userId={USER_ID_TELEGRAM.toString()}/>
                    </div>
                </div>
            </div>

            {/*<Chat matchId={+matchId} userId={USER_ID_TELEGRAM}/>*/}
        </div>
    );
};

export default Match;
