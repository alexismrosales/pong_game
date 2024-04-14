import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { CanvasProps } from "../interfaces";
import styles from './styles.module.css'

const Canvas: React.FC<CanvasProps> = ({ playerPos, widthRef, heightRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [frames, setFrames] = useState<number>(0);

  const paddle = new Image();
  const paddleSrc = `data:image/svg+xml,${encodeURIComponent(Paddle())}`

  const divisionDraw = new Image();
  const divisionSrc = `data:image/svg+xml,${encodeURIComponent(Division())}`

  // Setting limit height for player
  const player = Math.max(0, Math.min(height - 22, playerPos));
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
      context.drawImage(paddle, 10, player, 2, 20);

      //Player 2
      context.beginPath();
      context.drawImage(paddle, width - 10, 30, 2, 20);

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
      console.log(player)
      setFrames(frames + 1)
      drawGame();
      timerId = requestAnimationFrame(animate)
    }
    timerId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(timerId)
  }, [drawGame, context]);

  useEffect(() => {
    if (width && height != 0) {
      widthRef(width);
      heightRef(height);
    }
  }, [width, height]);

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
