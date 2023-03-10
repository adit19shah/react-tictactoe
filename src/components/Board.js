import Square from "./Square";

//Keeping two loops in the same function since that was requirement of the challenge
const GenerateRows = (function ({squares,handleClick}) {
  const rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push(
      <div className="board-row">
        {(function () {
          const cols = [];
          for (let j = 0; j < 3; j++) {
            cols.push(
              <Square
                value={squares[3 * i + j]}
                onSquareClick={() => handleClick(3 * i + j)}
                key={3 * i + j}
              />
            );
          }
          return <tbody>{cols}</tbody>;
        })()}
      </div>
    );
  }
  return <tbody>{rows}</tbody>;
})

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  const isDraw = checkDraw(squares);
  function handleClick(pos) {
    if (squares[pos] || winner || isDraw) return;
    const nextSquares = squares.slice();
    nextSquares[pos] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  let status;
  if (winner) status = "Winner: " + winner;
  else if (isDraw) status = "Game ended in a draw...";
  else status = "Next Player: " + (xIsNext ? "X" : "O");

  return (
    <div>
      <div className="status">{status}</div>
      {/*<div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>*/}
      <GenerateRows squares={squares} handleClick={handleClick}/>
    </div>
  );
}
function checkDraw(squares) {
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) return false;
  }
  return true;
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  { //Not working as expected 
    
    /* const winCheck = (line) => {
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }

  const isWinState = lines.some(winCheck);
  if(isWinState) return isWinState; */}
  
  {//Not Working as expected

    /*lines.map((line) => {
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }); */}

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null; 
}
