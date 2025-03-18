import React, { useState, useRef, useEffect } from 'react';
import { History as HistoryInterface } from './interface';
import { Ps1 } from '../Ps1';
import Typewriter from '../Typewriter';

export const History: React.FC<{ history: Array<HistoryInterface> }> = ({
  history,
}) => {
  // State to track which outputs have been fully typed
  const [completedOutputs, setCompletedOutputs] = useState<{[key: string]: boolean}>({});
  
  // Ref to store the previous history length to avoid unnecessary processing
  const prevHistoryLengthRef = useRef(0);
  
  // Log history changes for debugging
  useEffect(() => {
    if (history.length !== prevHistoryLengthRef.current) {
      console.log('History changed:', history);
      prevHistoryLengthRef.current = history.length;
    }
  }, [history]);
  
  const handleOutputComplete = (index: number) => {
    setCompletedOutputs(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  // Immediately complete history rendering - this fixes the issue
  useEffect(() => {
    // Mark all history items as completed
    const newCompleted = {};
    history.forEach((_, index) => {
      newCompleted[index] = true;
    });
    setCompletedOutputs(newCompleted);
  }, [history.length]);
  
  if (history.length === 0) {
    return null;
  }
  
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => (
        <div key={`${entry.id}-${index}`} className="mb-2">
          {/* Only show the prompt and command if there is a command */}
          {entry.command && (
            <div className="flex flex-row space-x-2 items-center mt-2">
              <div className="flex-shrink-0">
                <Ps1 />
              </div>
              <div className="flex-grow">{entry.command}</div>
            </div>
          )}

          {/* Add some top margin for the output and make sure it aligns properly */}
          <div className={`${entry.command ? 'mt-1 ml-2' : ''}`}>
            {/* Only use Typewriter for the most recent entry and only if not already completed and has content */}
            {index === history.length - 1 && 
             !completedOutputs[index] && 
             entry.output.trim() !== '' ? (
              <Typewriter 
                text={entry.output} 
                delay={5} // Faster typing
                className="whitespace-pre-wrap"
                onComplete={() => handleOutputComplete(index)}
              />
            ) : (
              <div
                className="whitespace-pre-wrap"
                style={{ lineHeight: 'normal' }}
                dangerouslySetInnerHTML={{ __html: entry.output }}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default History;
