import Board from "./Board";
import { useState } from "react";
import ReactSwitch from "react-switch";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //Array(9).fill(null) : creates an array with nine elements and sets each of them to null
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = (currentMove & 1) === 0;
  const [checked, setChecked] = useState(true); //For toggle switch

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function ToggleSwitch() {
    const handleChange = (isToggled) => {
      setChecked(isToggled);
      //console.log("Clicked");
    };

    return (
      <div className="app" style={{ textAlign: "center" }}>
        <h4>Toggle Switch to toggle the order</h4>
        <ReactSwitch checked={checked} onChange={handleChange} />
      </div>
    );
  }

  const moves = history.map((squares, move) => {
    let descrption;
    if (move === currentMove) descrption = "You are at move #" + move;
    else if (move > 0) descrption = "Go to move #" + move;
    else descrption = "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{descrption}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ToggleSwitch />
        <ol>{(checked)?(moves):(moves.reverse())}</ol>
        {/*{(function () {
          if (checked) return <ol>{moves}</ol>;
          else return <ol>{moves.reverse()}</ol>;
        })()}*/}
      </div>
    </div>
  );
}
