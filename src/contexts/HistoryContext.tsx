import React, { createContext, useContext, ReactNode } from 'react';
import { useHistory as useHistoryHook } from '../components/history/hook';
import { History } from '../components/history/interface';

interface HistoryContextType {
  history: Array<History>;
  command: string;
  lastCommandIndex: number;
  isReady: boolean;
  setHistory: (value: string | Partial<History>) => void;
  addHistory: (value: string | Partial<History>) => void;
  setCommand: (value: string) => void;
  setLastCommandIndex: (value: number) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const historyHook = useHistoryHook([]);
  const [isReady, setIsReady] = React.useState(false);

  // Set isReady after a short delay to ensure everything is initialized
  React.useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const value = {
    ...historyHook,
    isReady,
    addHistory: historyHook.setHistory, // Alias for clarity
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}; 