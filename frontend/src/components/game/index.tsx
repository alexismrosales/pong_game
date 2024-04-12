import { useState, useRef, useEffect, useLayoutEffect } from "react"

import styles from "./styles.module.css"

interface GameProps {
  onStartToggle: () => void
}

interface PlayerMovement {
  up: () => void
  down: () => void
}

interface CanvasProps {
  ballPos?: [number, number]
  player: number
  player1Pos?: number
  player2Pos?: number
}

const Game: React.FC<GameProps> = ({ onStartToggle }) => {
  const [playerPos, setPlayerPos] = useState(0);
  const goUp = () => setPlayerPos(playerPos - 10);
  const goDown = () => setPlayerPos(playerPos + 10);
  const playerMovement: PlayerMovement = { up: goUp, down: goDown }
  MovePlayer(playerMovement);
  return (
    <div id="Game">
      <div className="flex justify-center">
        <Canvas player={playerPos} />
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

const MovePlayer: React.FC<PlayerMovement> = props => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
      props.up();
    } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
      props.down();
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress])
  return null;
}

const Canvas: React.FC<CanvasProps> = props => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [frames, setFrames] = useState(0);
  const paddle = `<svg id="eXyWj6YCs301" 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 100 600" 
  shape-rendering="geometricPrecision" 
  text-rendering="geometricPrecision">
     <rect width="100" height="600" rx="0" ry="0" fill="#fff" stroke-width="0"/>
  </svg>`;
  const playerPaddle = new Image();
  const paddleSrc = `data:image/svg+xml,${encodeURIComponent(paddle)}`
  playerPaddle.src = paddleSrc;

  const drawGame = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.fillStyle = '#00000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        playerPaddle.onload = () => {
          //Player1
          context.drawImage(playerPaddle, 10, props.player, 2, 15);
          context.drawImage(playerPaddle, 80, 30, 2, 15);
        }
      }
    }
  }
  useLayoutEffect(() => {
    let timerId: any;
    const animate = () => {
      setFrames(frames + 1)
      timerId = requestAnimationFrame(animate)
    }
    timerId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(timerId)
  })

  useEffect(() => {
    drawGame();
  }, [frames]);

  return <canvas
    id="canvas"
    ref={canvasRef}
    className={styles.canvas} />
}
export default Game;
