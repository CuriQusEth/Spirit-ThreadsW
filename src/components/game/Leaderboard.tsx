import { motion } from 'motion/react';
import { useSignMessage, useAccount } from 'wagmi';

export function Leaderboard() {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();

  const handleSayGM = async () => {
    try {
      if (!address) {
        alert('Please connect your weaver first.');
        return;
      }
      await signMessageAsync({ account: address, message: 'Say GM on Base Mainnet via Spirit Threads' });
      alert('GM said on-chain successfully!');
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pt-32 px-6 md:px-20 overflow-y-auto overflow-x-hidden flex flex-col items-center"
    >
      <div className="z-10 relative flex flex-col items-center w-full">
        <h2 className="font-serif text-2xl tracking-wide text-[#F3E5F5] italic mb-8 text-center">Greatest Weavers</h2>

        <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#A294B5] mb-6 pb-4 border-b border-white/10">
            <span>Weaver</span>
            <span>Harmony</span>
          </div>

          <div className="flex flex-col">
            {[
              { address: '0x1A4...9F2B', score: 8500, label: 'Ascended' },
              { address: '0x4B2...1C0A', score: 6200, label: 'Master' },
              { address: '0x8F5...3E9D', score: 4100, label: 'Harmonious' },
            ].map((entry, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 relative">
                <div className="flex items-center gap-4">
                  <span className="text-[#D4AF37] font-serif italic text-lg w-6">{i + 1}.</span>
                  <span className="text-sm font-medium text-white/90">{entry.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#A294B5] hidden sm:block">
                    {entry.label}
                  </span>
                  <span className="text-xl font-light text-[#D4AF37] tabular-nums">
                    {entry.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSayGM}
          className="mt-10 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-white/20 transition-all pointer-events-auto cursor-pointer"
        >
          Say GM On-Chain
        </button>
      </div>
    </motion.div>
  );
}
