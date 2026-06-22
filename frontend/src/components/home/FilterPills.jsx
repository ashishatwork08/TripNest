const filters = [
  { label: 'Beachfront', value: 'villa' },
  { label: 'Mountain', value: 'house' },
  { label: 'Nature', value: 'hostel' },
  { label: 'City', value: 'apartment' },
  { label: 'Heritage', value: 'hotel' },
]

export default function FilterPills({ selected, onSelect }) {
  return (
    <div className="flex gap-2 px-7 py-3 overflow-x-auto">

      {/* All pill */}
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-1.5 rounded-full text-[11px] border whitespace-nowrap transition ${
          selected === ''
            ? 'bg-[#f43f5e] text-white border-[#f43f5e]'
            : 'bg-white/5 text-white/40 border-white/10 hover:border-white/25'
        }`}
      >
        All
      </button>

      {/* Baaki pills */}
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onSelect(f.value)}
          className={`px-4 py-1.5 rounded-full text-[11px] border whitespace-nowrap transition ${
            selected === f.value
              ? 'bg-[#f43f5e] text-white border-[#f43f5e]'
              : 'bg-white/5 text-white/40 border-white/10 hover:border-white/25'
          }`}
        >
          {f.label}
        </button>
      ))}

    </div>
  )
}