export const isOnPaddle =
  (playerPos: number, ballPos: { x: number, y: number }, paddleHeight: number) => {
    let status;
    let pos;
    // A colission of the paddle and the ball happens when ballPos.y belongs to the interval [playerPos, playerPos + paddleHeight]
    // it means that the ball will be colissioning with the paddle
    const paddleSize = playerPos + paddleHeight;
    // 30 is the position where ball will dettect the colission
    if (ballPos.x === 30) {
      if (ballPos.y >= playerPos && ballPos.y <= paddleSize) {
        status = true;
        pos = playerPos;
      } else {
        status = false;
        pos = -1;
      }
    }
    return { status: status, pos: pos }
  }
