import { Link } from "react-router-dom";
import { useState } from "react";

const placeholder ="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80";

export default function PropertyListItem({ property, onDelete}) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async() => {
        if(! confirmDelete ) {
            setConfirmDelete(true);
            return;
        }
        setDeleting(true);
        try{
            onDelete(property._id);
        } catch(err) {
            console.error("Delete failed:", err);
            setDeleting(false);
            setConfirmDelete(false);
        }
    };
    return (
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition-all duration-300">
                <img src={property.images?.[0]?.url|| placeholder }
                alt={property.title}
                onError={(e)=>(e.currentTarget.src = placeholder)}
                className="w-20 h-16 rounded-xl object-cover shrink-0 bg-white/10" />

                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate font-['Playfair_Display']">
                        {property.title}
                    </p>
                    <p className="text-white/50 text-sm truncate">
                    {property.location?.city}, {property.location?.state}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/20 capitalize">
                        {property.propertyType || "property"}
                        </span>
                     <span className="text-xs text-white/40">
                     &#8377;{property.price?.toLocaleString()}/night
                     </span>
                     <span className="text-xs text-white/40">
                        {property.maxGuests} guests. {property.bedrooms} bd . {property.bathrooms} ba
                     </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <Link to={`/properties/${property._id}`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                        View
                    </Link>
                    <button onClick={handleDelete} disabled={deleting} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${confirmDelete ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30" :"border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/30"}`} >
                    {deleting ? "...": confirmDelete ? "confirm" : "Delete"}
                    </button>

                </div>
            </div>

    );
}