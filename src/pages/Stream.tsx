import React, {useEffect, useMemo, useRef, useState} from 'react';
import {MdOutlineArrowBackIos, MdOutlinePerson, MdSend} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import {io} from "socket.io-client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

type MessageType = {
    userId: number,
    name: string,
    message: string,
}

const user = {
    id: 791944079,
    name: "Juratbek"
}

const socket = io('http://localhost:3000');

const Stream: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");

    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {streamId} = useParams();

    useEffect(() => {
        socket.emit("request_chat_history", (data: MessageType[]) => {
            setMessages(data);
        })
    }, [streamId]);

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
            const newMessage = {userId: user.id, name: user.name, message: inputMessage};
            socket.emit('send_message', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage('');
        }
    };

    const videoPlayer = useMemo(() => (
        <Plyr
            source={{
                type: "video",
                poster: "https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/03/barcelonavrealmadrid.jpg",
                title: "test",
                sources: [{
                    src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
                    type: "video/mp4",
                    provider: "html5",
                }],
            }}
        />
    ), []);

    return (
        <div className="flex flex-col gap-1 text-white">
            <div className={"fixed w-full flex flex-col bg-[#272727]"}>
                <div className={"flex gap-3  items-center h-full p-3 bg-[#2C2E36]"}>
                    <MdOutlineArrowBackIos className={"text-xl"} onClick={() => navigate('/')}/>
                    <div className={"flex flex-col gap-1"}>
                        <span className={"text-base font-bold text-white/90"}>Real Madrid vs Barcelona</span>
                    </div>
                </div>

                {videoPlayer}

                <div className={"flex flex-col px-5 border-b border-gray-400 py-3"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"text-xl"}>Chat</h1>

                        <div className={"flex gap-1 items-center text-gray-400"}>
                            <MdOutlinePerson/>
                            <span className={"text-sm"}>2.3 ming kuzatuvchi </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"flex flex-col gap-2 px-5 mt-[330px] mb-10 overflow-y-auto"}>
                {
                    messages.map((item, index) => (
                        <div key={index} className={"flex gap-2 items-baseline"}>
                            <div
                                className={"bg-purple-700 text-xs font-semibold text-white p-3 size-5 flex justify-center items-center rounded-full"}
                            >
                                {item.name[0]}
                            </div>

                            <div className={"flex gap-2"}>
                                <span className={"text-xs text-gray-400 leading-4"}>{item.name} <span
                                    className={"ml-[2px] text-white"}>{item.message}</span></span>
                            </div>
                        </div>

                    ))
                }
                <div ref={messagesEndRef}></div>
            </div>

            <form
                className={"fixed bottom-0 bg-[#1B1B1B] w-full px-3 flex justify-between gap-2 items-center border-t border-t-white/60"}
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

export default Stream;
