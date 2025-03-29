import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";

function Connections() {
    const connection = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/connection", { withCredentials: true });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    if (!connection || connection.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-white">
                <h1 className="text-3xl text-center font-mono">No connection found..</h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center py-10 bg-gray-900 text-white px-4">
            <h1 className="text-2xl font-semibold select-none font-mono">Connections</h1>

            <div className="flex flex-col gap-6 mt-8 w-full max-w-3xl h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-4">
                {connection.map((conn) => (
                    <div
                        key={conn._id}
                        className="w-full flex flex-col sm:flex-row items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-indigo-500"
                    >
                        <img
                            src={conn.photoUrl}
                            alt={`${conn.firstName}'s Avatar`}
                            className="w-16 h-16 object-cover sm:w-20 sm:h-20 rounded-full border-2 border-indigo-300 shadow-lg"
                        />
                        <div className="ml-4 flex flex-col justify-center flex-grow text-center sm:text-left">
                            <h2 className="text-lg text-indigo-300">{conn.firstName} {conn.lastName}</h2>

                            {conn.age && conn.gender && (
                                <p className="text-sm select-none text-gray-400">Age: {conn.age} | {conn.gender}</p>
                            )}

                            {conn.about && (
                                <p className="text-sm select-none text-gray-300 mt-1 w-[75%] break-words">
                                    {conn.about}
                                </p>
                            )}

                            {conn.skills && conn.skills.length > 0 && (
                                <div className="mt-2 select-none flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                    <h4 className="font-sans text-sm text-gray-300">Skills:</h4>
                                    {conn.skills.map((skill, idx) => (
                                        <span key={idx} className="bg-emerald-800 font-mono tracking-tighter text-sm px-3 py-1 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Connections;
