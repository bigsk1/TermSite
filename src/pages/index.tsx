import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const containerRef = React.useRef(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  // Use a ref to track if initialization has already happened
  const initDoneRef = React.useRef(false);

  const init = React.useCallback(() => {
    // Only initialize once
    if (initDoneRef.current) return;
    
    const bannerOutput = banner();
    if (typeof bannerOutput === 'string') {
      setHistory({
        command: '',
        output: bannerOutput
      });
    } else {
      console.error('Banner function returned non-string value:', bannerOutput);
      setHistory({
        command: '',
        output: 'Welcome to Terminal. Type "help" to see available commands.'
      });
    }
    
    // Mark initialization as done
    initDoneRef.current = true;
  }, [setHistory]);

  // Only run init once, with no dependencies to prevent re-runs
  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to only run once

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history]);

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow bg-[#2E3440] text-[#E5E9F0]">
        <div ref={containerRef} className="overflow-y-auto h-full">
          <History history={history} />

          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
