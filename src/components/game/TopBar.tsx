import { motion } from 'motion/react';
import { Screen } from './GameEngine';
import { Book, Trophy, Home, Sparkles } from 'lucide-react';
import { useAccount, useConnect } from 'wagmi';

export function TopBar({ onNavigate, currentScreen, score }: { onNavigate: (s: Screen) => void, currentScreen: Screen, score: number }) {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-8 bg-gradient-to-b from-[#00000088] to-transparent pointer-events-none"
    >
      <div className="flex gap-4 pointer-events-auto">
        <NavBtn icon={Home} label="Loom" active={currentScreen === 'loom'} onClick={() => onNavigate('loom')} />
        <NavBtn icon={Book} label="Codex" active={currentScreen === 'codex'} onClick={() => onNavigate('codex')} />
        <NavBtn icon={Sparkles} label="Sanctuary" active={currentScreen === 'sanctuary'} onClick={() => onNavigate('sanctuary')} />
        <NavBtn icon={Trophy} label="Rank" active={currentScreen === 'leaderboard'} onClick={() => onNavigate('leaderboard')} />
      </div>

      <div className="flex items-center space-x-8 pointer-events-auto">
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-[#A294B5]">Harmony Score</div>
          <div className="text-2xl font-light text-[#D4AF37] tabular-nums">{score}</div>
        </div>
        <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
        {isConnected ? (
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center space-x-3 cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
            <span className="text-sm font-medium">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
          </div>
        ) : (
          <button 
            onClick={() => connect({ connector: connectors[0] })}
            className="px-6 py-2 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors text-[10px] uppercase tracking-widest font-bold"
          >
            Connect
          </button>
        )}
      </div>
    </motion.div>
  );
}

function NavBtn({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`group flex items-center gap-2 px-4 py-2 rounded-2xl transition-all border ${
        active ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#A294B5]'}`} />
      <span className={`text-[10px] uppercase tracking-widest hidden sm:inline-block ${
        active ? 'text-white' : 'text-[#A294B5]'
      }`}>{label}</span>
    </button>
  );
}
