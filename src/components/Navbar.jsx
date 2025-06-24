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
    <nav className="bg-[#0f0c29] text-white px-6 py-4 shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
       
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md"
        >
          BlogVerse
        </Link>

        
        <div className="flex justify-center flex-wrap gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-cyan-400 hover:underline underline-offset-4 transition">
            Home
          </Link>
          <Link to="/blogs" className="hover:text-cyan-400 hover:underline underline-offset-4 transition">
            Blogs
          </Link>
          {user && (
            <>
              <Link to="/write" className="hover:text-cyan-400 hover:underline underline-offset-4 transition">
                Write Blog
              </Link>
              <Link to="/ai" className="hover:text-cyan-400 hover:underline underline-offset-4 transition">
                AI Blog
              </Link>
            </>
          )}
        </div>

       
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="text-gray-300 hidden sm:block">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-cyan-600 text-white px-4 py-1 rounded hover:bg-cyan-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-cyan-500 px-4 py-1 rounded hover:bg-cyan-700 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
