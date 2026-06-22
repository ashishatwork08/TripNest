import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PropertyDetail from './pages/PropertyDetail'
import Dashboard from './pages/Dashboard'
import HostDashboard from './pages/HostDashboard'
import Wishlist from './pages/Wishlist'
import TripPlanner from "./pages/TripPlanner"

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Navbar har page pe dikhega */}
      <Navbar />

      {/* URL ke hisaab se page dikhao */}
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/signup"     element={<Signup />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/host"       element={<HostDashboard />} />
        <Route path="/wishlist"   element={<Wishlist />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
      </Routes>

    </div>
  )
}