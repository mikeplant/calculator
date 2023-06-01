const buttons = document.querySelectorAll('button');
const firstNumDisplay = document.querySelector('.first-num-display');
const secondNumDisplay = document.querySelector('.second-num-display');
const operatorDisplay = document.querySelector('.operator-display');
const resultDisplay = document.querySelector('.result-display'); 
let firstNum;
let secondNum;
let operator;
let result;


function add(a, b) {
  result = a + b;
}

function subtract(a, b) {
  result = a - b;
}

function multiply(a, b) {
  result = a * b;
}

function divide(a, b) {
  result = a / b;
}

function clearInputDisplay() {
  firstNumDisplay.textContent = '';
  secondNumDisplay.textContent = '';
  operatorDisplay.textContent = '';
}

function clearAll(inputDisplay, resultDisplay) {
  firstNum = '';
  secondNum = '';
  operator = '';
  result = '';
  resultDisplay.textContent = '';
  clearInputDisplay();
}

function operate(operator, firstNum, secondNum) {
  switch (operator) {
    case 'add': 
      add(firstNum, secondNum);
      break;
    case 'subtract':
      subtract(firstNum, secondNum);
      break;
    case 'multiply':
      multiply(firstNum, secondNum);
      break;
    case 'divide':
      divide(firstNum, secondNum);
  };
  resultDisplay.textContent = result;
}

buttons.forEach(btn => 
  btn.addEventListener('click', e => {
    const inputDisplay = document.querySelector('.input-display'); 
    let btnType = 
      e.target.classList.contains('digit') ? 'digit' : 
      e.target.classList.contains('operator') ? 'operator' :
      e.target.classList.contains('btn-equals') ? 'operate' :
      e.target.classList.contains('btn-clear') ? 'clear' :
      '';

    switch (btnType) {
      case 'digit':
        (!operator) ? 
          firstNumDisplay.textContent += e.target.textContent :
          secondNumDisplay.textContent += e.target.textContent;
        break;
      case 'operator':
        firstNum = parseInt(firstNumDisplay.textContent);
        if (!firstNum) break;
        let operatorSymbol = e.target.textContent;
        if (!isNaN(secondNum) || secondNumDisplay.textContent !== '') secondNum = parseInt(secondNumDisplay.textContent);
        if(firstNum && secondNum) {
          operate(operator, firstNum, secondNum);
          firstNum = result;
          secondNum = '';
          clearInputDisplay()
          firstNumDisplay.textContent = result;
          operatorDisplay.textContent = operatorSymbol;
        }
        operator = e.target.dataset.btn;
        operatorDisplay.textContent = ` ${operatorSymbol} `;
        break;
      case 'clear':
        clearAll(inputDisplay, resultDisplay);
        break;
      case 'operate':
        secondNum = parseInt(secondNumDisplay.textContent);
        if (firstNum && secondNum && operator) operate(operator, firstNum, secondNum);
    }
  }));

  // functions don't work with '0'