import React, { useEffect, useState, useRef, useCallback } from 'react';

// Game settings
const GRID_SIZE = 20;
const CELL_SIZE = 15;
const GAME_SPEED = 100;

// Direction constants
enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

// Helper to generate random position
const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

interface SnakeProps {
  onGameOver?: (score: number) => void;
}

const Snake: React.FC<SnakeProps> = ({ onGameOver }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(getRandomPosition);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Use refs to prevent stale closures in event handlers
  const directionRef = useRef(direction);
  const gameOverRef = useRef(gameOver);
  const isPausedRef = useRef(isPaused);
  
  // Update refs when state changes
  useEffect(() => {
    directionRef.current = direction;
    gameOverRef.current = gameOver;
    isPausedRef.current = isPaused;
  }, [direction, gameOver, isPaused]);

  // Position food away from snake
  const repositionFood = useCallback(() => {
    let newFood;
    do {
      newFood = getRandomPosition();
    } while (
      snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    );
    setFood(newFood);
  }, [snake]);

  // Game logic - move snake
  const moveSnake = useCallback(() => {
    if (gameOverRef.current || isPausedRef.current) return;
    
    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      
      // Move head based on direction
      switch (directionRef.current) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }
      
      // Check for collisions with wall
      if (
        head.x < 0 || 
        head.x >= GRID_SIZE || 
        head.y < 0 || 
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        onGameOver && onGameOver(score);
        return prevSnake;
      }
      
      // Check for collisions with self
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        onGameOver && onGameOver(score);
        return prevSnake;
      }
      
      // Check if snake eats food
      const newSnake = [head, ...prevSnake];
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        repositionFood();
      } else {
        // Remove tail if no food eaten
        newSnake.pop();
      }
      
      return newSnake;
    });
  }, [food.x, food.y, repositionFood, score, onGameOver]);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== Direction.DOWN) {
            setDirection(Direction.UP);
          }
          break;
        case 'ArrowDown':
          if (directionRef.current !== Direction.UP) {
            setDirection(Direction.DOWN);
          }
          break;
        case 'ArrowLeft':
          if (directionRef.current !== Direction.RIGHT) {
            setDirection(Direction.LEFT);
          }
          break;
        case 'ArrowRight':
          if (directionRef.current !== Direction.LEFT) {
            setDirection(Direction.RIGHT);
          }
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
        case 'r':
          if (gameOverRef.current) {
            resetGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection(Direction.RIGHT);
    setGameOver(false);
    setScore(0);
    repositionFood();
  };

  return (
    <div className="snake-game flex flex-col items-center">
      <div className="game-info flex justify-between w-full mb-2 font-mono text-sm">
        <div>Score: {score}</div>
        <div>
          {gameOver ? 'Game Over - Press R to restart' : isPaused ? 'PAUSED' : 'PLAYING'}
        </div>
      </div>
      
      <div 
        className="game-board border border-gray-500" 
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE,
          position: 'relative',
          backgroundColor: '#121212',
        }}
      >
        {/* Food */}
        <div 
          style={{
            position: 'absolute',
            left: food.x * CELL_SIZE, 
            top: food.y * CELL_SIZE,
            width: CELL_SIZE, 
            height: CELL_SIZE,
            backgroundColor: '#ff0000',
            borderRadius: '50%',
          }}
        />
        
        {/* Snake */}
        {snake.map((segment, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute',
              left: segment.x * CELL_SIZE, 
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE, 
              height: CELL_SIZE,
              backgroundColor: index === 0 ? '#00ff00' : '#00cc00',
              border: index === 0 ? '1px solid #005500' : 'none',
            }}
          />
        ))}
      </div>
      
      <div className="controls mt-4 text-xs text-center">
        <p>Controls: Arrow Keys to move, Space to pause</p>
        {gameOver && <button 
          className="mt-2 px-3 py-1 bg-green-800 text-white rounded-md"
          onClick={resetGame}
        >
          Play Again
        </button>}
      </div>
    </div>
  );
};

export default Snake; 