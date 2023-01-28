import React, { useState } from "react";

import "./App.css";

const initialArray = Array(9).fill("");
function App() {
  const [player, setPlayer] = useState("X");
  const [playerArray, setPlayerArray] = useState(initialArray);
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleRestart = () => {
    setPlayer("X");
    setPlayerArray(initialArray);
    setWinner(null);
    setIsGameOver(false);
  };

  //checking for winner after every click
  const evaluateWinner = (arrayCopy) => {
    const winningCombos = {
      row: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      column: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in winningCombos) {
      winningCombos[combo].forEach((pattern) => {
        if (
          arrayCopy[pattern[0]] === "" ||
          arrayCopy[pattern[1]] === "" ||
          arrayCopy[pattern[2]] === ""
        ) {
        } else if (
          arrayCopy[pattern[0]] === arrayCopy[pattern[1]] &&
          arrayCopy[pattern[0]] === arrayCopy[pattern[2]]
        ) {
          setWinner(arrayCopy[pattern[0]]);
          setIsGameOver(true);
        }
      });
    }
    if (!arrayCopy.includes("")) {
      setIsGameOver(true);
    }
  };

  const handleClick = (id) => {
    let arrayCopy = [...playerArray];
    if (arrayCopy[id] === "" && !winner) {
      if (player === "X") {
        arrayCopy[id] = "X";
        setPlayer("O");
      } else if (player === "O") {
        arrayCopy[id] = "O";
        setPlayer("X");
      }
      setPlayerArray([...arrayCopy]);
      evaluateWinner(arrayCopy);
    } else if (winner) alert("Click Start Again to restart game");
  };

  function Button({ id }) {
    return (
      <button className="btn-class" onClick={() => handleClick(id)}>
        {playerArray[id]}
      </button>
    );
  }

  return (
    <body className={isGameOver ? "game-over" : "body-class"}>
      <div className="app">
        <div className="header">
          <h1>Tic Tac Toe Game</h1>
          {!isGameOver ? <h3>{`${player}'s Turn`}</h3> : <h3>Game Over</h3>}
        </div>
        <div className="game-console">
          {playerArray.map((arrayItem, index) => (
            <Button player={arrayItem} key={index} id={index} />
          ))}
        </div>
        {winner && <h2>{winner} wins</h2>}
        {!winner && isGameOver && <h2>Nobody won</h2>}
        {isGameOver && (
          <button onClick={handleRestart} className="restart-btn">
            Start Again
          </button>
        )}
      </div>
    </body>
  );
}

export default App;
