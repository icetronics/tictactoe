import React, { useState } from 'react';
import classNames from 'classnames';

import Controller from './containers/Controller';
import Player, { RndBot, PLAYER_TYPE } from './models/Player';

import './App.scss';

const DEFAULT_SIZE = 3;
const { BOT, HUMAN } = PLAYER_TYPE;
const DEFAULT_SIGN = '?';
const DEFAULT_PLAYERS = [
  new Player({ type: HUMAN, sign: 'X' }),
  new RndBot({ sign: 'O' })
];

const App = () => {
  const [isStarted, start] = useState(false);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [players, setPlayers] = useState(DEFAULT_PLAYERS);

  const setPlayerType = (i, type) => {
    const newPlayers = [].concat(players);
    const PlayerType = type === HUMAN ? Player : RndBot;

    newPlayers[i] = new PlayerType({ type, sign: players[i].getSign() });

    setPlayers(newPlayers);
  };

  const setPlayerSign = i => {
    const sign = prompt(`Enter sign (a single character) for Player ${i + 1}`);

    if (!sign || sign.length !== 1) {
      return;
    }

    const newPlayers = [].concat(players);
    const type = players[i].getType();
    const PlayerType = type === HUMAN ? Player : RndBot;

    newPlayers[i] = new PlayerType({ type: players[i].getType(), sign });

    setPlayers(newPlayers);
  };

  const addNewPlayer = () => {
    setPlayers([...players, new Player({ type: HUMAN, sign: DEFAULT_SIGN })])
  };

  const removePlayer = index => {
    const newPlayers = [].concat(players);
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  return (
    <div className="App">
      {!isStarted && (
        <div className="settings">
          <div>
            <button onClick={() => size > 2 && setSize(size - 1)} className="action">-</button>
            <span>{size} × {size}</span>
            <button onClick={() => setSize(size + 1)} className="action">+</button>
          </div>
          <div>
            {players.map(({ type, sign }, i) => (
              <div key={i}>
                <button onClick={() => removePlayer(i)} className="action">-</button>
                <span>Player {i + 1}</span>
                <span>
                  <button
                    onClick={() => setPlayerType(i, HUMAN)}
                    className={classNames({ typeButton: true, selected: type === HUMAN})}>
                    Human
                  </button>
                  <button
                    onClick={() => setPlayerType(i, BOT)}
                    className={classNames({ typeButton: true, selected: type === BOT})}>
                    Robot
                  </button>
                </span>
                <button
                  onClick={() => setPlayerSign(i)}
                  className={classNames({ signButton: true, warn: sign === DEFAULT_SIGN })}>
                  {sign}
                </button>
              </div>
            ))}
            <button onClick={addNewPlayer} className="action">+</button>
          </div>
          <button onClick={() => start(true)} className="action">Start game</button>
        </div>
      )}
      {isStarted && <Controller rows={size} cols={size} players={players} onQuit={() => start(false)} />}
    </div>
  );
};

export default App;
