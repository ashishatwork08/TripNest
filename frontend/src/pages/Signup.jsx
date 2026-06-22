import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signup(name, email, password, role)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-5 py-10">
      <div className="bg-[#141414] border border-white/[0.06] rounded-[20px] p-10 w-full max-w-[420px]">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#f43f5e] inline-block" />
          <span className="font-serif text-lg">TripNest</span>
        </div>

        <h2 className="font-serif text-[28px] font-bold mb-2 text-center">Create account</h2>
        <p className="text-white/35 text-[13px] mb-7 text-center">Join thousands of travellers across India</p>

        <p className="text-white/35 text-[11px] uppercase tracking-wider mb-3">I am a</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`border rounded-[11px] p-3 cursor-pointer text-left transition ${
              role === 'user'
                ? 'border-[#f43f5e]/40 bg-[#f43f5e]/08'
                : 'border-white/[0.07] bg-white/[0.04]'
            }`}
          >
            <div className="text-xl mb-1">Guest</div>
            <div className="text-[13px] text-white/75">Guest</div>
            <div className="text-[11px] text-white/30">Book stays and travel</div>
          </button>

          <button
            type="button"
            onClick={() => setRole('host')}
            className={`border rounded-[11px] p-3 cursor-pointer text-left transition ${
              role === 'host'
                ? 'border-[#f43f5e]/40 bg-[#f43f5e]/08'
                : 'border-white/[0.07] bg-white/[0.04]'
            }`}
          >
            <div className="text-xl mb-1">Host</div>
            <div className="text-[13px] text-white/75">Host</div>
            <div className="text-[11px] text-white/30">List and manage properties</div>
          </button>
        </div>

        {error && (
          <div className="bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#f43f5e] p-3 rounded-[10px] text-[13px] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="text-white/35 text-[11px] uppercase tracking-wider block mb-1.5">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ashish Kumar"
            required
            className="w-full bg-white/5 border border-white/[0.07] rounded-[11px] px-3.5 py-3 text-white/80 text-[13px] mb-4 focus:outline-none focus:border-white/20"
          />

          <label className="text-white/35 text-[11px] uppercase tracking-wider block mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full bg-white/5 border border-white/[0.07] rounded-[11px] px-3.5 py-3 text-white/80 text-[13px] mb-4 focus:outline-none focus:border-white/20"
          />

          <label className="text-white/35 text-[11px] uppercase tracking-wider block mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            required
            className="w-full bg-white/5 border border-white/[0.07] rounded-[11px] px-3.5 py-3 text-white/80 text-[13px] mb-5 focus:outline-none focus:border-white/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0e0e0e] rounded-[11px] py-3.5 text-[14px] font-medium disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-gray-100 transition"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-white/35 text-xs text-center mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-[#f43f5e] no-underline hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
