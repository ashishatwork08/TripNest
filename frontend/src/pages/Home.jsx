import { useState } from 'react'
import HeroSection from '../components/home/HeroSection'
import SearchBox from '../components/home/SearchBox'
import FilterPills from '../components/home/FilterPills'
import PropertyGrid from '../components/home/PropertyGrid'
import TrendingSection from '../components/home/TrendingSection'
import SeasonalSection from '../components/home/SeasonalSection'

export default function Home() {
  const [filters, setFilters] = useState({})
  const [selectedPill, setSelectedPill] = useState('')

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters)
  }

  const handlePillSelect = (value) => {
    setSelectedPill(value)
    setFilters((prev) => ({ ...prev, propertyType: value }))
  }

  return (
    <div>
      <HeroSection />
      <SearchBox onSearch={handleSearch} />
      <FilterPills selected={selectedPill} onSelect={handlePillSelect} />
      <TrendingSection />
      <SeasonalSection />
      <PropertyGrid filters={filters} />
    </div>
  )
}