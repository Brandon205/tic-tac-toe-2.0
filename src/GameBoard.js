import React, { useState } from 'react';

export default function GameBoard() {
    const winCond = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const [turn, setTurn] = useState(true); // True value === player1's turn
    const [win, setWin] = useState(false);
    const [moves, setMoves] = useState(0);

    let checkSame = (arr) => {
        let board = document.querySelector('.board').childNodes
        if (board[arr[0]].textContent !== " " && board[arr[0]].textContent === board[arr[1]].textContent && board[arr[0]].textContent === board[arr[2]].textContent) { // 3 in a row
            setWin(true);
            console.log(turn ? "X is the winner" : "O is the winner")
            board[arr[0]].classList.add("winner")
            board[arr[1]].classList.add("winner")
            board[arr[2]].classList.add("winner")
        }
    }

    let checkWinner = () => {
        for (let i = 0; i < winCond.length; i++) {
            checkSame(winCond[i])
        }
        if (moves >= 8) { // Tie Game
            setWin(true)
            console.log("Tie Game")
        }
    }

    let play = (e) => {
        if (e.target.textContent === " " && !win) {
            e.target.textContent = turn ? "X" : "O"
            checkWinner();
            setMoves(moves + 1)
            setTurn(!turn)
        }
    }

    let reset = () => {
        let board = document.querySelector('.board').childNodes
        for (let i = 0; i < board.length; i++) {
            board[i].classList.remove("winner")
            board[i].textContent = " "
            setMoves(0)
        }
        setWin(false)
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
