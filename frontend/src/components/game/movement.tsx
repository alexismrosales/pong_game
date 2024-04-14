import { useEffect } from "react";
import { PlayerMovement } from "../interfaces";

export const MovePlayer: React.FC<PlayerMovement> = ({ up, down }) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
      up();
    } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
      down();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress])

  return null;
}

