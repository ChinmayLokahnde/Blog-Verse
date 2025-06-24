import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/AuthApi";
import { motion } from "framer-motion";

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(formData);
      login(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 text-white">
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-4">Register</h2>
        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
          />
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
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
