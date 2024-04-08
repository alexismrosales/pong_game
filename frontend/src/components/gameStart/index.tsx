
import { FunctionComponent, useEffect, useState } from "react"


import style from "./styles.module.css"

interface GameStartProps {
  onStartToggle: () => void
}

interface Connection {
  connectToggle: () => void
  newGameToggle: () => void
  start: () => void
  status: "disconnected" | "connecting" | "connected"
}

const GameStart: React.FC<GameStartProps> = ({ onStartToggle }) => {
  const [connect, setConnect] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const handleConnect = () => {
    setConnect(!connect);
  }
  const handleNewGame = () => {
    setNewGame(!newGame);
  }

  return (
    <div id="GameStart" className={style.container}>
      <div className="flex flex-col">
        <TitleScreen
          connectToggle={handleConnect}
          newGameToggle={handleNewGame}
          start={onStartToggle}
          status="disconnected" />
      </div>
    </div>
  )
}
const TitleScreen: FunctionComponent<Connection> = props => {
  const status = props.status
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (status === "connected") {
      const intervalId = setTimeout(() => {
        if (counter > 0) {
          setCounter(counter - 1);
        } else {
          clearTimeout(intervalId);
          props.start();
        }
      }, 1500);
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [counter])

  if (status === "disconnected") {
    return (
      <div className="text-center">
        <h1>PONG GAME</h1>
        <form>
          <input type="text" placeholder="Type the code of the session" />
          <br />
          <button onClick={props.connectToggle}>Connect</button>
          <p>or</p>
          <button onClick={props.newGameToggle}>Create new game</button>
        </form>
      </div>
    )
  } else if (status === "connecting") {
    return (
      <>
        <p>Connecting ...</p>
      </>
    )
  }
  return (
    <>
      <p>Starting in </p>
      <span>{counter}</span>
      <p>Connection Succesfully</p>
    </>
  )

}

export default GameStart;