import { useState } from 'react';

enum Turn {
    X = 'x',
    O = 'o'
}

interface Combos {
    across: Array<Array<number>>;
    down: Array<Array<number>>;
    diagonal: Array<Array<number>>;
}

const Grid = () => {
    const [turn, setTurn] = useState(Turn.X);
    const [cells, setCells] = useState<Array<Turn | null>>(Array(9).fill(null));
    const [winner, setWinner] = useState<Turn | null>(null);

    const checkForWinner = (squares: Array<Turn | null>) => {
        const combos: Combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        for (let combo in combos) {
			combos[combo as keyof Combos].forEach((pattern) => {
				if (
					squares[pattern[0]] === null ||
					squares[pattern[1]] === null ||
					squares[pattern[2]] === null
				) {
					// do nothing
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]] as Turn);
				}
			});
		}
    }

    const handleCellClick = (num: number) => {
        if (cells[num] !== null) {
            return;
        }

        let squares: Array<Turn | null> = [...cells];

        if (turn === Turn.O) {
            squares[num] = Turn.O;
            setTurn(Turn.X);
        } else if (turn === Turn.X) {
            squares[num] = Turn.X;
            setTurn(Turn.O);
        }

        setCells(squares);
        checkForWinner(squares);
    }

    const Cell = ({ num }: { num: number}) => {
        return (
            <button
                onClick={() => handleCellClick(num)}
                disabled={ cells[num] !== null }
                style={{ padding: '30px'}}
            >
                { cells[num] }
            </button>
        );
    }

    const winnerComponent = winner ? (
        <p>The winner is: { winner }!</p>
    ) : null;

    return (
        <>
            <h2>Turn: { turn }</h2>
            <div>
                <Cell num={ 0 }/>
                <Cell num={ 1 }/>
                <Cell num={ 2 }/>
                <Cell num={ 3 }/>
                <Cell num={ 4 }/>
                <Cell num={ 5 }/>
                <Cell num={ 6 }/>
                <Cell num={ 7 }/>
                <Cell num={ 8 }/>
            </div>
            { winnerComponent }
        </>
    );
};

export default Grid;