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
        id: number,
        name: string
        photo: string,
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
        <div className={"flex flex-col justify-between w-full h-full"}>
            <div
                className={`flex flex-col max-lg:gap-2 gap-3 mt-3 px-5 overflow-y-auto max-h-[200px]`}
            >
                {
                    messages.map((item, index) => (
                        <div key={index} className={"flex gap-2"}>
                            <div className={"flex gap-2"}>
                                <div className={"text-xs leading-4"}>
                                    <span className={"text-[9px] text-gray-400"}>{item?.user?.name}</span>
                                    <span
                                        className={"ml-[5px] text-white text-[9px] text-white/90"}
                                    >
                                        {item.content}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <div ref={messagesEndRef} className={"mt-8"}></div>
            </div>

            <form
                className={`bg-[#1B1B1B] fixed bottom-0 w-full px-3 flex justify-between gap-2 items-center border-t border-t-white/60`}
                onSubmit={handleSendMessage}
            >
                <input
                    type="text"
                    className={"p-3 w-full bg-transparent outline-none text-xs text-white"}
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
