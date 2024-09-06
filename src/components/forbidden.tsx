import WebApp from "@twa-dev/sdk";
import {IoMdOpen} from "react-icons/io";
import {useCreateEncrypt} from "../hooks/encrypt.ts";
import {encryptData} from "../utils/crypto.ts";

const Forbidden = ({action, data}: { action: "FORBIDDEN" | "AUTH", data?: { matchId: number, userId: number } }) => {
    const createEncryptMutation = useCreateEncrypt()

    const onClickToAuth = async () => {
        const encrtptedData = encryptData(`match=${data?.matchId}&platform=TELEGRAM_BOT`)
        createEncryptMutation.mutate(String(encrtptedData))
    }

    if (createEncryptMutation.isSuccess) {
        const authRedirectUrl = `${import.meta.env.VITE_AUTH_BOT_URL}?start=auth_${createEncryptMutation.data.data?.info?.id}`
        window.location.href = authRedirectUrl
    }

    const openWebsiteRedirectUrl = `${import.meta.env.VITE_WEBSITE_URL}/stream/${data?.matchId}`

    return (
        <div className={"flex justify-center items-center h-screen text-white"}>
            <div className={"flex flex-col gap-5"}>
                <h1 className={"text-center px-12 text-xl max-lg:text-base"}>
                    {
                        action === "FORBIDDEN" ? `Kechirasiz! Telegram botdan faqat mobil qurilmalarda foydalanish mumkin, quyidagi tugmani bosib saytni oching va tomosha qilishingiz mumkin.` : "O'yinni tomosha qilish uchun, quyidagi tugmani bosib avotirzatsiyadan o'ting!"
                    }
                </h1>

                <div className={"flex justify-center w-full"}>
                    {
                        action === "FORBIDDEN" ?
                            <button
                                className={"cursor-pointer flex justify-center items-center w-1/4 max-lg:w-1/2 gap-2 p-2 bg-purple-700 rounded"}
                                onClick={() => WebApp.openLink(openWebsiteRedirectUrl)}
                            >
                                <IoMdOpen className={`text-xl mt-[3px]`}/>
                                <h1>{"Saytni ochish"}</h1>
                            </button>
                            :
                            <button
                                disabled={createEncryptMutation.isPending}
                                className={"cursor-pointer flex justify-center items-center w-1/4 max-lg:w-1/2 gap-2 p-2 bg-purple-700 rounded disabled:bg-opacity-60"}
                                onClick={onClickToAuth}
                            >
                                <h1>Kirish</h1>
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Forbidden;