import { isOnPaddle } from "../../components/game/status";
describe("isOnPaddle", () => {
  it("Should return true if the position if the ball is on the paddle", () => {
    // Ball will be in coordinates (30, 0); 
    const ballPos = { x: 30, y: 0 };
    // Playerpos will be only axis y 
    const playerPos = 0;
    const paddleHeight = 10;
    const result = isOnPaddle(playerPos, ballPos, paddleHeight);
    expect(result.status).toEqual(true);
  });
});
describe("isOnLimitPaddle", () => {
  it("Should return true if the position of the ball is at limit of paddle", () => {
    // Ball will be in coordinates (30, 0); 
    const ballPos = { x: 30, y: 10 };
    // Playerpos will be only axis y 
    const playerPos = 0;
    const paddleHeight = 10;
    const result = isOnPaddle(playerPos, ballPos, paddleHeight);
    expect(result.status).toEqual(true);
  });
});
describe("isOnLimitPaddle2", () => {
  it("Should return true if the position of the ball is at limit of paddle", () => {
    // Ball will be in coordinates (30, 0); 
    const ballPos = { x: 30, y: 20 };
    // Playerpos will be only axis y 
    const playerPos = 10;
    const paddleHeight = 10;
    const result = isOnPaddle(playerPos, ballPos, paddleHeight);
    expect(result.status).toEqual(true);
  });
});

describe("isOutOfPaddle", () => {
  it("Should return false if the position of the ball is not in the range of the size of the paddle", () => {
    // Ball will be in coordinates (30, 0); 
    const ballPos = { x: 30, y: 30 };
    // Playerpos will be only axis y 
    const playerPos = 15;
    const paddleHeight = 10;
    const result = isOnPaddle(playerPos, ballPos, paddleHeight);
    expect(result.status).toEqual(false);
  });
});


