import { Link } from "react-router-dom";

const placeholder = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80";

export default function WishlistCard({
    property,
    onRemove,
}) {
    return (
        <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 hover:shadow-xl hover:shadow-black/50 transition-all duration-300">
            <Link to={`/properties/${property._id}`} className="block relative">
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                    <img
                        src={property.images?.[0]?.url || placeholder}
                        alt={property.title}
                        onError={(e) => {
                            e.currentTarget.src = placeholder;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent pointer-events-none" />
                <div className="absolute top-3 left-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10 capitalize">
                        {property.propertyType || "property"}
                    </span>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    onRemove(property._id);
                }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-200"
                    title="Remove from wishlist">

                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-rose-500">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-lg font-['Playfair_Display']">
                        Rs. {property.price?.toLocaleString()}
                        <span className="text-white/60 text-sm font-normal font-['DM_Sans']"> /night</span>
                    </p>
                </div>
            </Link>

            <Link to={`/properties/${property._id}`} className="block p-4">
                <h3 className="text-white font-semibold text-base truncate font-['Playfair_Display'] group-hover:text-rose-300 transition-colors">{property.title}</h3>
                <p className="text-white/50 text-sm mt-0.5 truncate">
                    {property.location?.city}, {property.location?.state}
                </p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5 text-xs text-white/40">
                    <span>{property.maxGuests} guests</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{property.bedrooms} bed</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{property.bathrooms} bath</span>
                </div>
            </Link>
        </div>
    );
}

