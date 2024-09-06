import {useMutation} from "@tanstack/react-query";
import {QueryKeys} from "./queryKeys.ts";
import {api} from "../api";

export const useCreateEncrypt = () => {
    return useMutation({
        mutationKey: [QueryKeys.CREATE_ENCRYPT],
        mutationFn: async (encrypted_data: string) => {
            return await api.post("/encrypt", {
                encrypted_data
            })
        }
    })
}