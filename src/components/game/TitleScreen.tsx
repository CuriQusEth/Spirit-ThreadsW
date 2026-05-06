import { motion } from 'motion/react';

export function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Placeholder for flowing background threads */}
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border-[1px] border-[#a890c0]/20 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border-[1px] border-[#e8d5f5]/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="flex flex-col items-center gap-8 z-20"
      >
        <div className="text-center">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#A294B5] mb-4">A Weaver's Journey</h2>
          <h1 className="text-6xl md:text-8xl font-serif tracking-wide text-[#F3E5F5] italic drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Spirit
            <br /> <span className="font-light">Threads</span>
          </h1>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-12 px-10 py-4 bg-[#D4AF37] text-[#0A050F] rounded-full font-bold uppercase tracking-[0.15em] text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all pointer-events-auto"
        >
          Enter the Loom
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
