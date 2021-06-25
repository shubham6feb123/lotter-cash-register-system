import React, { useEffect, useRef, useState } from "react";
import "../style/control.css";

function Controls() {
  let cashSelected = [];
  let buttonRef = useRef();
  let [selectedNumbers, setSelectedNumbers] = useState([]);
  const [totalCash, setTotalCash] = useState(0);
  let buttons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const buttonClicked = (e) => {
    if (
      selectedNumbers.length <= 4 &&
      !selectedNumbers.includes(e.target.value)
    ) {
      setSelectedNumbers([...selectedNumbers, e.target.innerText]);
      console.log(" value", e.target.value);
      console.log("selected numbers", selectedNumbers);
      e.target.className = "buttonClicked";
    } else if (
      selectedNumbers.includes(e.target.value) &&
      selectedNumbers.length <= 4
    ) {
      alert("Number unselected and select other one");
      e.target.className = "button";
      let index = selectedNumbers.indexOf(e.target.value);
      selectedNumbers.splice(index, 1);
      console.log("index", index);
    } else {
      alert("You can not select numbers more than 5");
    }
  };

  const cashButton = (e) => {
    if (selectedNumbers.length === 5) {
      cashSelected = [...cashSelected, parseInt(e.target.value)];
    } else {
      alert("Please Select 5 Numbers");
    }
  };

  const showOutput = (e) => {
    if (e.target.innerText === "Clear") {
      window.location.reload();
    } else if (cashSelected.length === 0) {
      alert("Please Select Cash");
    } else {
      setTotalCash(
        cashSelected.reduce((accumulator = 0, currentValue) => {
          return accumulator + currentValue;
        }, 0)
      );
    }
  };

  return (
    <div className="controls">
      <div className="controls_left">
        <div className="conrols_left_cashButton">
          <button onClick={cashButton} value="1">
            $1
          </button>
          <button onClick={cashButton} value="5">
            $5
          </button>
          <button onClick={cashButton} value="10">
            $10
          </button>
          <button onClick={cashButton} value="20">
            $20
          </button>
        </div>
      </div>
      <div className="controls_mid">
        {buttons.map((button, index) => {
          return (
            <button
              key={index}
              ref={buttonRef}
              value={index + 1}
              className="button"
              onClick={buttonClicked}
            >
              {button}
            </button>
          );
        })}
        <button className=" cash" onClick={showOutput}>
          Cash
        </button>
        <button className="clear" onClick={showOutput}>
          Clear
        </button>
        {/* <button className=" random" onClick={showOutput}>
          Numbers
        </button> */}
      </div>
      <div className="controls_right">
        <div className="controls_right_numberOutput">
          <h4>Numbers Selected</h4>
          {selectedNumbers.map((number, index) => (
            <p key={index}>Number:{number}</p>
          ))}
        </div>
        <div className="controls_right_cashOutput">
          <p>Total:${totalCash}</p>
        </div>
      </div>
    </div>
  );
}

export default Controls;
