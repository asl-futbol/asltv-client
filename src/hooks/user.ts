import {useMutation, useQuery} from "@tanstack/react-query";
import {QueryKeys} from "./queryKeys.ts";
import {api} from "../api";

export type RegisteredBy = "WEB_APP" | "TELEGRAM_BOT"

export type UserType = {
    id?: number;
    name?: string;
    surname?: string,
    username?: string
    photo?: string
    registeredBy: RegisteredBy,
    createdAt?: string,
    updatedAt?: string,
}

export const useAuthUser = () => {
    return useMutation({
        mutationKey: [QueryKeys.AUTH_USER],
        mutationFn: async (data: UserType) => {
            return await api.post("/user/auth", data)
        }
    })
}

export const useGetUser = (userId: number, isEnabled: boolean = true) => {
    return useQuery({
        queryKey: [QueryKeys.GET_USER],
        queryFn: async () => {
            return await api.get(`/user/${userId}`)
        },
        enabled: isEnabled
    })
}