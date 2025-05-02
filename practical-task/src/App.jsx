import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Users from './Pages/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute adminOnly={true}><Users /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
