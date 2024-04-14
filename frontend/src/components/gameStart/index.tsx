
import { FunctionComponent, useEffect, useState } from "react"
import { GameStartProps, Connection } from "../interfaces";


import style from "./styles.module.css"

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
          status="connected" />
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
          // Active game component
          props.start();
        }
      }, 1500);
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [counter])
  switch (status) {
    case "connecting":
      return (
        <>
          <p>Connecting ...</p>
        </>
      )
    case "connected":
      return (
        <>
          <p>Starting in </p>
          <span>{counter}</span>
          <p>Connection Succesfully</p>
        </>
      )
    default:
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
  }
}

export default GameStart;
