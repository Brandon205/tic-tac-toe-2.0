import React from 'react';
import GameBoard from './GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 id="game-name">Tic-Tac-Toe</h1>
      <div className="game">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
