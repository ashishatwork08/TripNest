export default function PropertyImages({ property }) {
    return (
        <div className="mx-7 mt-4 rounded-[18px] overflow-hidden h-[220px] flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg,#5f1e2d,#2a0d14)' }} >

            <img
                src={property.images[0].url || property.images[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60 z-0"
            />
            {property?.images?.[0] ? (
                <img
                    src={property.images[0].url || property.images[0]}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-contain z-10" />
            ) : (
                <span className="text-white/20 text-sm">No Image</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
    )
}
