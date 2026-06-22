export default function PropertyInfo({ property }) {
    return (
        <div>
                            {/* to acces location */}
            <div className="text-white/30 text-[10px] uppercase tracking-[0.18em] mb-2">
            {property?.location?.city}, {property?.location?.state}
            </div>
                            {/* to see title */}
        <h1 className="font-serif text-[26px] font-bold mb-3">
            {property?.title}
        </h1>
                        {/* Meta data */}
        <div className="flex gap-4 mb-4">
            <span className="text-white/35 text-[12px]">
                <strong className="text-white">{property?.maxGuests}</strong>
                guests
            </span>
            <span className="text-white/35 text-[12px]">
             <strong className="text-white">{property?.bedrooms}</strong>
             bedrooms
            </span>
             <span className="text-white/35 text-[12px]">
              <strong className="text-white">{property?.bathrooms}</strong>
              bathrooms
              </span>
               <span className="text-yellow-400 text-[12px]">
                4.9&#9733;
               </span>    
        </div>
                            {/* DEscription */}
        <p className="text-white/40 text-[13px] leading-7 mb-5">
        {property?.description}
        </p>
                            {/* Amenities */}
        <div className="text-white/25 text-[9px] uppercase tracking-[0.18em] mb-3">
            Amenities
        </div>
        <div className="flex flex-wrap gap-2">
        {property?.amenities?.map((a)=>(
            <span key={a} className="bg-[#1a1a1a] border border-white/[0.06] text-white/50 text-[11px] px-3 py-1.5 rounded-[10px]">
                {a}
            </span>

        ))}
        </div>
        </div>
    )
}