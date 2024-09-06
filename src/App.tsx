import {Route, Routes} from "react-router-dom";
import {Home, Redirect, Stream} from "./pages";
import {useAuthUser, useGetUser, UserType} from "./hooks/user.ts";
import WebApp from "@twa-dev/sdk";

const App = () => {

    const user = WebApp.initDataUnsafe.user

    if (user) {
        const getUserQuery = useGetUser(+user?.id!)
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
    }

    return (
        <div className={"text-white"}>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={"/stream/:streamId"} element={<Stream/>}/>
                <Route path={"/redirect"} element={<Redirect/>}/>
            </Routes>
        </div>
    );
};

export default App;