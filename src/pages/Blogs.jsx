import { useEffect, useState } from "react";
import { getAllPosts } from "../api/PostApi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); 
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Error fetching blogs");
        console.error("Error fetching blogs", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchPosts();
  }, []);

  
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white/5 border border-white/10 rounded-lg p-5 h-40" />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-10 text-center drop-shadow-lg">
          Explore the Latest Blogs
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-300">No blogs found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post._id}
                className="group block bg-white/5 border border-white/10 rounded-lg p-5 hover:shadow-xl hover:shadow-cyan-400/20 transition duration-300 backdrop-blur-sm"
              >
                <h2 className="text-xl font-bold text-cyan-300 group-hover:text-white transition duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-400 mt-2 text-sm leading-6 line-clamp-4">
                  {post.content.slice(0, 150)}...
                </p>
                <p className="mt-4 text-sm text-purple-300 font-medium">
                  By {post.author?.username}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
