// src/components/Navbar.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div >
    <nav className=" p-4 ">
      <ul className="flex border-b ">
        <li className='-mb-px mr-1 '>
          <Link to="/" className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold mr-3">Home</Link>
        </li>
        <li className='mr-3'>
          <Link to="/books" className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"> Books </Link>
        </li>
        <li className='mr-3'>
          <Link to="/movies" className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"> Movies </Link>
        </li>
        <li className='mr-3'>
          <Link to="/TV" className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"> TV Series </Link>
        </li>
        <li className='mr-3'>
          <Link to="/Stats" className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"> Stats </Link>
        </li>
      </ul>
    </nav>
    </div>
  )
}

export default Navbar
