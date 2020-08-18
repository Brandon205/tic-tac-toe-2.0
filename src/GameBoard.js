import React, { useState, useEffect } from 'react';

export default function GameBoard() {
    const winCond = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const [turn, setTurn] = useState(true); // True value === player1's turn
    const [win, setWin] = useState(false);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        bestMove()
    }, [])

    let checkSame = (arr) => {
        let board = document.querySelector('.board').childNodes
        if (board[arr[0]].textContent !== " " && board[arr[0]].textContent === board[arr[1]].textContent && board[arr[0]].textContent === board[arr[2]].textContent) { // 3 in a row
            setWin(true);
            console.log(turn ? "X is the winner" : "O is the winner")
            board[arr[0]].classList.add("winner")
            board[arr[1]].classList.add("winner")
            board[arr[2]].classList.add("winner")
            return turn ? "O" : "X"
        }
    }

    let checkWinner = () => {
        let winner = null
        for (let i = 0; i < winCond.length; i++) {
            let result = checkSame(winCond[i])
            if (result === "win") {
                return "X"
            }
        }
        if (moves >= 8) { // Tie Game
            setWin(true)
            console.log("Tie Game")
            setMoves(0)
            return "tie"
        }
        return winner
    }

    let play = (e) => {
        if (!turn) {
            if (e.target.textContent === " " && !win) {
                // e.target.textContent = turn ? "X" : "O" // For multiplayer games
                e.target.textContent = "O"
                checkWinner();
                setMoves(moves + 1)
                setTurn(!turn)
                if (!turn && !win) {
                    bestMove()
                }
            }
        }
    }

    let reset = () => {
        let board = document.querySelector('.board').childNodes
        for (let i = 0; i < board.length; i++) {
            board[i].classList.remove("winner")
            board[i].textContent = " "
        }
        setMoves(0)
        setWin(false)
        bestMove()
    }

    // AI Algorithms: O is human, X is AI
    function bestMove() {
        let board = document.querySelector('.board').childNodes
        let bestScore = -1000;
        let move;
        for (let i = 0; i < 9; i++) {
            if (board[i].textContent === ' ') { // Is the spot open
              board[i].textContent = "X";
              let score = minimax(board, 0, false);
              board[i].textContent = ' ';
              if (score > bestScore) {
                bestScore = score;
                move = i
              }
            }
        }
        board[move].textContent = "X";
        setTurn(false);
        setMoves(moves + 1)
      }

      let scores = {
        X: 10,
        O: -10,
        tie: 0
      };
      
      function minimax(board, depth, isMaximizing) {
        let result = checkWinner();
        if (result !== null) {
          return scores[result];
        }
      
        if (isMaximizing) {
          let bestScore = -Infinity;
          for (let i = 0; i < 9; i++) {
            if (board[i].textContent === ' ') { // Is the spot open
            board[i].textContent = "X";
            let score = minimax(board, depth + 1, false);
            board[i].textContent = ' ';
            bestScore = Math.max(score, bestScore);
            }
          }
          return bestScore;
        } else {
          let bestScore = Infinity;
          for (let i = 0; i < 9; i++) {
            if (board[i].textContent === '') { // Is the spot open
            board[i].textContent = "O";
            let score = minimax(board, depth + 1, true);
            board[i].textContent = ' ';
            bestScore = Math.min(score, bestScore);
            }
          }
          return bestScore;
        }
      }

    return (
        <>
            <div className="board">
                <div className="gametile" onClick={(e) => play(e)}> </div>
                <div className="gametile" onClick={(e) => play(e)}> </div>
                <div className="gametile" onClick={(e) => play(e)}> </div>

                <div className="gametile" onClick={(e) => play(e)}> </div>
                <div className="gametile" onClick={(e) => play(e)}> </div>
                <div className="gametile" onClick={(e) => play(e)}> </div>

                <div className="gametile" onClick={(e) => play(e)}> </div>
                <div className="gametile" onClick={(e) => play(e)}> </div>
                <div className="gametile" onClick={(e) => play(e)}> </div>
            </div>

            <button onClick={() => reset()}>Reset</button>
        </>
    )
}
