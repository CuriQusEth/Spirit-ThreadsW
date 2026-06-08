import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: string;
  type: string;
}

interface Thread {
  from: string;
  to: string;
  type: string;
}

export function ThreadCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [draggingPoint, setDraggingPoint] = useState<Point | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate initial spirits
    const width = window.innerWidth;
    const height = window.innerHeight;
    const initialPoints = Array.from({ length: 6 }).map((_, i) => ({
      x: width / 2 + (Math.random() - 0.5) * 200,
      y: height / 4 + (Math.random() - 0.5) * 200,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      id: Math.random().toString(36).substring(7),
      type: ['Joy', 'Sorrow', 'Hope', 'Calm'][Math.floor(Math.random() * 4)]
    }));
    setPoints(initialPoints);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      setPoints(currentPoints => {
        const newPoints = [...currentPoints];
        
        // Render threads
        threads.forEach(t => {
          const fromPoint = newPoints.find(p => p.id === t.from);
          const toPoint = newPoints.find(p => p.id === t.to);
          
          if (fromPoint && toPoint) {
            ctx.beginPath();
            ctx.moveTo(fromPoint.x, fromPoint.y);
            // Draw a curved line
            const cx = (fromPoint.x + toPoint.x) / 2 + (Math.random() - 0.5) * 10;
            const cy = (fromPoint.y + toPoint.y) / 2 + (Math.random() - 0.5) * 10;
            ctx.quadraticCurveTo(cx, cy, toPoint.x, toPoint.y);
            
            ctx.strokeStyle = t.type === 'Joy' ? 'rgba(255, 230, 100, 0.4)' :
                              t.type === 'Sorrow' ? 'rgba(100, 150, 255, 0.4)' :
                              t.type === 'Hope' ? 'rgba(100, 255, 150, 0.4)' :
                              'rgba(200, 100, 255, 0.4)';
            ctx.lineWidth = 2;
            
            // Add glow
            ctx.shadowColor = ctx.strokeStyle;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });

        // If dragging, draw temporary thread
        if (draggingPoint) {
          ctx.beginPath();
          ctx.moveTo(draggingPoint.x, draggingPoint.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw points
        newPoints.forEach(p => {
          // Subtle drifting
          if (!draggingPoint || draggingPoint.id !== p.id) {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
          
          ctx.fillStyle = p.type === 'Joy' ? 'rgba(255, 230, 100, 0.8)' :
                          p.type === 'Sorrow' ? 'rgba(100, 150, 255, 0.8)' :
                          p.type === 'Hope' ? 'rgba(100, 255, 150, 0.8)' :
                          'rgba(200, 100, 255, 0.8)';
                          
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        
        return newPoints;
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [threads, draggingPoint, mousePos]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Find closest point
    const closest = points.find(p => {
      const dist = Math.hypot(p.x - x, p.y - y);
      return dist < 30; // Hitbox
    });
    
    if (closest) {
      setDraggingPoint(closest);
      setMousePos({ x, y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingPoint) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingPoint) {
      const x = e.clientX;
      const y = e.clientY;
      
      const target = points.find(p => {
        if (p.id === draggingPoint.id) return false;
        const dist = Math.hypot(p.x - x, p.y - y);
        return dist < 30;
      });
      
      if (target) {
        // Create thread
        setThreads(t => [...t, {
          from: draggingPoint.id,
          to: target.id,
          type: draggingPoint.type
        }]);
      }
      
      setDraggingPoint(null);
    }
  };

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0 touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ background: 'linear-gradient(to bottom, #0a0b1e, #1a153a)' }}
    />
  );
}
