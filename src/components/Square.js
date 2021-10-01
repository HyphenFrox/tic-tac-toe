import { Typography } from "@mui/material";
import { lightBlue, grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import React, { forwardRef } from "react";

const StyledButton = styled("button")({});

const Square = forwardRef((props, ref) => {
  const { className, squareID, squareValue, handleSquareClick } = props;
  return (
    <StyledButton
      ref={ref}
      onClick={handleSquareClick(squareID)}
      className={className}
      sx={{
        backgroundColor: lightBlue["A400"],
        cursor: "pointer",
        "&:hover": {
          backgroundColor: lightBlue["A200"],
        },
        border: `1px solid ${grey["600"]}`,
      }}
    >
      <Typography variant="h4" sx={{ fontSize: "1.4rem" }}>
        {squareValue}
      </Typography>
    </StyledButton>
  );
});
export default Square;
