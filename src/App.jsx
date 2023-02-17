import { useState } from "react";
import "./App.css";
import CellBoard from "./components/cell-board/CellBoard";
import Modal from "./components/modal/Modal";

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const BOARD = [
  { id: 1, cls: "cell", empty: true },
  { id: 2, cls: "cell", empty: true },
  { id: 3, cls: "cell", empty: true },
  { id: 4, cls: "cell", empty: true },
  { id: 5, cls: "cell", empty: true },
  { id: 6, cls: "cell", empty: true },
  { id: 7, cls: "cell", empty: true },
  { id: 8, cls: "cell", empty: true },
  { id: 9, cls: "cell", empty: true },
];
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(X_CLASS);
  const [cellList, setCellList] = useState(BOARD);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [winningMessage, setWinningMessage] = useState("");

  const handleMouseEnter = (cell) => {
    if (cell.empty) {
      setCellList((prevState) => updateHooverCellList(prevState, cell));
    }
    setIsHovering(true);
  };

  const handleMouseLeave = (cell) => {
    if (cell.empty) {
      setCellList((prevState) => updateUnHooverCellList(prevState, cell));
    }
    setIsHovering(false);
  };

  const updateHooverCellList = (prevState, cell) => {
    return prevState.map((item) => {
      if (item.id === cell.id) {
        item.cls = item.cls + " " + board;
      }
      return item;
    });
  };

  const updateUnHooverCellList = (prevState, cell) => {
    return prevState.map((item) => {
      if (item.id === cell.id) {
        item.cls = item.cls.substring(0, 4);
      }
      return item;
    });
  };

  const placeMark = (cell) => {
    if (cell.empty) {
      setCellList((prevState) => updateCellList(prevState, cell));
      console.log(isDraw());
      if (checkWin(cellList)) {
        endGame(false);
      } else if (isDraw() === 8) {
        endGame(true);
        console.log("draw");
      } else {
        setBoard(swapTurn());
      }
    }
  };

  const updateCellList = (prevState, cell) => {
    return prevState.map((item) => {
      if (item.id === cell.id) {
        item.empty = false;
        item.cls = item.cls.substring(0, 4) + " " + board;
      }
      return item;
    });
  };

  const resetCellList = (prevState) => {
    return prevState.map((item) => {
      item.cls = item.cls.substring(0, 4);
      item.empty = true;
      return item;
    });
  };

  const endGame = (draw) => {
    if (draw) {
      setWinningMessage("Draw!");
    } else {
      setWinningMessage(`${board === CIRCLE_CLASS ? "O's" : "X's"} Wins!`);
    }
    openModal();
  };

  const isDraw = () => {
    // return cellList.every(cell => {
    //     return cell.empty === false;
    // })
    return cellList.filter((item) => item.empty === false).length;
  };

  const swapTurn = () => `${board === X_CLASS ? CIRCLE_CLASS : X_CLASS}`;

  const checkWin = (cellList) => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return (
          cellList[index].cls ===
          cellList[index].cls.substring(0, 4) + " " + board
        );
      });
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const restartGame = () => {
    setBoard(X_CLASS);
    setCellList((prevState) => resetCellList(prevState));
    setWinningMessage("");
    closeModal();
  };

  return (
    <div className="App">
      <div className="board">
        {cellList.map((cell, key) => (
          <CellBoard
            key={cell.id}
            id={cell.id}
            cls={cell.cls}
            color={cell.color}
            onClick={() => placeMark(cell)}
            onMouseEnter={() => handleMouseEnter(cell)}
            onMouseLeave={() => handleMouseLeave(cell)}
            isHovering={isHovering}
          />
        ))}
      </div>
      <Modal isOpen={isOpen}>
        <div>{winningMessage}</div>
        <button onClick={restartGame}>Restart</button>
      </Modal>
    </div>
  );
}

export default App;
