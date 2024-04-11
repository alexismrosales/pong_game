import { useState, useRef, useEffect } from "react"
import styles from "./styles.module.css"

interface GameProps {
  onStartToggle: () => void
}

interface CanvasProps {
  ballPos?: [number, number]
  player1Pos?: () => void
  player2Pos?: () => void
}

const Game: React.FC<GameProps> = ({ onStartToggle }) => {
  const [player1Pos, setPlayer1Pos] = useState([0, 0]);
  const [player2Pos, setPlayer2Pos] = useState([0, 0]);

  return (

    <div id="Game">
      <div className="flex justify-center">
        <Canvas />
      </div>
      <div>
        <button
          className="text-white text-3xl"
          typeof="button"
          onClick={onStartToggle}>Back to menu</button>
      </div>
    </div>
  )
}

const Canvas: React.FC<CanvasProps> = props => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d");
    context!.fillStyle = '#000000';
    context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height)
  })
  return <canvas
    id="canvas"
    ref={canvasRef}
    className={styles.canvas} />
}

export default Game;
