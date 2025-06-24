import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 text-white overflow-hidden">
      <motion.div 
        className="max-w-3xl text-center space-y-8 p-6 backdrop-blur-sm bg-white/5 rounded-xl shadow-2xl border border-white/10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Welcome to <span className="text-cyan-400">Blog Verse</span>
        </motion.h1>

        <p className="text-gray-300 text-lg md:text-xl">
          Share your thoughts, generate blogs using AI, or write your own. Enter a new realm of expression.
        </p>

        <motion.div 
          className="flex flex-wrap justify-center gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/ai"
            className="relative px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-semibold shadow-[0_0_20px_rgba(0,255,255,0.6)] transition transform hover:scale-105"
          >
            <span className="absolute top-0 left-0 w-full h-full animate-pulse bg-cyan-400 opacity-10 rounded-lg blur"></span>
            Generate With AI
          </Link>

          <Link
            to="/blogs"
            className="border border-cyan-400 text-cyan-300 px-6 py-2 rounded-lg text-lg hover:bg-cyan-700/20 transition hover:text-white"
          >
            Explore Blogs
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
