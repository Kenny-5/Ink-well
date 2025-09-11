import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = JSON.parse(localStorage.getItem("inkwellposts") || "[]");
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="px-6 py-12 text-center">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
        >
          Post not found
        </h2>
        <button
          onClick={() => navigate("/Home")}
          className="px-6 py-2 rounded-md"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1
        className="text-3xl sm:text-4xl font-bold mb-4"
        style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
      >
        {post.title}
      </h1>
      <p
        className="mb-6 text-sm"
        style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}
      >
        By {post.author} • {post.date}
      </p>

      <article
        className="prose max-w-none"
        style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}
