import React, {useEffect, useState} from 'react';
import {MdOutlinePerson} from 'react-icons/md';
import {io} from 'socket.io-client';
import {formatViewers} from '../utils';

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
        <div className="flex gap-1 items-center text-gray-400">
            <MdOutlinePerson/>

            <span className="text-sm self-center">
                    {formatViewers(viewerCount)} kuzatuvchi
            </span>
        </div>
    );
};

export default Viewers;
