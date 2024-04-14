import { useState } from "react"
import { GameProps, PlayerMovement } from "../interfaces";
import Canvas from "./canvas"
import { MovePlayer } from "./movement"



const Game: React.FC<GameProps> = ({ onStartToggle }) => {
  const [playerPos, setPlayerPos] = useState(10);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const goUp = () => {
    if (playerPos > 0) {
      setPlayerPos(playerPos - 10)
    }
  };
  const goDown = () => {
    if (height != 0) {
      if (playerPos < height - 20) {
        setPlayerPos(playerPos + 10);
      }
    }
  }
  const updateWidth = (w: number) => setWidth(w);
  const updateHeight = (h: number) => setHeight(h);
  const playerMovement:
    PlayerMovement = { up: goUp, down: goDown }
  MovePlayer(playerMovement);
  return (
    <div id="Game">
      <div className="flex justify-center z-0">
        <Canvas playerPos={playerPos} widthRef={updateWidth} heightRef={updateHeight} />
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
