import React from 'react';
import CodeHighlighter from '../components/SyntaxHighlighter';

// Regex to detect code blocks with language specification
const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

/**
 * Parses text and replaces code blocks with syntax highlighted components
 */
export const parseAndHighlightCode = (text: string): React.ReactNode[] => {
  if (!text.includes('```')) {
    return [text];
  }

  const segments: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  
  // Reset regex index
  codeBlockRegex.lastIndex = 0;
  
  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text before the code block
    if (match.index > lastIndex) {
      segments.push(text.substring(lastIndex, match.index));
    }
    
    // Extract language and code
    const language = match[1] || 'javascript'; // Default to javascript
    const code = match[2].trim();
    
    // Add the highlighted code block
    segments.push(
      <CodeHighlighter key={match.index} language={language}>
        {code}
      </CodeHighlighter>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    segments.push(text.substring(lastIndex));
  }
  
  return segments;
};

export default parseAndHighlightCode; 