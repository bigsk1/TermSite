// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + ' ';
    }
  }

  const newFeatures = `
<span class="text-green-400 font-bold">New Features:</span>
- <span class="text-blue-400">snake</span>: Play the classic Snake game
- <span class="text-blue-400">chat</span>: Talk with an AI assistant
- <span class="text-blue-400">matrix</span>: Toggle Matrix-style background

<span class="text-red-400 font-bold">Fun Commands:</span>
- <span class="text-yellow-400">forkbomb</span>: Simulate a classic fork bomb attack
- <span class="text-yellow-400">rm -rf /</span>: Simulate the infamous system deletion command

`;

  return `Welcome! Here are all the available commands:
\n${c}\n
${newFeatures}
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.
[alt+c]: change cursor style.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// Homepage
export const homepage = async (args: string[]): Promise<string> => {
  window.open(`${config.homepage_url}`);
  return 'Opening homepage...';
};

// Social
export const twitter = async (args: string[]): Promise<string> => {
  window.open(`https://twitter.com/${config.social.twitter}`);
  return 'Opening Twitter...';
};

export const github_docs = async (args: string[]): Promise<string> => {
  window.open(`${config.social.github_docs}`);
  return 'Opening Github docs...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my terminal website!
More about me:
'sumfetch' - short summary.
'projects' - my github repos.
'github_docs' - my github docs site / blog.`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `a
bunch
of
fake
directories`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

// Banner
export const banner = (args?: string[]): string => {
  const bannerText = `
'########::'####::'######::::'######::'##:::'##::::'##:::
 ##.... ##:. ##::'##... ##::'##... ##: ##::'##:::'####:::
 ##:::: ##:: ##:: ##:::..::: ##:::..:: ##:'##::::.. ##:::
 ########::: ##:: ##::'####:. ######:: #####::::::: ##:::
 ##.... ##:: ##:: ##::: ##:::..... ##: ##. ##:::::: ##:::
 ##:::: ##:: ##:: ##::: ##::'##::: ##: ##:. ##::::: ##:::
 ########::'####:. ######:::. ######:: ##::. ##::'######:
........:::....:::......:::::......:::..::::..:::......::
<div class="mt-2">
Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
</div>`;

  return bannerText;
};

// Snake game
export const snake = async (args: string[]): Promise<string> => {
  return `
  <div class="w-full my-4 p-4 bg-gray-800 rounded border-2 border-gray-600">
    <h3 class="text-lg font-bold text-green-400 mb-2">Snake Game</h3>
    <p class="text-gray-300">
      The Snake Game is currently under maintenance. Check back soon!
    </p>
    <div class="mt-4 text-xs text-gray-400">
      You can try other commands like 'help' to see available commands or 'matrix' to enable a cool visual effect.
    </div>
  </div>
  `;
};

// Matrix command
export const matrix = async (args: string[]): Promise<string> => {
  // Check for 'off' argument
  if (args.length > 0 && args[0].toLowerCase() === 'off') {
    // Dispatch event to turn off matrix
    window.dispatchEvent(new CustomEvent('toggleMatrix', { 
      detail: { opacity: 'off' } 
    }));
    return 'Matrix mode disabled!';
  }
  
  // Check for transparent argument (symbols only, no bg)
  const transparent = args.includes('transparent') || args.includes('nobg') || args.includes('symbols');
  
  // Check for opacity argument (between 0.0-1.0)
  let opacity = 0.05;
  for (const arg of args) {
    const parsedOpacity = parseFloat(arg);
    if (!isNaN(parsedOpacity) && parsedOpacity >= 0 && parsedOpacity <= 1) {
      opacity = parsedOpacity;
      break;
    }
  }
  
  // Dispatch event to toggle matrix with specified opacity
  window.dispatchEvent(new CustomEvent('toggleMatrix', { 
    detail: { opacity, transparent } 
  }));
  
  return `Matrix mode ${opacity === 0 ? 'disabled' : 'enabled'}!
${transparent ? 'Transparent background mode activated (symbols only).' : ''}

Usage:
  matrix [opacity] [transparent|nobg|symbols]
  matrix off (to disable)

Examples:
  matrix              - Enable with default opacity
  matrix 0.1          - Enable with custom opacity (0.0-1.0)
  matrix transparent  - Enable with transparent background (symbols only)
  matrix 0.2 nobg     - Symbols only with 0.2 opacity
  matrix off          - Disable matrix effect`;
};

// Dangerous command - fake system crash
export const forkbomb = async (args: string[]): Promise<string> => {
  // Show a warning first if no force flag is provided
  if (!args.includes('--force')) {
    return `⚠️ WARNING: This command simulates a system crash effect.
To proceed, run 'forkbomb --force'`;
  }

  // Create fake destructive content with delayed animation
  setTimeout(() => {
    try {
      // Get the entire terminal area
      const terminal = document.querySelector('main');
      if (!terminal) return;

      // Create overlay for the crash effect
      const crashOverlay = document.createElement('div');
      crashOverlay.style.position = 'fixed';
      crashOverlay.style.top = '0';
      crashOverlay.style.left = '0';
      crashOverlay.style.width = '100%';
      crashOverlay.style.height = '100%';
      crashOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
      crashOverlay.style.zIndex = '9999';
      crashOverlay.style.fontFamily = 'monospace';
      crashOverlay.style.color = '#FF0000';
      crashOverlay.style.padding = '20px';
      crashOverlay.style.boxSizing = 'border-box';
      crashOverlay.style.overflow = 'hidden';

      // Add error message content
      crashOverlay.innerHTML = `
<pre style="color: red; font-weight: bold; margin-bottom: 20px;">
                                                                                
 ██████╗██████╗ ██╗████████╗██╗ ██████╗ █████╗ ██╗         
██╔════╝██╔══██╗██║╚══██╔══╝██║██╔════╝██╔══██╗██║         
██║     ██████╔╝██║   ██║   ██║██║     ███████║██║         
██║     ██╔══██╗██║   ██║   ██║██║     ██╔══██║██║         
╚██████╗██║  ██║██║   ██║   ██║╚██████╗██║  ██║███████╗    
 ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝    
                                                            
███████╗██████╗ ██████╗  ██████╗ ██████╗                   
██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗                  
█████╗  ██████╔╝██████╔╝██║   ██║██████╔╝                  
██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗                  
███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║                  
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝                  
</pre>

<div style="color: white; margin-bottom: 10px;">KERNEL PANIC: Fatal system error detected</div>

<div style="color: #AAA; margin-bottom: 5px;">Process fork bomb detected (:(){ :|:& };:)</div>
<div style="color: #AAA; margin-bottom: 5px;">System resources depleted</div>
<div style="color: #AAA; margin-bottom: 5px;">Memory allocation failed at 0xf7e94200</div>

<div style="color: white; margin-top: 20px; margin-bottom: 10px;">SYSTEM HALTED</div>

<div style="color: #BBB; margin-top: 30px;">Press any key or wait 10 seconds to reboot system...</div>
      `;

      // Add to DOM
      document.body.appendChild(crashOverlay);

      // Add flickering effect
      let flickerCount = 0;
      const flickerInterval = setInterval(() => {
        if (flickerCount > 10) {
          clearInterval(flickerInterval);
          return;
        }

        crashOverlay.style.opacity = Math.random() > 0.5 ? '1' : '0.8';
        flickerCount++;
      }, 200);

      // Simulate reboot - remove overlay after delay
      setTimeout(() => {
        clearInterval(flickerInterval);
        document.body.removeChild(crashOverlay);

        // Scroll to bottom after "reboot"
        const container = document.querySelector('main');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 10000);

      // Allow key press to dismiss
      const handleKeyPress = () => {
        clearInterval(flickerInterval);
        if (document.body.contains(crashOverlay)) {
          document.body.removeChild(crashOverlay);
        }
        document.removeEventListener('keydown', handleKeyPress);
      };

      document.addEventListener('keydown', handleKeyPress);
    } catch (e) {
      // Silently fail
    }
  }, 1000);

  return `Executing dangerous command: :(){ :|:& };:
  
Initializing process...
  Fork process started...
    Creating child processes...
      Resource allocation increasing...
  
Warning: System resources depleting rapidly!
Critical error imminent...`;
};

// System delete command simulation
export const rm = async (args: string[]): Promise<string> => {
  // Check for dangerous rm -rf / command
  if (
    (args.includes('-rf') ||
      args.includes('-r') ||
      args.includes('-f') ||
      args.includes('-fr')) &&
    (args.includes('/') ||
      args.includes('*') ||
      args.includes('--no-preserve-root'))
  ) {
    // Create a function to simulate deleting files one by one
    const simulateDelete = () => {
      try {
        // Get terminal container
        const terminal = document.querySelector('main');
        if (!terminal) return;

        // List of fake system files/directories to "delete"
        const systemFiles = [
          '/etc/passwd',
          '/etc/shadow',
          '/etc/hosts',
          '/var/log',
          '/usr/bin',
          '/usr/local',
          '/bin/bash',
          '/boot/grub',
          '/etc/ssh',
          '/home/user',
          '/root',
          '/var/www',
          '/opt',
          '/dev/sda1',
          '/tmp',
          '/lib',
          '/lib64',
          '/mnt',
          '/proc',
          '/sys',
          '/run',
        ];

        // Create a container for the deletion messages
        const deleteContainer = document.createElement('div');
        deleteContainer.id = 'delete-simulation';
        deleteContainer.style.color = '#FF0000';
        deleteContainer.style.fontFamily = 'monospace';
        deleteContainer.style.whiteSpace = 'pre';
        deleteContainer.style.margin = '10px 0';
        terminal.appendChild(deleteContainer);

        // Add message at specific interval
        let index = 0;
        const deleteInterval = setInterval(() => {
          if (index >= systemFiles.length) {
            clearInterval(deleteInterval);

            // Add fatal error message
            deleteContainer.innerHTML += `
\nERROR: Critical system files deleted.
System integrity compromised.
Please reinstall the operating system.\n\n`;

            // Make terminal look broken with random characters
            setTimeout(() => {
              const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/';
              const terminalElements = document.querySelectorAll('main div');

              terminalElements.forEach((el) => {
                if (Math.random() > 0.7 && el !== deleteContainer) {
                  const originalText = el.innerHTML;
                  // Corrupt some characters
                  let corruptedText = '';
                  for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.85) {
                      corruptedText +=
                        glitchChars[
                          Math.floor(Math.random() * glitchChars.length)
                        ];
                    } else {
                      corruptedText += originalText[i];
                    }
                  }
                  el.innerHTML = corruptedText;

                  // Apply glitch styles - cast to HTMLElement to access style
                  const htmlEl = el as HTMLElement;
                  htmlEl.style.color =
                    Math.random() > 0.5 ? '#FF0000' : '#00FF00';
                  if (Math.random() > 0.8) {
                    htmlEl.style.transform = `rotate(${(
                      Math.random() * 2 -
                      1
                    ).toFixed(2)}deg)`;
                  }
                }
              });

              // Add reload option
              const reloadPrompt = document.createElement('div');
              reloadPrompt.innerHTML = `\n<span style="color: white; font-weight: bold;">System unresponsive. Reload page to restore.</span>`;
              deleteContainer.appendChild(reloadPrompt);
            }, 1000);

            return;
          }

          // Add deleted file message
          deleteContainer.innerHTML += `Removing: ${systemFiles[index++]}\n`;

          // Scroll to bottom
          terminal.scrollTop = terminal.scrollHeight;
        }, 100);
      } catch (e) {
        // Silently fail
      }
    };

    // Start the simulation after a short delay
    setTimeout(simulateDelete, 500);

    return `rm: WARNING: Attempting destructive operation: rm ${args.join(' ')}
This operation cannot be undone and may cause system damage.
Beginning deletion process...`;
  }

  // Normal usage response
  return `Usage: rm [options] [file]
Options:
  -r, -R, --recursive   Remove directories and their contents recursively
  -f, --force           Ignore nonexistent files and arguments, never prompt
  
Note: This is a simulated command that doesn't actually delete files.`;
};

// Theme command
export const theme = async (args: string[]): Promise<string> => {
  const availableThemes = [
    'default',    // Original theme
    'bw',         // Black and white
    'green',      // Matrix-like green on black
    'blue',       // Blue theme
    'retro',      // Amber/orange terminal
    'midnight'    // Dark blue with light text
  ];

  // If no arguments or help requested, show the available themes
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    return `Usage: theme [theme_name]

Available themes:
${availableThemes.map(theme => `- ${theme}`).join('\n')}

Examples:
  theme bw       # Switch to black and white theme
  theme green    # Switch to Matrix-like green theme
  theme default  # Reset to default theme`;
  }

  const requestedTheme = args[0].toLowerCase();
  
  if (!availableThemes.includes(requestedTheme)) {
    return `Theme "${requestedTheme}" not found. Available themes are: ${availableThemes.join(', ')}`;
  }

  // Dispatch event to change theme
  window.dispatchEvent(new CustomEvent('changeTheme', { 
    detail: { theme: requestedTheme } 
  }));

  return `Theme changed to "${requestedTheme}".
You can use 'theme default' to revert to the original theme.`;
};
