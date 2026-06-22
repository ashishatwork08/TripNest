import {useEffect, useState} from 'react';
import{Snowflake,Flower2,Sun,CloudRain,Leaf} from 'lucide-react';

import api from '../../lib/api';
import PropertyCard from '../property/PropertyCard';

const SEASONAL_CONFIG = {
    winter: {
        label: "perfect for winter",
        icon: Snowflake,
    },
    spring: {
        label: "perfect for spring",
        icon: Flower2,
    },
    summer: {
        label: "perfect for summer",
        icon: Sun,
    },
    autumn: {
        label: "perfect for autumn",
        icon: Leaf,
    },
    monsoon: {
    label: "perfect for monsoon",
    icon: CloudRain,
}
};

export default function SeasonalSection() {
    const [properties, setProperties] = useState([]);
    const [season, setSeason] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSeasonalProperties();
    }, []);

    const loadSeasonalProperties = async () => {
        try {
            const response = await api.get('/recommendations/seasonal');
            setProperties(response.data.properties);
            setSeason(response.data.season);
        }
        catch (error) {
            console.error('Failed to load seasonal properties', error);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return null;
    }
    if (properties.length === 0) {
        return null;
    }
    const currentSeason= SEASONAL_CONFIG[season] || {
        label:"Recommended for you",
        icon: Sun,
    };
    const SeasonIcon = currentSeason.icon;
    return (
        <section className="max-w-7xl mx-auto px-4 mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-['Playfair_Display'] font-semibold text-white mb-6">
                 <SeasonIcon size={28} />
                {currentSeason.label}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </section>
    );
}