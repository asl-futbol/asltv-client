import {Route, Routes} from "react-router-dom";
import {Home, Match, Redirect} from "./pages";
import {useAuthUser} from "./hooks/user.ts";
import WebApp from "@twa-dev/sdk";
import {useEffect} from "react";

const App = () => {
    const user = WebApp.initDataUnsafe.user
    const authUserMutation = useAuthUser();

    useEffect(() => {
        if (user) {
            authUserMutation.mutate({
                id: user?.id!,
                name: user?.first_name,
                username: user?.username,
                surname: user?.last_name,
                registeredBy: "WEB_APP",
            });
        }
    }, []);

    if (authUserMutation.isPending) {
        return <h1 className={"text-white"}>Loading...</h1>
    }

    if (authUserMutation.isError) {
        return <h1>Error! Could not authenticate user</h1>;
    }
    
    return (
        <div className={"text-white"}>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={"/match/:matchId"} element={<Match/>}/>
                <Route path={"/redirect"} element={<Redirect/>}/>
            </Routes>
        </div>
    );
};

export default App
