import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import PropertyCard from "../property/PropertyCard";

export default function FeaturedStay() {
    const [properties, setProperties] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        loadFeaturedProperties();
    }, []);

    const loadFeaturedProperties = async () => {
        try {
            const response = await api.get('/recommendations/featured');
            setProperties(response.data.property);
        } catch (error) {
            console.error('Error fetching featured properties:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading ) {
        return null;
    }

    if(!properties) {
        return null;
    }
    return(
        <section className="max-w-7xl mx-auto px-4 mb-12">
            <h2 className="text-2xl font-['Playfair_Display'] font-semibold text-white mb-6">Featured Stay</h2>

             <div className="border border-rose-500/30 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                    <PropertyCard property={properties} featured={true} />
             </div>

             <div className='flex flex-col items-center gap-2 p-4'>
                <p className="text-white/40 text-sm text-center">
                 Stay here? Let AI plan your trip!
                </p>
                <button
                        onClick={() => navigate(`/trip-planner?destination=${properties.location?.city}`)}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition whitespace-nowrap"
                    >
                        Plan Trip with AI
                    </button>
                </div>
             </div>
        </section>
    )
}
