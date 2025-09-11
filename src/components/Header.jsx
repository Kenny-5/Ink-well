
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/Login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[var(--header)] shadow-md">
      {/* Logo + Brand Name (always visible) */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="InkWell Logo" className="h-10 w-10 object-contain" />
        <span
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}
        >
          InkWell
        </span>
      </div>

      {/* Navigation (only when logged in) */}
      {currentUser && (
        <nav className="flex items-center space-x-6 font-sans">
          <Link
            to="/Home"
            className="hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            Home
          </Link>
          <Link
            to="/new-post"
            className="hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            Create Post
          </Link>
          <Link
            to="/my-posts"
            className="hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            My Posts
          </Link>
          <Link
            to="/membership"
            className="hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            Membership
          </Link>
          <button
            onClick={handleLogout}
            className="hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
