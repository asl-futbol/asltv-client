import { Route, Routes} from "react-router-dom";
import {Home, Match, Redirect} from "./pages";
import {useAuthUser, useGetUser, UserType} from "./hooks/user.ts";
import WebApp from "@twa-dev/sdk";
import {useEffect} from "react";

const App = () => {
    const user = WebApp.initDataUnsafe.user;
    const authUserMutation = useAuthUser();
    const getUserQuery = useGetUser(+user?.id!, !!user);

    useEffect(() => {
        if (user) {
            const userData: UserType = getUserQuery.data?.data?.info;

            if (!userData || !getUserQuery.isFetching) {
                authUserMutation.mutate({
                    id: user?.id!,
                    name: user?.first_name,
                    username: user?.username,
                    surname: user?.last_name,
                    registeredBy: "WEB_APP",
                });
            }

            localStorage.setItem("userId", String(user?.id!));
            localStorage.setItem("name", String(user?.first_name!));
        }
    }, []);

    if (authUserMutation.isPending) {
        return <h1>Loading...</h1>
    }

    if (authUserMutation.isSuccess) {
        localStorage.setItem("userPhoto", String(authUserMutation.data?.data?.info?.photo!));
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

export default App;
