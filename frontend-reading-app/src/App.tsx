import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-[#E6E7EC] min-h-screen p-6 ">
      

      {/* Define Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

      </Routes>
    </div>
  )
}

export default App
