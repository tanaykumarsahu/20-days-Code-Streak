var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasSize = canvas.width;

const board = {};

const whitePawn = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png';
const wPawn = new Image();
wPawn.src = whitePawn;

const blackPawn = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png';
const bPawn = new Image();
bPawn.src = blackPawn;

const whiteKnight = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png';
const wKnight = new Image();
wKnight.src = whiteKnight;

const blackKnight = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png';
const bKnight = new Image();
bKnight.src = blackKnight;

const whiteKing = 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png';
const wKing = new Image();
wKing.src = whiteKing;

const blackKing = 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png';
const bKing = new Image();
bKing.src = blackKing;

const whiteRook = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png';
const wRook = new Image();
wRook.src = whiteRook;

const blackRook = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png';
const bRook = new Image();
bRook.src = blackRook;

const whiteQueen = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png';
const wQueen = new Image();
wQueen.src = whiteQueen;

const blackQueen = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png';
const bQueen = new Image();
bQueen.src = blackQueen;

const whiteBishop = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png';
const wBishop = new Image();
wBishop.src = whiteBishop;

const blackBishop = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png';
const bBishop = new Image();
bBishop.src = blackBishop;

const origin = 10;
const boardSize = 9;
const spacer = (canvasSize - origin * 2) / (boardSize - 1);
board.spacingPoints = [];
for (let i = 0; i < boardSize; i++) {
  let thisPoint = origin + spacer * i;
  if (thisPoint < canvasSize - 50) {
    board.spacingPoints.push(Math.floor(thisPoint + spacer * 0.5));
  }
}

//******************functions to draw board********************

const outlineBoard = () => {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.rect(origin, origin - 1, canvasSize - origin * 2, canvasSize - origin * 2);
  ctx.stroke();
};

const outlineSquare = (x, y, color) => {
  //console.log("drawing a square")
  let actualX = x - spacer / 2;
  let actualY = y - spacer / 2;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.rect(actualX, actualY, spacer, spacer);
  ctx.stroke();
};

const fillSquare = (x, y, color) => {
  //console.log("drawing a square")
  let actualX = x - spacer / 2;
  let actualY = y - spacer / 2;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(actualX, actualY, spacer, spacer);
  ctx.fill();
};

const colorSquares = () => {
  //console.log("Im running ")
  board.currentBoard.map(function (thisRow) {
    thisRow.map(function (thisSquare) {
      fillSquare(thisSquare.x, thisSquare.y, thisSquare.bgcolor);
    });
  });
};

//redo this to get rid of blinking
const drawImage = (x, y, image) => {
  let actualX = x - 2;
  let actualY = y - 2;

  let height = spacer * 0.93;
  let width = spacer * 0.93;
  ctx.drawImage(image, actualX, actualY, height, width);
};

const placePieces = () => {
  //console.log("Im running ")
  board.currentBoard.map(function (thisRow) {
    thisRow.map(function (thisSquare) {

      if (!!thisSquare.img) {
        let offset = spacer / 2 - 3;
        //console.log(thisSquare.img);
        drawImage(thisSquare.x - offset, thisSquare.y - offset, thisSquare.img);
      }
    });
  });
};

//*******************************************************

//**************board object array creation functions****************
function square(i, j) {
  this.hasMoved = false; //will become true once piece moves
  this.selected = false; // for moving pieces - must be true to move
  this.row = j; // board coordinates
  this.column = i;
  this.x = board.spacingPoints[i]; // canvas coordinates
  this.y = board.spacingPoints[j];
  let colorCondition = j % 2 == 0 && i % 2 == 0 || j % 2 == 1 && i % 2 == 1;
  colorCondition ? this.bgcolor = "#F6DDCC" : this.bgcolor = "#D68910";

  // assign starting position for all the pieces
  if (j == 1) {// row 1 
    this.img = bPawn;
    this.color = "black";
    this.piece = "pawn";
  } else
  if (j == 6) {// row 6
    this.img = wPawn;
    this.color = "white";
    this.piece = "pawn";
  } else
  if (j == 7) {// etc
    this.color = "white";
    if (i == 0 || i == 7) {
      this.img = wRook;
      this.piece = "rook";
    } else
    if (i == 1 || i == 6) {
      this.img = wKnight;
      this.piece = "knight";
    } else
    if (i == 2 || i == 5) {
      this.img = wBishop;
      this.piece = "bishop";
    } else
    if (i == 3) {
      this.img = wQueen;
      this.piece = "queen";
    } else
    {
      this.img = wKing;
      this.piece = "king";
    };
  } else
  if (j == 0) {// etc
    this.color = "black";
    if (i == 0 || i == 7) {
      this.img = bRook;
      this.piece = "rook";
    } else
    if (i == 1 || i == 6) {
      this.img = bKnight;
      this.piece = "knight";
    } else
    if (i == 2 || i == 5) {
      this.img = bBishop;
      this.piece = "bishop";
    } else
    if (i == 3) {
      this.img = bQueen;
      this.piece = "queen";
    } else
    {
      this.img = bKing;
      this.piece = "king";
    };
  } else
  {
    this.img = null;
    this.color = null;
    this.piece = null;
  }


}

const makeBoardArray = () => {
  board.currentBoard = [];
  for (let i = 0; i < boardSize - 1; i++) {
    let thisRow = [];
    for (let j = 0; j < boardSize - 1; j++) {
      //console.log(i,j)
      let thisPoint = new square(i, j);
      thisRow.push(thisPoint);
      //console.log(thisPoint.column)
    }
    board.currentBoard.push(thisRow);
  }
};
//****************************************

//**********Piece moving fuctions*********
// Math to convert clicked point to closest coordinate pair
function convertCoords(x, y) {
  let convertedX = board.spacingPoints[0];
  let convertedY = board.spacingPoints[0];
  let xDiff = Math.abs(x - board.spacingPoints[0]);
  let yDiff = Math.abs(y - board.spacingPoints[0]);

  // find the point on the board closest to where the mouse clicked
  let coords = {};
  board.spacingPoints.map(function (thisPoint) {
    let thisXDiff = Math.abs(x - thisPoint);
    let thisYDiff = Math.abs(y - thisPoint);
    if (thisXDiff < xDiff) {
      coords.X = thisPoint;
      xDiff = thisXDiff;
    }
    if (thisYDiff < yDiff) {
      coords.Y = thisPoint;
      yDiff = thisYDiff;
    }
  });
  if (!coords.Y) {coords.Y = board.spacingPoints[0];}
  if (!coords.X) {coords.X = board.spacingPoints[0];}
  return coords;
}

// highlight the selected square and tell the board object a piece is selected
const highlightSquare = square => {
  outlineSquare(square.x, square.y, "black");
  //board.currentBoard[square.col][square.row].selected = true;  
  board.pieceSelected = [square.column, square.row];
};

const lineFrom = (oldSquare, newSquare) => {

  let xDiff = oldSquare.x - newSquare.x;
  let yDiff = oldSquare.y - newSquare.y;
  let yCorrection = 0;
  let xCorrection = 0;
  if (yDiff < 0) {
    yCorrection = -0.06 * canvasSize;
  } else
  if (yDiff > 0) {
    yCorrection = 0.06 * canvasSize;
  }

  if (xDiff < 0) {
    xCorrection = -0.06 * canvasSize;
  } else
  if (xDiff > 0) {
    xCorrection = 0.06 * canvasSize;
  }

  let startX = oldSquare.x;
  let startY = oldSquare.y;
  let endX = newSquare.x + xCorrection;
  let endY = newSquare.y + yCorrection;

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

const switchColor = currentColor => {
  board.color === "white" ? board.color = "black" : board.color = "white";
};


// define boolean logic return for each piece type

const pawnLogic = (coords, xDiff, yDiff, color, isFirstMove, isCapturing) => {
  //console.log(coords, xDiff, yDiff, color, isFirstMove, isCapturing)  
  if (Math.abs(xDiff) > 1) {
    return false;
  } // add capturing consideration
  else
    if (Math.abs(xDiff) === 1) {
      if (!isCapturing || Math.abs(yDiff) > 1) {return false;}
    } else

    if (yDiff === 2 || yDiff === -2) {
      if (!isFirstMove) {return false;};
      //console.log("can only do that on first move!")
    } else

    if (xDiff === 0) {
      if (isCapturing) {return false;};
    }

  switch (color) {

    case "white":
      if (yDiff < 3 && yDiff > 0) {return true;}
      break;

    case "black":
      if (yDiff > -3 && yDiff < 0) {return true;}
      break;}


  return false;
};

const rookLogic = (xDiff, yDiff) => {
  //console.log(xDiff, yDiff);
  if (!xDiff || !yDiff) {return true;};

  return false;
};

const knightLogic = (xDiff, yDiff) => {
  let conditionOne = Math.abs(xDiff) === 1 && Math.abs(yDiff) === 2;
  let conditionTwo = Math.abs(xDiff) === 2 && Math.abs(yDiff) === 1;
  if (conditionOne || conditionTwo) {return true;};
  return false;
};

const bishopLogic = (xDiff, yDiff) => {
  if (Math.abs(xDiff) === Math.abs(yDiff)) {
    return true;
  };
  return false;
};

const queenLogic = (xDiff, yDiff) => {
  if (rookLogic(xDiff, yDiff) || bishopLogic(xDiff, yDiff)) {return true;};
  return false;
};

const kingLogic = (xDiff, yDiff) => {
  //console.log(Math.abs(xDiff), Math.abs(yDiff))
  let condition = Math.abs(xDiff) < 2 && Math.abs(yDiff) < 2;
  if (condition) {return true;};
  return false;
};

const castleLogic = (coords, xDiff, yDiff) => {
  if (Math.abs(xDiff) !== 2) {return false;};

  let kingX = coords[0];
  let kingY = coords[1];
  //let color = board.currentBoard[kingX][kingY].color;
  let isFirstKingMove = !board.currentBoard[kingX][kingY].hasMoved;

  let rookX;
  xDiff < 0 ? rookX = 7 : rookX = 0;

  let rookY;
  kingY == 0 ? rookY = 0 : rookY = 7;

  let isFirstRookMove = !board.currentBoard[0][7].hasMoved;
  let pathClear = !isPathBlocked(coords, kingX - rookX, kingY - rookY, board.currentBoard);

  //console.log(coords, xDiff, [rookX, rookY], kingX-rookX, kingY-rookY);
  //console.log(isFirstRookMove, isFirstKingMove, pathClear)

  if (isFirstRookMove && isFirstKingMove && pathClear) {return true;};


  return false;
};

/////////////////////////////

//check if move is legal based on predefined logic for piece types and checking for discovered check

const isLegalMove = (oldSquare, newSquare, board) => {
  //console.log(oldSquare.piece);

  //define column and row displacement
  let prevCol = oldSquare.column;
  let prevRow = oldSquare.row;
  let newCol = newSquare.column;
  let newRow = newSquare.row;
  let xDiff = prevCol - newCol;
  let yDiff = prevRow - newRow;

  // must not be occupied by the same color
  if (oldSquare.color === newSquare.color) {return false;};

  // must be changing something
  if (xDiff == 0 && yDiff == 0) {return false;};

  // which type of piece ?
  let piece = oldSquare.piece;
  let color = oldSquare.color;

  //get col, row coordinates
  let coords = [prevCol, prevRow];

  // As long as the piece is not a knight, we can elminate any moves where the move is not truly diagonal or perfectly straight, or if the path is blocked, since this applies to all other pieces. We only need to check on moves that have displacement of  > 1
  let pathClear = true;

  if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
    if (piece !== "knight") {
      let isTrueDiagonal = Math.abs(xDiff) === Math.abs(yDiff);
      let isPerfectlyStraight = xDiff === 0 || yDiff === 0;

      //console.log(!isTrueDiagonal, !isPerfectlyStraight);
      // stop here if not diagonal or straight
      if (!isTrueDiagonal && !isPerfectlyStraight) {
        //console.log("not a real move!")
        return false;
      }

      //path must be clear when piece is not a knight
      //console.log('path clear?' + !isPathBlocked(coords, xDiff, yDiff, board))
      if (isPathBlocked(coords, xDiff, yDiff, board)) {
        return false;
      }
    }
  }


  //   if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
  //     if (piece !== "knight") {

  //       pathClear = !isPathBlocked(coords, xDiff, yDiff, board);
  //     }
  //     //console.log(`pathClear: ${pathClear}`)
  //   }

  // if (!pathClear) {
  //   return false;
  // };

  //is the target square occupied/ move is a capture?
  let isCapturing = !!newSquare.piece;

  //console.log(xDiff, yDiff, piece, color);

  switch (piece) {
    case "pawn":
      let isFirstMove = false;
      if (prevRow == 1 && color == "black") {
        isFirstMove = true;
      } else
      if (prevRow == 6 && color == "white") {
        isFirstMove = true;
      }

      let legalPawnMove = pawnLogic(coords, xDiff, yDiff, color, isFirstMove, isCapturing);

      if (legalPawnMove) {
        //console.log("legal pawn move");
        return true;
      }
      break;

    case "rook":
      //console.log("rook")
      let legalRookMove = rookLogic(xDiff, yDiff);
      //console.log(`legalRookMove? ${legalRookMove}`)
      if (legalRookMove) {
        //console.log("legal rook move");
        return true;
      }
      break;

    case "knight":
      //console.log("knight")
      let legalKnightMove = knightLogic(xDiff, yDiff);
      //console.log(`legalKnightMove? ${legalKnightMove}`)
      if (legalKnightMove) {
        //console.log("legal knight move");
        return true;
      }
      break;

    case "bishop":
      //console.log("bishop")
      let legalBishopMove = bishopLogic(xDiff, yDiff);
      //console.log(`legalBishopMove? ${legalBishopMove}`);
      if (legalBishopMove) {
        return true;
      };
      break;

    case "queen":
      //console.log("queen")
      let legalQueenMove = queenLogic(xDiff, yDiff);
      //console.log(`legalQueenMove? ${legalQueenMove}`);
      if (legalQueenMove) {
        return true;
      };
      break;

    case "king":
      //console.log("king")
      let legalKingMove = kingLogic(xDiff, yDiff);
      let legalCastleMove = castleLogic(coords, xDiff, yDiff);

      //console.log(`legalKingMove? ${legalKingMove}`);
      //console.log(`legalCastleMove? ${legalCastleMove}`);
      if (legalKingMove) {
        return true;
      } else
      if (legalCastleMove) {
        return true;
      }
      break;}



  return false;
};

const isPathBlocked = (coords, xDiff, yDiff, board) => {// only run if dislpacement is > 1
  let prevCol = coords[0];
  let prevRow = coords[1];

  let newCol = prevCol - xDiff;
  let newRow = prevRow - yDiff;
  let pathLength;

  let movingPiece = board[prevCol][prevRow].piece;

  let isDiagonal;
  xDiff !== 0 && yDiff !== 0 ? isDiagonal = true : isDiagonal = false;

  let currentCol = prevCol;
  let currentRow = prevRow;

  let xStep;
  let yStep;
  xDiff > 0 ? xStep = -1 : xStep = 1; // assign step direction / value for x and y directions
  yDiff > 0 ? yStep = -1 : yStep = 1;

  if (isDiagonal) {
    //console.log("diagonal moving " + board.currentBoard[currentCol][currentRow].piece)

    currentCol = currentCol + xStep;
    currentRow = currentRow + yStep;
    pathLength = Math.abs(xDiff);

    for (let i = 0; i < pathLength - 1; i++) {// step from old square to new square along the path(excluding endpoints), and see if any pieces lie in the path

      let currentPiece = board[currentCol][currentRow].piece;
      //console.log(`Checking if ${movingPiece} @ ${prevCol}, ${prevRow}  can move to ${currentCol}, ${currentRow}`);

      if (!!currentPiece) {
        //console.log(`obstructed by ${currentPiece} at ${currentCol}, ${currentRow}`);  
        return true;
      };
      currentCol = currentCol + xStep;
      currentRow = currentRow + yStep;
    }

  } else

  {
    //console.log("straight line")
    let dimension; // assign dimension to be 1 if X move, or 2 if Y move
    xDiff === 0 ? dimension = 2 : dimension = 1;
    let currentPiece;

    switch (dimension) {

      case 1: // step from old square to new square along the path(excluding endpoints), and see if any pieces lie in the path
        //console.log("x - move")

        pathLength = Math.abs(xDiff);
        currentCol = currentCol + xStep;

        for (let i = 0; i < pathLength - 1; i++) {
          //console.log(currentCol, newCol)
          currentPiece = board[currentCol][currentRow].piece;
          console.log("yepper");
          if (!!currentPiece) {
            //console.log(`col obstructed by ${currentPiece} at ${currentCol}, ${currentRow}`);
            return true;
          };
          currentCol = currentCol + xStep;
        }
        break;

      case 2: // step from old square to new square along the path(excluding endpoints), and see if any pieces lie in the path
        //console.log("y - move")
        currentRow = currentRow + yStep;
        pathLength = Math.abs(yDiff);

        for (let i = 0; i < pathLength - 1; i++) {
          currentPiece = board[currentCol][currentRow].piece;
          if (!!currentPiece) {
            //console.log(`row obstructed by ${currentPiece} at ${currentCol}, ${currentRow}`)
            return true;
          };
          currentRow = currentRow + yStep;
        }
        break;}

  }

  //console.log("path clear")   
  //let pathObstructed = !!board.currentBoard[i][j].piece;
  return false;
};

const getDefendingPieces = (currentBoard, color) => {
  // find the player's pieces 
  let defendingPieces = [];
  currentBoard.forEach(thisCol => {
    thisCol.forEach(thisSquare => {
      //console.log(thisSquare.color, board.color)
      if (thisSquare.color === color) {
        defendingPieces.push(thisSquare);
      }
    });
  });
  return defendingPieces;
};

const getEmptySquares = board => {
  // find the empty squares
  let emptySquares = [];
  board.forEach(thisCol => {
    thisCol.forEach(thisSquare => {
      if (thisSquare.color === null) {
        emptySquares.push(thisSquare);
      }
    });
  });
  return emptySquares;
};

const isCurrentCheck = currentBoard => {
  let checkFound = false;
  let kingSquare;
  for (let i = 0; i < currentBoard.length; i++) {//find the king
    for (let j = 0; j < currentBoard[i].length; j++) {
      let thisSquare = currentBoard[i][j];
      if (thisSquare.piece == "king" && thisSquare.color == board.color) {
        kingSquare = thisSquare;
        //console.log(`King at ${kingSquare.column}, ${kingSquare.row}`);
        break;
      }
    }
  }

  let defendingColor = board.color === "white" ? "black" : "white";
  let defendingPieces = getDefendingPieces(currentBoard, defendingColor);

  for (let i = 0; i < defendingPieces.length; i++) {
    //console.log(`Checking if ${defendingPieces[i].piece} @ ${defendingPieces[i].column}, ${defendingPieces[i].row} attacks the king @ ${kingSquare.column}, ${kingSquare.row}`);

    if (isLegalMove(defendingPieces[i], kingSquare, currentBoard)) {
      //console.log(`${defendingPieces[i].piece} @ ${defendingPieces[i].column}, ${defendingPieces[i].row} attacks the king`)
      return true;
    }

  }

  console.log(`Discovered check: ${checkFound}`);
  return false;
};

const isDiscoveredCheck = (currentSquare, newSquare) => {
  let prevCol = currentSquare.column;
  let prevRow = currentSquare.row;
  let newCol = newSquare.column;
  let newRow = newSquare.row;

  let boardCopy = JSON.parse(JSON.stringify(board.currentBoard));

  boardCopy[newCol][newRow].piece = boardCopy[prevCol][prevRow].piece; // fill the new square with piece / properties
  boardCopy[newCol][newRow].img = boardCopy[prevCol][prevRow].img;
  boardCopy[newCol][newRow].color = boardCopy[prevCol][prevRow].color;
  boardCopy[newCol][newRow].hasMoved = true;

  boardCopy[prevCol][prevRow].piece = null; // empty the old square
  boardCopy[prevCol][prevRow].img = null;
  boardCopy[prevCol][prevRow].color = null;
  boardCopy[prevCol][prevRow].hasMoved = false;

  return isCurrentCheck(boardCopy);
};

const isCheckMate = currentBoard => {
  if (!isCurrentCheck(currentBoard)) {return false;};

  // find the player's pieces 
  let defendingPieces = getDefendingPieces(currentBoard, board.color);
  //console.log(defendingPieces);

  // find the empty squares
  let emptySquares = getEmptySquares(currentBoard);

  defendingPieces.forEach(thisPiece => {
    emptySquares.forEach(thisSquare => {
      //console.log(`Checking for checkmate escape by ${thisPiece.column}, ${thisPiece.row} ${thisPiece.piece} @ ${thisSquare.column}, ${thisSquare.row}`)

      let legalMove = isLegalMove(thisPiece, thisSquare, currentBoard);
      let discoveredCheck = isDiscoveredCheck(thisPiece, thisSquare);
      if (legalMove && !discoveredCheck) {
        //console.log("Escaping move found. Not checkmate.")
        return false;
      }
    });
  });

  return true;
};

const movePiece = (oldSquare, newSquare) => {
  newSquare.piece = oldSquare.piece; // fill the new square with piece / properties
  newSquare.img = oldSquare.img;
  newSquare.color = oldSquare.color;
  newSquare.hasMoved = true;

  oldSquare.piece = null; // empty the old square
  oldSquare.img = null;
  oldSquare.color = null;
  oldSquare.hasMoved = false;

  let prevCol = oldSquare.column;
  let prevRow = oldSquare.row;
  let newCol = newSquare.column;
  let newRow = newSquare.row;

  board.currentBoard[prevCol][prevRow] = oldSquare; //replace old squares with new ones, modified
  board.currentBoard[newCol][newRow] = newSquare;

  drawCurrentBoard();
  switchColor();
  highlightSquare(newSquare);
  lineFrom(oldSquare, newSquare);

  board.boardHistory.push(board.currentBoard); // log the board with changes
  board.pieceSelected = null; // clear selection
};

const movePieceCastling = (oldSquare, newSquare) => {

  //****move the king as in the normal case of movePiece****//
  newSquare.piece = oldSquare.piece; // fill the new square with piece / properties
  newSquare.img = oldSquare.img;
  newSquare.color = oldSquare.color;
  newSquare.hasMoved = true;

  oldSquare.piece = null; // empty the old square
  oldSquare.img = null;
  oldSquare.color = null;
  oldSquare.hasMoved = false;

  let prevCol = oldSquare.column;
  let prevRow = oldSquare.row;
  let newCol = newSquare.column;
  let newRow = newSquare.row;

  //replace old squares with new ones, modified
  board.currentBoard[prevCol][prevRow] = oldSquare;
  board.currentBoard[newCol][newRow] = newSquare;

  //********//

  //****move the rook****//
  let xDiff = prevCol - newCol;

  let rookRow = prevRow; // row won't change
  let prevRookCol; // but need before and after col, of course
  let newRookCol;
  if (xDiff > 0) {
    prevRookCol = 0;
    newRookCol = 3;
  } else
  {
    prevRookCol = 7;
    newRookCol = 5;
  }
  // get the square objects for the rook
  let oldRookSquare = Object.assign({}, board.currentBoard[prevRookCol][rookRow]);

  let newRookSquare = Object.assign({}, board.currentBoard[newRookCol][rookRow]);

  //console.log(board.currentBoard[prevRookCol][rookRow], board.currentBoard[newRookCol][rookRow])

  //modify as above with the king
  newRookSquare.piece = oldRookSquare.piece; // fill the new square with piece / properties
  newRookSquare.img = oldRookSquare.img;
  newRookSquare.color = oldRookSquare.color;
  newRookSquare.hasMoved = true;

  oldRookSquare.piece = null; // empty the old square
  oldRookSquare.img = null;
  oldRookSquare.color = null;
  oldRookSquare.hasMoved = false;

  //replace old squares with new ones, modified
  board.currentBoard[prevRookCol][rookRow] = oldRookSquare;
  board.currentBoard[newRookCol][rookRow] = newRookSquare;

  //********//

  drawCurrentBoard();
  switchColor();
  highlightSquare(newSquare);
  lineFrom(oldSquare, newSquare);

  board.boardHistory.push(board.currentBoard); // log the board with changes
  board.pieceSelected = []; // clear selection
};

const handleClick = (x, y) => {
  let coords = convertCoords(x, y); // convert raw x, y to the nearest board coordinates

  // get the indices of the point object to change in currentBoard array 
  let boardCol = board.spacingPoints.indexOf(coords.X);
  let boardRow = board.spacingPoints.indexOf(coords.Y);
  let thisSquare = Object.assign({}, board.currentBoard[boardCol][boardRow]);

  let thisColorsTurn = thisSquare.color == board.color;

  if (!board.pieceSelected) {// true if nothing selected yet
    if (!thisColorsTurn) {
      return;
    } else
    {
      highlightSquare(thisSquare);
    }
  } else
  {
    if (thisColorsTurn) {
      drawCurrentBoard();
      highlightSquare(thisSquare);
    } else
    {

      let currentRow = board.pieceSelected[0];
      let currentCol = board.pieceSelected[1];
      let currentSquare = Object.assign({}, board.currentBoard[currentRow][currentCol]);

      if (isLegalMove(currentSquare, thisSquare, board.currentBoard)) {

        if (isDiscoveredCheck(currentSquare, thisSquare)) {
          return;
        };

        console.log("making it past discovered check");

        let castlingMove;
        let conditionOne = Math.abs(currentSquare.column - thisSquare.column) === 2;
        let conditionTwo = currentSquare.piece == "king";
        if (conditionOne && conditionTwo) {
          movePieceCastling(currentSquare, thisSquare);
        } else {
          movePiece(currentSquare, thisSquare);
        }

      }
    }
    // if (isCheckMate(board.currentBoard)) {
    //   alert('Check Mate Mofo!')
    //   startGame();
    // }
  }

};
//****************************************

//********Board Display functions*********

const drawCurrentBoard = () => {
  ctx.clearRect(origin, origin, canvasSize, canvasSize);
  colorSquares();
  outlineBoard();
  placePieces();
};

const clearBoard = () => {
  board.boardHistory = [];
  board.currentBoard = [];
  board.turn = 0;
  board.color = "white";
  board.pieceSelected = null;
};

const startGame = () => {
  clearBoard();
  makeBoardArray();
  drawCurrentBoard();

  let newBoard = JSON.parse(JSON.stringify(board.currentBoard));
  board.boardHistory.push(newBoard);
};


//****************************************

//*******Click function assignments*******
$("#myCanvas").on('click', function (event) {
  let leftPad = $("#myCanvas").offset().left;
  let topPad = $("#myCanvas").offset().top;

  let xPos = event.clientX - leftPad;
  let yPos = event.clientY - topPad + $(window).scrollTop();
  //console.log(currentBoard[xPos/(boardSize-1)][yPos/(boardSize-1)]);
  //console.log(xPos, yPos);
  handleClick(xPos, yPos);
});

window.setTimeout(function () {
  startGame();
}, 500);