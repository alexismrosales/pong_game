import { useState, useEffect } from "react"
import { GameProps, PlayerMovement } from "../interfaces";
import Canvas from "./canvas"
import { MovePlayer } from "./movement"
import { isOnPaddle } from "./status";


const Game: React.FC<GameProps> = ({ onStartToggle }) => {
  const [playerPos, setPlayerPos] = useState<number>(10);
  const [ballPos, setBallPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [paddleHeight, setPaddleHeight] = useState<number>(0);
  const [isColission, setIsCollision] = useState<boolean>(true);
  const goUp = () => {
    if (playerPos > 10) {
      setPlayerPos(playerPos - 25)
    }
  };
  const goDown = () => {
    if (height !== 0) {
      if (playerPos < height - height / 8 - 10) {
        setPlayerPos(playerPos + 25);
      }
    }
  };
  const updateWidth = (w: number) => setWidth(w);
  const updateHeight = (h: number) => setHeight(h);
  const playerMovement: PlayerMovement = { up: goUp, down: goDown }
  MovePlayer(playerMovement);

  useEffect(() => {
    if (width !== 0 && height !== 0) {
      setPaddleHeight(height / 8);
    }
  }, [paddleHeight]);
  // Game states
  useEffect(() => {
    const { status, pos } = isOnPaddle(playerPos, ballPos, paddleHeight);
    if (status != null) {
      setIsCollision(status);
    }
    // If the player lost a point
    if (!status && playerPos == 30) {
      console.log("Point for opposite player")
    }
  }, [isColission]);

  return (
    <div id="Game" className="h-screen justify-center">
      <div className="z-0">
        <Canvas playerPos={playerPos} ballPos={{ x: 30, y: 30 }} widthRef={updateWidth} heightRef={updateHeight} />
      </div>
      <div className="absolute inset-0 flex justify-center items-start z-10">
        <button
          className="text-white text-3xl"
          typeof="button"
          onClick={onStartToggle}>Back to menu</button>
      </div>
    </div>
  )
};
export default Game;
