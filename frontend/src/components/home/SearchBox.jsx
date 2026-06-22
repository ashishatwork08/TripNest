import { useState } from "react";
export default function SearchBox({ onSearch}) {
    const [city,setCity]=useState('')
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [guests,setGuests]=useState('')


    const handleSearch = () => {
        onSearch({city,checkIn,checkOut,guests})
    }
    return (
        <div className="mx-7 mb-3 bg-[#141414] border border-white/[0.06] rounded-[20px] p-5">

            <p className="text-white/25 text-[9px] uppercase tracking-[0.22em] mb-4">
            Find your perfect stay
            </p>

            <div className="grid grid-cols-6 gap-2 items-end">
                        {/* city */}
                <div className="col-span-2">
                    <label className="text-white/25 text-[9px] uppercasetracking-wider block mb-1.5">
                    Destination
                    </label>
                    <input type="text" value={city} onChange={(e)=> setCity(e.target.value)}
                    placeholder="Goa, Manali, Coorg..."
                    className="w-full bg-white/5 border border-white/[0.07] rounded-[10px] px-2.5 py-2 text-white/65 text-[11px] focus:outline-none focus:border-white/20"/>
                </div>
                            {/* Check In */}
            <div>
                <label className="text-white/25 text-[9px] uppercase tracking-wider block mb-1.5">
                Check IN
                </label>
                 <input type="date" value={checkIn} onChange={(e)=> setCheckIn(e.target.value)}
                     className="w-full bg-white/5 border border-white/[0.07] rounded-[10px] px-2.5 py-2 text-white/65 text-[11px] focus:outline-none focus:border-white/20"/>
            </div>

                                {/* Check Out */}
            <div>
                <label className="text-white/25 text-[9px] uppercase tracking-wider block mb-1.5">
                Check Out
                </label>
                 <input type="date" value={checkOut} onChange={(e)=> setCheckOut(e.target.value)}
                 className="w-full bg-white/5 border border-white/[0.07] rounded-[10px] px-2.5 py-2 text-white/65 text-[11px] focus:outline-none focus:border-white/20"/>
            </div>
                                    {/* Guests */}
            <div>
                <label className="text-white/25 text-[9px] uppercase tracking-wider block mb-1.5">
                Guests
                </label>
                <input type="text" value={guests} onChange={(e)=> setGuests(e.target.value)}
                 placeholder="2"  min="1" 
                className="w-full bg-white/5 border border-white/[0.07] rounded-[10px] px-2.5 py-2 text-white/65 text-[11px] focus:outline-none focus:border-white/20"/>
            </div>
                                    {/* Search Button */}
            <div>
                <button onClick={handleSearch}
                className="w-full bg-white text-[#0e0e0e] rounded-[10px] py-2 text-[11px] font-medium hover:bg-gray-100 transition">
                    Search
                </button>

            </div>
            </div>
        </div>
    )
}