import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Movie from './components/movie'
import TV from './components/TV'
import Book from './components/Book'
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-[#E6E7EC] min-h-screen p-6 pt-32">
      {/* Define Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><Movie /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><Book /></ProtectedRoute>} />
        <Route path="/tv-series" element={<ProtectedRoute><TV /></ProtectedRoute>} />
        <Route path="/stats" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Home /></ProtectedRoute>} />

      </Routes>
    </div>
  )
}

export default App
