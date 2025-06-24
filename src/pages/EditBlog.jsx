import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/AxiosInstance";
import Loader from "../components/Loader";

const EditBlog = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${slug}`);
        if (data.author._id !== user._id) {
          alert("You are not authorized to edit this post");
          navigate("/blogs");
          return;
        }
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (err) {
        alert("Error fetching blog...");
        navigate("/blogs");
      }
    };
    fetchPost();
  }, [slug, user._id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await axios.put(`/posts/${slug}`, formData);
      navigate(`/blogs/${slug}`);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-white/10">
        <h2 className="text-3xl font-extrabold mb-6 text-green-400">
          ✏️ Edit Blog
        </h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Blog Title"
            className="p-3 bg-gray-900 text-white border border-white/10 rounded focus:ring-2 focus:ring-green-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content..."
            className="p-3 h-52 bg-gray-900 text-white border border-white/10 rounded resize-none focus:ring-2 focus:ring-green-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="file:bg-green-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded text-white"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow-[0_0_15px_rgba(0,255,128,0.5)] transition"
          >
            ✅ Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
