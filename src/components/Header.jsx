import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Header() {
  // Initialize navigation and location hooks
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current user from localStorage (could be null if not logged in)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Refs to manage focus and click detection for accessibility
  const mobileMenuRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  // Handle user logout by clearing localStorage and redirecting
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/Login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only run if mobile menu is currently open
      if (
        showMobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !hamburgerButtonRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup function to remove listener when component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileMenu]);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && showMobileMenu) {
        setShowMobileMenu(false);
        hamburgerButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showMobileMenu]);

  // Function to toggle mobile menu open/closed
  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };

  
  // Makes it easier to add/remove/modify menu items later
  const navItems = [
    { to: "/Home", label: "Home" },
    { to: "/new-post", label: "Create Post" },
    { to: "/my-posts", label: "My Posts" },
    { to: "/membership", label: "Membership" }
  ];

  return (
    
    <div className="relative">
      <header 
        className="flex items-center justify-between px-4 md:px-6 py-4 bg-[var(--header)] shadow-md"
        role="banner"
      >
        {/* Logo and brand name section */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/Home" 
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
            aria-label="InkWell - Go to homepage"
          >
            <img 
              src={logo} 
              alt="" 
              className="h-8 w-8 md:h-10 md:w-10"
              role="presentation"
            />
            <span
              className="text-lg md:text-xl font-bold"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}
            >
              InkWell
            </span>
          </Link>
        </div>

        {currentUser && (
          <>
            {/* Desktop navigation - hidden on mobile devices */}
            <nav 
              className="hidden md:flex items-center space-x-6 font-sans"
              role="navigation"
              aria-label="Main navigation"
            >
              {/* Loop through navigation items and create links */}
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 transition-all duration-200"
                  style={{ color: "var(--text-primary)" }}
                  // Tell screen readers which page is currently active
                  aria-current={location.pathname === item.to ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Logout button for desktop */}
              <button
                onClick={handleLogout}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 transition-all duration-200"
                style={{ color: "var(--text-primary)" }}
                type="button"
              >
                Logout
              </button>
            </nav>

            {/* Mobile hamburger menu button which only visible on mobile */}
            <button
              ref={hamburgerButtonRef}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105"
              style={{ 
                color: "var(--text-primary)",
                backgroundColor: showMobileMenu ? '#E5E5E5' : 'transparent', 
                transition: "all 0.2s ease"
              }}
              // Inline hover effects using project colors (only when menu is closed)
              onMouseEnter={(e) => {
                if (!showMobileMenu) {
                  e.target.style.backgroundColor = '#F0F0F0'
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = showMobileMenu ? '#E5E5E5' : 'transparent'
              }}
              // ARIA attributes for screen readers
              aria-expanded={showMobileMenu}
              aria-controls="mobile-menu"
              aria-label={showMobileMenu ? "Close navigation menu" : "Open navigation menu"}
              type="button"
            >
              {/* Hamburger/X icon that changes based on menu state */}
              <svg 
                className="w-6 h-6 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Show X when menu is open, hamburger when closed */}
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </>
        )}
      </header>

      {/* Mobile dropdown menu - positioned outside header for proper layering */}
      {/* Only render if user is logged in AND mobile menu should be visible */}
      {currentUser && showMobileMenu && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-[var(--header)] shadow-lg md:hidden transform transition-all duration-300 ease-in-out z-50"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Navigation container with vertical layout */}
          <nav className="flex flex-col p-4 space-y-1">
            {/* Create mobile menu links from the same array as desktop */}
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:underline hover:bg-black/5 py-3 px-2 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                style={{ color: "var(--text-primary)" }}
                // Close mobile menu when user clicks a link
                onClick={() => setShowMobileMenu(false)}
                // Indicate current page for screen readers
                aria-current={location.pathname === item.to ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile logout button */}
            <button
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
              className="hover:underline hover:bg-black/5 py-3 px-2 text-left rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              style={{ color: "var(--text-primary)" }}
              type="button"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}