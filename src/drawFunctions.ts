

function drawBox (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

export function drawApple (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  drawBox(ctx, x, y, size, size, 'red');
}

export function drawSnake (
  ctx: CanvasRenderingContext2D,
  snakePositons: { x: number, y: number }[],
  size: number
) {
  snakePositons.forEach((snakePosition) => {
    drawBox(ctx, snakePosition.x, snakePosition.y, size, size, 'green');
  })
}
