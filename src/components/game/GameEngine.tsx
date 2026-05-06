import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleScreen } from './TitleScreen';
import { SpiritWeaver } from './SpiritWeaver';
import { Leaderboard } from './Leaderboard';
import { Sanctuary } from './Sanctuary';
import { Codex } from './Codex';
import { TopBar } from './TopBar';

export type Screen = 'title' | 'loom' | 'codex' | 'leaderboard' | 'sanctuary';

export function GameEngine() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');
  const [tapestryScore, setTapestryScore] = useState(0);

  return (
    <div className="relative w-full h-screen bg-[#0A050F] text-[#E0D8E0] overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#3B125C] rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#125C54] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#5C1212] rounded-full blur-[150px] opacity-10"></div>
      </div>
      
      {currentScreen !== 'title' && (
        <TopBar onNavigate={setCurrentScreen} currentScreen={currentScreen} score={tapestryScore} />
      )}

      <AnimatePresence mode="wait">
        {currentScreen === 'title' && <TitleScreen key="title" onStart={() => setCurrentScreen('loom')} />}
        {currentScreen === 'loom' && <SpiritWeaver key="loom" onScoreChange={setTapestryScore} />}
        {currentScreen === 'leaderboard' && <Leaderboard key="leaderboard" />}
        {currentScreen === 'sanctuary' && <Sanctuary key="sanctuary" />}
        {currentScreen === 'codex' && <Codex key="codex" />}
      </AnimatePresence>
    </div>
  );
}
