import React, {useState} from 'react';
import { calculateWinner } from '../helper';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  let winner = calculateWinner(history[stepNumber]);
  const XO = xIsNext?'X':'O';

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber+1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    //return if won or occupied
    if(winner || squares[i]) return;
    //select square
    squares[i] = XO;
    setStepNumber(historyPoint.length);
    setHistory([...historyPoint, squares]);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (move) => {
    setStepNumber(move);
    setXIsNext(move%2===0);
  }

  const renderHistory = () => {
    history.map((historyPoint, move) => {
        const destination = move?'Go to move: ' + move: 'Go to start';
        return (
            <span key={move}>
                <button onClick={()=>{jumpTo(move)}}>{destination}</button>
            </span>
        );
    });
  }
  
  return (
    <>
        <h1>React Tic Tac Toe with Hooks</h1>
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <div className="info-wrapper">
            <div>
                <h3>History</h3>
                <ul>
                    {
                        history.map((historyPoint, move) => {
                            const destination = move?'Go to move: ' + move: 'Go to start';
                            return (
                              <li key={move}>
                                  <button onClick={()=>{jumpTo(move)}}>{destination}</button>
                              </li>
                            );
                          })
                        // renderHistory()
                    }
                </ul>
            </div>
            <h3>{winner?"Winner is: "+winner:"Next Player is: "+XO}</h3>
        </div>
    </>
  )
}

export default Game