import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'
import PropertyImages from '../components/property/PropertyImages'
import PropertyInfo from '../components/property/PropertyInfo'
import HostCard from '../components/property/HostCard'
import BookingPanel from '../components/Booking/BookingPanel'
import ReviewSection from '../components/property/ReviewSection'

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProperty = async() => {
    try{
      const {data}= await api.get(`/properties/${id}`)
      setProperty(data.property)
    } catch(err){
      console.log('Property fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchProperty()
  },[id])

  
  if (loading){
    return (
      <div className="text-center text-white/30 py-20 text-[13px]">
          Loading...
          </div>
    )
  }
  if(!property){
    return (
        <div className="text-center text-white/30 py-20 text-[13px]">
          Property not found
          </div>
    )
  }
  return(
    <div>
      <PropertyImages property={property} />
       <div className="grid grid-cols-[1fr_300px] gap-5 px-7 py-6">

     
        <div>
          <PropertyInfo property={property} />
          <ReviewSection propertyId={property._id} />
          <HostCard host={property.host} />
        </div>

        <BookingPanel property={property} />

      </div>
    </div>
  )
}