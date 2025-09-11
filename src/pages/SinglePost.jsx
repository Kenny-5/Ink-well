import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const STORAGE_KEY = "inkwellposts";

  // Find post
  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <p className="text-center mt-20">Post not found</p>;
  }

  // Delete post
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
      navigate("/Home");
    }
  };

  return (
    <div className="px-4 sm:px-6 py-12 max-w-3xl mx-auto">
      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl font-bold mb-2"
        style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
      >
        {post.title}
      </h1>

      {/* Meta info */}
      <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
        By {post.author} • {post.date}
      </p>

      {/* Markdown content */}
      <div
        className="prose prose-sm sm:prose lg:prose-lg"
        style={{ color: "var(--text-primary)" }}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Edit + Delete buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="px-4 py-2 rounded-md"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-md"
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
