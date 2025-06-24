import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-lg px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left - Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400 drop-shadow-md tracking-wide"
        >
          Blog Verse
        </Link>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Center - Nav Links */}
        <div className="hidden md:flex gap-6 text-lg font-medium absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="hover:text-cyan-400 hover:underline transition">Home</Link>
          <Link to="/blogs" className="hover:text-cyan-400 hover:underline transition">Blogs</Link>
          {user && (
            <>
              <Link to="/write" className="hover:text-cyan-400 hover:underline transition">Write</Link>
              <Link to="/ai" className="hover:text-cyan-400 hover:underline transition">AI Blog</Link>
            </>
          )}
        </div>

        {/* Right - Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <>
              <Link to="/login" className="bg-cyan-500 px-4 py-1 rounded text-white hover:bg-cyan-600">Login</Link>
              <Link to="/register" className="border border-cyan-400 px-4 py-1 rounded text-cyan-400 hover:bg-cyan-600/10">Register</Link>
            </>
          ) : (
            <>
              <span className="text-gray-300">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#1a1a2e] z-50 flex flex-col gap-4 px-6 py-4 rounded-b-lg text-lg font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400">Home</Link>
            <Link to="/blogs" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400">Blogs</Link>
            {user && (
              <>
                <Link to="/write" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400">Write</Link>
                <Link to="/ai" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400">AI Blog</Link>
              </>
            )}
            {!user ? (
              <>
                <Link to="/login" className="bg-cyan-500 px-4 py-1 rounded text-white hover:bg-cyan-600 text-center">Login</Link>
                <Link to="/register" className="border border-cyan-400 px-4 py-1 rounded text-cyan-400 hover:bg-cyan-600/10 text-center">Register</Link>
              </>
            ) : (
              <>
                <span className="text-gray-300">Hi, {user.username}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
