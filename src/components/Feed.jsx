import axios from "axios"; 
import { BASE_URL } from "../utils/Constant";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { motion, AnimatePresence } from "framer-motion";

function Feed() {
  const dispatch = useDispatch();
  const [feed, setFeed] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user/feed`, { withCredentials: true });
      setFeed(res.data.data);
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSendRequest = async (id, status) => {
    try {
      await axios.post(
        `${BASE_URL}request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (err) {
      console.error("Error while sending request:", err.response?.data || err.message);
    }
  };

  const handleDragEnd = async (event, info, userId) => {
    const { offset } = info;

    if (offset.x > 100) {
      setSwipeDirection("right");
      handleSendRequest(userId, "interested");
      setSwipeDirection(null); 
    } else if (offset.x < -100) {
      setSwipeDirection("left");
      handleSendRequest(userId, "ignored");
      setSwipeDirection(null);
    }
  };

  if (!feed) return null;
  if (feed.length === 0)
      return (
          <div className="w-full h-screen flex items-center justify-center">
              <h1 className="text-3xl text-center">No new User found.</h1>
          </div>
      );


  return (
    <div className="w-full h-screen bg-base-300 flex flex-col items-center justify-center overflow-hidden relative">
      <div>
        {swipeDirection && feed.length > 0 && (
          <div
            className={`absolute text-5xl font-bold ${
              swipeDirection === "left" ? "text-red-600" : "text-green-600"
            } opacity-30`}
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            {swipeDirection === "left" ? "Ignored" : "Interested"}
          </div>
        )}

        <h2 className="text-center select-none text-zinc-600 font-mono tracking-tight text-xl">
          Swipe to connect with developers
        </h2>

        <div className="relative w-full h-[500px] mt-6 max-w-xs flex items-center justify-center">
          <AnimatePresence>
            {feed.slice(currentIndex, currentIndex + 3).map((user, index) => (
              <motion.div
                key={user._id}
                className={`absolute w-[90%] h-[90%] bg-gray-800 shadow-lg rounded-lg flex flex-col overflow-hidden ${
                  index === 0 && swipeDirection === "left"
                    ? "ring-4 ring-red-600"
                    : index === 0 && swipeDirection === "right"
                    ? "ring-4 ring-green-600"
                    : ""
                }`}
                style={{
                  zIndex: 3 - index,
                  scale: 1 - index * 0.05,
                  top: `${index * 10}px`,
                }}
                drag={index === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDrag={(event, info) => {
                  if (info.offset.x > 50) setSwipeDirection("right");
                  else if (info.offset.x < -50) setSwipeDirection("left");
                  else setSwipeDirection(null);
                }}
                onDragEnd={(event, info) =>
                  index === 0 && handleDragEnd(event, info, user._id)
                }
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="w-full h-[70%]">
                  <img
                    src={user.photoUrl || "https://i.pinimg.com/736x/5c/7c/1b/5c7c1bf7fd39ded10379abddb792cf5f.jpg"}
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                  <h1 className="text-xl font-sans font-bold tracking-wide text-gray-100">
                    {`${user.firstName || "Unknown"} ${user.lastName || "User"}`}
                  </h1>

                  {(user.age || user.gender) && (
                    <h2 className="text-md text-gray-200 flex">
                      {user.age ? `${user.age}` : "20"} <span className="ml-2"></span>
                      {user.gender ? `${user.gender}` : ""}
                    </h2>
                  )}

                  {user.skills && user.skills.length > 0 && (
                    <div className="text-sm text-gray-400">
                      <span className="text-md text-gray-300">Skills : </span> {user.skills.join(", ")}
                    </div>
                  )}

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {user.about ||
                      "No description Available"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Feed;
