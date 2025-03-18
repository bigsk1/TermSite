import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay = 30,
  onComplete,
  className = '',
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Use a ref to track the timeout and clean it up properly
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track whether the component is still mounted
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Set isMounted to true when the component mounts
    isMountedRef.current = true;
    
    // Cleanup function
    return () => {
      // Set isMounted to false when the component unmounts
      isMountedRef.current = false;
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Don't proceed if the component is unmounted
    if (!isMountedRef.current) return;
    
    if (currentIndex < text.length) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set up new timeout
      timeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setCurrentText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }
      }, 
      // Vary the typing speed slightly for a more natural feel
      delay * (0.5 + Math.random()));
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete && isMountedRef.current) {
        onComplete();
      }
    }
  }, [currentIndex, delay, text, isComplete, onComplete]);

  // Reset when text changes, with guard against unnecessary updates
  useEffect(() => {
    // Clear any pending timeout before resetting
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (isMountedRef.current) {
      setCurrentText('');
      setCurrentIndex(0);
      setIsComplete(false);
    }
  }, [text]);

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: currentText }}
    />
  );
};

export default Typewriter; 