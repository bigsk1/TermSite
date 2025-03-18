import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  opacity?: number;
  transparentBg?: boolean;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ 
  opacity = 0.05,
  transparentBg = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
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
    const dropOpacity: number[] = []; // Track opacity for each column
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
      dropOpacity[i] = 1.0; // Full opacity initially
    }
    
    let intervalId: NodeJS.Timeout | null = null;
    let frameCount = 0; // Track frames for periodic full clear

    // Draw the matrix
    const draw = () => {
      frameCount++;
      
      if (transparentBg) {
        // In transparent mode, we need to fully clear the canvas but with a very slight fade
        // This creates a trail effect without a permanent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
        ctx.globalCompositeOperation = 'destination-out'; // This makes fills erase existing content
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over'; // Back to default blend mode
        
        // Ensure globalAlpha is reset
        ctx.globalAlpha = 1.0;
      } else {
        // Apply semi-transparent black for traditional Matrix effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Every 100 frames in transparent mode, do a full clear to remove any artifacts
      if (transparentBg && frameCount % 100 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Green text with less glow
      ctx.shadowColor = '#00FF00';
      ctx.shadowBlur = 2;
      ctx.fillStyle = '#00FF00';
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Only draw some columns to make it less dense
        if (Math.random() > 0.3) {
          // Random character
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          
          if (transparentBg) {
            // In transparent mode, gradually fade characters as they fall
            const yPos = drops[i] * 20;
            
            // Reduce the opacity for characters that are further down
            if (yPos > 0) {
              // Set opacity based on position - characters higher up are more visible
              const fadePoint = canvas.height * 0.7; // Start fading at 70% of screen height
              let charOpacity = 1.0;
              
              if (yPos > fadePoint) {
                // Calculate how far down the fade zone we are (0-1)
                const fadeProgress = Math.min(1, (yPos - fadePoint) / (canvas.height - fadePoint));
                // Reduce opacity based on position
                charOpacity = 1 - fadeProgress;
              }
              
              ctx.globalAlpha = charOpacity;
            }
          }
          
          // Draw the character
          ctx.fillText(char, i * 20, drops[i] * 20);
          
          // Reset opacity
          if (transparentBg) {
            ctx.globalAlpha = 1.0;
          }
          
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
    
    // Animation loop - always enabled, opacity controls visibility
    intervalId = setInterval(draw, 33);
    
    // Cleanup
    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [transparentBg]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity,
        transition: 'opacity 0.5s ease-in-out',
        backgroundColor: transparentBg ? 'transparent' : undefined
      }}
    />
  );
};

export default MatrixBackground; 