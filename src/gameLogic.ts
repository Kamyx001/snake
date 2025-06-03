import { didColideWithApple, didGoIntoWall, didColideWithSelf } from './colisions';
import { drawApple, drawSnake } from './drawFunctions';

export function initializeGame() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  const ctx = canvas.getContext('2d')!;
  const scoreboard = document.querySelector<HTMLDivElement>('#scoreboard')!;
  const restartButton = document.querySelector<HTMLButtonElement>('#restart')!;
  const speed = 150;
  const pixelSize = 20;
  let keyPressed = false;
  let highScore = parseInt(localStorage.getItem('highScore') ?? '0');

  restartButton.style.display = 'none';
  restartButton.onclick = () => {
    initializeGame();
  };

  const snakePositions = [
    { x: 300, y: 300 },
    { x: 300 - pixelSize, y: 300 },
    { x: 300 - 2 * pixelSize, y: 300 },
  ];
  let applePosition = { x: 100, y: 100 };
  let direction = 'up';

  const updateScoreboard = () => {
    const score = snakePositions.length - 3;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore.toString());
    }
    scoreboard.textContent = `Score: ${score} | High Score: ${highScore}`;
  };

  updateScoreboard();

  const eventListener = (event: KeyboardEvent) => {
    if (keyPressed) return;
    switch (event.key) {
      case 'ArrowUp':
        if (direction === 'down') break;
        direction = 'up';
        keyPressed = true;
        break;
      case 'ArrowDown':
        if (direction === 'up') break;
        direction = 'down';
        keyPressed = true;
        break;
      case 'ArrowLeft':
        if (direction === 'right') break;
        direction = 'left';
        keyPressed = true;
        break;
      case 'ArrowRight':
        if (direction === 'left') break;
        direction = 'right';
        keyPressed = true;
        break;
    }
  }

  // Event listener for key presses
  window.addEventListener('keydown', eventListener);
  // Game loop
  function gameLoop() {

    for (let i = snakePositions.length - 1; i > 0; i--) {
      snakePositions[i] = { ...snakePositions[i - 1] };
    }

    // Update game state, move snake head
    if (direction === 'up') {
      snakePositions[0].y -= pixelSize;
    } else if (direction === 'down') {
      snakePositions[0].y += pixelSize;
    } else if (direction === 'left') {
      snakePositions[0].x -= pixelSize;
    } else if (direction === 'right') {
      snakePositions[0].x += pixelSize;
    }
    keyPressed = false;
    
    // Check collisions
    const colidedWithSelf: boolean = didColideWithSelf(snakePositions);
    const colidedWithWall: boolean = didGoIntoWall(
      snakePositions,
      canvas.width,
      canvas.height
    );

    if (colidedWithSelf || colidedWithWall) {
      updateScoreboard();
      window.removeEventListener('keydown', eventListener);
      restartButton.style.display = 'block';
      gameOver(ctx, snakePositions.length - 3);
      return;
    }

    // Check if apple was eaten
    if (didColideWithApple(snakePositions, applePosition)) {
      applePosition = {
        x: Math.floor(Math.random() * canvas.width / pixelSize) * pixelSize,
        y: Math.floor(Math.random() * canvas.height / pixelSize) * pixelSize,
      };
      snakePositions.push(snakePositions[snakePositions.length - 1]);
      updateScoreboard();
    }

    // Clear canvas and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple(ctx, applePosition.x, applePosition.y, pixelSize);
    drawSnake(ctx, snakePositions, pixelSize);

    // Request next animation frame
    setTimeout(gameLoop, speed); // Using setTimeout instead of requestAnimationFrame
  }

  // Start the game loop
  gameLoop();
}

function gameOver(ctx: CanvasRenderingContext2D, score: number) {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.fillText(`Score: ${score}`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 30);
}