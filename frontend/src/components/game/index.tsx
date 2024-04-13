import { useState } from "react"
import Canvas from "./canvas"
import { MovePlayer } from "./movement"

interface GameProps {
  onStartToggle: () => void
}

interface PlayerMovement {
  up: () => void
  down: () => void
  notTopLimit: boolean
  notBottomLimit: boolean

}

const Game: React.FC<GameProps> = ({ onStartToggle }) => {
  const [playerPos, setPlayerPos] = useState(10);
  const [bottom, setBottom] = useState(false);
  const [top, setTop] = useState(false);
  const goUp = () => setPlayerPos(playerPos - 10);
  const goDown = () => setPlayerPos(playerPos + 10);
  const isBottom = (val: boolean) => setBottom(val);
  const isTop = (val: boolean) => setTop(val);
  const playerMovement: PlayerMovement = { up: goUp, down: goDown, notTopLimit: top, notBottomLimit: bottom }
  MovePlayer(playerMovement);
  return (
    <div id="Game">
      <div className="flex justify-center z-0">
        <Canvas playerPos={playerPos} isNotBottom={isBottom} isNotTop={isTop} />
      </div>
      <div className="absolute inset-0 flex justify-center items-start z-10">
        <button
          className="text-white text-3xl"
          typeof="button"
          onClick={onStartToggle}>Back to menu</button>
      </div>
    </div>
  )
}
export default Game;
