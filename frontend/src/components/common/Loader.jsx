export default function Loader({ text = "Loading..." }){
    return(
        <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-rose-500/30 border-t-rose-500 animate-spin" />
              <p className="text-white/40 text-sm font-['DM_Sans']">{text}</p>
        </div>
    );
};