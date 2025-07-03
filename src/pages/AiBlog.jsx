import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/AxiosInstance";
import { motion } from "framer-motion";

const AiBlog = () => {
  const [idea, setIdea] = useState("");
  const [generateBlog, setGenerateBlog] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!idea) {
      alert("Please enter a blog idea.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "/ai/generate",
        { idea },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.data?.blog) {
        setGenerateBlog(res.data.blog);
      } else {
        alert("No blog content returned. Try again.");
      }
    } catch (err) {
      console.error("AI generation error:", err);
      alert("AI generation failed. Please try again.");
    }
    setLoading(false);
  };

  const handlePost = async () => {
    if (!generateBlog) {
      alert("Please generate a blog before posting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title || "Untitled");
    formData.append("content", generateBlog);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate("/blogs");
    } catch (err) {
      console.error("Post error:", err);
      alert("Failed to post blog. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-purple-300">
          ✨ AI Blog Generator
        </h2>

        <textarea
          placeholder="Enter your blog idea..."
          className="w-full bg-gray-900 text-white border border-white/10 p-4 rounded focus:ring-2 focus:ring-purple-500 mb-4"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={4}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-medium shadow-[0_0_20px_rgba(128,0,255,0.4)] transition mb-8"
        >
          {loading ? "Generating with AI..." : "🚀 Generate Blog"}
        </button>

        {generateBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Enter blog title"
              className="w-full bg-gray-900 text-white border border-white/10 p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              value={generateBlog}
              onChange={(e) => setGenerateBlog(e.target.value)}
              className="w-full bg-gray-900 text-white border border-white/10 p-3 rounded h-64 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="file:bg-purple-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded text-white"
            />

            <button
              onClick={handlePost}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium shadow-[0_0_20px_rgba(0,128,255,0.4)] transition"
            >
              ✅ Post this Blog
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AiBlog;
