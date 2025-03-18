import React, { useState } from 'react';

interface TestInputProps {
  onCommand: (command: string) => void;
}

const TestInput: React.FC<TestInputProps> = ({ onCommand }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting command:', input);
    
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row mt-4">
      <span className="mr-2 text-green-500">test$</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow bg-transparent outline-none border-none text-white"
        autoFocus
      />
      <button type="submit" className="hidden">Submit</button>
    </form>
  );
};

export default TestInput; 