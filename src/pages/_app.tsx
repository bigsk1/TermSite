import React, { useEffect, useRef, useState } from 'react';
import '../styles/global.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import the MatrixBackground component
const MatrixBackground = dynamic(() => import('../components/MatrixBackground'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  const [matrixOpacity, setMatrixOpacity] = useState(0.05);

  // Handle clicks anywhere to focus on input
  useEffect(() => {
    document.addEventListener('click', () => {
      inputRef.current?.focus();
    });
  }, []);

  // Handle matrix background toggle
  useEffect(() => {
    const handleToggleMatrix = (event: CustomEvent) => {
      const { opacity } = event.detail;
      
      // Check if matrix should be turned off
      if (event.detail && typeof event.detail.opacity === 'string' && 
          event.detail.opacity.toLowerCase() === 'off') {
        setMatrixEnabled(false);
        return;
      }
      
      // Set opacity if provided
      if (opacity && typeof opacity === 'number') {
        setMatrixOpacity(opacity);
        setMatrixEnabled(true);
      } else {
        // Toggle if no specific instruction
        setMatrixEnabled(prev => !prev);
      }
    };
    
    window.addEventListener('toggleMatrix', handleToggleMatrix as EventListener);
    
    return () => {
      window.removeEventListener('toggleMatrix', handleToggleMatrix as EventListener);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="text-white h-full">
        {matrixEnabled && (
          <MatrixBackground opacity={matrixOpacity} />
        )}
        <Component {...pageProps} inputRef={inputRef} />
      </main>
      
      <Analytics />
    </>
  );
};

export default App;
