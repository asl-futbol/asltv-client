import {Navigate, useSearchParams} from "react-router-dom";

const Redirect = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const decodedToken = atob(token!)


    const params = new URLSearchParams(decodedToken);

    const matchId = params.get('match');
    const userId = params.get('userId');
    const userPhoto = params.get('userPhoto');
    const name = params.get('name');

    if (!matchId) {
        return <h1 className={"text-white"}>Match ID is missed!</h1>
    }

    if (!userId) {
        return <h1 className={"text-white"}>User ID is missed!</h1>
    }

    localStorage.setItem("userId", String(userId))

    if (userPhoto) {
        localStorage.setItem("userPhoto", String(userPhoto))
    }
    
    localStorage.setItem("name", String(name))

    return <Navigate to={`/match/${matchId}`}/>
};

export default Redirect;