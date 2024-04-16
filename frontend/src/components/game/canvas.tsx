import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { CanvasProps } from "../interfaces";
import styles from './styles.module.css'
/*
 * The canvas has a dimension of height h and width h
 * The range of the game is from 10 to h - height / 8 - 10 for height,
 * and  10 to w - 10 for width. 
 */
const Canvas: React.FC<CanvasProps> = ({ ballPos, playerPos, widthRef, heightRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [paddleHeight, setPaddleHeight] = useState<number>(0);
  const [frames, setFrames] = useState<number>(0);


  const wRatio = 0.95;
  const hRatio = 0.90;

  const paddleDraw = new Image();
  const paddleSrc = `data:image/svg+xml,${encodeURIComponent(Paddle())}`

  const divisionDraw = new Image();
  const divisionSrc = `data:image/svg+xml,${encodeURIComponent(Division())}`

  const ballDraw = new Image();
  const ballSrc = `data:image/svg+xml,${encodeURIComponent(Ball())}`

  // Setting limit height for player
  const player = Math.max(10, Math.min(height - height / 8 - 10, playerPos));

  // Loading images previously charged
  paddleDraw.src = paddleSrc;
  divisionDraw.src = divisionSrc;
  ballDraw.src = ballSrc;

  const drawGame = () => {
    if (context) {
      context.clearRect(0, 0, width, height);

      // Division line
      context.beginPath();
      context.drawImage(divisionDraw, width / 2, 0, 30, height);

      //Player 1
      context.beginPath();
      context.drawImage(paddleDraw, 10, player, 20, paddleHeight);
      //Player 2
      context.beginPath();
      context.drawImage(paddleDraw, width - 20, 200, 20, paddleHeight);

      // Ball 
      context.beginPath();
      context.drawImage(ballDraw, ballPos.x, ballPos.y, 26, 25);

      context.fill();
    }
  };

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
  }, []);

  useLayoutEffect(() => {
    let timerId: number;
    let startTime = performance.now();
    const fps = 60
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      if (elapsed > 1000 / fps) {
        setFrames(frames + 1);
        drawGame();
        startTime = currentTime;
      }
      timerId = requestAnimationFrame(animate)
    }
    timerId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(timerId)
  }, [drawGame, context]);

  useEffect(() => {
    if (width && height !== 0) {
      widthRef(width);
      heightRef(height);
      setPaddleHeight(height / 8);
    }
  }, [width, height]);

  return <canvas
    id="canvas"
    ref={canvasRef}
    className={styles.canvas}
    width={window.innerWidth * wRatio}
    height={window.innerHeight * hRatio}
  />
}

const Paddle = () => `<svg width="300" 
  height="1200" 
  xmlns="http://www.w3.org/2000/svg">
  <rect stroke-width="0" id="svg_1" 
  height="1203.63737" width="300.00025" 
  y="-1.81866" x="-0.00012" stroke="#000" 
  fill="#ffffff"/>
</svg>`;

const Division = () => `<svg width="400" 
  height="3600" xmlns="http://www.w3.org/2000/svg">
  <rect stroke="#ffffff" id="svg_2" height="3579.99149" 
  width="59.99986" y="-0.00427" x="170.00008" 
  stroke-width="0" fill="#ffffff"/>
</svg>`;

const Ball = () => `<svg id="eJBhgWrX4GD1"
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink" 
  viewBox="0 0 600 600"
  shape-rendering="geometricPrecision" 
  text-rendering="geometricPrecision">
  <ellipse rx="300" ry="300" transform="translate(300 300)" 
  fill="#ffffff" stroke-width="0"/>
  </svg>`
export default Canvas;
