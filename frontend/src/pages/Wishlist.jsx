import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WishlistCard from "../components/dashboard/WishlistCard";

export default function Wishlist() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("tripnest_wishlist") || "[]"
      );
      setWishlist(stored);
    } catch {
      setWishlist([]);
    }
  };
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadWishlist();
  }, [user]);

  

  const handleRemove = (propertyId) => {
    const updated = wishlist.filter((p) => p._id !== propertyId);
    setWishlist(updated);
    localStorage.setItem("tripnest_wishlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] font-['DM_Sans'] pb-16">

      {/* Header */}
      <div className="border-b border-white/5 bg-[#0e0e0e]/80 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">
              Wishlist
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {wishlist.length} saved {wishlist.length === 1 ? "property" : "properties"}
            </p>
          </div>
          <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
            ← Explore
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8">

        {/* Empty state */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" className="w-9 h-9 stroke-rose-500/50 fill-none" strokeWidth={1.5}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white font-['Playfair_Display'] mb-2">
              Wishlist is empty
            </h2>
            <p className="text-white/40 text-sm max-w-xs mb-8">
           
            </p>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-all"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlist.map((property) => (
              <WishlistCard
                key={property._id}
                property={property}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}