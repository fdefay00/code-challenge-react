import React, { useState } from "react";

export default function Board() {
  const piece = {
    name: "knight",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    value: null,
  };
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(piece)));

  function placeKnight(e, i, j) {
    console.log(e.target.value);
    const board = Array(10).fill(Array(10).fill(piece));
    board[i][j]["value"] = `${i}-${j}`;
    console.log(board);
    setBoard(board);
  }

  const rows = board.map((row, i) => {
    return row.map((square, j) => {
      const name = (i + j) % 2 === 0 ? "black" : "red";
      return (
        <div key={i + j} className={name} onClick={(e) => placeKnight(e, i, j)}>
          {square.value && <img src={square.img} alt={square.name} />}
        </div>
      );
    });
  });
  console.log(rows[0][0]);
  const flatBoard = rows.flat();
  console.log(flatBoard);

  return (
    <div className="board">
      {flatBoard.map((square) => square)}
      {/*<div>{rows[1].map((row) => row)}</div>
      <div>{rows[2].map((row) => row)}</div>
      <div>{rows[3].map((row) => row)}</div>
      <div>{rows[4].map((row) => row)}</div>
      <div>{rows[5].map((row) => row)}</div>
      <div>{rows[6].map((row) => row)}</div>
      <div>{rows[7].map((row) => row)}</div>
      <div>{rows[8].map((row) => row)}</div>
  <div>{rows[9].map((row) => row)}</div>*/}
    </div>
  );
}
