import { motion } from 'motion/react';

export function Codex() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pt-32 px-6 md:px-20 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto z-10 relative">
        <h2 className="font-serif text-2xl tracking-wide text-[#F3E5F5] italic mb-4 text-center">Spirit Codex</h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#A294B5] mb-12 text-center">
          Chronicles of the Ethereal Realm and the emotions that bind lost souls together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CodexEntry 
            title="Joy" 
            color="#D4AF37"
            desc="Radiant and warm, the threads of joy weave quickly and inspire adjacent spirits to seek connection." 
          />
          <CodexEntry 
            title="Sorrow" 
            color="#8E44AD"
            desc="Slow and heavy, yet deeply resonant. Connect sorrow to hope to unlock profound harmony points." 
          />
          <CodexEntry 
            title="Hope" 
            color="#1ABC9C"
            desc="Luminous and resilient. Hope acts as a bridge across the void, stabilizing volatile spirits." 
          />
          <CodexEntry 
            title="Rage" 
            color="#E91E63"
            desc="Intense and fiery. Connecting rage directly to calm yields the highest harmony multiplier." 
          />
        </div>
      </div>
    </motion.div>
  );
}

function CodexEntry({ title, color, desc }: { title: string, color: string, desc: string }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex flex-col items-center text-center group hover:bg-white/10 transition-colors">
      <div 
        className="w-16 h-16 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform"
        style={{ backgroundColor: color, boxShadow: `0 0 30px ${color}60` }}
      />
      <h3 className="font-serif text-xl text-[#F3E5F5] italic mb-2">{title}</h3>
      <p className="text-xs text-white/80 leading-relaxed">{desc}</p>
    </div>
  );
}
