import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { FaCheck, FaTimes } from "react-icons/fa";

function Requests() {
    const dispatch = useDispatch();
    const request = useSelector((store) => store.requests);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/request/recieved", { withCredentials: true });
            console.log(res.data.data);
            dispatch(addRequest(res.data.data));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const reviewRequest = async (_id, status) => {
        try {
            console.log("Request URL:", `${BASE_URL}request/reviews/${status}/${_id}`);
            const res = await axios.post(`${BASE_URL}request/reviews/${status}/${_id}`, {}, { withCredentials: true });
            console.log(`Request ${status}:`, res);
            dispatch(removeRequest(_id));
        } catch (err) {
            console.log(err);
        }
    };

    if (!request || request.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-white">
                <h1 className="text-3xl text-zinc-500 select-none text-center font-mono">No Request Found..</h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center py-10 bg-gray-900 text-white px-4">
            <h1 className="text-2xl font-semibold select-none font-mono">Requests</h1>

            <div className="flex flex-col gap-6 mt-8 w-full max-w-3xl h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-4">
                {request.map((req) => (
                    <div
                        key={req._id}
                        className="w-full flex flex-col sm:flex-row items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-orange-500"
                    >
                        <img
                            src={req.fromUserId.photoUrl} 
                            alt={`${req.fromUserId.firstName}'s Avatar`}
                            className="w-16 h-16 object-cover sm:w-20 sm:h-20 rounded-full border-2 border-orange-300 shadow-lg"
                        />
                        <div className="ml-4 flex flex-col justify-center flex-grow text-center sm:text-left">
                            <h2 className="text-lg text-orange-300">{req.fromUserId.firstName} {req.fromUserId.lastName}</h2>
                            <p className="text-sm text-gray-400">Age: {req.fromUserId.age} | {req.fromUserId.gender}</p>

                            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                <h4 className="font-sans text-sm text-gray-300">Skills:</h4>
                                {req.fromUserId.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-purple-700 text-sm px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-row sm:flex-col justify-center items-center gap-3 mt-3 sm:mt-0">
                            <button
                                onClick={() => reviewRequest(req._id, "accepted")} 
                                className="p-2 rounded-md bg-green-800 hover:bg-green-700 transition-all text-white"
                            >
                                <FaCheck className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => reviewRequest(req._id, "rejected")} 
                                className="p-2 rounded-md bg-red-800 hover:bg-red-700 transition-all text-white"
                            >
                                <FaTimes className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Requests;
