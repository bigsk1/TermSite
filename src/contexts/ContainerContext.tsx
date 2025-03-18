import React, { createContext, useContext, ReactNode, useRef } from 'react';

interface ContainerContextType {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollToBottom: () => void;
}

const ContainerContext = createContext<ContainerContextType | undefined>(undefined);

export const ContainerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = React.useCallback(() => {
    if (containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          console.log('Scrolled to bottom');
        }
      }, 50);
    }
  }, []);

  const value = { containerRef, scrollToBottom };

  return <ContainerContext.Provider value={value}>{children}</ContainerContext.Provider>;
};

export const useContainer = (): ContainerContextType => {
  const context = useContext(ContainerContext);
  if (context === undefined) {
    throw new Error('useContainer must be used within a ContainerProvider');
  }
  return context;
}; 