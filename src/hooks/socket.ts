import {io} from "socket.io-client";

// @ts-ignore
export const useConnectSocket = (matchId: number, userId: number, isEnabled: boolean) => {
    if (isEnabled) {
        return io(import.meta.env.VITE_API_URL!, {
            query: {
                matchId,
                userId,
            },
        })
    }
}