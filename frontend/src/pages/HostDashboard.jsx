import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddPropertyModal from "../components/dashboard/AddPropertyModal";
import api from "../lib/api";
import Loader from "../components/common/Loader";
import StatsGrid from "../components/dashboard/StatsGrid";
import PropertyListItem from "../components/dashboard/PropertyListItem";

export default function HostDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState("");

   const fetchProperties = async()=>{
    setLoading(true);
    setError("");
    try {
      const res=await api.get("/properties/host/mine");
      setProperties(res.data || []);
    } catch {
      setError("Properties not loaded. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(()=>{
     const token = localStorage.getItem("token");
     if(!token) {
      navigate("/login");
      return;
     }
     fetchProperties();
  }, [navigate]);

 
  const handleDelete =async (id)=> {
    try {
      await api.delete(`/properties/${id}`);
    
    setProperties((prev)=> prev.filter((p)=>p._id !== id));
    } catch(err) {
      setError(err.response?.data?.message || "Delete failed. Try again.");
    }
  };
  
  const handlePropertyAdded = (newProp) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div>
      {showModal && (
        <AddPropertyModal
          onClose={() => setShowModal(false)}
          onPropertyAdded={handlePropertyAdded}
        />
      )}
      <div className="border-b border-white/5 bg-[#0e0e0e]/80 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-['Playfair_Display']">
              Host Dashboard
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              Manage your listings & bookings
            </p>
          </div>
          <button
            onClick={()=> setShowModal(true)}
           className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-all shadow-lg shadow-rose-500/20">
            <span className="text-base leading-none">+</span>
            Add Property
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8 flex flex-col gap-8">
        {error ? (
          <div className="text-red-400 text-sm border border-red-500/20 bg-red-500/10 rounded-xl px-4 py-3">
            {error}
          </div>
        ) : null}

        <StatsGrid properties={properties} bookings={[]} />

        <div>
          <h2 className="text-white font-semibold text-lg font-['Playfair_Display'] mb-4">
            Your Listings ({properties.length})
          </h2>

          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl">
              <p className="text-white/40 text-lg font-['Playfair_Display']">
                No listings yet
              </p>
              <p className="text-white/20 text-sm mt-1">
                Add your first property to start hosting.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {properties.map((p) => (
                <PropertyListItem key={p._id} property={p} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
