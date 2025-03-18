import React, { useEffect, useState } from 'react';
import config from '../../config.json';

type CursorProps = {
  blink?: boolean;
  style?: 'block' | 'line' | 'underscore';
  className?: string;
};

const cursorMap = {
  block: '█',
  line: '|',
  underscore: '_',
};

const Cursor: React.FC<CursorProps> = ({ 
  blink = true, 
  style = 'block',
  className = '',
}) => {
  const [visible, setVisible] = useState(true);

  // Blink cursor every 500ms unless overridden
  useEffect(() => {
    if (!blink) {
      setVisible(true);
      return;
    }

    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [blink]);

  const cursorChar = cursorMap[style] || cursorMap.block;

  return (
    <span 
      className={`${className} ${visible ? 'opacity-100' : 'opacity-0'} text-green-400 transition-opacity`}
      aria-hidden="true"
    >
      {cursorChar}
    </span>
  );
};

export default Cursor; 