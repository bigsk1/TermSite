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
  // Instead of loading a component, create the game directly in the command output
  return `
<div class="snake-game-container w-full mt-4 mb-4 min-h-[340px]">
  <div class="game-info flex justify-between w-full mb-2 font-mono text-sm">
    <div>Score: <span id="snake-score">0</span></div>
    <div id="snake-status">READY - Press SPACE to start</div>
  </div>
  <div id="snake-board" class="border border-gray-500" 
       style="width: 300px; height: 300px; position: relative; background-color: #121212;">
  </div>
  <div class="controls mt-4 text-xs text-center">
    <p>Controls: Arrow Keys to move, Space to pause/resume</p>
    <button id="snake-restart" class="mt-2 px-3 py-1 bg-green-800 text-white rounded-md">
      Play Again
    </button>
  </div>
</div>

<script>
  (function() {
    // Constants
    const GRID_SIZE = 15;
    const CELL_SIZE = 20;
    const GAME_SPEED = 150;
    
    // Get elements
    const board = document.querySelector('#snake-board');
    const scoreElement = document.querySelector('#snake-score');
    const statusElement = document.querySelector('#snake-status');
    const restartButton = document.querySelector('#snake-restart');
    
    if (!board || !scoreElement || !statusElement || !restartButton) {
      console.error('Snake game elements not found');
      return;
    }
    
    // Hide restart button initially
    restartButton.style.display = 'none';
    
    // Game state
    let snake = [{ x: 7, y: 7 }];
    let food = { x: 5, y: 5 };
    let direction = 'RIGHT';
    let nextDirection = 'RIGHT';
    let gameRunning = false;
    let gamePaused = false;
    let score = 0;
    let gameInterval = null;
    
    // Create game board
    function initBoard() {
      // Clear the board
      board.innerHTML = '';
      
      // Set up the board as a grid
      board.style.display = 'grid';
      board.style.gridTemplateColumns = \`repeat(\${GRID_SIZE}, \${CELL_SIZE}px)\`;
      board.style.gridTemplateRows = \`repeat(\${GRID_SIZE}, \${CELL_SIZE}px)\`;
      board.style.width = \`\${GRID_SIZE * CELL_SIZE}px\`;
      board.style.height = \`\${GRID_SIZE * CELL_SIZE}px\`;
      
      // Create cells for the grid
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const cell = document.createElement('div');
          cell.id = \`cell-\${x}-\${y}\`;
          cell.style.width = \`\${CELL_SIZE}px\`;
          cell.style.height = \`\${CELL_SIZE}px\`;
          board.appendChild(cell);
        }
      }
    }
    
    // Set up keydown event listener
    function setupControls() {
      function handleKeyPress(e) {
        if (!gameRunning && !gamePaused) {
          if (e.key === ' ' || e.key === 'Enter') startGame();
          return;
        }
        
        switch (e.key) {
          case 'ArrowUp':
            if (direction !== 'DOWN') nextDirection = 'UP';
            break;
          case 'ArrowDown':
            if (direction !== 'UP') nextDirection = 'DOWN';
            break;
          case 'ArrowLeft':
            if (direction !== 'RIGHT') nextDirection = 'LEFT';
            break;
          case 'ArrowRight':
            if (direction !== 'LEFT') nextDirection = 'RIGHT';
            break;
          case ' ':
            togglePause();
            break;
        }
      }
      
      document.addEventListener('keydown', handleKeyPress);
      
      // Add restart button event listener
      restartButton.addEventListener('click', startGame);
    }
    
    // Place food at random position
    function placeFood() {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      
      // Make sure food isn't on the snake
      const isOnSnake = snake.some(segment => 
        segment.x === newFood.x && segment.y === newFood.y
      );
      
      if (isOnSnake) {
        placeFood();
      } else {
        food = newFood;
      }
    }
    
    // Start the game
    function startGame() {
      snake = [{ x: 7, y: 7 }];
      placeFood();
      direction = 'RIGHT';
      nextDirection = 'RIGHT';
      gameRunning = true;
      gamePaused = false;
      score = 0;
      scoreElement.textContent = '0';
      statusElement.textContent = 'PLAYING';
      restartButton.style.display = 'none';
      
      if (gameInterval) clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, GAME_SPEED);
    }
    
    // Toggle pause
    function togglePause() {
      if (!gameRunning) return;
      
      gamePaused = !gamePaused;
      statusElement.textContent = gamePaused ? 'PAUSED' : 'PLAYING';
    }
    
    // Game over
    function gameOver() {
      gameRunning = false;
      if (gameInterval) clearInterval(gameInterval);
      statusElement.textContent = 'GAME OVER';
      restartButton.style.display = 'inline-block';
    }
    
    // Update game board visuals
    function updateBoard() {
      // Clear all cells first
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const cell = document.getElementById(\`cell-\${x}-\${y}\`);
          if (cell) {
            cell.style.backgroundColor = '#121212';
            cell.style.borderRadius = '0';
          }
        }
      }
      
      // Draw snake
      snake.forEach((segment, index) => {
        const cell = document.getElementById(\`cell-\${segment.x}-\${segment.y}\`);
        if (cell) {
          cell.style.backgroundColor = index === 0 ? '#00ff00' : '#00cc00';
          if (index === 0) {
            // Head has border
            cell.style.border = '1px solid #005500';
          }
        }
      });
      
      // Draw food
      const foodCell = document.getElementById(\`cell-\${food.x}-\${food.y}\`);
      if (foodCell) {
        foodCell.style.backgroundColor = '#ff0000';
        foodCell.style.borderRadius = '50%';
      }
    }
    
    // Game loop
    function gameLoop() {
      if (!gameRunning || gamePaused) return;
      
      // Update direction
      direction = nextDirection;
      
      // Move snake
      const head = { ...snake[0] };
      
      switch (direction) {
        case 'UP':
          head.y--;
          break;
        case 'DOWN':
          head.y++;
          break;
        case 'LEFT':
          head.x--;
          break;
        case 'RIGHT':
          head.x++;
          break;
      }
      
      // Check for wall collision
      if (
        head.x < 0 || 
        head.x >= GRID_SIZE || 
        head.y < 0 || 
        head.y >= GRID_SIZE
      ) {
        gameOver();
        return;
      }
      
      // Check for self collision
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
      }
      
      // Add new head
      snake.unshift(head);
      
      // Check for food collision
      if (head.x === food.x && head.y === food.y) {
        // Increase score
        score++;
        scoreElement.textContent = score.toString();
        
        // Place new food
        placeFood();
      } else {
        // Remove tail if no food eaten
        snake.pop();
      }
      
      // Update the visual board
      updateBoard();
    }
    
    // Initialize the game
    initBoard();
    setupControls();
    updateBoard();
  })();
</script>
  `;
};

// Matrix background effect
export const matrix = async (args: string[]): Promise<string> => {
  let detail: { opacity: number | string } = { opacity: 0.15 }; // Default opacity
  
  // Handle "off" parameter
  if (args[0]?.toLowerCase() === 'off') {
    detail = { opacity: 'off' };
  } 
  // Handle custom opacity
  else if (args[0] && !isNaN(parseFloat(args[0]))) {
    detail = { opacity: parseFloat(args[0]) };
  }
  
  const toggleEvent = new CustomEvent('toggleMatrix', { detail });
  window.dispatchEvent(toggleEvent);
  
  return `Matrix mode ${args[0]?.toLowerCase() === 'off' ? 'disabled' : 'enabled'}!
  
Usage: 
  matrix [opacity]
  matrix off (to disable)

Examples:
  matrix      - Enable with default opacity
  matrix 0.1  - Enable with custom opacity (0.0-1.0)
  matrix off  - Disable matrix effect
  `;
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
    (args.includes('-rf') || args.includes('-r') || args.includes('-f') || args.includes('-fr')) && 
    (args.includes('/') || args.includes('*') || args.includes('--no-preserve-root'))
  ) {
    // Create a function to simulate deleting files one by one
    const simulateDelete = () => {
      try {
        // Get terminal container
        const terminal = document.querySelector('main');
        if (!terminal) return;
        
        // List of fake system files/directories to "delete"
        const systemFiles = [
          '/etc/passwd', '/etc/shadow', '/etc/hosts', 
          '/var/log', '/usr/bin', '/usr/local', 
          '/bin/bash', '/boot/grub', '/etc/ssh',
          '/home/user', '/root', '/var/www',
          '/opt', '/dev/sda1', '/tmp',
          '/lib', '/lib64', '/mnt',
          '/proc', '/sys', '/run'
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
              
              terminalElements.forEach(el => {
                if (Math.random() > 0.7 && el !== deleteContainer) {
                  const originalText = el.innerHTML;
                  // Corrupt some characters
                  let corruptedText = '';
                  for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.85) {
                      corruptedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                      corruptedText += originalText[i];
                    }
                  }
                  el.innerHTML = corruptedText;
                  
                  // Apply glitch styles - cast to HTMLElement to access style
                  const htmlEl = el as HTMLElement;
                  htmlEl.style.color = Math.random() > 0.5 ? '#FF0000' : '#00FF00';
                  if (Math.random() > 0.8) {
                    htmlEl.style.transform = `rotate(${(Math.random() * 2 - 1).toFixed(2)}deg)`;
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
