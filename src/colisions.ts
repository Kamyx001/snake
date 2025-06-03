

export function didColideWithApple(snakePositons: { x: number, y: number }[], applePosition: { x: number, y: number }) {
  return snakePositons.some((snakePosition) => snakePosition.x === applePosition.x && snakePosition.y === applePosition.y)
}

export function didColideWithSelf(snakePositions: { x: number, y: number }[]): boolean {
  const [head, ...body] = snakePositions;
  return body.some(segment => segment.x === head.x && segment.y === head.y);
}

export function didGoIntoWall(
  snakePositions: { x: number; y: number }[],
  canvasWidth: number,
  canvasHeight: number
): boolean {
  if (snakePositions[0].y < 0) return true
  if (snakePositions[0].y >= canvasHeight) return true
  if (snakePositions[0].x < 0) return true
  if (snakePositions[0].x >= canvasWidth) return true
  return false
}