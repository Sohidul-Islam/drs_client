import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUser } from "../../features/auth/authSlice";
// import CreateAdmin from './CreateAdmin'

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState(false);
  const userEmail = Cookies.get("email") || null;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await dispatch(getUser(userEmail)).unwrap();
        const user = res?.data?.email;
        setUser(user);
        setUserData(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setUserData(true);
      }
    };
    fetchUserData();
  }, [dispatch, userEmail]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#006E9E] text-white h-16">
      <div className="container mx-auto px-5 md:px-12 py-3 md:py-4 flex items-center justify-between">
        {/* common portion for mobile and large device  */}
        <Link to="/" className="flex items-center gap-x-2">
          <img className="w-10 h-8" src={logo} alt="DRA Solution logo" />
          <span className="text-base font-semibold">DRA Solution</span>
        </Link>

        {/* responsive for large device  */}
        <div className="hidden md:block">
          <div className="flex items-center gap-x-4">
            <Link
              to="/subscription-plan"
              className="text-white flex-grow hover:text-gray-300 text-sm font-semibold"
            >
              Subscriptions
            </Link>
            {
              !userData && <div className="flex-grow w-20"></div>
            }
            <div className="h-full w-full">
              {userData &&
                (user ? (
                  <Link
                    to="/dashboard"
                    className="text-white flex-grow hover:text-gray-300 text-sm font-semibold"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex gap-x-4 flex-grow">
                    <Link
                      to="/login"
                      className="text-sm border border-white px-4 py-2 rounded hover:bg-white hover:text-[#006E9E]"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm bg-red-700 px-4 py-2 rounded text-white hover:bg-red-800"
                    >
                      Register
                    </Link>

                    {/* for temporary create a admin  */}
                    {/* <CreateAdmin/> */}
                  </div>
                ))}
            </div>
          </div>
          {/* for temporary create a admin  */}
          {/* <CreateAdmin/> */}
        </div>

        {/* mobile view menu button  */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* responsive for mobile view  */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } flex flex-col space-y-3 py-4 px-5`}
      >
        <Link
          to="/subscription-plan"
          className="text-white hover:text-gray-300"
        >
          Subscriptions
        </Link>
        {userData &&
          (user ? (
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-300 text-sm font-semibold"
            >
              Dashboard
            </Link>
          ) : (
            <div>
              <Link
                to="/login"
                className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 w-full text-center"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-red-700 px-4 py-2 rounded text-white hover:bg-red-800 w-full text-center"
              >
                Register
              </Link>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
