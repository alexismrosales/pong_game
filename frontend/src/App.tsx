import { useState } from "react";
import GameStart from "./components/gameStart";
import Game from "./components/game";

function App() {
  const [start, setStart] = useState(false);
  const handleStart = () => {
    setStart(!start);
  }
  return (
    <div className="App">
      {
        !start ?
          <GameStart onStartToggle={handleStart} />
          :
          <Game onStartToggle={handleStart} />
      }
    </div>
  );
}
export default App;
