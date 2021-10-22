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
  const [message, setMessage] = useState("Pick a position to place knight");

  const img = <img src={piece.img} alt={piece.name} />;
  const size = 10;
  console.log({ moving }, { blocking });

  function handleClick(i, j) {
    //blocking
    if (blocking) {
      if (board[i][j] === "Ⓜ️") {
        setMoving(false);
        placeKnight(i, j, board);
        return setMessage("Move successful");
      }
      if (board[i][j] === "🔒") {
        if (moving) return setMessage("This position is blocked");
        else block(i, j);
      }
      if (board[i][j] === null) {
        block(i, j);
      }
      if (board[i][j]?.type === "img") {
        if (!moving) showAvailableSpot();
        if (moving) {
          setMoving(false);
          placeKnight(i, j, board);
        }

        return;
      }
    }

    //moving
    if (moving) {
      if (board[i][j] === "Ⓜ️") {
        placeKnight(i, j);
        setMoving(false);
        return setMessage("Move successful");
      }
      if (board[i][j] === "🔒") {
        return setMessage("This position is blocked");
      }
      if (board[i][j] === null) {
        setMoving(false);
        placeKnight(currentPosition[0], currentPosition[1]);
        return setMessage("Move Cancelled");
      }
      if (board[i][j]?.type === "img") {
        setMoving(false);
        placeKnight(currentPosition[0], currentPosition[1]);
        return setMessage("Move Cancelled");
      }
    }

    //click on chess piece
    if (board[i][j]?.type === "img") {
      setMoving(true);
      showAvailableSpot(i, j, board);
    }

    //click on empty space
    if (board[i][j] === null) {
      if (currentPosition) {
        setMessage("Click on knight to move");
        return; //placeKnight(i, j);
      }
      setMessage("Click on knight to move");
      placeKnight(i, j, board);
    }
  }

  function createBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      board[i] = Array(10);
      for (let j = 0; j < size; j++) {
        board[i][j] = null;
      }
    }
    return board;
  }

  function placeKnight(i, j) {
    setCurrentPosition([i, j]);
    const board = createBoard(size);
    drawBoard(i, j, img, board);
    currentBlocks.forEach((position) => drawBoard(position[0], position[1], "🔒", board));
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

  // function designBoard() {
  //   if (currentPosition) drawBoard(currentPosition[0], currentPosition[1], img, board);
  //   openMoves.forEach((position) => drawBoard(position[0], position[1], "Ⓜ️", board));
  //   currentBlocks.forEach((position) => drawBoard(position[0], position[1], "🔒", board));
  // }

  function showAvailableSpot() {
    // setMoving(true);
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

  // function moveToChosenSpot(i, j) {
  //   placeKnight(i, j);
  //   setMoving(false);
  // }

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
    if (moving) openMoves.forEach((position) => drawBoard(position[0], position[1], "Ⓜ️", board));
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

  const blockButton = blocking ? (
    <button onClick={unblock}>UnBlock Knight</button>
  ) : (
    <button onClick={() => setBlocking(true)}>Block Knight</button>
  );

  return (
    <>
      <div className="header">
        <h1>Game ON!</h1>
        {currentPosition && blockButton}
        {blocking && <h5>Choose area to block knight</h5>}
        {/*moving && <h5>Pick available spot to move piece</h5>*/}
        <h5>{message}</h5>
      </div>
      <div className="container">
        <div className="board">{rows.map((row) => row)}</div>
      </div>
    </>
  );
}

/*
 // moving && blocking
 if (moving && blocking) {
  // setMoving(false);
  if (board[i][j] === "🔒") {
    return setMessage("This position is blocked");
    // placeKnight(currentPosition[0], currentPosition[1]);
  }
  if (board[i][j] === null) {
    // placeKnight(currentPosition[0], currentPosition[1]);
    return setMessage("Move Cancelled");
  }
  if (board[i][j] === "Ⓜ️") {
    placeKnight(i, j);
    return setMessage("Move successful");
  }
}

//setting move
if (board[i][j]?.type === "img" && !blocking) {
  setMoving(true);
  if (moving) {
    placeKnight(currentPosition[0], currentPosition[1]);
    return setMessage("Move Cancelled");
  }
  return showAvailableSpot(i, j);
}

//moving
if (moving) {
  setMoving(false);
  if (board[i][j] !== "Ⓜ️") {
    placeKnight(currentPosition[0], currentPosition[1]);
    return setMessage("Move Cancelled");
  } else {
    placeKnight(i, j);
    setMessage("Move successful!");
  }
}

//blocking
if (blocking) {
  block(i, j);
}

if (currentPosition && board[i][j] === null) {
  return setMessage("Click on knight to move");
}

//placing
if (!moving && board[i][j] === null) {
  setMessage("Click on knight to move");
  return placeKnight(i, j);
}
*/
