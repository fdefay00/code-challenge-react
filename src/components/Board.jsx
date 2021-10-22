import React, { useState } from "react";

export default function Board() {
  const piece = {
    name: "knight",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png",
    value: null,
  };
  const [board, setBoard] = useState(createBoard(10));
  const [currentPosition, setCurrentPosition] = useState();
  const [currentBlocks, setCurrentBlocks] = useState([]);
  const [openMoves, setOpenMoves] = useState([]);
  const [moving, setMoving] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [cancelMove, setCancelMove] = useState(false);
  const [cancelBlock, setCancelBlock] = useState(false);
  const img = <img src={piece.img} alt={piece.name} />;
  const size = 10;

  function handleClick(i, j, e) {
    if (board[i][j]?.type === "img") return showAvailableSpot(i, j, e);
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
  }

  function createBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      board[i] = Array(10);
      for (let j = 0; j < size; j++) {
        board[i][j] = null;
      }
    }
    console.log(board);
    return board;
  }

  function placeKnight(i, j) {
    setCurrentPosition([i, j]);
    const board = createBoard(10);
    drawBoard(i, j, img, board);
    setBoard(board);
  }

  function drawBoard(l, k, value, board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (i === l && j === k) {
          board[i][j] = value;
        }
      }
    }
    return board;
  }

  function showAvailableSpot() {
    setMoving(true);
    const board = createBoard(size);

    const openMoves = [];
    const i = currentPosition[0];
    const j = currentPosition[1];
    openMoves.push([i + 2, j + 1]);
    openMoves.push([i + 2, j - 1]);
    openMoves.push([i - 2, j + 1]);
    openMoves.push([i - 2, j - 1]);
    openMoves.push([i + 1, j + 2]);
    openMoves.push([i + 1, j - 2]);
    openMoves.push([i - 1, j + 2]);
    openMoves.push([i - 1, j - 2]);
    setOpenMoves(openMoves);
    openMoves.forEach((position) => drawBoard(position[0], position[1], "Ⓜ️", board));
    if (currentPosition) drawBoard(currentPosition[0], currentPosition[1], img, board);
    currentBlocks.forEach((position) => drawBoard(position[0], position[1], "🔒", board));
    setBoard(board);
  }

  function moveToChosenSpot(i, j) {
    placeKnight(i, j);
    setMoving(false);
  }

  function block(i, j) {
    const board = createBoard(size);
    const currentBlocks = [];
    currentBlocks.push([i, j]);
    currentBlocks.push([i + 1, j]);
    currentBlocks.push([i - 1, j]);
    currentBlocks.push([i, j + 1]);
    currentBlocks.push([i, j - 1]);
    currentBlocks.push([i + 1, j + 1]);
    currentBlocks.push([i + 1, j - 1]);
    currentBlocks.push([i - 1, j + 1]);
    currentBlocks.push([i - 1, j - 1]);
    currentBlocks.forEach((position) => drawBoard(position[0], position[1], "🔒", board));
    if (currentPosition) drawBoard(currentPosition[0], currentPosition[1], img, board);
    setCurrentBlocks(currentBlocks);
    setBoard(board);
  }

  function unblock() {
    setBlocking(false);
    const board = createBoard(size);
    if (currentPosition) drawBoard(currentPosition[0], currentPosition[1], img, board);
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
  // console.log("rows yeah", rows);

  const blockButton = blocking ? (
    <button onClick={unblock}>UnBlock Knight</button>
  ) : (
    <button onClick={() => setBlocking(true)}>Block Knight</button>
  );

  return (
    <>
      <div className="header">
        <h1>Game ON!</h1>
        {blockButton}
        <button></button>
        {blocking && <h5>Choose area to block knight</h5>}
        {moving && <h5>Pick available spot to move piece</h5>}
        {cancelMove && <h5>Move canceled</h5>}
      </div>
      <div className="container">
        <div className="board">{rows.map((row) => row)}</div>
      </div>
    </>
  );
}
