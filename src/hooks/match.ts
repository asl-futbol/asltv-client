import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {MatchStatus} from "../types/match";

export const useGetMatches = (page: number, limit: number, status: MatchStatus) => {
    return useQuery({
        queryKey: [QueryKeys.GET_MATCHES, status],
        queryFn: async () => {
            return await api.get("/match", {
                params: {
                    page,
                    limit,
                    status
                }
            })
        }
    })
}

export const useGetSingleMatch = (id: number) => {
    return useQuery({
        queryKey: [QueryKeys.GET_SINGLE_MATCH],
        queryFn: async () => {
            return await api.get(`/match/single/${id}`)
        }
    })
}