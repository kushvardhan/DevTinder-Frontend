import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}signup`,
        { ...formData },
        { withCredentials: true }
      );

      console.log("Signup Success:", response.data.user);
      dispatch(addUser(response.data.user));
      setLoading(false);
      alert("Signup successful! Redirecting to Profile Page");
      navigate("/profile"); 

    } catch (err) {
      setLoading(false);
      console.error("Signup Error:", err.response?.data || err.message);

      if (err.response?.data?.error === "Email already exists") {
        setError("This email is already registered. Please use another email or log in.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full h-fit py-8 bg-base-100 flex justify-center items-center">
      <div className="card bg-base-300 w-full max-w-sm p-6 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">Sign Up</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* First Name */}
          <label className="input flex items-center gap-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="grow bg-gray-800 text-gray-200 border-none focus:outline-none p-2 rounded-md"
              required
            />
          </label>

          {/* Last Name */}
          <label className="input flex items-center gap-2">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="grow bg-gray-800 text-gray-200 border-none focus:outline-none p-2 rounded-md"
              required
            />
          </label>

          {/* Age */}
          <label className="input flex items-center gap-2">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="grow bg-gray-800 text-gray-200 border-none focus:outline-none p-2 rounded-md"
              required
            />
          </label>

          {/* Gender */}
          <div className="form-control">
          <select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  className="select w-full bg-gray-800 text-gray-200 border-none rounded-md appearance-none"
  required
>
  <option value="" disabled>
    -- Select Gender --
  </option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
          </div>

          {/* Email */}
          <label className="input flex items-center gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="grow bg-gray-800 text-gray-200 border-none focus:outline-none p-2 rounded-md"
              required
            />
          </label>

          {/* Password */}
          <label className="input flex items-center gap-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="grow bg-gray-800 text-gray-200 border-none focus:outline-none p-2 rounded-md"
              required
              minLength={6}
            />
          </label>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit Button */}
          <div className="form-control py-2">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
