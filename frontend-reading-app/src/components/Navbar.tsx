import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react"; // Icons for menu & user dropdown

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/login"; 
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 z-50 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img src="/libooks.png" alt="Logo" className="h-20 w-30" /> 
          <span className="text-xl font-bold">LiBooks</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["home", "books", "movies", "tv-series", "stats"].map((route) => (
            <li key={route}>
              <NavLink
                to={route === "home" ? "/" : `/${route}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                {route.charAt(0).toUpperCase() + route.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none"
          >
            <User size={24} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
              <NavLink
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg"
              >
                User Profile
              </NavLink>
              <NavLink
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg"
              >
                User Settings
              </NavLink>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded-lg"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-3 mt-4">
          {["home", "books", "movies", "tv-series", "stats"].map((route) => (
            <li key={route}>
              <NavLink
                to={route === "home" ? "/" : `/${route}`}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                {route.charAt(0).toUpperCase() + route.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
