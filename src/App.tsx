import React, { useState } from 'react';
import { useAccount, useSendTransaction, useSignMessage, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { motion, AnimatePresence } from 'motion/react';
import { parseEther } from 'viem';
import { Sun } from 'lucide-react';
import { ThreadCanvas } from './components/ThreadCanvas';
import { getAttributionData } from './lib/erc8021';
import { AGENT_CONFIG } from './lib/erc8004';

function GMButton() {
  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  // Button exactly as specified by user
  if (!isConnected) return null;

  const sendGMTransaction = () => {
    sendTransaction({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3', // GM Contract / Required address
      value: parseEther('0'), // Sending 0 ETH, just data/ping
      data: '0x' // Usually some ABI encode but we ping it directly per requirements or just pass 0x
    });
  };

  return (
    <button 
      onClick={sendGMTransaction}
      className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
    >
      <Sun size={14} />
      Say GM
    </button>
  );
}

export default function App() {
  const [screen, setScreen] = useState<'title' | 'loom' | 'masterpiece'>('title');
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessage } = useSignMessage();

  const handleRecordTapestry = () => {
    if (!isConnected) return;
    
    // Creating SIWE Message payload
    const message = `spiritthreads.app wants you to sign in with your Web3 account:
${address}

Record Masterpiece: The Astral Bloom
Highest Harmony Score: 12
Agent: ${AGENT_CONFIG.address}
Attribution: ${getAttributionData().attributionCode}

URI: https://spiritthreads.app
Version: 1
Chain ID: 8453
Nonce: 8af7d2b4`;

    signMessage({ message });
  };

  return (
    <div className="min-h-screen font-sans text-neutral-100 overflow-hidden relative selection:bg-purple-900/50">
      <ThreadCanvas />
      
      {/* Top UI Layer */}
      <div className="relative z-10 p-4 md:p-6 flex justify-between items-start pointer-events-none">
        
        <div className="pointer-events-auto">
          {screen !== 'title' && (
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-['Cinzel'] text-xl md:text-2xl text-purple-200 tracking-widest drop-shadow-[0_0_10px_rgba(200,150,255,0.5)] cursor-pointer"
              onClick={() => setScreen('title')}
            >
              Spirit Threads
            </motion.h1>
          )}
        </div>

        <div className="flex gap-3 pointer-events-auto items-center">
          <GMButton />
          
          {isConnected ? (
             <button 
                onClick={() => disconnect()}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-sm font-medium transition-all"
              >
                {address?.slice(0,6)}...{address?.slice(-4)}
              </button>
          ) : (
            <button 
              onClick={() => connect({ connector: injected() })}
              className="px-4 py-2 rounded-lg bg-purple-600/30 border border-purple-500/40 hover:bg-purple-600/50 backdrop-blur-md text-sm font-medium transition-all text-purple-100"
            >
              Connect Weaver
            </button>
          )}
        </div>
      </div>

      {/* Main Screens */}
      <AnimatePresence mode="wait">
        {screen === 'title' && (
          <motion.div 
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-center pointer-events-auto space-y-8 p-12 backdrop-blur-sm bg-black/20 rounded-2xl border border-white/5"
            >
              <h1 className="font-['Cinzel'] text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-indigo-400 drop-shadow-[0_0_20px_rgba(150,100,255,0.6)]">
                Spirit Threads
              </h1>
              <p className="text-purple-200/60 max-w-md mx-auto text-sm md:text-base font-light tracking-wide">
                Connect lost souls, mend broken bonds, and create magnificent cosmic tapestries.
              </p>
              
              <button 
                onClick={() => setScreen('loom')}
                className="mt-8 px-12 py-4 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-100 hover:bg-indigo-500/40 hover:scale-105 transition-all duration-300 font-['Cinzel'] tracking-widest text-lg drop-shadow-[0_0_10px_rgba(100,150,255,0.3)]"
              >
                Enter The Loom
              </button>
            </motion.div>
          </motion.div>
        )}

        {screen === 'loom' && (
          <motion.div
            key="loom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto flex items-center gap-6 px-10 py-5 rounded-3xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-[0_0_30px_rgba(100,50,255,0.2)]">
              <div className="text-center">
                <div className="text-2xl font-['Cinzel'] text-purple-200">12</div>
                <div className="text-xs uppercase tracking-widest text-white/40 mt-1">Harmony</div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <button 
                onClick={() => setScreen('masterpiece')}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/50 to-indigo-600/50 hover:from-purple-500/60 hover:to-indigo-500/60 border border-purple-400/30 transition-all font-['Cinzel'] shadow-[0_0_15px_rgba(150,100,255,0.3)]"
              >
                Complete Tapestry
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'masterpiece' && (
           <motion.div 
            key="masterpiece"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-4 top-24 md:inset-x-auto md:w-full md:max-w-2xl md:mx-auto bottom-8 flex flex-col pointer-events-none"
         >
           <div className="flex-1 pointer-events-auto rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 flex flex-col shadow-[0_0_50px_rgba(100,50,255,0.3)]">
              <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-center text-purple-200 mb-2">Masterpiece Woven</h2>
              <p className="text-center text-white/50 text-sm mb-10">Your cosmic connection is ready to be recorded in eternity.</p>

              <div className="flex-1 border border-white/5 rounded-2xl bg-white/5 mb-8 flex items-center justify-center p-4">
                 <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(150,100,255,0.2)]">
                      <div className="text-4xl font-['Cinzel']">A</div>
                    </div>
                    <div className="text-lg font-['Cinzel'] text-indigo-200">The Astral Bloom</div>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleRecordTapestry}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500/80 to-indigo-500/80 hover:from-purple-500 hover:to-indigo-500 text-white font-['Cinzel'] tracking-widest transition-all shadow-[0_0_20px_rgba(150,100,255,0.4)]"
                >
                  RECORD THIS TAPESTRY ON-CHAIN
                </button>
                <div className="flex justify-center mt-2">
                   <GMButton />
                </div>
              </div>

              <button 
                onClick={() => setScreen('loom')}
                className="mt-6 text-sm text-white/40 hover:text-white/60 transition-colors uppercase tracking-widest text-center"
              >
                Return to Loom
              </button>
           </div>
         </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}
