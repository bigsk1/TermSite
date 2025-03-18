import React from 'react';
import * as bin from './bin';

export const shell = async (
  command: string,
  setHistory: (value: string | { command: string; output: string }) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  console.log('Shell executing command:', command);
  
  // Skip empty commands to prevent unnecessary updates
  if (command.trim() === '') {
    console.log('Empty command, skipping');
    return;
  }

  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  console.log('Command args:', args);

  if (args[0] === 'clear') {
    console.log('Clearing history');
    clearHistory();
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    console.log('Command not found:', args[0]);
    // Pass both command and output as an object, not just a string
    setHistory({
      command,
      output: `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    });
  } else {
    console.log('Executing bin command:', args[0]);
    try {
      const output = await bin[args[0]](args.slice(1));
      console.log('Command output:', output);
      
      // Check if output is defined
      if (output === undefined) {
        console.log('Warning: Command returned undefined output');
        setHistory({
          command,
          output: `Command '${args[0]}' executed successfully.`,
        });
      } else {
        // Pass both command and output as an object, not just a string
        setHistory({
          command,
          output: output || '',
        });
      }
    } catch (error) {
      console.error('Error executing command:', error);
      setHistory({
        command,
        output: `Error executing command: ${error.message || 'Unknown error'}`,
      });
    }
  }

  // Clear command input after processing
  console.log('Clearing command input');
  setCommand('');
};
