import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import {MdOutlinePerson, MdSend} from "react-icons/md";
import {io} from "socket.io-client";

type MessageType = {
    id: number,
    name: string,
    message: string,
}

const socket = io('http://localhost:3001');

const Stream: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");

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
        <div className="flex flex-col gap-6 text-white">
            <div className={"flex flex-col gap-6 fixed w-full bg-[#1B1B1B]"}>
                <ReactPlayer
                    url={"https://youtu.be/ZfzffRjebWI?si=KMqJM67vI2mXW6PF"}
                    playing
                    controls
                    ref={videoRef as any}
                    width={"100%"}
                    height={"230px"}
                />

                <h1 className={"text-center text-yellow-500 text-xl mx-10"}>
                    Real Madrid vs Barcelona
                </h1>

                <div className={"flex flex-col px-5 border-t border-b border-gray-400 py-3"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"text-xl"}>Chat</h1>

                        <div className={"flex gap-1 items-center text-gray-400"}>
                            <MdOutlinePerson/>
                            <span className={"text-sm"}>2.3 ming kuzatuvchi </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"flex flex-col gap-6 px-5 mt-96 mb-10 overflow-y-auto"}>
                {
                    messages.map((item, index) => (
                        <div key={index} className={"flex gap-2 items-center"}>
                            <div
                                className={"bg-purple-700 font-semibold text-white p-3 size-9 flex justify-center items-center rounded-full"}
                            >
                                {item.name[0]}
                            </div>

                            <div className={"flex flex-col"}>
                                <span className={"text-xs text-gray-400 leading-4"}>{item.name}</span>
                                <h1 className={"text-sm leading-4"}>{item.message}</h1>
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
