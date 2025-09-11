import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import NewPost from "./pages/NewPost";
import PostView from "./pages/PostView";
import Membership from "./pages/Membership"; // new placeholder page
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";
import MyPosts from "./pages/MyPosts";

export default function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
        <Header />

        <Routes>
          {/* If logged in → Home, else → SignUp */}
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/Home" replace />
              ) : (
                <Navigate to="/SignUp" replace />
              )
            }
          />

          {/* Auth pages */}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />

          {/* Main app pages */}
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/membership" element={<Membership />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
