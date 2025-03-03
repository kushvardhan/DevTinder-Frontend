import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(data);
      dispatch(addUser(data.data));
      navigate("/"); 
    } catch (err) {
      if (err.response?.data === "User not found") {
        setError(
          <>
            User not found.{" "}
            <Link
              to="/signup"
              className="text-blue-500 underline"
            >
              Create an account
            </Link>
          </>
        );
      } else {
        setError("Invalid email or password. Please try again.");
      }
      console.error("Error: ", err);
    }
  };

  return (
    <div className="w-full h-fit mb-20 bg-base-100 flex justify-center mt-20">
      <div className="card bg-base-200 w-full h-fit max-w-sm p-6 shadow-2xl">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <form className="space-y-3">
          <div className="form-control">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Password"
              className="input mt-2 input-bordered w-full"
              required
            />

          </div>
          {error && (
            <p className="px-2 text-red-400 text-md">
              {error}
            </p>
          )}
          <div className="form-control py-2">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
