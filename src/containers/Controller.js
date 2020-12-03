import React from 'react';
import PropTypes from 'prop-types';

import { Board, Overlay } from '../components';
import Game from '../models/Game';

class Controller extends React.PureComponent {
  constructor(props) {
    super(props);
    this.game = new Game(props);
    this.state = { ...this.game.getState() };
  }

  componentDidMount() {
    if (this.getCurrentPlayer().isBot()) {
      this.handleBotMove();
    }
  }

  componentDidUpdate(_, { currentPlayerIndex: prevPlayerIndex }) {
    const { currentPlayerIndex } = this.state;

    if (prevPlayerIndex === currentPlayerIndex || this.hasGameEnded()) {
      return;
    }

    if (this.getCurrentPlayer().isBot()) {
      this.handleBotMove();
    }
  }

  getCurrentPlayer = () => this.props.players[this.state.currentPlayerIndex];

  hasGameEnded = () => isFinite(this.state.winnerIndex) || this.state.isTie;

  handleMove = (i, j) => {
    // Prevent human moves when it's a bot's turn
    if (this.getCurrentPlayer().isBot()) {
      return;
    }

    if (!this.game.makeMove([i, j])) {
      return;
    }

    this.updateState();
  }

  handleBotMove = async () => {
    const botMove = await this.getCurrentPlayer().getMove(this.state.board);

    this.game.makeMove(botMove);

    this.updateState();
  }

  reset = () => {
    this.game.reset();
    this.updateState();
  }

  updateState = () => this.setState({ ...this.game.getState() });

  render() {
    const { board, winnerIndex, isTie } = this.state;
    const { rows, cols, players, onQuit } = this.props;

    return (
      <>
        <Board cols={cols} rows={rows} cells={board} onCellClick={this.handleMove} />
        {this.hasGameEnded() && (
          <Overlay
            text={`${!isTie ? `Player ${winnerIndex + 1} (${players[winnerIndex].getSign()}) wins` : 'It\'s a tie'}`}
            buttons={[
              { caption: 'Back to settings', onClick: onQuit },
              { caption: 'Start over', onClick: this.reset }
            ]}
          />
        )}
      </>
    );
  }
}

Board.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.string),
  onQuit: PropTypes.func
};

export default Controller;