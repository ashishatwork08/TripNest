import api from '../../lib/api'
import { useState } from 'react'
export default function BookingCard({ booking, onCancel }) {
    const [confirm, setConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleCancel = async () => {
        if (!confirm) {
            setConfirm(true);
            return;
        }
        setLoading(true);
        setError("");
        try {
            await api.put(`/bookings/cancel/${booking._id}`)
            onCancel()
        }
        catch (err) {
            setError("Cancellation failed. Try again.",err);
            setConfirm(false);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-[#141414] border border-white/[0.06] rounded-[14px] px-5 py-4 flex justify-between items-center mb-3">
            <div>
                <div className='text-white/25 text-[9px] uppercase tracking-wider mb-1'>
                    {booking.property?.location?.city}
                </div>
                <div className='font-serif text-[14px] mb-1.5'>
                    {booking.property?.title}
                </div>
                <div className="text-white/30 text-[11px] mb-1.5">
                    {new Date(booking.checkIn).toDateString()}  &rarr;{new Date(booking.checkOut).toDateString()}
                </div>
                <div className="text-[#f43f5e] text-[14px] font-semibold">
                    &#8377;{booking.totalPrice?.toLocaleString()}
                </div>
                {error && (
                    <p className="text-red-400 text-[11px] mt-1">{error}</p>
                )}
            </div>
            <div className="flex flex-col items-end gap-2">

                {/* Status badge */}
                <span className={`text-[10px] px-2.5 py-1 rounded-[10px] ${booking.status === 'confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : booking.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-white/5 text-white/30'
                    }`}>
                    {booking.status}
                </span>
                {/* cancel button */}
                {booking.status !== 'cancelled' && (
                    <button
                        onClick={handleCancel}
                        disabled={loading}
                        className={`text-[11px] transition ${confirm
                                ? 'text-red-400 hover:text-red-300'
                                : 'text-white/25 hover:text-white/50'
                            } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                        {loading ? 'Cancelling...' : confirm ? 'Sure?' : 'Cancel'}
                    </button>
                )}
            </div>
        </div>

    )
}