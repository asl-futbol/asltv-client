import {Navbar} from "../components";
import {useGetMatches} from "../hooks/match.ts";
import {GetMatchesType} from "../types/match";
import Loader from "../components/loader.tsx";
import WebApp from "@twa-dev/sdk";
import {Navigate} from "react-router-dom";
import {MatchCard} from "../components/cards";

const Home = () => {
    const getLiveMatchesQuery = useGetMatches(1, 10, "LIVE")
    const liveMatchesData: GetMatchesType = getLiveMatchesQuery?.data?.data

    const getScheduledMatchesQuery = useGetMatches(1, 10, "SCHEDULED")
    const scheduledMatchesData: GetMatchesType = getScheduledMatchesQuery?.data?.data

    if (getScheduledMatchesQuery.isLoading || getLiveMatchesQuery.isLoading) {
        return <Loader/>
    }

    const matchId = WebApp.initDataUnsafe.start_param

    if (matchId) {
        return <Navigate to={`/match/${matchId}`}/>
    }

    return (
        <>
            <Navbar/>

            <div className={"flex flex-col gap-14 pb-10 mt-6 px-4"}>
                {
                    liveMatchesData?.matches?.length !== 0 && <div className={"flex flex-col gap-5"}>
                        <h1 className={"text-base font-medium text-white"}>Jonli Translatsiyalar</h1>

                        <div className={"grid grid-cols-4 gap-5 max-lg:grid-cols-1"}>
                            {liveMatchesData?.matches?.map(match => (
                                <MatchCard key={match?.id} data={match}/>
                            ))}
                        </div>
                    </div>
                }

                <div className={"flex flex-col gap-5"}>
                    <h1 className={"text-base font-medium text-white"}>Rejalashtirilgan</h1>

                    {
                        scheduledMatchesData?.matches?.length === 0
                            ? <h1 className={"text-center text-white/80"}>O'yinlar mavjud emas!</h1>
                            : <div className={"grid grid-cols-4 gap-5 max-lg:grid-cols-1"}>
                                {scheduledMatchesData?.matches?.map(match => (
                                    <MatchCard key={match?.id} data={match}/>
                                ))}
                            </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Home;