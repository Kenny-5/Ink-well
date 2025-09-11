import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NewPost() {
  // We keep track of title + content here
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const STORAGE_KEY = "inkwellposts";

  // Runs whenever the user types
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Runs when "Publish Post" is clicked
  const handleSubmit = (e) => {
    e.preventDefault();

    // Load old posts from storage
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Make a new post object
    const newPost = {
      id: uuidv4(),
      title: form.title,
      content: form.content,
      author: currentUser?.name || "Anonymous",
      date: new Date().toLocaleDateString(),
    };

    // Add new post at the top
    posts.unshift(newPost);
    // Save back to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

    // Send back to homepage
    navigate("/Home");
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 py-12">
      {/* Card wrapper */}
      <div
        className="w-full max-w-2xl rounded-lg p-6 sm:p-8 shadow-md"
        style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
        role="form"
        aria-labelledby="newpost-heading"
      >
        {/* Page title */}
        <h2
          id="newpost-heading"
          className="text-2xl sm:text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
        >
          Create New Post
        </h2>

        {/* Post form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          {/* Title */}
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

          {/* Content */}
          <textarea
            name="content"
            placeholder="Write your post in Markdown..."
            value={form.content}
            onChange={handleChange}
            rows="10"
            required
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md font-semibold transition"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
