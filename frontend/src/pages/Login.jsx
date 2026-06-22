import {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')
  const [error,setError]= useState('')
  const [loading,setLoading]= useState(false)

  const {login} = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    setLoading(true)

    try{
      await login(email,password)
      navigate('/')
    }
    catch(err)
    {
    setError(err.response?.data?.message || 'Login failed')
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-5 py-10">
      
      <div className="bg-[#141414] border border-white/[0.06] rounded-[20px] p-10 w-full max-w-[420px]">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
          <span className="font-serif text-lg">TripNest</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[28px] font-bold mb-2 text-center">
          Welcome back
        </h2>
        <p className="text-white/35 text-[13px] mb-7 text-center">
          Log in to access your stays and bookings
        </p>

        {/* Error */}
        {error && (
          <div className="bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#f43f5e] p-3 rounded-[10px] text-[13px] mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          <label className="text-white/35 text-[11px] uppercase tracking-wider block mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full bg-white/5 border border-white/[0.07] rounded-[11px] px-3.5 py-3 text-white/80 text-[13px] mb-4 focus:outline-none focus:border-white/20"
          />

          <label className="text-white/35 text-[11px] uppercase tracking-wider block mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="......"
            required
            className="w-full bg-white/5 border border-white/[0.07] rounded-[11px] px-3.5 py-3 text-white/80 text-[13px] mb-5 focus:outline-none focus:border-white/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0e0e0e] rounded-[11px] py-3.5 text-[14px] font-medium disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-gray-100 transition"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

        </form>

        {/* Footer */}
        <p className="text-white/35 text-xs text-center mt-5">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#f43f5e] no-underline hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}

