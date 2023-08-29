import { didColideWithApple, didGoIntoWall, didColideWithSelf } from './colisions';
import { drawApple, drawSnake } from './drawFunctions';

export function initializeGame() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  const ctx = canvas.getContext('2d')!;
  const speed = 150;
  const pixelSize = 20;

  // Initial game state
  const snakePositions = [
    { x: 300, y: 300 },
    { x: 300 - pixelSize, y: 300 },
    { x: 300 - 2 * pixelSize, y: 300 },
  ];
  let applePosition = { x: 100, y: 100 };
  let direction = 'up';

  // Event listener for key presses
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        if (direction === 'down') break;
        direction = 'up';
        break;
      case 'ArrowDown':
        if (direction === 'up') break;
        direction = 'down';
        break;
      case 'ArrowLeft':
        if (direction === 'right') break;
        direction = 'left';
        break;
      case 'ArrowRight':
        if (direction === 'left') break;
        direction = 'right';
        break;
    }
  });

  // Game loop
  function gameLoop() {

    const ateApple: boolean = didColideWithApple(snakePositions, applePosition);
    const colidedWithSelf: boolean = didColideWithSelf(snakePositions);
    const colidedWithWall: boolean = didGoIntoWall(snakePositions, direction, canvas.width, canvas.height);
    
    if (colidedWithSelf||colidedWithWall) {
      gameOver(ctx, snakePositions.length);
      return;
    }

    for (let i = snakePositions.length - 1; i > 0; i--) {
      snakePositions[i] = { ...snakePositions[i - 1] };
    }

    // Update game state, move snake
    if (direction === 'up') {
      if (ateApple)
        snakePositions.push({ x: snakePositions[0].x, y: snakePositions[0].y - pixelSize });
      snakePositions[0].y -= pixelSize;
    } else if (direction === 'down') {   
      if (ateApple)
        snakePositions.push({x: snakePositions[0].x, y: snakePositions[0].y + pixelSize});
      snakePositions[0].y += pixelSize;
    } else if (direction === 'left') {
      if (ateApple)
        snakePositions.push({x: snakePositions[0].x - pixelSize, y: snakePositions[0].y});
      snakePositions[0].x -= pixelSize;
    } else if (direction === 'right') {
      if (ateApple)
        snakePositions.push({x: snakePositions[0].x + pixelSize, y: snakePositions[0].y});
      snakePositions[0].x += pixelSize;
    }
      
    console.log(snakePositions);
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw apple and snake
    if (didColideWithApple(snakePositions, applePosition)) {
      applePosition = { x: Math.floor(Math.random() * canvas.width / pixelSize) * pixelSize, y: Math.floor(Math.random() * canvas.height / pixelSize) * pixelSize };
      snakePositions.push(snakePositions[snakePositions.length - 1]);
    }
    drawApple(ctx, applePosition.x, applePosition.y, pixelSize);
    drawSnake(ctx, snakePositions, pixelSize);

    // Request next animation frame
    setTimeout(gameLoop, speed); // Using setTimeout instead of requestAnimationFrame
  }

  // Start the game loop
  gameLoop();
}

function gameOver(ctx: CanvasRenderingContext2D, snakeLength: number) {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.fillText(`Score: ${snakeLength}`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 30);
}