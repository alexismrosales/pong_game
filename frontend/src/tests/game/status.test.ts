import { isOnPaddle } from "../../components/game/status";
describe("isOnPaddle", () => {
  it("Should return true if the position if the ball is on the paddle", () => {
    // Ball will be in coordinates (30, 0); 
    const ballPos = { x: 30, y: 0 };
    // Playerpos will be only axis y 
    const playerPos = 0;
    const paddleHeight = 10;
    const result = isOnPaddle(playerPos, ballPos, paddleHeight);
    expect(result).toEqual(true);
  });
});
