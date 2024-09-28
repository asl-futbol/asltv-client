import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import "plyr-react/plyr.css";
import {MdOutlineArrowBackIos} from "react-icons/md";
import {useGetSingleMatch} from "../hooks/match.ts";
import {MatchType} from "../types/match";
import Loader from "../components/loader.tsx";
import {IoChatboxEllipsesOutline} from "react-icons/io5";
import Chat from "./Chat.tsx";
import {IoMdClose} from "react-icons/io";
import {USER_ID_TELEGRAM} from "../api";
import {VideoPlayer} from "../components";
import Viewers from "../components/viewers.tsx";


const Match: React.FC = () => {
    const {matchId} = useParams();
    const [isChatOpen, setChatOpen] = useState(false)

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
        <div className="flex flex-col gap-1 text-white text-base  h-screen">
            <div className={"max-lg:fixed w-full flex flex-col"}>
                <div className={"flex gap-3 items-center h-full p-3 bg-[#2C2E36]"}>
                    <Link to={"/"} className={"p-2 rounded-full bg-white/20"}>
                        <MdOutlineArrowBackIos className={"text-sm cursor-pointer text-white"}/>
                    </Link>

                    <span className={"text-sm"}>Chiqish</span>
                </div>

                <VideoPlayer {...singleMatchData}/>

                <div className={"flex flex-col gap-3 px-3  py-3 text-sm bg-[#353535]"}>
                    <div
                        className={"text-xs text-white/90 flex gap-2"}
                    >
                        <span>{singleMatchData?.homeClub?.name}</span>
                        <span className={"text-yellow-300"}>x</span>
                        <span>{singleMatchData?.awayClub?.name}</span>
                    </div>

                    <div className={"flex gap-3 items-center flex-wrap"}>
                        <Viewers matchId={singleMatchData?.id} userId={USER_ID_TELEGRAM.toString()}/>

                        <span className={"text-[10px] py-[1px] bg-[#FF0000] rounded-[5px] px-2"}>LIVE</span>

                        <div
                            onClick={() => setChatOpen(!isChatOpen)}
                            className={"hidden  text-white gap-1 items-center font-lexend bg-[#273C75] rounded-[5px] py-1 px-2"}
                        >
                            {
                                !isChatOpen ? <>
                                    <IoChatboxEllipsesOutline/>
                                    <span className={"text-xs"}>Chatni ochish</span>
                                </> : <>
                                    <IoMdClose/>
                                    <span className={"text-xs"}>Chatni yopish</span>
                                </>
                            }
                        </div>
                    </div>
                </div>

                {
                    isChatOpen &&
                    <Chat matchId={+matchId} userId={USER_ID_TELEGRAM}/>
                }
            </div>
        </div>
    );
};

export default Match;
