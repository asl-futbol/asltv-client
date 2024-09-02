import React, {useRef} from 'react';
import ReactPlayer from 'react-player';
import {MdOutlinePerson, MdSend} from "react-icons/md";

const App: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const sampleFutbollChatMessages = [
        {
            id: 1,
            name: "Juratbek",
            message: "O'yin yaxshi bo'lyapti?"
        },
        {
            id: 2,
            name: "Asror",
            message: "Messi maydonga tushdimi?"
        },
        {
            id: 3,
            name: "Jasur",
            message: "Penalti bor ekan!"
        },
        {
            id: 4,
            name: "Olim",
            message: "Hakim noto'g'ri qaror qildi."
        },
        {
            id: 5,
            name: "Sarvar",
            message: "Qaysi jamoa oldinda?"
        },
        {
            id: 6,
            name: "Aziz",
            message: "Yana qachon gol urishadi?"
        },
        {
            id: 7,
            name: "Doston",
            message: "O'yin qiziqarli ketyapti."
        },
        {
            id: 8,
            name: "Ulug'bek",
            message: "VAR qarorini kutyapmiz."
        },
        {
            id: 9,
            name: "Shohrux",
            message: "Futbolchilar juda charchab qolishdi."
        },
        {
            id: 10,
            name: "Bekzod",
            message: "Himoya chizig'i juda kuchli."
        },
        {
            id: 11,
            name: "Ibrohim",
            message: "Stadion to'la ekan."
        },
        {
            id: 12,
            name: "Anvar",
            message: "Yana bitta burchak to'pi."
        },
        {
            id: 13,
            name: "Murod",
            message: "Darvozabon zo'r seyv qildi."
        },
        {
            id: 14,
            name: "Temur",
            message: "O'yin oxiriga yaqin kelyapti."
        },
        {
            id: 15,
            name: "Mansur",
            message: "O'yin qachon tugaydi?"
        },
        {
            id: 16,
            name: "Sherzod",
            message: "Sudya juda qat'iy."
        },
        {
            id: 17,
            name: "Umid",
            message: "Gol nima bo'ldi?"
        },
        {
            id: 18,
            name: "Otabek",
            message: "Qaysi kanal o'yinni ko'rsatmoqda?"
        },
        {
            id: 19,
            name: "Kamol",
            message: "Hujumchilar yaxshi o'ynashyapti."
        },
        {
            id: 20,
            name: "Sherali",
            message: "Yana bitta hujum bo'lishi kerak."
        },
        {
            id: 21,
            name: "Sardor",
            message: "Hakamni almashtirish kerak."
        },
        {
            id: 22,
            name: "Ilhom",
            message: "Maydon juda shiddatli."
        }
    ];

    return (
        <div className="flex flex-col gap-7 text-white">
            <div className={"flex flex-col gap-7 fixed w-full bg-[#1B1B1B]"}>
                <ReactPlayer
                    url={"https://youtu.be/ZfzffRjebWI?si=KMqJM67vI2mXW6PF"}
                    playing
                    controls
                    ref={videoRef as any}
                    width={"100%"}
                    height={"250px"}
                />

                <h1 className={"text-center text-yellow-500 text-2xl  mx-10"}>
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

            <div className={"flex flex-col gap-6 px-5  overflow-y-auto"}>
                {
                    sampleFutbollChatMessages.map((item) => (
                        <div key={item.id} className={"flex gap-2 items-center"}>
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
            </div>

            <div
                className={"fixed bottom-0 bg-[#1B1B1B] w-full px-3 flex justify-between gap-2 items-center border-t border-t-white/60"}>
                <input
                    type="text"
                    className={"p-3 text-sm w-full bg-transparent outline-none"}
                    placeholder={"Fikr bildirish..."}
                />

                <MdSend className={"text-xl"}/>
            </div>
        </div>
    );
};

export default App;
