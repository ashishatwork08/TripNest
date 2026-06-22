import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function PropertyCard({ property }) {
    const navigate = useNavigate()

    const isWishListed = () => {
        try {
            const stored = JSON.parse(localStorage.getItem('tripnest_wishlist') || '[]')
            return stored.some((p) => p._id === property._id)
        } catch {
            return false
        }
    }

    const [wishlisted, setWishlisted] = useState(isWishListed())

    const toggleWishlist = (e) => {
        e.stopPropagation()
        try {
            const stored = JSON.parse(localStorage.getItem('tripnest_wishlist') || '[]')
            let updated
            if (wishlisted) {
                updated = stored.filter((p) => p._id !== property._id)
            } else {
                updated = [...stored, property]
            }
            localStorage.setItem('tripnest_wishlist', JSON.stringify(updated))
            setWishlisted(!wishlisted)
        } catch (err) {
            console.error("Wishlist update failed", err)
        }
    }

    return (
        <div
            onClick={() => navigate(`/properties/${property._id}`)}
            className="bg-[#1a1a1a] border border-white/[0.05] rounded-2xl overflow-hidden cursor-pointer hover:border-white/[0.13] hover:-translate-y-0.5 transition">
            {/* image */}
            <div className='h-[125px] flex items-center justify-center text-4xl relative'
                style={{ background: 'linear-gradient(135deg,#5f1e2d,#2a0d14)' }}>
                {property.images?.[0]?.url && (
                    <img src={property.images[0].url} alt={property.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <span className="absolute bottom-2 left-2 bg-black/50 text-white/70 text-[9px] px-2 py-0.5 rounded-xl">
                    {property.propertyType}
                </span>

                {/* Heart button */}
                <button onClick={toggleWishlist} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-200">
                    <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-white/50'}`} strokeWidth={2}>
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>
            {/* body */}
            <div className='p-3'>
                <div className='text-white/25 text-[9px] uppercase tracking-wider mb-1'>
                    {property.title}
                </div>
                {/* Footer */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/trip-planner?destination=${property.location?.city || ""}`);
                        }}
                        className="mt-3 w-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
                    >
                        Plan Trip with AI
                    </button>
                    <div className="text-[#f43f5e] text-[13px] font-semibold">
                        &#8377;{property.price}
                        <span className="text-white/25 text-[10px] font-normal"> /night</span>
                    </div>
                    <div className='flex gap-1'>
                        {property.amenities?.slice(0, 2).map((a) => (
                            <span key={a} className="bg-white/5 text-white/30 text-[9px] px-1.5 py-0.5 rounded-lg">
                                {a}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    )
}
