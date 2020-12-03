import React from 'react';
import PropTypes from 'prop-types';

import './board.scss';

const Board = ({ rows, cols, cells, onCellClick }) => (
  <div className="boardContainer">
    <table className="board">
      <tbody>
        {[...Array(rows).keys()].map(i => (
          <tr key={i}>
            {[...Array(cols).keys()].map(j => (
              <td key={j}>
                <button onClick={() => onCellClick(i, j)}>{cells[i] && cells[i][j]}</button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Board.defaultProps = {
  rows: 0,
  cols: 0
};

Board.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
  cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onCellClick: PropTypes.func
};

export default Board;