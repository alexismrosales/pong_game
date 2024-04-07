import { FunctionComponent, useState } from "react"
import { connect } from "tls"
import style from "./styles.module.css"

interface GameStartProps {
  onStartToggle: () => void
}

interface Connection {
  connectToggle: () => void
  newGameToggle: () => void
  status: "disconnected" | "connecting" | "connected"
}

const GameStart: React.FC<GameStartProps> = ({ onStartToggle }) => {
  const [start, setStart] = useState(false);
  return (
    <div id="GameStart" className={style.container}>
      <div className="flex flex-col">

        <h1 className="text-white">Hello from gamestart </h1>
        <br />
        <button className="text-white" onClick={onStartToggle}>Start Game</button>
      </div>
    </div>
  )
}
const ConnectSession: FunctionComponent<Connection> = props => {
  const status = props.status
  if (status === "disconnected") {
    return (
      <>
        <h1>PONG GAME</h1>
        <form>
          <input type="text" placeholder="Type the code of the session" />
          <button onClick={props.connectToggle}>Connect</button>
          <p>or</p>
          <button onClick={props.newGameToggle}>Create new game</button>
        </form>
      </>
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
      <p>Connection Succesfully</p>
    </>
  )

}

export default GameStart;
