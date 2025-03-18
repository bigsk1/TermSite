import React from 'react';
import { commandExists } from '../utils/commandExists';
import { shell } from '../utils/shell';
import { handleTabCompletion } from '../utils/tabCompletion';
import { Ps1 } from './Ps1';
import Cursor from './Cursor';

interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  command: string;
  history: Array<{ command: string; output: string; id?: number; date?: Date }>;
  lastCommandIndex: number;
  setCommand: (command: string) => void;
  setHistory: (value: string | { command: string; output: string }) => void;
  setLastCommandIndex: (index: number) => void;
  clearHistory: () => void;
}

export const Input: React.FC<InputProps> = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const [focused, setFocused] = React.useState(true);
  const [cursorStyle, setCursorStyle] = React.useState<'block' | 'line' | 'underscore'>('block');
  const [inputWidth, setInputWidth] = React.useState(0);
  
  // Create a ref to measure the text width
  const measureRef = React.useRef<HTMLSpanElement>(null);
  
  // Update measurement only when input ref is ready or command has actually changed
  // but not on every render
  const updateMeasurement = React.useCallback(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth);
    }
  }, []);

  // Setup initial measurement
  React.useEffect(() => {
    // Initial measurement
    updateMeasurement();
    
    // Create a resize observer to update measurements when container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateMeasurement();
    });
    
    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [updateMeasurement]);

  // Update when command changes, but debounce it to prevent excessive updates
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateMeasurement();
    }, 10);
    
    return () => clearTimeout(timeoutId);
  }, [command, updateMeasurement]);

  // After executing a command, scroll to the bottom after a slight delay
  // but only do it once per command execution
  const scrollToBottom = React.useRef(false);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands = history
      .map(({ command }) => command)
      .filter((command: string) => command);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      setHistory('');
      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      
      // Only process non-empty commands
      if (command.trim()) {
        setLastCommandIndex(0);
        scrollToBottom.current = true; // Set flag to scroll once after command execution
        
        try {
          console.log('Processing command on Enter:', command);
          // Process the command and wait for completion - explicitly call with .then to ensure proper handling
          shell(command, setHistory, clearHistory, setCommand)
            .then(() => {
              console.log('Command processed successfully');
              // Force scroll after command processed
              if (containerRef.current) {
                setTimeout(() => {
                  if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                  }
                }, 50);
              }
            })
            .catch(error => {
              console.error('Error in shell execution:', error);
              setHistory({
                command,
                output: `Error processing command: ${error.message || 'Unknown error'}`
              });
            });
        } catch (error) {
          console.error('Error processing command:', error);
          // Handle error by adding error message to history
          setHistory({
            command,
            output: `Error processing command: ${error.message || 'Unknown error'}`
          });
        }
      } else {
        // For empty commands, just clear the input
        setCommand('');
      }
      
      // Always return false for Enter key to prevent any default behavior
      return false;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex + 1;
      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex - 1;
      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
    
    // Add keyboard shortcut for changing cursor style
    if (event.key === 'c' && event.altKey) {
      event.preventDefault();
      setCursorStyle(prev => 
        prev === 'block' ? 'line' : 
        prev === 'line' ? 'underscore' : 'block'
      );
    }
  };

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      // Only update if the value has actually changed to prevent loops
      if (value !== command) {
        setCommand(value);
      }
    },
    [command, setCommand]
  );

  return (
    <div className="flex flex-row space-x-2 items-center mt-2">
      <div className="flex-shrink-0">
        <Ps1 />
      </div>

      <div className="flex-grow relative">
        {/* Hidden span to measure text width */}
        <span 
          ref={measureRef} 
          className="absolute opacity-0 top-0 left-0 whitespace-pre"
          style={{ font: 'inherit' }}
        >
          {command}
        </span>
        
        <input
          ref={inputRef}
          id="prompt"
          type="text"
          className={`bg-transparent focus:outline-none w-full caret-transparent ${
            commandExists(command) ? 'text-green-300' : 'text-red-300'
          }`}
          value={command}
          onChange={onChange}
          autoFocus
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onSubmit}
          autoComplete="off"
          spellCheck="false"
          style={{ lineHeight: 'normal', paddingBottom: '2px' }}
        />
        
        {/* Position the cursor directly after the text */}
        {focused && (
          <span 
            style={{ 
              position: 'absolute', 
              left: `${inputWidth}px`, 
              top: '1px',
              pointerEvents: 'none'
            }}
          >
            <Cursor blink={true} style={cursorStyle} />
          </span>
        )}
      </div>
    </div>
  );
};
