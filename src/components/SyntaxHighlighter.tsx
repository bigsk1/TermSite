import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeHighlighterProps {
  language: string;
  children: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ 
  language, 
  children 
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={nord}
      customStyle={{
        padding: '1em',
        borderRadius: '5px',
        margin: '1em 0',
        fontSize: '0.9em',
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter; 