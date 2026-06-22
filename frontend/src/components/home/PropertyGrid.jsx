import { useCallback, useEffect, useState } from "react";
import api from '../../lib/api'
import PropertyCard from "../property/PropertyCard";

export default function PropertyGrid({ filters }) {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProperties = useCallback(async () => {
        setLoading(true)
        try{
            const {data} = await api.get('/properties', {params: filters})
            setProperties(data.properties || data)
        } catch (err){
            console.log('Properties fetch failed:',err)
        } finally {
            setLoading(false)
        }
    }, [filters])

    useEffect(() => {
        fetchProperties()
    }, [fetchProperties])
    if(loading) {
        return (
            <div className="text-center text-white/30 py-20 text-[13px]">
                Loading properties...
            </div>
        )
    }
    if (properties.length == 0){
        return (
            <div className="text-center text-white/30 py-20 text-[13px]">
                No properties found
            </div>
        )
    }
    return (
          <div className="px-7 pb-10">
             <div className="flex justify-between items-center mb-5">
                <h2 className="font-serif text-[21px] font-bold">Featured Stays</h2>
                <span className="text-[#f43f5e] text-[12px] cursor-pointer">View all →</span>
             </div>
             <div className="grid grid-cols-3 gap-4">
                {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
             </div>
          </div>
    )
    }
