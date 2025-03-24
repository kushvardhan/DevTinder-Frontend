import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addUser } from "../utils/userSlice";

function Profile() {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}profile/view`, { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [about, setAbout] = useState(user?.about || "A passionate developer always looking for new challenges.");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "https://i.pinimg.com/736x/5c/7c/1b/5c7c1bf7fd39ded10379abddb792cf5f.jpg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccessMessage(false);  // Hide the success message when submitting

    try {
      const response = await axios.patch(
        `${BASE_URL}profile/edit`,
        { firstName, lastName, age, skills: skills.split(", "), about, gender, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.updatedUser));

      setShowSuccessMessage(true);  

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1700);

    } catch (err) {
      setError("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center text-lg text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="w-full py-10 bg-base-100 flex justify-center mt-8">
      <div className="flex flex-wrap gap-12 justify-center w-full max-w-6xl px-4">
        <div className="card bg-base-300 w-full sm:w-96 p-6 shadow-2xl">
          <h1 className="text-center text-2xl select-none font-semibold mb-4">Edit Profile</h1>
          <form className="space-y-4" method="patch" onSubmit={saveProfile}>
            <div className="form-control">
              <label className="block text-gray-600 font-bold">First Name</label>
              <input type="text" className="input w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>

            <div className="form-control">
              <label className="block text-gray-600 font-bold">Last Name</label>
              <input type="text" className="input w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="block text-gray-600 font-bold">Age</label>
              <input type="number" className="input w-full" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="block text-gray-600 font-bold">Skills</label>
              <input type="text" className="input w-full" value={skills} onChange={(e) => setSkills(e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="block text-gray-600 font-bold">Gender</label>
              <select className="select w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="" disabled>-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label className="block text-gray-600 font-bold">Profile Picture URL</label>
              <input type="text" className="input w-full" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />
            </div>
            <div className="form-control">
              <label className="block text-gray-600 font-bold">About</label>
              <textarea className="textarea w-full resize-none" value={about} onChange={(e) => setAbout(e.target.value)} required></textarea>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className={`btn w-full ${loading ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-800 "}`} disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
        <div className="card bg-base-300 w-full sm:w-96 h-fit shadow-lg rounded-lg">
          <div className="card-body flex flex-col gap-3 relative">
            <h3 className="absolute top-0 left-0 w-full text-center text-zinc-600 font-mono text-sm font-semibold select-none pt-4">SAMPLE CARD</h3>
            <div className="w-full overflow-hidden rounded-lg mt-3">
              <img src={photoUrl} alt="Developer" className="transition-transform object-cover duration-300 hover:scale-105" style={{ width: "100%", height: "350px", objectFit: "cover" }} />
            </div>
            <div className="text-gray-800 flex flex-col gap-3 mt-1">
              <h1 className="font-semibold text-gray-300 text-lg">{`${firstName} ${lastName}`}</h1>
              <h2 className="text-sm font-mono font-medium text-gray-300">{`${age} ${gender}`}</h2>
              <p className="text-gray-400 font-sans text-base leading-snug">{about}</p>
              {skills && <p className="text-gray-400 tracking-wide text-sm"><strong>Skills:</strong> {skills}</p>}
            </div>
          </div>
        </div>
      </div>
      
      {showSuccessMessage && (
        <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default Profile;
