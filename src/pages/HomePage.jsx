import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/hero.jpg";
import Footer from "../components/Footer"; // adjust path if needed

export default function HomePage() {
  // Get the logged-in user (if any)
  const user = JSON.parse(localStorage.getItem("currentUser"));
  // Get saved posts (or empty array if none yet)
  const posts = JSON.parse(localStorage.getItem("inkwellposts") || "[]");

  return (
    <>
      {/* HERO SECTION (big background image with overlay + welcome text) */}
      <main
        className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero text content */}
        <div className="relative text-center max-w-3xl">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg"
            style={{ fontFamily: "var(--font-serif)", color: "white" }}
          >
            Welcome {user?.name ? `, ${user.name}` : "to InkWell"} 👋
          </h1>

          <p
            className="text-lg sm:text-xl mb-8 leading-relaxed drop-shadow-md"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Your distraction-free space for sharing stories, ideas, and inspiration.
          </p>

          {/* Button → Go to New Post page */}
          <Link to="/new-post">
            <button
              className="px-8 py-3 rounded-full font-semibold transition-transform shadow-md hover:scale-105"
              style={{ backgroundColor: "var(--accent)", color: "white" }}
            >
              ✍️ Create Your First Post
            </button>
          </Link>
        </div>
      </main>

      {/* ABOUT SECTION */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--footer)", color: "var(--text-secondary)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-bold mb-8"
            style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
          >
            About InkWell
          </h2>

          <p className="text-lg leading-relaxed text-[#333333]">
            InkWell is a creative space designed to bring ideas to life. Just like the
            traditional inkwell that fuels the writer’s pen, our platform serves as a{" "}
            <span className="font-semibold">
              source of inspiration, connection, and expression
            </span>{" "}
            for modern creators.
          </p>

          <p className="text-lg leading-relaxed mt-4 text-[#333333]">
            Whether you’re a writer, designer, developer, or simply someone with a story to
            share, InkWell gives you the tools and environment to{" "}
            <span className="font-semibold">create, share, and connect</span> in a meaningful
            way.
          </p>

          <p className="text-lg leading-relaxed mt-4 text-[#333333]">
            We believe in simplicity, elegance, and purpose-driven design — helping you focus
            less on distractions and more on what matters:{" "}
            <span className="font-semibold">your ideas</span>.
          </p>
        </div>
      </section>

      {/* RECENT POSTS SECTION */}
      <section className="px-6 py-16 bg-[var(--background)]">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
        >
          Recent Posts
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {posts.length === 0 ? (
            // If no posts yet
            <p
              className="text-center"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}
            >
              No posts yet. Be the first to write!
            </p>
          ) : (
            // Loop through saved posts
            posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-md shadow-sm"
                style={{
                  backgroundColor: "var(--header)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Post title (clickable link) */}
                <Link to={`/post/${post.id}`}>
                  <h3
                    className="text-xl font-semibold mb-2 hover:underline"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {post.title}
                  </h3>
                </Link>

                {/* Author + Date */}
                <p
                  className="text-sm mb-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  By {post.author} • {post.date}
                </p>

                {/* Post preview snippet */}
                <p
                  className="line-clamp-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {post.content.slice(0, 150)}...
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FOOTER (always at the bottom) */}
      <Footer />
    </>
  );
}
