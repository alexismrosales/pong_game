interface GameProps {
  onStartToggle: () => void
}
const Game: React.FC<GameProps> = ({ onStartToggle }) => {
  return (
    <div id="Game">
      <h1 className="text-white">Game view</h1>
      <button className="text-white" onClick={onStartToggle}>Back to start</button>
    </div>
  )
}
export default Game;
