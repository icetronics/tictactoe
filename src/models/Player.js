import { EMPTY } from './Game';

export const PLAYER_TYPE = {
  BOT: 'bot',
  HUMAN: 'human'
};

const getRandomIndex = max => Math.floor(Math.random() * (max + 1));

class Player {
  constructor({ type, sign}) {
    this.type = type;
    this.sign = sign;
  }

  isBot() {
    return this.type === PLAYER_TYPE.BOT;
  }

  getType() {
    return this.type;
  }

  getSign() {
    return this.sign;
  }
}

export class RndBot extends Player {
  constructor(params) {
    super(params);
    this.type = PLAYER_TYPE.BOT;
  }

  isBot() {
    return true;
  }

  async getMove(board = []) {
    // Bot is thinking...
    await new Promise(resolve => setTimeout(resolve, 1000));
    const maxIndex = board.length - 1;

    let i = getRandomIndex(maxIndex);
    let j = getRandomIndex(maxIndex);
    let isCellEmpty = board[i][j] === EMPTY;

    while (!isCellEmpty) {
      i = getRandomIndex(maxIndex);
      j = getRandomIndex(maxIndex);
      isCellEmpty = board[i][j] === EMPTY;
    }

    return [i, j];
  }
}

export default Player;