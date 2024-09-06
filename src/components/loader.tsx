import {AiOutlineLoading3Quarters as LoadingIcon} from "react-icons/ai";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-[30vh] max-md:h-[40vh]">
            <LoadingIcon className="text-4xl dark:text-white text-primary animate-spin"/>
        </div>
    );
};

export default Loader;