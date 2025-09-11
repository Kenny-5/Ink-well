import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // ✅ new state for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error while typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("tempUser"));

    if (savedUser && savedUser.email === form.email && savedUser.password === form.password) {
      localStorage.setItem("currentUser", JSON.stringify(savedUser));
      localStorage.removeItem("tempUser");
      navigate("/Home"); // ✅ redirect on success
    } else {
      setError("Invalid email or password."); // ✅ show inline error
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md rounded-lg p-6 sm:p-8 shadow-md"
        style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "var(--text-primary)" }}
        >
          Login to InkWell
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
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

          {/* ✅ Error Message */}
          {error && (
            <p className="text-sm mt-1" style={{ color: "crimson", fontFamily: "var(--font-sans)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-md font-semibold transition"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            Login
          </button>
        </form>

        <p
          className="mt-4 text-sm text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/SignUp")}
            className="cursor-pointer hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
