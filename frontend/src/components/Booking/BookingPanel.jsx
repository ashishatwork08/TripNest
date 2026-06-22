import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import api from '../../lib/api'

export default function BookingPanel({property}) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests,setGuests] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    
    const { user } = useAuth()
    const navigate = useNavigate()

    const nights = checkIn && checkOut ? Math.max(0,Math.ceil(new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24)) : 0

    const total = nights* (property?.price || 0)
    const handleReserve = async() => {
        if(!user) {
            navigate('/login')
            return
        }
        if(!checkIn || !checkOut) {
            setError('Please select dates')
            return
        }
        setLoading(true)
        setError('')

        try{
            await api.post('/bookings',{propertyId:property._id,checkIn,checkOut,guests,totalPrice:total})
            navigate('/dashboard')
        }
        catch(err){
            setError(err.response?.data?.message || 'Booking failed')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='bg-[#141414] border border-white/[0.08] rounded-[18px] p-6 sticky top-20'>
                                    {/* Price */}
            <div className='font-serif text-[30px] font-bold text-[#f43f5e]'>
                &#8377;{property?.price?.toLocaleString()}
            </div>
            <div className='text-white/30 text-[11px] mb-5'>
            per night . free cancellation</div>
                                {/* checkIn */}
            <label className='text-white/25 text-[9px] uppercase tracking-wider block mb-1.5'>Check In</label>
            <input  type='date' value={checkIn} onChange={(e)=> setCheckIn(e.currentTarget.value)}
            className="w-full bg-white/5 border border-white/[0.07] rounded-[10px] px-3 py-2.5 text-white/60 text-[12px] mb-3 focus:outline-none focus:border-white/20"/>

                                {/* checkOut */}
            <label className='text-white/25 text-[9px] uppercase tracking-wider block mb-1.5'>check out</label>
            <input type='date' value={checkOut} onChange={(e)=> setCheckOut(e.target.value)}
            className="w-full bg-white/5 border border-white/[0.07] rounded-[10px] px-3 py-2.5 text-white/60 text-[12px] mb-3 focus:outline-none focus:border-white/20"/>

                                {/* Guests */}
            <label className='text-white/25 text-[9px] uppercase tracking-wider block mb-1.5'>Guests</label>
            <input  type='number' value={guests} onChange={(e)=> setGuests(e.target.value)} min="1"
             max={property?.maxGuests}
            className="w-full bg-white/5 border border-white/[0.07] rounded-[10px] px-3 py-2.5 text-white/60 text-[12px] mb-4 focus:outline-none focus:border-white/20"/>

                                {/* Total */}
            {nights > 0 &&(
                <div className="bg-white/[0.03] rounded-[10px] p-3 mb-4">
                    <div className="flex justify-between text-white/35 text-[12px] mb-2">
                        <span> &#8377;{property?.price} * {nights} nights</span>
                        <span>&#8377;{total.toLocaleString()}</span>
                    </div>
            <div className='flex justify-between text-white text-[13px] font-medium pt-2 border-t border-white/[0.06]'>
                <span>Total</span>
                <span>&#8377;{total.toLocaleString()}</span>
                </div>
                </div>
            )}
                                    {/* Error */}
            {error &&(
                <div className='text-[#f43f5e] text-[12px] mb-3'>{error}</div>
            )}
                                    {/* Reserve Button */}
            <button onClick={handleReserve} disabled={loading} className='w-full bg-[#f43f5e] text-white rounded-[12px] py-3 text-[13px] font-medium hover:bg-[#e03555] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2'>
                {loading ? 'Booking...' : 'Reserve Now'}
            </button>
            <p className="text-white/20 text-[10px] text-center">
                    You won't be charged yet
                </p>
        </div>
    )
}