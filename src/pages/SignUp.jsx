import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // We keep track of the input values (name, email, password) in "form"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // This runs whenever the user types in a field
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // This runs when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save this user temporarily until they log in
    localStorage.setItem("tempUser", JSON.stringify(form));

    // After signing up, we send them to the Login page
    navigate("/Login");
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 py-12">
      {/* This is the card-like box in the center of the page */}
      <div
        className="w-full max-w-md rounded-lg p-6 sm:p-8 shadow-md"
        style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
        role="form"
        aria-labelledby="signup-heading"
      >
        {/* Big title at the top */}
        <h2
          id="signup-heading"
          className="text-2xl sm:text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
        >
          Create an Account
        </h2>

        {/* The actual form with input fields */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          {/* Name field */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />
          {/* Email field */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />
          {/* Password field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />

          {/* Button to submit form */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md font-semibold transition"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            Sign Up
          </button>
        </form>

        {/* Small text with link to Login page */}
        <p className="mt-4 text-sm text-center" style={{ color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/Login")}
            className="cursor-pointer hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
