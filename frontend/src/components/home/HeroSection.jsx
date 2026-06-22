import { FaCheck } from "react-icons/fa";
import { FaUmbrellaBeach } from 'react-icons/fa'

export default function HeroSection() {
    return (
        <div className="grid grid-cols-2 gap-8 px-7 pt-14 pb-8 items-center">
                                                {/*left section text side */}
            <div>
<div className="flex items-center gap-2.5 mb-4">
    <span className="w-7 h-px bg-[#f43f5e]"/>
    <span className="text-[#f43f5e] text-[10px] uppercase tracking-[0.28em]">
        Find your way
    </span>
</div>

{/* Heading */}
<h1 className="font-serif text-5xl font-bold leading-[1.08] mb-4">
    Where will you{' '}
          <em className="text-[#f43f5e] not-italic">wander</em>{' '}
          next?
</h1>

{/* About my website */}
<p className="text-white/35 text-[13px] leading-7 mb-6 max-w-[300px]">
Handpicked villas, lofts & retreats across
India's most beautiful destinations.
</p>
 
{/* Buttons */}
 <div className="flex gap-3 mb-8">
    <button className="bg-white text-[#0e0e0e] px-5 py-2 rounded-full text-[13px] font-medium hover:bg-gray-100 transition">
        Explore stays
    </button>
    <button className="border border-white/15 text-white/60 px-5 py-2 rounded-full text-[13px] hover:border-white/35 transition">
    Become a host
    </button>
 </div>

{/* My website records   */}

<div className="flex gap-7">
    <div>
        <div className="text-xl font-semibold">2,400+</div>
        <div className="text-white/30 text-[11px] mt-1">Properties</div>
</div>

<div>
<div className="text-xl font-semibold">180+</div>
<div className="text-white/30 text-[11px] mt-1">Destinations</div>
</div>

<div>
    <div className="text-xl font-semibold"><div>&#9733;</div></div>
    <div className="text-white/30 text-[11px] mt-1">Avg rating</div>
</div>
</div>

</div> 
                                                 {/* Right section- Floating cards */}
<div className="relative h-[280px]">
    {/* first Card */}
<div className="absolute top-2 right-2 rotate-3 bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-3 w-[155px]">
        <div className="w-full h-[85px] rounded-xl mb-2 flex flex-center justify-center text-3xl"
                    style={{ background: 'linear-gradient(135deg,#5f1e2d,#2a0d14)' }}>
<FaUmbrellaBeach/>
</div>
  <div className="text-white/30 text-[9px] uppercase tracking-wider">Goa</div>
          <div className="font-serif text-[12px] my-0.5">Beachside Villa</div>
          <div className="text-[#f43f5e] text-[11px] font-medium">₹5,000/night</div>
    </div>

        {/* Second card */}
 <div className="absolute bottom-2 left-2 -rotate-2 bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-3 w-[155px]">
          <div className="w-full h-[85px] rounded-xl mb-2 flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg,#1a2e4a,#0d1a2e)' }}>

            </div>
    <div className="text-white/30 text-[9px] uppercase tracking-wider">Mumbai</div>
          <div className="font-serif text-[12px] my-0.5">Modern Loft</div>
          <div className="text-[#f43f5e] text-[11px] font-medium">₹2,100/night</div>
        </div>

        {/* Verified batch */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-white/10 rounded-3xl px-3.5 py-2 flex items-center gap-2 whitespace-nowrap">
        <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 text-[11px]">
        <FaCheck />
            </div>
                <span className="text-white/45 text-[10px]">Verified & secured stays</span>
            </div>"
</div>

</div>
    )
}