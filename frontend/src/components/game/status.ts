export const isOnPaddle = (playerPos: number, ballPos: { x: number, y: number }, paddleHeight: number) => {
  // A colission of the paddle and the ball happens when ballPos.y belongs to the interval [playerPos, playerPos + paddleHeight]
  // it means that the ball will be colissioning with the paddle
  const paddleSize = playerPos + paddleHeight;
  // 30 is the position where ball will dettect the colission
  if (ballPos.x == 30 && !(ballPos.y >= playerPos && ballPos.y <= paddleSize)) {
    return false;
  } else if (ballPos.x == 30) {
    return true;
  }
  return null;
}
