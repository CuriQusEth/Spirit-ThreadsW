import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSignMessage, useAccount } from 'wagmi';
import { generateERC8021Payload } from '../../lib/erc8021/transaction';

interface Spirit {
  id: string;
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  vx: number;
  vy: number;
  radius: number;
  color: string;
  emotion: string;
}

interface Thread {
  sourceId: string;
  targetId: string;
  strength: number;
}

const COLORS = {
  joy: '#D4AF37', // Gold
  sorrow: '#8E44AD', // Purple
  hope: '#1ABC9C', // Teal
  rage: '#E91E63', // Pink
  calm: '#ECF0F1', // White/Silver
};

export function SpiritWeaver({ onScoreChange }: { onScoreChange: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spirits, setSpirits] = useState<Spirit[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeDrag, setActiveDrag] = useState<{ sourceId: string, currentX: number, currentY: number } | null>(null);
  const [showSubmission, setShowSubmission] = useState(false);

  // Initialize spirits
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const initialSpirits: Spirit[] = Array.from({ length: 8 }).map((_, i) => {
      const types = Object.keys(COLORS) as (keyof typeof COLORS)[];
      const emotion = types[Math.floor(Math.random() * types.length)];
      return {
        id: `s-${i}`,
        x: Math.random() * w,
        y: Math.random() * h,
        tx: Math.random() * w,
        ty: Math.random() * h,
        vx: 0,
        vy: 0,
        radius: 15 + Math.random() * 10,
        color: COLORS[emotion],
        emotion,
      };
    });
    setSpirits(initialSpirits);
  }, []);

  // Rendering and Physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Physics - gently move spirits to their targets
      spirits.forEach(s => {
        // give them new targets if they are close
        const dx = s.tx - s.x;
        const dy = s.ty - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 10) {
          s.tx = s.x + (Math.random() - 0.5) * 200;
          s.ty = s.y + (Math.random() - 0.5) * 200;
          // Contain within bounds
          s.tx = Math.max(50, Math.min(w - 50, s.tx));
          s.ty = Math.max(50, Math.min(h - 50, s.ty));
        }

        s.vx += dx * 0.0001;
        s.vy += dy * 0.0001;
        s.vx *= 0.95; // friction
        s.vy *= 0.95;

        s.x += s.vx;
        s.y += s.vy;
      });

      // Draw Threads
      ctx.lineWidth = 2;
      threads.forEach(t => {
        const source = spirits.find(s => s.id === t.sourceId);
        const target = spirits.find(s => s.id === t.targetId);
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          
          const grad = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
          grad.addColorStop(0, source.color);
          grad.addColorStop(1, target.color);
          
          ctx.strokeStyle = grad;
          ctx.globalAlpha = 0.6;
          ctx.shadowBlur = 15;
          ctx.shadowColor = source.color;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        }
      });

      // Draw Active Drag Thread
      if (activeDrag) {
        const source = spirits.find(s => s.id === activeDrag.sourceId);
        if (source) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(activeDrag.currentX, activeDrag.currentY);
          ctx.strokeStyle = source.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.8;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1.0;
        }
      }

      // Draw Spirits
      spirits.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw inner glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [spirits, threads, activeDrag]);

  // Interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Find closest spirit
    const clicked = spirits.find(s => {
      const dx = s.x - x;
      const dy = s.y - y;
      return Math.sqrt(dx * dx + dy * dy) < s.radius + 20;
    });

    if (clicked) {
      setActiveDrag({ sourceId: clicked.id, currentX: x, currentY: y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (activeDrag) {
      setActiveDrag({ ...activeDrag, currentX: e.clientX, currentY: e.clientY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeDrag) {
      const x = e.clientX;
      const y = e.clientY;
      
      const target = spirits.find(s => {
        const dx = s.x - x;
        const dy = s.y - y;
        return Math.sqrt(dx * dx + dy * dy) < s.radius + 30;
      });

      if (target && target.id !== activeDrag.sourceId) {
        // Connect!
        // Check if already connected
        const exists = threads.find(t => 
          (t.sourceId === activeDrag.sourceId && t.targetId === target.id) ||
          (t.sourceId === target.id && t.targetId === activeDrag.sourceId)
        );

        if (!exists) {
          const newThreads = [...threads, { sourceId: activeDrag.sourceId, targetId: target.id, strength: 1 }];
          setThreads(newThreads);
          onScoreChange(newThreads.length * 10);
          
          if (newThreads.length > 3 && !showSubmission) {
             setShowSubmission(true);
          }
        }
      }
      setActiveDrag(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 cursor-crosshair touch-none"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />

      {showSubmission && (
        <SubmissionPanel score={threads.length * 10} threads={threads.length} onClose={() => setShowSubmission(false)} />
      )}
    </motion.div>
  );
}

function SubmissionPanel({ score, threads, onClose }: { score: number, threads: number, onClose: () => void }) {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const [status, setStatus] = useState<string>('');

  const submitTapestry = async () => {
    try {
      if (!address) {
        setStatus('Connect weaver first!');
        setTimeout(() => setStatus(''), 3000);
        return;
      }
      setStatus('Signing weave on-chain...');
      
      const payload = generateERC8021Payload({
        attributionCode: '[ATTRIBUTION_CODE]',
        builderCode: 'bc_bvavv2co'
      });

      const messageContent = `Spirit Threads: Tapestry Submission\n\nHarmony Score: ${score}\nThreads Woven: ${threads}\n\nI attest this beautiful weaving on Base Mainnet. \n\nData: ${payload.data}`;

      await signMessageAsync({ account: address, message: messageContent });
      setStatus('Tapestry officially recorded via SIWE!');
      setTimeout(() => onClose(), 3000);
    } catch (e: any) {
      setStatus(`Ethereal connection failed: ${e.message}`);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md flex flex-col items-center gap-6 text-center z-50 min-w-[320px] pointer-events-auto shadow-[0_0_40px_rgba(40,15,60,0.6)]"
    >
      <div className="mb-2">
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#A294B5] mb-2">Beautiful Tapestry</div>
        <h3 className="font-serif text-2xl tracking-wide text-[#F3E5F5] italic">Harmony Secured</h3>
      </div>
      
      <p className="text-xs text-white/80 max-w-[260px] leading-relaxed">
        Your connections have stabilized the Ethereal Realm. Record your harmony on-chain.
      </p>
      
      <div className="flex flex-col gap-4 w-full">
         <button 
          onClick={submitTapestry}
          className="px-10 py-4 w-full bg-[#D4AF37] text-[#0A050F] rounded-full font-bold uppercase tracking-[0.15em] text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center pointer-events-auto"
        >
          <span className="mr-2">✨</span> Record Tapestry
        </button>
        <button 
          onClick={onClose}
          className="px-8 py-4 w-full bg-white/10 border border-white/20 text-white rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-white/20 transition-all pointer-events-auto"
        >
          Continue Weaving
        </button>
      </div>

      {status && (
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mt-2 animate-pulse">{status}</p>
      )}
    </motion.div>
  );
}
