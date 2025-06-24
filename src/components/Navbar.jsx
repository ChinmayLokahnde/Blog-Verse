import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-sm bg-[#0f0c29cc] text-white px-6 py-4 flex justify-between items-center border-b border-white/10 shadow-md">
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
      >
        AI Blog Hub
      </Link>

      <div className="flex gap-6 items-center text-base md:text-lg font-semibold tracking-wide">
  <Link
    to="/"
    className="group relative text-cyan-300 hover:text-white transition duration-300"
  >
    <span className="relative z-10">Home</span>
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    to="/blogs"
    className="group relative text-cyan-300 hover:text-white transition duration-300"
  >
    <span className="relative z-10">Blogs</span>
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>

  {user && (
    <>
      <Link
        to="/write"
        className="group relative text-cyan-300 hover:text-white transition duration-300"
      >
        <span className="relative z-10">Write Blog</span>
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <Link
        to="/ai"
        className="group relative text-cyan-300 hover:text-white transition duration-300"
      >
        <span className="relative z-10">AI Blog</span>
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </>
  )}
</div>


      <div className="flex gap-4 items-center text-sm">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-1 rounded bg-cyan-500 text-white hover:bg-cyan-600 shadow-[0_0_10px_rgba(0,255,255,0.4)] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 rounded border border-cyan-400 text-cyan-300 hover:bg-cyan-700/20 hover:text-white transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-cyan-300">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
