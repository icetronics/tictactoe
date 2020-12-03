export const EMPTY = '';

const isValidIndex = (i, max) => i >= 0 && i < max;

class Game {
  constructor({ rows, cols, players }) {
    this.rows = rows;
    this.cols = cols;
    this.players = players;
    this.reset();
  }

  getInitialState() {
    const moves = [];
  
    for (let i = 0; i < this.rows; i++) {
      const row = [];
  
      for (let j = 0; j < this.cols; j++) {
        row.push(EMPTY);
      }
  
      moves.push(row);
    }
  
    return moves;
  }

  reset() {
    this.board = this.getInitialState();
    this.currentPlayerIndex = 0;
    this.winnerIndex = undefined;
    this.isTie = false;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getNextPlayerIndex() {
    return this.currentPlayerIndex + 1 === this.players.length ? 0 : this.currentPlayerIndex + 1;
  }

  checkWin() {
    const currentPlayerSign = this.getCurrentPlayer().getSign();

    // Checking for whole rows
    for (let i = 0; i < this.rows; i++) {
      const wholeRow = this.board[i].every(x => x === currentPlayerSign);

      if (wholeRow) {
        return true;
      }
    }

    // Checking for whole columns
    for (let j = 0; j < this.cols; j++) {
      const wholeCol = this.board
        .flatMap(row => row.filter((_, i) => i === j))
        .every(x => x === currentPlayerSign);

      if (wholeCol) {
        return true;
      }
    }

    // Checking for whole primary diagonal
    let wholeDiagonal = true;
    for (let i = 0; i < this.rows; i++) {
      if (this.board[i][i] !== currentPlayerSign) {
        wholeDiagonal = false;
        break;
      }
    }

    if (wholeDiagonal) {
      return true;
    }

    // Checking for whole secondary diagonal
    wholeDiagonal = true;
    for (let i = 0; i < this.rows; i++) {
      if (this.board[i][this.rows - 1 - i] !== currentPlayerSign) {
        wholeDiagonal = false;
        break;
      }
    }

    if (wholeDiagonal) {
      return true;
    }

    return false;
  }

  isBoardFull() {
    for (let i = 0; i < this.rows; i++) {
      if (this.board[i].some(x => x === EMPTY)) {
        return false;
      }
    }

    return true;
  }

  makeMove([ i, j ]) {
    // Check index ranges and whether target is still empty
    if (
      !isValidIndex(i, this.rows) ||
      !isValidIndex(j, this.cols) ||
      this.board[i][j] !== EMPTY
    ) {
      return false;
    }

    const newBoard = [].concat(this.board);
  
    newBoard[i][j] = this.getCurrentPlayer().getSign();

    this.board = newBoard;

    if (this.checkWin()) {
      this.winnerIndex = this.currentPlayerIndex;
    } else if (this.isBoardFull()) {
      this.isTie = true;
    }

    this.currentPlayerIndex = this.getNextPlayerIndex();
  
    return true;
  }

  getState() {
    return {
      board: this.board,
      currentPlayerIndex: this.currentPlayerIndex,
      winnerIndex: this.winnerIndex,
      isTie: this.isTie
    };
  }
}

export default Game;
