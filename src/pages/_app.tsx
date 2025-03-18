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

// Define theme types and custom theme styles
type ThemeType = 'default' | 'bw' | 'green' | 'blue' | 'retro' | 'midnight';

const customThemes = {
  bw: {
    background: '#000000',
    foreground: '#FFFFFF',
    accent: '#AAAAAA',
    styles: `
      body { background-color: #000000 !important; color: #FFFFFF !important; }
      .bg-\\[\\#2E3440\\] { background-color: #000000 !important; }
      .text-\\[\\#E5E9F0\\] { color: #FFFFFF !important; }
      .text-light-yellow, .text-light-green, .text-light-blue, .text-light-red { color: #FFFFFF !important; }
      .dark\\:text-dark-yellow, .dark\\:text-dark-green, .dark\\:text-dark-blue, .dark\\:text-dark-red { color: #FFFFFF !important; }
      .text-light-gray, .dark\\:text-dark-gray { color: #AAAAAA !important; }
      .border-light-yellow, .dark\\:border-dark-yellow { border-color: #AAAAAA !important; }
      a, .text-blue-400, .text-green-400 { color: #FFFFFF !important; text-decoration: underline; }
      pre, code { background-color: #222222 !important; }
    `
  },
  green: {
    background: '#000000',
    foreground: '#00FF00', 
    accent: '#00AA00',
    styles: `
      body { background-color: #000000 !important; color: #00FF00 !important; }
      .bg-\\[\\#2E3440\\] { background-color: #000000 !important; }
      .text-\\[\\#E5E9F0\\] { color: #00FF00 !important; }
      .text-light-yellow, .text-light-green, .text-light-blue, .text-light-red { color: #00FF00 !important; }
      .dark\\:text-dark-yellow, .dark\\:text-dark-green, .dark\\:text-dark-blue, .dark\\:text-dark-red { color: #00FF00 !important; }
      .text-light-gray, .dark\\:text-dark-gray { color: #00AA00 !important; }
      .border-light-yellow, .dark\\:border-dark-yellow { border-color: #00AA00 !important; }
      a, .text-blue-400, .text-green-400 { color: #00FF00 !important; }
      pre, code { background-color: #001100 !important; border: 1px solid #00AA00; }
    `
  },
  blue: {
    background: '#000033',
    foreground: '#00AAFF',
    accent: '#0066CC',
    styles: `
      body { background-color: #000033 !important; color: #00AAFF !important; }
      .bg-\\[\\#2E3440\\] { background-color: #000033 !important; }
      .text-\\[\\#E5E9F0\\] { color: #00AAFF !important; }
      .text-light-yellow, .text-light-green, .text-light-blue, .text-light-red { color: #00AAFF !important; }
      .dark\\:text-dark-yellow, .dark\\:text-dark-green, .dark\\:text-dark-blue, .dark\\:text-dark-red { color: #00AAFF !important; }
      .text-light-gray, .dark\\:text-dark-gray { color: #0066CC !important; }
      .border-light-yellow, .dark\\:border-dark-yellow { border-color: #0066CC !important; }
    `
  },
  retro: {
    background: '#000000',
    foreground: '#FF8700',
    accent: '#AA5500',
    styles: `
      body { background-color: #000000 !important; color: #FF8700 !important; }
      .bg-\\[\\#2E3440\\] { background-color: #000000 !important; }
      .text-\\[\\#E5E9F0\\] { color: #FF8700 !important; }
      .text-light-yellow, .text-light-green, .text-light-blue, .text-light-red { color: #FF8700 !important; }
      .dark\\:text-dark-yellow, .dark\\:text-dark-green, .dark\\:text-dark-blue, .dark\\:text-dark-red { color: #FF8700 !important; }
      .text-light-gray, .dark\\:text-dark-gray { color: #AA5500 !important; }
      .border-light-yellow, .dark\\:border-dark-yellow { border-color: #AA5500 !important; }
    `
  },
  midnight: {
    background: '#000022',
    foreground: '#8888FF',
    accent: '#5555BB',
    styles: `
      body { background-color: #000022 !important; color: #8888FF !important; }
      .bg-\\[\\#2E3440\\] { background-color: #000022 !important; }
      .text-\\[\\#E5E9F0\\] { color: #8888FF !important; }
      .text-light-yellow, .text-light-green, .text-light-blue, .text-light-red { color: #8888FF !important; }
      .dark\\:text-dark-yellow, .dark\\:text-dark-green, .dark\\:text-dark-blue, .dark\\:text-dark-red { color: #8888FF !important; }
      .text-light-gray, .dark\\:text-dark-gray { color: #5555BB !important; }
      .border-light-yellow, .dark\\:border-dark-yellow { border-color: #5555BB !important; }
    `
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  const [matrixOpacity, setMatrixOpacity] = useState(0.05);
  const [matrixTransparent, setMatrixTransparent] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');
  const [themeStyleTag, setThemeStyleTag] = useState<HTMLStyleElement | null>(null);

  // Handle clicks anywhere to focus on input
  useEffect(() => {
    document.addEventListener('click', () => {
      inputRef.current?.focus();
    });
  }, []);

  // Handle matrix background toggle
  useEffect(() => {
    const handleToggleMatrix = (event: CustomEvent) => {
      const { opacity, transparent } = event.detail;
      
      // Check if matrix should be turned off
      if (event.detail && typeof event.detail.opacity === 'string' && 
          event.detail.opacity.toLowerCase() === 'off') {
        setMatrixEnabled(false);
        return;
      }
      
      // Set transparency if provided
      if (transparent !== undefined) {
        setMatrixTransparent(transparent);
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

  // Handle theme changes
  useEffect(() => {
    // Create a style tag for custom themes if it doesn't exist
    if (!themeStyleTag) {
      const styleTag = document.createElement('style');
      styleTag.id = 'custom-theme-styles';
      document.head.appendChild(styleTag);
      setThemeStyleTag(styleTag);
    }

    // Event listener for theme changes
    const handleThemeChange = (event: CustomEvent) => {
      const { theme } = event.detail;
      
      if (theme && typeof theme === 'string') {
        const newTheme = theme.toLowerCase() as ThemeType;
        
        // Apply the theme
        setCurrentTheme(newTheme);
        
        // If default, clear custom styles
        if (newTheme === 'default') {
          if (themeStyleTag) {
            themeStyleTag.textContent = '';
          }
          document.documentElement.classList.remove('custom-theme');
          return;
        }
        
        // Apply custom theme styles
        if (customThemes[newTheme] && themeStyleTag) {
          themeStyleTag.textContent = customThemes[newTheme].styles;
          document.documentElement.classList.add('custom-theme');
        }
      }
    };
    
    window.addEventListener('changeTheme', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('changeTheme', handleThemeChange as EventListener);
    };
  }, [themeStyleTag]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className={`text-white h-full ${currentTheme !== 'default' ? 'custom-theme' : ''}`}>
        {matrixEnabled && (
          <MatrixBackground 
            opacity={matrixOpacity} 
            transparentBg={matrixTransparent} 
          />
        )}
        <Component {...pageProps} inputRef={inputRef} />
      </main>
      
      <Analytics />
    </>
  );
};

export default App;
