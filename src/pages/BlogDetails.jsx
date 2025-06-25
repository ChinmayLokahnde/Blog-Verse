import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deletePost, getPostBySlug } from "../api/PostApi";
import Loader from "../components/Loader";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getPostBySlug(slug);
        setBlog(res);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deletePost(slug);
      navigate("/blogs");
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  if (loading) return <Loader />;
  if (!blog)
    return <div className="text-center mt-10 text-red-500">Blog Not Found.</div>;

  const isAuthor =
  user && blog?.author && user._id.toString() === blog.author._id.toString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/10">
        {blog.thumbnail && (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${blog.thumbnail}`}
            alt="thumbnail"
            className="rounded-lg w-full max-w-md aspect-square object-cover mx-auto mb-6 bg-white/10 p-2 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
          />
        )}

        <h1 className="text-4xl font-bold text-cyan-300 mb-2">{blog.title}</h1>
        <p className="text-sm text-purple-300 mb-6">
          By {blog.author?.username} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <div className="text-lg leading-7 text-gray-200 whitespace-pre-line">
          {blog.content}
        </div>

        {isAuthor && (
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate(`/edit/${blog.slug}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
