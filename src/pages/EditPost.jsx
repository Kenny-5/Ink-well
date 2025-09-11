import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams(); // Which post are we editing?
  const navigate = useNavigate();
  const STORAGE_KEY = "inkwellposts";

  // Load the post to edit
  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const existingPost = posts.find((p) => p.id === id);

  // Fill form with old post content
  const [form, setForm] = useState({
    title: existingPost?.title || "",
    content: existingPost?.content || "",
  });

  useEffect(() => {
    if (!existingPost) {
      alert("Post not found!");
      navigate("/Home");
    }
  }, []);

  // Update form state
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPosts = posts.map((p) =>
      p.id === id ? { ...p, title: form.title, content: form.content } : p
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    navigate(`/post/${id}`);
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 py-12">
      <div
        className="w-full max-w-2xl rounded-lg p-6 sm:p-8 shadow-md"
        style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
        >
          Edit Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />

          <textarea
            name="content"
            placeholder="Update your post..."
            value={form.content}
            onChange={handleChange}
            rows="10"
            required
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />

          <button
            type="submit"
            className="w-full py-2.5 rounded-md font-semibold transition"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
