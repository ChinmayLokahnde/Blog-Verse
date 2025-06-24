import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/AuthApi";
import { motion } from "framer-motion";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData);
      login(user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 text-white">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-4">Login</h2>
        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-semibold shadow-[0_0_10px_rgba(0,255,255,0.3)] transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
