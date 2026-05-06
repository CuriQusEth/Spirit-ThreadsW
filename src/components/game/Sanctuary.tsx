import { motion } from 'motion/react';

export function Sanctuary() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pt-32 px-6 md:px-20 overflow-y-auto flex flex-col items-center"
    >
      <div className="z-10 relative flex flex-col items-center w-full">
        <h2 className="font-serif text-2xl tracking-wide text-[#F3E5F5] italic mb-4 text-center">Weaver's Sanctuary</h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#A294B5] mb-12 text-center">
          Your personal tapestry timeline. View your past connections and unlock new ethereal abilities.
        </p>

        <div className="w-full max-w-3xl flex flex-col gap-6">
          <div className="p-8 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl flex justify-between items-center backdrop-blur-md">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-2">Total Harmony Collected</h3>
              <p className="text-xs text-white/70 italic">Used to empower your weaving needle.</p>
            </div>
            <div className="text-4xl font-light text-[#D4AF37] tabular-nums">
              0
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-[#F3E5F5] italic mb-2 text-xl">Prismatic Thread</h3>
                <p className="text-xs text-white/70 mb-6 leading-relaxed">Allows connecting spirits of diametrically opposed emotions without tension.</p>
              </div>
              <button className="px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-full text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold w-full opacity-50 cursor-not-allowed">
                Requires 10,000 Harmony
              </button>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-[#F3E5F5] italic mb-2 text-xl">Daily Spirit Thread</h3>
                <p className="text-xs text-white/70 mb-6 leading-relaxed">Claim an ancient thread spun from memory. Can be claimed once per dawn.</p>
              </div>
              <button className="px-4 py-3 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold w-full hover:bg-[#D4AF37]/30 transition-colors cursor-pointer pointer-events-auto">
                Claim Daily Gift
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
