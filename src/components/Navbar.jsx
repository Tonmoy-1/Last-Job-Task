import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="bg-white/50 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="navbar w-11/12 mx-auto flex justify-between items-center py-3">
        {/* Left Side - Logo */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-lg md:text-xl text-primary">
              Task Management
            </span>
          </Link>
        </div>

        {/* Right Side - Menu Items */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal space-x-6 font-medium text-gray-700">
              <li>
                <NavLink to="/" className="hover:text-primary transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/tasks" className="hover:text-primary transition">
                  Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addTask"
                  className="hover:text-primary transition"
                >
                  Add Task
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Profile / Login Button */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-gray-300 hover:border-primary transition"
              >
                <div
                  title={user?.displayName}
                  className="w-10 h-10 rounded-full overflow-hidden"
                >
                  <img
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full"
                    alt="User Profile Photo"
                    src={
                      user?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 shadow-lg bg-white rounded-lg w-52 border border-gray-200 z-40"
              >
                <li>
                  <NavLink
                    to="/"
                    className="hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tasks"
                    className="hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addTask"
                    className="hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Add Task
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="btn btn-error btn-sm mt-2 w-full text-white font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              className="btn btn-primary px-6 py-2 font-medium rounded-lg shadow-md"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
