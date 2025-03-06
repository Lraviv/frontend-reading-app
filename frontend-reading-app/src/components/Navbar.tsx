// src/components/Navbar.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
