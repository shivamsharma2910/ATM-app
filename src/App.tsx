import React from 'react';
import { useState } from "react";
import './App.css';

function App() {
  const denominations = [1000, 500, 200, 100, 50, 20, 10];
  const [amount, setAmount] = useState(0);
  const [validAmount, setValidAmount] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(new Array(denominations.length).fill(false));
  const [resultArray, setResultArray] = useState(new Array(denominations.length).fill(0))
  const regexPattern = new RegExp('^[1-9][0-9]*0$');

  // Validate entered amount and update state variables accordingly
  function validateNumber(amount: string) {
    if (amount === '') {
      setValidAmount(true);
    } else if(regexPattern.test(amount)) {
      setAmount(parseInt(amount));
      setValidAmount(true); 
    } else {
      setValidAmount(false);
    }
    setResultArray(new Array(denominations.length).fill(0))
  }

  //Figure out the different denominations count
  function getNotes() {
    let resultArray = [];
    let tempAmount = amount;
    // If denominations are selected
    if (selectedIndex.includes(true)) {
      for (let i = 0; i < denominations.length; i++) {
        if (selectedIndex[i]) {
          resultArray.push(Math.floor(tempAmount / denominations[i]));
          tempAmount = tempAmount % denominations[i];
        } else {
          resultArray.push(0);
        }
      }
      // If selected denominations can not make up to total amount
      if (tempAmount !== 0) {
        for (let i = 0; i < denominations.length; i++) {
          if (resultArray[i] === 0) {
            resultArray[i] = Math.floor(tempAmount / denominations[i])
            tempAmount = tempAmount % denominations[i];
          }
        }
      }
      
    } else {
      //If no denominations are selected
      for (let i = 0; i < denominations.length; i++) {
        resultArray.push(Math.floor(tempAmount / denominations[i]));
        tempAmount = tempAmount % denominations[i];
      }
    }
    setResultArray(resultArray);
  }

  // Update the checkbox selection state
  function handleOnChange(position: number) {
    const updatedCheckedState = selectedIndex.map((item: boolean, index: number) =>
      index === position ? !item : item
    );
    setSelectedIndex(updatedCheckedState);
  }

  return (
    <div className="App">
      <h1>ATM APP </h1>
      <label>Select Denominations if required</label>
      <div>
        {denominations.map((value, index) => {
          return (
              <div key={index} className="denominations-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    value={value}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{value}</label>
                </div>
              </div>
          );
        })}
        </div>
        <div className="amount-section">
          <span>Enter Amount</span>
          <input step="10" className="amount-text" type="number" placeholder="Amount in multiples of 10" onChange={(e)=>validateNumber(e.target.value)}/>
          <div>
            <button className="crunch-button" disabled={!validAmount} onClick={e=>getNotes()}>Crunch</button>
          </div>
          { !validAmount && <div className="error-message">Kindly enter positive amount in multiples of 10.   </div> }

            <table>
              <thead>
                <tr>
                  <th>Denominations</th>
                  <th>Number of notes</th>
                </tr>
              </thead>
              <tbody>{denominations.map((value, index)=> {
                return (
                  (resultArray[index]!==0) && <tr key={index}><td>{value}</td><td>{resultArray[index]}</td></tr>
                );
              })}
              </tbody>
            </table>
        </div>
    </div>
  );
}

export default App;
