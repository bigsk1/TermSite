import React from 'react';
import { History } from './interface';

export const useHistory = (defaultValue: Array<History>) => {
  const [history, setHistoryState] = React.useState<Array<History>>(defaultValue);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);
  
  // Use a ref to track if we're already processing a history update
  // to prevent potential update loops
  const processingUpdate = React.useRef(false);
  
  // Track if we've already added the initial banner
  const initializedRef = React.useRef(false);
  
  // Store history length in a ref to avoid dependency issues
  const historyLengthRef = React.useRef(0);
  React.useEffect(() => {
    historyLengthRef.current = history.length;
  }, [history]);

  const addHistory = React.useCallback(
    (value: string | Partial<History>) => {
      console.log('addHistory called with:', value);
      
      // Prevent processing if already updating
      if (processingUpdate.current) {
        console.log('Skipping update - already processing');
        return;
      }
      
      processingUpdate.current = true;
      
      // Create a new history entry based on the value type
      let newEntry: History;
      
      if (typeof value === 'string') {
        console.log('Adding string value to history');
        newEntry = {
          id: history.length,
          date: new Date(),
          command,
          output: value
        };
      } else {
        console.log('Adding object value to history');
        newEntry = {
          id: history.length,
          date: new Date(),
          command: value.command || command,
          output: value.output || ''
        };
      }
      
      // Use a direct state update to avoid stale state issues
      setHistoryState(currentHistory => {
        const newHistory = [...currentHistory, newEntry];
        console.log('New history state:', newHistory);
        return newHistory;
      });
      
      // Reset processing flag after a short delay
      setTimeout(() => {
        processingUpdate.current = false;
        console.log('Processing flag reset');
      }, 10);
    },
    [command, history.length]
  );

  return {
    history,
    command,
    lastCommandIndex,
    setHistory: addHistory,
    setCommand,
    setLastCommandIndex,
    clearHistory: () => {
      if (!processingUpdate.current) {
        processingUpdate.current = true;
        initializedRef.current = false; // Reset initialization flag
        setHistoryState([]);
        setTimeout(() => {
          processingUpdate.current = false;
        }, 0);
      }
    },
  };
};
