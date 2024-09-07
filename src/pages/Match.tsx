import React, {useEffect, useMemo, useRef, useState} from 'react';
import {MdOutlineArrowBackIos, MdOutlinePerson, MdSend} from "react-icons/md";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {io} from "socket.io-client";
import "plyr-react/plyr.css";
import WebApp from "@twa-dev/sdk";
import {Forbidden, VideoPlayer} from "../components";
import {useGetUser, UserType} from "../hooks/user.ts";
import {useGetSingleMatch} from "../hooks/match.ts";
import {MatchType} from "../types/match";
import Loader from "../components/loader.tsx";
import {formatViewers} from '../utils/formatters.ts';

type MessageType = {
    userId: number,
    userPhoto: string,
    name: string,
    message: string,
}

const socket = io(import.meta.env.VITE_API_URL!)

const Match: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");

    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {matchId} = useParams();
    const [searchParams] = useSearchParams()

    if (!matchId) {
        return <h1>Match ID is missed!</h1>
    }

    const getSingleMatchQuery = useGetSingleMatch(+matchId!)
    const singleMatchData: MatchType = getSingleMatchQuery.data?.data?.info

    const userIdFromDesktopRedirect = searchParams.get("userId")

    if (userIdFromDesktopRedirect) {
        const getUserQuery = useGetUser(+userIdFromDesktopRedirect)
        const userData: UserType = getUserQuery.data?.data?.info

        if (!userData) {
            return <Forbidden
                action={"AUTH"}
                data={{
                    matchId: +matchId!,
                    userId: 0
                }}
            />
        }

        localStorage.setItem("userId", String(userIdFromDesktopRedirect))
        searchParams.delete("userId")
    }

    const platform = WebApp.platform
    const user = WebApp.initDataUnsafe.user

    if (user && ["ios", "android", "android_x"].includes(platform)) {
        localStorage.setItem("userId", String(user.id))
    }

    const userId = localStorage.getItem("userId")
    const userName = localStorage.getItem("name")
    const photo = localStorage.getItem("userPhoto")

    if (platform === "unknown" && !userId) {
        return <Forbidden action={"AUTH"} data={{
            matchId: +matchId!,
            userId: 0
        }}/>
    }

    if (platform !== "ios" && platform !== "android" && platform !== "android_x") {
        if (!userId) {
            return <Forbidden
                action={"FORBIDDEN"}
                data={{
                    matchId: +matchId!,
                    userId: user?.id!
                }}
            />
        }
    }

    useEffect(() => {
        socket.emit("request_chat_history", (data: MessageType[]) => {
            setMessages(data);
        });

        socket.on('receive_message', (message: MessageType) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [matchId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleMessageSubmit = (e: any) => {
        e.preventDefault();

        if (inputMessage.trim()) {
            const newMessage = {
                userId: +userId!,
                name: userName!,
                userPhoto: photo && photo !== "null" ? photo : undefined!,
                message: inputMessage
            };
            socket.emit('send_message', newMessage);
            setInputMessage('');
        }
    };

    const videoPlayer = useMemo(() => (
        <VideoPlayer streamKey={singleMatchData?.stream?.key} matchStatus={singleMatchData?.status}/>
    ), [singleMatchData?.stream?.key]);

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

                {videoPlayer}

                {
                    singleMatchData?.status === "LIVE" &&
                    <div className={"flex flex-col px-5 border-b border-gray-400 py-3"}>
                        <div className={"flex justify-between"}>
                            <h1 className={"text-xl"}>Chat</h1>

                            <div className={" gap-1 items-center text-gray-400 hidden"}>
                                <MdOutlinePerson/>
                                <span className={"text-sm"}>{formatViewers(1200)} kuzatuvchi </span>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div
                className={"flex flex-col max-lg:gap-2 gap-3 px-5 mt-4 max-lg:mt-[330px] mb-14 overflow-y-auto"}>
                {
                    messages.map((item, index) => (
                        <div key={index} className={"flex gap-3"}>
                            {
                                item.userPhoto ?
                                    <img
                                        src={item.userPhoto}
                                        alt=""
                                        className={"max-lg:size-5 size-6 rounded-full select-none pointer-events-none"}
                                    /> :
                                    <div
                                        className={"bg-purple-700 text-xs font-semibold text-white p-3 size-5 flex justify-center items-center rounded-full"}
                                    >
                                        {item.name[0]}
                                    </div>
                            }

                            <div className={"flex gap-2"}>
                                <div className={"max-lg:text-xs text-sm text-gray-400 leading-4"}>
                                    {item.name}
                                    <span className={"ml-[2px] text-white"}>{item.message}</span>
                                </div>
                            </div>
                        </div>

                    ))
                }
                <div ref={messagesEndRef}></div>
            </div>

            <form
                className={`${singleMatchData?.status === "SCHEDULED" && "hidden"} fixed bottom-0 bg-[#1B1B1B] w-full px-3 flex justify-between gap-2 items-center border-t border-t-white/60`}
                onSubmit={handleMessageSubmit}
            >
                <input
                    type="text"
                    className={"p-3 text-sm w-full bg-transparent outline-none"}
                    placeholder={"Fikr bildirish..."}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />

                <MdSend className={"text-xl"} onClick={handleMessageSubmit}/>
            </form>
        </div>
    );
};

export default Match;
