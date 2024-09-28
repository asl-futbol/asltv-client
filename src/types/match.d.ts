export type MatchStatus = "SCHEDULED" | "LIVE" | "FINISHED"

export type MatchType = {
    id: number,
    date: string,
    status: MatchStatus,
    isActive: true,
    poster: string,
    homeClub: {
        id: number,
        name: string,
        logo: {
            fileName: string,
            url: string
        }
    },
    awayClub: {
        id: number,
        name: string,
        logo: {
            fileName: string,
            url: string
        }
    },
    stream: {
        id: number,
        name: string,
        key: string
    },
    createdAt: string,
    updatedAt: string
}

export type GetMatchesType = {
    meta: {
        currentPage: number,
        limit: number,
        total_pages: number,
        totalMatches: number
    },
    matches: MatchType[]
}


