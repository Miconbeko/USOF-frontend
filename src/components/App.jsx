import { useState } from 'react';

function Square({ value, onClickHandler }) {
    return <button className="square" onClick={onClickHandler}>{value}</button>
}

function Board({ nextX, squares, onPlay }) {
    let winner = calculateWinner()
    let status

    if (winner)
        status = `${winner} Wins`
    else
        status = `Now turn ${nextX ? `X` : `O`}`

    function calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
                return squares[a]
        }
        return null
    }

    function handleClick(i) {
        if (squares[i] || calculateWinner())
            return

        const newSquares = squares.slice()

        if (nextX)
            newSquares[i] = `X`
        else
            newSquares[i] = 'O'

        onPlay(newSquares)
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onClickHandler={() => handleClick(0)} />
                <Square value={squares[1]} onClickHandler={() => handleClick(1)} />
                <Square value={squares[2]} onClickHandler={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClickHandler={() => handleClick(3)} />
                <Square value={squares[4]} onClickHandler={() => handleClick(4)} />
                <Square value={squares[5]} onClickHandler={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClickHandler={() => handleClick(6)} />
                <Square value={squares[7]} onClickHandler={() => handleClick(7)} />
                <Square value={squares[8]} onClickHandler={() => handleClick(8)} />
            </div>
        </div>
    );
}

export default function Game() {
    const [currentMove ,setCurrentMove] = useState(0)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const nextX = currentMove % 2 === 0
    const currentSquares = history[currentMove]

    function handlePlay(newSquares) {
        const newHistory = [...history.slice(0, currentMove + 1), newSquares]

        setHistory(newHistory)
        setCurrentMove(newHistory.length - 1)
    }

    function jumpTo(move) {
        setCurrentMove(move)
    }

    const moves = history.map((squares, move) => {
        let description

        if (move > 0)
            description = `Goto move #${move}`
        else
            description = `Goto start`

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board nextX={nextX} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}
