import React, { useState } from "react";

export default function Board() {
  const piece = {
    name: "knight",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    value: null,
  };
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
  const [currentPosition, setCurrentPosition] = useState();
  const [moving, setMoving] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [cancelMove, setCancelMove] = useState(false);
  const [cancelBlock, setCancelBlock] = useState(false);

  function handleClick(i, j, e) {
    if (moving) {
      if (board[i][j] === "Ⓜ️") moveToChosenSpot(i, j, e);
      else {
        setCancelMove(true);
        setMoving(false);
      }
    } else if (blocking) {
      return block(i, j);
    }

    if (board[i][j] === null) return placeKnight(i, j);
    if (board[i][j].type === "img") showAvailableSpot(i, j, e);
  }

  function placeKnight(i, j) {
    setCurrentPosition([i, j]);
    const board = Array(10).fill(Array(10).fill(null));
    const img = <img src={piece.img} alt={piece.name} />;
    drawBoard(i, j, img, board);
    setBoard(board);
  }

  function drawBoard(l, k, value, board) {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        if (i === l && j === k) board[i].push(value);
        else board[i].push(null);
      }
    }
    // console.log({ board });
    return board;
  }

  function showAvailableSpot(k, l) {
    setMoving(true);
    const board = [];

    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        if (i === k && j === l) board[i].push(<img src={piece.img} alt={piece.name} />);
        else if (i === k + 2 && j === l + 1) board[i].push("Ⓜ️");
        else if (i === k + 2 && j === l - 1) board[i].push("Ⓜ️");
        else if (i === k - 2 && j === l + 1) board[i].push("Ⓜ️");
        else if (i === k - 2 && j === l - 1) board[i].push("Ⓜ️");
        else if (i === k + 1 && j === l + 2) board[i].push("Ⓜ️");
        else if (i === k + 1 && j === l - 2) board[i].push("Ⓜ️");
        else if (i === k - 1 && j === l + 2) board[i].push("Ⓜ️");
        else if (i === k - 1 && j === l - 2) board[i].push("Ⓜ️");
        else board[i].push(null);
      }
    }
    // console.log(board);
    setBoard(board);
  }

  function moveToChosenSpot(i, j) {
    placeKnight(i, j);
    setMoving(false);
  }

  function block(i, j) {
    const board = [];
    drawBoard(i, j, "🔒", board);
    drawBoard(i + 1, j, "🔒", board);
    drawBoard(i, j + 1, "🔒", board);
    drawBoard(i - 1, j, "🔒", board);
    drawBoard(i + 1, j + 1, "🔒", board);
    drawBoard(i - 1, j - 1, "🔒", board);
    setBoard(board);
  }

  const rows = board.map((row, i) => {
    return row.map((square, j) => {
      const name = (i + j) % 2 === 0 ? "black" : "red";
      return (
        <div key={i + j} className={name} onClick={(e) => handleClick(i, j, e)}>
          {board[i][j]}
        </div>
      );
    });
  });
  console.log("rows yeah", rows);

  return (
    <>
      <div className="header">
        <h1>Game ON!</h1>
        <button onClick={() => setBlocking(true)}>Block Knight</button>
        {blocking && <h5>Choose area to block knight</h5>}
        {moving && <h5>Pick available spot to move piece</h5>}
        {cancelMove && <h5>Move canceled</h5>}
      </div>
      <div className="container">
        <div className="board">
          {rows[0].map((row) => row)}
          {rows[1].map((row) => row)}
          {rows[2].map((row) => row)}
          {rows[3].map((row) => row)}
          {rows[4].map((row) => row)}
          {rows[5].map((row) => row)}
          {rows[6].map((row) => row)}
          {rows[7].map((row) => row)}
          {rows[8].map((row) => row)}
          {rows[9].map((row) => row)}
        </div>
      </div>
    </>
  );
}
