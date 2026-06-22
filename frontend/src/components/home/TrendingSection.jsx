import {useEffect, useState} from "react";
import api from "../../lib/api";
import PropertyCard from "../property/PropertyCard";

export default function TrendingSection() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrendingProperties();
    }, []);

    const loadTrendingProperties = async () => {
        try {
            const response = await api.get("/recommendations/trending");
            setProperties(response.data.properties);
        } catch (error) {
            console.error("Error fetching trending properties:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return null; // or a loading spinner
    }

    if (properties.length === 0) {
        return null; // or a message indicating no trending properties
    }

    return (
        <section className="max-w-7xl mx-auto px-4 mb-12">
            <h2 className="text-2xl font-['Playfair_Display'] font-semibold text-white mb-6">Trending this week</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                    /> 
                ))}
            </div>
        </section>
    );
}