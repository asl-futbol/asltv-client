import React, {useEffect, useRef, useState} from 'react';
import {MdOutlineArrowBackIos, MdOutlinePerson, MdSend} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

type MessageType = {
    id: number,
    name: string,
    message: string,
}

const socket = io('http://localhost:3001');

const Stream: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");

    // const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on('chat history', (data: MessageType[]) => {
            setMessages(data)
        });

        const handleMessage = (msg: { id: number; name: string; message: string; }) => {
            setMessages((prevMessages) => {
                if (prevMessages.some(message => message.id === msg.id)) {
                    return prevMessages;
                }
                return [...prevMessages, msg];
            });
        };

        socket.on('chat message', handleMessage);

        return () => {
            socket.off('chat message', handleMessage);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };
    
    const handleMessage = (e: any) => {
        e.preventDefault();

        if (inputMessage.trim()) {
            const newMessage = {id: Date.now(), name: 'User', message: inputMessage};
            socket.emit('chat message', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage('');
        }
    }

    return (
        <div className="flex flex-col gap-1 text-white">
            <div className={"fixed w-full flex flex-col bg-[#272727]"}>
                <div className={"flex gap-3  items-center h-full p-3 bg-[#2C2E36]"}>
                    <MdOutlineArrowBackIos className={"text-xl"} onClick={() => navigate('/')}/>
                    <div className={"flex flex-col gap-1"}>
                        <span className={"text-base font-bold text-white/90"}>Real Madrid vs Barcelona</span>
                    </div>
                </div>

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

                <div className={" flex flex-col px-5 border-b border-gray-400 py-3 "}>
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
                onSubmit={handleMessage}
            >
                <input
                    type="text"
                    className={"p-3 text-sm w-full bg-transparent outline-none"}
                    placeholder={"Fikr bildirish..."}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />

                <MdSend className={"text-xl"} onClick={handleMessage}/>
            </form>
        </div>
    );
};

export default Stream;
