import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Wheel(props) {
  const { moveClockwise, moveCounterClockwise, wheel } = props;

  const handleMoveClockWise = (evt) => {
    const { value } = evt.target;
    moveClockwise(value);
    console.log(props);
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`${wheel === 0 ? 'cog active' : 'cog'}`} style={{ "--i": 0 }}>{wheel === 0 ? 'B' : ''}</div>
        {/* <div className="cog active" style={{ "--i": 0 }}>B</div> */}
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn">Counter clockwise</button>
        <button onClick={handleMoveClockWise} id="clockwiseBtn">
          Clockwise
        </button>
      </div>
    </div>
  );
}

export default connect((state) => state, actionCreators)(Wheel);
