import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white/5 border border-white/10 text-white rounded-xl shadow-md overflow-hidden backdrop-blur-md transition transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt="thumbnail"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-cyan-300 mb-2 truncate">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-300 line-clamp-3">
          {blog.content}
        </p>
        <Link
          to={`/blogs/${blog.slug}`}
          className="mt-3 inline-block text-cyan-400 hover:underline hover:text-cyan-300 transition"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
