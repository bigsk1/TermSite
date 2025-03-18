import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  enabled: boolean;
  opacity?: number;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ 
  enabled = true,
  opacity = 0.15
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Clear canvas initially
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Matrix character set
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const charArray = chars.split('');
    
    // Set font
    ctx.font = '14px monospace';
    
    // Create drops
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    let intervalId: NodeJS.Timeout | null = null;
    
    // Draw the matrix
    const draw = () => {
      if (!enabled) {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        // Clear canvas when disabled
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      
      // Semi-transparent background to create trail effect
      // Using a more transparent background to let content show through
      ctx.fillStyle = `rgba(0, 0, 0, 0.03)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Green text with less glow to not overpower content
      ctx.shadowColor = '#00FF00';
      ctx.shadowBlur = 2;
      ctx.fillStyle = '#00FF00';
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Only draw some columns to make it less dense
        if (Math.random() > 0.3) {
          // Random character
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          
          // Draw the character
          ctx.fillText(char, i * 20, drops[i] * 20);
          
          // Highlight some characters to create a more dynamic effect
          if (Math.random() > 0.98) {
            ctx.fillStyle = '#FFFFFF'; // Occasionally make characters white
            ctx.fillText(char, i * 20, drops[i] * 20);
            ctx.fillStyle = '#00FF00'; // Reset to green
          }
        }
        
        // Move drops
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };
    
    // Animation loop
    if (enabled) {
      intervalId = setInterval(draw, 33);
    } else {
      // Clear canvas when disabled
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Cleanup
    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [enabled, opacity]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity: enabled ? opacity : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
};

export default MatrixBackground; 