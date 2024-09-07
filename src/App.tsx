import {Route, Routes} from "react-router-dom";
import {Home, Match, Redirect} from "./pages";
import {useAuthUser, useGetUser, UserType} from "./hooks/user.ts";
import WebApp from "@twa-dev/sdk";

const App = () => {
    const user = WebApp.initDataUnsafe.user
    const getUserQuery = useGetUser(+user?.id!, user ? true : false)

    if (user) {
        const userData: UserType = getUserQuery.data?.data?.info

        const authUserMutation = useAuthUser()

        if (!userData) {
            authUserMutation.mutate({
                id: user?.id!,
                name: user?.first_name,
                username: user?.username,
                surname: user?.last_name,
                registeredBy: "WEB_APP"
            })
        }

        localStorage.setItem("userId", String(user?.id!))
        localStorage.setItem("name", String(user?.first_name!))
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