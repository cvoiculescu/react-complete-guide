import { INITIAL_GAME_BOARD, PLAYERS } from "./data/initial.js";
import { WINNING_COMBINATIONS } from "./data/winning-combinations.js";

import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";


function newBoard(board) {
    return [...board.map(line => [...line])];
}

function deriveActivePlayer(turns) {
    let currentPlayer = 'X';
    if (turns.length > 0 && turns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function derivedWinner(players, board) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = board[combination[0].row][combination[0].column];
        const secondSquareSymbol = board[combination[1].row][combination[1].column];
        const thirdSquareSymbol = board[combination[2].row][combination[2].column];
        if (firstSquareSymbol
            && firstSquareSymbol === secondSquareSymbol
            && firstSquareSymbol === thirdSquareSymbol
        ) winner = players[firstSquareSymbol];
    }
    return winner;
}

function derivedGameBoard(turns) {
    let gameBoard = newBoard(INITIAL_GAME_BOARD);

    for (const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
}


function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = deriveActivePlayer(gameTurns);
    let gameBoard = derivedGameBoard(gameTurns);
    const winner = derivedWinner(players, gameBoard);
    const hasDraw = !winner && gameTurns.length === 9;

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            return [
                {
                    square: {row: rowIndex, col: colIndex},
                    player: currentPlayer
                },
                ...prevTurns
            ];
        })
    }

    function handleRestart() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        });
    }

    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="0"
                        isActive={activePlayer === 'O'}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
            </div>
            <Log turns={gameTurns}></Log>
        </main>
    )
}

export default App
