import {MatchCard} from "../components/cards";
import {Navbar} from "../components";

const Home = () => {
    return (
        <>
            <Navbar/>
            
            <div className={"flex flex-col gap-14 pb-10 mt-6 px-4"}>
                <div className={"flex flex-col gap-5"}>
                    <h1 className={"text-2xl font-medium text-white"}>Jonli Translatsiyalar</h1>

                    <div className={"grid grid-cols-4 gap-5 max-lg:grid-cols-1"}>
                        <MatchCard status={"LIVE"}/>
                        <MatchCard status={"LIVE"}/>
                    </div>
                </div>

                <div className={"flex flex-col gap-5"}>
                    <h1 className={"text-2xl font-medium text-white"}>Rejalashtirilgan</h1>

                    <div className={"grid grid-cols-4 gap-5 max-lg:grid-cols-1"}>
                        <MatchCard status={"SCHEDULED"}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;