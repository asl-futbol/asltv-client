// src/Chat.tsx
import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import {MdSend} from "react-icons/md";


interface CreateCommentDto {
    matchId: number;
    userId: number;
    message: string;
}

interface Message {
    id: number;
    matchId: number;
    userId: number;
    content: string;
    createdAt: string;
    user: {
        id: true,
        name: string
        photo: true,
    }
}

const socket = io(import.meta.env.VITE_API_URL!);

const Chat: React.FC<{ matchId: number; userId: number }> = ({matchId, userId}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.emit('join_room', matchId);

        socket.emit("get_comments", matchId, (data: Message[]) => {
            setMessages(data)
        })

        socket.on('receive_message', (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receive_message');
            socket.emit('leave_room', matchId);
        };
    }, [matchId]);

    const handleSendMessage = (e: any) => {
        e.preventDefault();

        if (message.length <= 0) {
            return null
        }

        const messageData: CreateCommentDto = {
            matchId,
            userId,
            message,
        };

        socket.emit('send_message', messageData);
        setMessage('');
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <div className={"max-lg:mt-[310px]"}>
            <div
                className={"flex flex-col max-lg:gap-2 gap-3 px-5 mt-4 mb-14 overflow-y-auto"}>
                {
                    messages.map((item, index) => (
                        <div key={index} className={"flex gap-2"}>
                            <div className={"flex gap-2"}>
                                <div className={"max-lg:text-xs leading-4"}>
                                    <span className={"text-xs text-gray-400"}>{item?.user?.name}</span>
                                    <span className={"ml-[5px] text-white text-sm text-white/90"}>{item.content}</span>
                                </div>
                            </div>
                        </div>

                    ))
                }
                <div ref={messagesEndRef}></div>
            </div>

            <form
                className={`fixed bottom-0 bg-[#1B1B1B] w-full px-3 flex justify-between gap-2 items-center border-t border-t-white/60`}
                onSubmit={handleSendMessage}
            >
                <input
                    type="text"
                    className={"p-3 text-sm w-full bg-transparent outline-none text-white"}
                    placeholder={"Fikr bildirish..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <MdSend className={"text-xl text-white"} onClick={handleSendMessage}/>
            </form>
        </div>
    );
};

export default Chat;
