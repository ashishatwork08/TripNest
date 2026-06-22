function StatCard({ label, value, icon, sub}) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-3 hover:border-rose-500/30 transition-all duration-300">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />
            <span className="text-2xl">{icon}</span>
            <div>
        
            <p className="text-3xl font-bold text-white font-['Playfair_Display']">{value}</p>
            <p className="text-sm text-white/50 mt-0.5">{label}</p>
            {sub && <p className="text-xs text-rose-400 mt-1">{sub}</p>}
            </div>
            </div>
    );
}

const icons = {
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  money: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
};

export default function StatsGrid({ properties = [], bookings = [] }){
    const totalEarnings = bookings.filter((b) => b.status !== "cancelled").reduce((sum,b)=> sum+(b.totalPrice || 0), 0);

    const confirmed = bookings.filter((b)=> b.status === "confirmed").length;
    const pending = bookings.filter((b) => b.status === "pending").length;

    const avgPrice = properties.length ? Math.round(properties.reduce((s,b)=> s+(b.price || 0),0) / properties.length) : 0;

    return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard icon={icons.home} label="Active Listings" value={properties.length} />
      <StatCard icon={icons.calendar} label="Confirmed Bookings" value={confirmed} sub={pending > 0 ? `${pending} pending` : null} />
      <StatCard icon={icons.money} label="Total Earnings" value={`₹${(totalEarnings / 1000).toFixed(1)}k`} />
      <StatCard icon={icons.star} label="Avg Price/Night" value={avgPrice ? `₹${avgPrice.toLocaleString()}` : "—"} />
    </div>
    );
}
