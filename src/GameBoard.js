import React, { useState } from 'react';

export default function GameBoard() {
    const winningSol = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const [turn, setTurn] = useState(true); // True value == player1's turn
    const [win, setWin] = useState(false);

    let checkWinner = () => {
        let board = document.querySelector('.board').childNodes
        for (let i = 0; i < board.length; i++) {
            console.log(board[i])
        }
    }

    let play = (e) => {
        if (e.target.value !== "X" && e.target.value !== "O" && !win) {
            e.target.textContent = turn ? "X" : "O"
            checkWinner();
            setTurn(!turn)
        }
    }

    return (
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
    )
}
