import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from './styles.module.css'
interface CanvasProps {
  ballPos?: [number, number]
  playerPos: number
  isNotTop: (val: boolean) => void
  isNotBottom: (val: boolean) => void
}
const Canvas: React.FC<CanvasProps> = ({ playerPos, isNotTop, isNotBottom }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [frames, setFrames] = useState<number>(0);

  const paddle = new Image();
  const paddleSrc = `data:image/svg+xml,${encodeURIComponent(Paddle())}`

  const divisionDraw = new Image();
  const divisionSrc = `data:image/svg+xml,${encodeURIComponent(Division())}`

  const player = Math.max(0, Math.min(height - 17, playerPos));
  // Loading images previously
  paddle.src = paddleSrc;
  divisionDraw.src = divisionSrc;

  const drawGame = () => {
    if (context) {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffffff";

      // Division line
      context.beginPath();
      context.drawImage(divisionDraw, width / 2, 0, 2, height);
      context.beginPath();

      //Player 1
      context.drawImage(paddle, 10, player, 2, 17);

      //Player 2
      context.beginPath();
      context.drawImage(paddle, width - 10, 30, 2, 17);
      context.fill()

    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
      if (ctx) {
        setHeight(ctx.canvas.height);
        setWidth(ctx.canvas.width);
      }
    }
  }, [])

  useLayoutEffect(() => {
    let timerId: number;
    const animate = () => {
      setFrames(frames + 1)
      drawGame();
      timerId = requestAnimationFrame(animate)
    }
    timerId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(timerId)
  }, [drawGame, context]);

  useEffect(() => {
    if (player === height - 17) {
      isNotTop(false);
    } else if (player === 0) {
      isNotBottom(false);
    }
  }, [player, isNotTop, isNotBottom])

  return <canvas
    id="canvas"
    ref={canvasRef}
    className={styles.canvas} />
}

const Paddle = () => `<svg id="eXyWj6YCs301" 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 100 600" 
  shape-rendering="geometricPrecision" 
  text-rendering="geometricPrecision">
     <rect width="100" height="600" rx="0" ry="0" fill="#fff" stroke-width="0"/>
  </svg>`;

const Division = () => `<svg id="e9hLbBlI7Q21" 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 50 1920" 
  shape-rendering="geometricPrecision" 
  text-rendering="geometricPrecision">
    <line x1="0" y1="-968.762677" x2="0" y2="968.762678" 
    transform="translate(25 968.762678)" fill="#fff" 
    stroke="#fff" stroke-width="7"/>
  </svg>`;
export default Canvas;
