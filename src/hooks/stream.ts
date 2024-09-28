import {useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {QueryKeys} from "./queryKeys.ts";

export const useGetStream = (stream_url: string, enabled: boolean) => {
    return useQuery(({
        queryKey: [QueryKeys.GET_STREAM],
        queryFn: async () => {
            return await api.get(stream_url)
        },
        refetchOnWindowFocus: false,
        enabled
    }))
}