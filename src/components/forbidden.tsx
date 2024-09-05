import WebApp from "@twa-dev/sdk";
import {IoMdOpen} from "react-icons/io";

const Forbidden = () => {
    return (
        <div className={"flex justify-center items-center h-screen text-white"}>
            <div className={"flex flex-col gap-5"}>
                <h1 className={"text-center px-12 text-xl max-lg:text-base"}>
                    Kechirasiz! Telegram botdan faqat mobil qurilmalarda foydalanish mumkin, quyidagi tugmani bosib
                    saytni oching va tomosha qilishingiz mumkin.
                </h1>

                <div className={"flex justify-center w-full"}>
                    <button
                        className={"cursor-pointer flex justify-center items-center w-1/4 max-lg:w-1/2 gap-2 p-2 bg-purple-700 rounded"}
                        onClick={() => WebApp.openLink("https://kun.uz")}
                    >
                        <IoMdOpen className={"text-xl mt-[3px]"}/>
                        <h1>Saytni ochish</h1>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;