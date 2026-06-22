import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-[#0e0e0e]/97 border-b border-white/[0.06] px-7 py-3 flex justify-between items-center sticky top-0 z-10">

      {/* Logo */}
      <Link to="/" className="font-serif text-xl text-white no-underline flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#f43f5e] inline-block" />
        TripNest
      </Link>

      <Link to="/trip-planner">AI Planner</Link>
      
      {/* Links */}
      <div className="flex gap-6 items-center">

        <Link to="/" className="text-white/40 text-[13px] no-underline hover:text-white transition">
          Explore
        </Link>

        {/* Sirf logged in users ke liye */}
        {user && (
          <>
            <Link to="/dashboard" className="text-white/40 text-[13px] no-underline hover:text-white transition">
              My Trips
            </Link>
            <Link to="/wishlist" className="text-white/40 text-[13px] no-underline hover:text-white transition">
              Wishlist
            </Link>
            {user.role === 'host' && (
              <Link to="/host" className="text-white/40 text-[13px] no-underline hover:text-white transition">
                Host Panel
              </Link>
            )}
          </>
        )}

        {/* Logged in hai toh naam + logout, nahi toh login/signup */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-[13px]">
              Hi, {user.name}
            </span>
            <button 
              onClick={handleLogout}
              className="border border-white/15 text-white/60 px-4 py-1.5 rounded-full text-xs hover:border-white/35 transition bg-transparent cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2.5">
            <Link 
              to="/login" 
              className="border border-white/15 text-white/60 px-4 py-1.5 rounded-full text-xs hover:border-white/35 transition no-underline"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="bg-[#f43f5e] text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#e03555] transition no-underline"
            >
              Sign up
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}