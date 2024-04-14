// GameStartProps
export interface GameStartProps {
  onStartToggle: () => void
}

export interface Connection {
  connectToggle: () => void
  newGameToggle: () => void
  start: () => void
  status: "disconnected" | "connecting" | "connected"
}

// GameProps
export interface GameProps {
  onStartToggle: () => void
};

export interface PlayerMovement {
  up: () => void
  down: () => void
};

export interface CanvasProps {
  ballPos?: [number, number]
  playerPos: number
  widthRef: (w: number) => void
  heightRef: (h: number) => void
}
