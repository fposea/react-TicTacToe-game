import React from "react";
import "./CellBoard.css";

const CellBoard = (props) => {
  
  return (
    <div
      className={props.cls}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      style={{color: props.isHovering ? "lightgrey" : "black"}}
    ></div>
  );
};

export default CellBoard;
