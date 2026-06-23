import "./App.css";

import { Grid, Modal, ModalMenu, ResultMenu, GameHeader } from "./components";

import type { TGrid } from "./types/minesweeper";
import { useMinesweeper } from "./hooks/useMinesweeper";

function App() {
  const {
    gridSize,
    switchToGrid,
    squares,
    revealBombs,
    isWon,
    isLost,
    time,
    bestScore,
    startGame,
    handleClickSquare,
    handleRightClickSquare,
  } = useMinesweeper();

  return (
    <div>
      {!gridSize && (
        <Modal>
          <ModalMenu handleClick={startGame} />
        </Modal>
      )}
      {isWon && (
        <ResultMenu handleClickRestart={() => startGame(gridSize!)}>
          YOU WON GGEZ!
        </ResultMenu>
      )}
      {isLost && (
        <ResultMenu handleClickRestart={() => startGame(gridSize!)}>
          You lost.
        </ResultMenu>
      )}
      {switchToGrid && (
        <>
          <GameHeader bestScore={bestScore} time={time}></GameHeader>
          <Grid
            handleRightClickSquare={handleRightClickSquare}
            handleClickSquare={handleClickSquare}
            gridSize={gridSize as TGrid}
            squares={squares}
            revealBombs={revealBombs}
          ></Grid>
        </>
      )}
    </div>
  );
}

export default App;
