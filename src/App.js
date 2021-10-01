import React, { useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import calculateWinner from "./utilities/calculateWinner";

//
import GameBoard from "./components/GameBoard";
import "./App.scss";
//

const appTheme = createTheme({
  typography: {
    fontFamily: "'Noto Sans Display', sans-serif",
  },
});

function App() {
  const [history, setHistory] = useState([new Array(9).fill(null)]);
  const [moveNumber, setMoveNumber] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(history[moveNumber]);
  const isGameTied = moveNumber === 9 && !winner;

  const handleSquareClick = (squareID) => () => {
    if (history[moveNumber][squareID] || winner) {
      return;
    }

    setHistory((history) => {
      history = history.slice(0, moveNumber + 1); // chop off the history older than the step number

      const boardState = history[moveNumber]; // the last board state
      let newBoardState = [...boardState]; // create the new board state same as the old one
      newBoardState[squareID] = isXNext ? "X" : "O"; // modify the new baord state

      history.push(newBoardState); // push the new board state to the new history
      return history; // retrun the new history
    });
    setMoveNumber((oldMoveNumber) => ++oldMoveNumber); // increment the move number
    setIsXNext((curentIsXNext) => !curentIsXNext); // flip the turns
  };

  const handleGoToMove = (moveNumber) => () => {
    setMoveNumber(moveNumber);
  };

  const handleRestartGame = () => {
    setHistory([new Array(9).fill(null)]);
    setMoveNumber(0);
    setIsXNext(true);
  };

  const winnerMessage = (
    <Typography variant="h4" align="center" sx={{ fontSize: "1.3rem" }}>
      {winner} won!
    </Typography>
  );

  const tieMessage = (
    <Typography variant="h4" align="center" sx={{ fontSize: "1.3rem" }}>
      Game Tied!
    </Typography>
  );

  const turnMessage = (
    <Typography variant="h4" align="center" sx={{ fontSize: "1.3rem" }}>
      {isXNext ? "X" : "O"}'s turn
    </Typography>
  );

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline></CssBaseline>
      <Box
        sx={{
          height: "100%",
          padding: "1em",
        }}
      >
        <GameBoard
          history={history}
          moveNumber={moveNumber}
          handleSquareClick={handleSquareClick}
        ></GameBoard>

        {/* winner and turn message section */}
        <Box
          sx={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5em",
          }}
        >
          {winner ? winnerMessage : isGameTied ? tieMessage : null}
          {!winner && moveNumber > 0 && moveNumber < 9 ? turnMessage : null}
          {winner || isGameTied ? (
            <Button variant="contained" onClick={handleRestartGame}>
              Restart Game
            </Button>
          ) : null}
        </Box>

        {/* move box */}
        {history.length > 1 ? (
          <Box sx={{ marginTop: "1em" }}>
            {history.map((...args) => {
              const [, index] = args;
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                    Go to:{" "}
                  </Typography>
                  <Button size="large" onClick={handleGoToMove(index)}>
                    Move No. {index}
                  </Button>
                </Box>
              );
            })}
          </Box>
        ) : null}
      </Box>
    </ThemeProvider>
  );
}

export default App;
