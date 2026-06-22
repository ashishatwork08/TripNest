import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'
import BookingCard from '../components/dashboard/BookingCard'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()
  const navigate = useNavigate()

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my')
      setBookings(data.bookings || [])
    } catch (err) {
      console.error('Bookings fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>
  {
  if(!user){
    navigate('/login')
    return
  }
fetchBookings()
  },[] )

  

  if (loading) {
    return (
      <div className="text-center text-white/30 py-20 text-[13px]">
        Loading...
      </div>
    )
  }
  return (
    <div className="px-7 py-8">

      {/* Header */}
      <div className="text-[#f43f5e] text-[10px] uppercase tracking-[0.28em] mb-2">
        Account
      </div>
      <h1 className="font-serif text-[28px] font-bold mb-6">
        My Bookings
      </h1>

                        {/* Bookings list */}
      {bookings.length === 0 ? (
        <div className="text-center text-white/30 py-20 text-[13px]">
          No bookings yet —
          <span
            className="text-[#f43f5e] cursor-pointer"
            onClick={() => navigate('/')}
          >
            explore stays
          </span>
           </div>
      ) : (
        bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancel={fetchBookings}
          />
        ))
      )}

    </div>
  )
}