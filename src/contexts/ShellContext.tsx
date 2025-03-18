import React, { createContext, useContext, ReactNode } from 'react';
import { shell } from '../utils/shell';

interface ShellContextType {
  doCommand: (command: string) => Promise<string>;
}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

export const ShellProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const doCommand = React.useCallback(
    async (command: string): Promise<string> => {
      console.log('Shell context executing command:', command);
      let output = '';
      
      try {
        // Create a promise wrapper around the shell function
        output = await new Promise((resolve) => {
          const setOutput = (result: string | { command: string; output: string }) => {
            if (typeof result === 'string') {
              resolve(result);
            } else {
              resolve(result.output);
            }
          };
          
          const clearHistory = () => {
            // Just a no-op for this wrapper
            resolve('');
          };
          
          const setCommand = () => {
            // Just a no-op for this wrapper
          };
          
          shell(command, setOutput, clearHistory, setCommand);
        });
      } catch (error) {
        console.error('Error in shell execution:', error);
        output = `Error: ${error.message || 'Unknown error'}`;
      }
      
      return output;
    },
    []
  );

  const value = { doCommand };

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
};

export const useShell = (): ShellContextType => {
  const context = useContext(ShellContext);
  if (context === undefined) {
    throw new Error('useShell must be used within a ShellProvider');
  }
  return context;
}; 