import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

function Requests() {
    const request = useSelector((store) => store.request) ; 
    const dispatch = useDispatch();

    const requestStatus = useCallback(async (status, id) => {
        try {
            const data = await axios.post(`${BASE_URL}request/reviews/${status}/${id}`, {}, { withCredentials: true });
            console.log(data);
            dispatch(removeRequest(id));
        } catch (err) {
            if (err.response) {
                console.error("Error response:", err.response.data);
                alert(err.response.data.message || "Something went wrong 1");
            } else {
                console.error("Error:", err);
                alert("An error occurred 2");
            }
        }
    }, [dispatch]);

    const requestData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}user/request/recieved`, { withCredentials: true });
            dispatch(addRequest(res.data.data));
        } catch (err) {
            console.error("ERROR:", err);
        }
    };

    useEffect(() => {
        requestData();
    }, []);

    if (request.length === 0) {
        return (
            <div className="w-full h-screen">
                <h1>No Request Found</h1>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col items-center p-6 gap-10 bg-base-100">
            <h1 className="text-3xl select-none text-white mt-4 tracking-wide">Request Page</h1>

            <div className="w-full sm:w-[90%] md:w-[80%] h-[70vh] overflow-y-auto flex flex-col text-zinc-300 items-center gap-4 p-2">
                {request.map((req) => (
                    <div
                        key={req._id}
                        tabIndex={0}
                        className="collapse collapse-close border-[1px] border-zinc-600 bg-zinc-900 transition-all duration-300 ease-in-out flex justify-between items-center px-4 w-full rounded-xl shadow-lg hover:shadow-2xl hover:border-indigo-500 flex-shrink-0"
                    >
                        <div className="collapse-title text-xl select-none font-medium flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-12 sm:w-14 md:w-16 rounded-full overflow-hidden hover:border-[1px] border-indigo-500 transition-all duration-300 ease-in-out">
                                    <img src={req.photoUrl} alt={`${req.firstName}'s Avatar`} />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="font-sans font-normal text-md sm:text-lg md:text-xl text-white">
                                    {req.firstName} {req.lastName}
                                </h1>
                                <div className="flex gap-3 font-sans font-normal text-sm sm:text-sm md:text-base text-gray-300">
                                    <h3>{req.age}</h3>
                                    <h3>{req.gender}</h3>
                                </div>
                                <h4 className="text-sm text-zinc-400 tracking-wide line-clamp-1">
                                    {req.about.length > 40 ? `${req.about.substring(0, 40)}...` : req.about}
                                </h4>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => requestStatus("accepted", req._id)}
                                className="btn btn-circle btn-outline hover:bg-green-500 transition-all duration-300 ease-in-out"
                                aria-label="Accept Request"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>

                            <button
                                onClick={() => requestStatus("rejected", req._id)}
                                className="btn btn-circle btn-outline hover:bg-red-500 transition-all duration-300 ease-in-out"
                                aria-label="Reject Request"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Requests;
