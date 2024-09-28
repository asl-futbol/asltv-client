import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {formatViewers} from "../utils";

interface ViewersProps {
    matchId: number;
    userId: string;
}

const Viewers: React.FC<ViewersProps> = ({matchId, userId}) => {
    const [viewerCount, setViewerCount] = useState<number>(0);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL!, {
            query: {matchId, userId},
        });

        socket.on('viewer_count', (count: number) => {
            setViewerCount(count);
        });

        socket.emit('join_match', {matchId});

        return () => {
            socket.disconnect();
        };
    }, [matchId, userId]);

    return (

        <div className={"flex bg-[#474747] text-[10px] items-center rounded"}>
            <span
                className={"px-2 bg-black text-white rounded-l-[5px]"}
            >
                Kuzatayotganlar
            </span>

            <span
                className={"text-black bg-white px-1 rounded-r-[5px] min-w-10 text-center"}
            >
                {formatViewers(viewerCount || 0)}
            </span>
        </div>
    );
};

export default Viewers;
