import { Link } from "react-router-dom";

export default function MyPosts() {
  const STORAGE_KEY = "inkwellposts";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Show only posts created by this user
  const myPosts = posts.filter((p) => p.author === currentUser?.name);

  return (
    <div className="px-4 sm:px-6 py-12 max-w-3xl mx-auto">
      <h2
        className="text-2xl sm:text-3xl font-bold mb-6"
        style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
      >
        My Posts
      </h2>

      {myPosts.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>You haven’t written anything yet.</p>
      ) : (
        <ul className="space-y-4">
          {myPosts.map((post) => (
            <li
              key={post.id}
              className="p-4 rounded-md shadow-sm hover:shadow-md transition"
              style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
            >
              <Link to={`/post/${post.id}`} className="text-lg font-semibold hover:underline">
                {post.title}
              </Link>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                {post.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
