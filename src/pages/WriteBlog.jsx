import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/AxiosInstance";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) return setError("Title and Content are required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    const token = user?.token || JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) return setError("You must be logged in to post");

    try {
      await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/blogs");
    } catch (err) {
      console.error("❌ Upload Error:", err);
      setError("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-12">
      <div className="max-w-3xl mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/10">
        <h2 className="text-3xl font-extrabold mb-6 text-cyan-300">Write a New Blog</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Blog Title"
            className="p-3 bg-gray-800 text-white border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content..."
            className="p-3 bg-gray-800 text-white border border-white/10 rounded h-52 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="file"
            className="file:bg-cyan-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:mr-4 text-white"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 transition px-4 py-2 rounded text-white font-semibold shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
