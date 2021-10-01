import { Box } from "@mui/system";
import React, { forwardRef } from "react";
import Square from "./Square";

const GameBoard = forwardRef((props, ref) => {
  const { className, history, moveNumber, handleSquareClick } = props;

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        width: "350px",
        height: "350px",
        margin: "auto",
        display: "grid",
        gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
      }}
    >
      {history[moveNumber].map((squareValue, index) => (
        <Square
          key={index}
          squareID={index}
          squareValue={squareValue}
          handleSquareClick={handleSquareClick}
        ></Square>
      ))}
    </Box>
  );
});
export default GameBoard;
