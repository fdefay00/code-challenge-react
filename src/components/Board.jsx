import React, { useState } from "react";

export default function Board() {
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
  const piece = {
    name: "knight",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
  };

  function placeKnigth(i, j) {
    const board = Array(10).fill(Array(10).fill(0));
    board[i][j] = piece;
    console.log(board);
    setBoard(board);
  }

  const rows = board.map((row, i) => {
    return row.map((square, j) => {
      const name = (i + j) % 2 === 0 ? "black" : "red";
      return (
        <div key={i + j} className={name} onClick={(e) => placeKnigth(i, j)}>
          {square && <img key={j} src={square.img} alt={square.name} />}
        </div>
      );
    });
  });

  return <div className="board">{rows.map((row) => row)}</div>;
}
