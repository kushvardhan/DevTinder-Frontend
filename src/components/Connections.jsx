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
            console.log(err);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    if (!connection) return null;
    if (connection.length === 0)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-3xl text-center">No Connections</h1>
            </div>
        );

    return (
        <div className="w-full h-screen flex flex-col items-center py-10 bg-gray-900 text-white">
            <h1 className="text-2xl font-semibold select-none font-mono">CONNECTIONS</h1>
            
            <div className="flex flex-col gap-6 mt-12 w-[90%] sm:w-[60%] h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-4">
                
                {connection.map((conn, index) => (
                    <div
                        key={index}
                        className="w-full flex flex-col sm:flex-row bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                    >
                        <img
                            src={conn.photoUrl}
                            alt={`${conn.firstName}'s Avatar`}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-indigo-500"
                        />
                        <div className="ml-4 flex flex-col justify-center w-full">
                            <h2 className="text-lg font-bold">{conn.firstName} {conn.lastName}</h2>
                            <p className="text-sm text-gray-400">Age: {conn.age} | {conn.gender}</p>

                            {conn.about && (
                                <p className="text-sm text-gray-300 mt-1 w-[75%] break-words line-clamp-1">
                                    {conn.about}
                                </p>
                            )}

                            <div className="mt-2 flex flex-wrap gap-2">
                                <h4 className="font-sans text-sm">Skills:</h4>
                                {conn.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-indigo-600 text-sm px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    );
}

export default Connections;
