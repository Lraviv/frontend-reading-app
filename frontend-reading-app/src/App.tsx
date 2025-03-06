import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div className="p-6">
      <nav className="flex space-x-4 text-blue-500">
        <Link to="/">Home</Link>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
