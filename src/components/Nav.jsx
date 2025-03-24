import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
import { removeUser } from "../utils/userSlice";

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-base-100">
      <div className="navbar container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-3xl select-none text-purple-100 font-bold">
            DevTinder
          </Link>
        </div>

        <div className="hidden lg:flex items-center select-none gap-6 py-2">
          {user ? (
            <div className="flex items-center gap-4">
              <p className="text-lg text-gray-400">
                Welcome {" "}
                <span className="text-pink-300 font-semibold select-none">
                  {user.firstName}
                </span>
              </p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-12 rounded-full">
                    <img
                      className="object-cover"
                      src={user.photoUrl || "https://via.placeholder.com/50"}
                      alt="User"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content hover:*:text-purple-300 hover:last:text-gray-300 bg-base-100 rounded-box shadow mt-3 w-52 z-50"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="tracking-wider" to="/request">Request</Link>
                  </li>
                  <li>
                    <Link className="tracking-wider" to="/connections">Connections</Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="btn btn-ghost w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 z-50"
            >
              {user ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/request">Request</Link>
                  </li>
                  <li>
                    <Link to="/connections">Connection</Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="btn btn-ghost w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
