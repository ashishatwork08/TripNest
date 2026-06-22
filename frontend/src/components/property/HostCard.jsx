export default function HostCard({ host}){
    return (
        <div className="flex items-center gap-3 bg-[#141414] border border-white/[0.06] rounded-[14px] p-4 mt-5">
                          {/* photo of host */}
            <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center text-white/50 text-lg flex-shrink-0">
            {host?.name?.[0] || '?'}
            </div>
                        {/* user ka information */}
            <div>
                <div className="text-white/25 text-[10px] mb-0.5">Hosted by</div>
                <div className="text-white text-[13px] font-medium">{host?.name}</div>
                <div className="text-white/25 text-[11px]">Verified host</div>
            </div>
            </div>
    )
}