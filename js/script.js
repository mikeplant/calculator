const buttons = document.querySelectorAll('button');
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

function clear(inputDisplay, resultDisplay) {
  firstNum = 0;
  secondNum = 0;
  operator = '';
  result = '';
  inputDisplay.textContent = '';
  resultDisplay.textContent = '';
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
}
let operatorActive = true;

buttons.forEach(btn => 
  btn.addEventListener('click', e => {
    const inputDisplay = document.querySelector('.input-display');
    const resultDisplay = document.querySelector('.result-display');  
    let btnType = 
      e.target.classList.contains('digit') ? 'digit' : 
      e.target.classList.contains('operator') ? 'operator' :
      e.target.classList.contains('btn-equals') ? 'operate' :
      e.target.classList.contains('btn-clear') ? 'clear' :
      '';

    switch (btnType) {
      case 'digit':
        operatorActive = false;
        inputDisplay.textContent += e.target.dataset.btn;
        break;
      case 'operator':
        firstNum = (result) ? result : parseInt(inputDisplay.textContent);
        operator = e.target.dataset.btn;
        if (operatorActive) {
          let currentDisplay = inputDisplay.textContent.split('').slice(0, -2).join('');
          inputDisplay.textContent = currentDisplay + ` ${e.target.textContent} `;
        } else {
          inputDisplay.textContent += ` ${e.target.textContent} `;
          operatorActive = true;
        }
        break;
      case 'clear':
        clear(inputDisplay, resultDisplay);
        break;
      case 'operate':
        secondNum = parseInt(inputDisplay.textContent
          .split(' ')
          .slice(-1)
        );
        if (isNaN(secondNum)) break;
        operate(operator, firstNum, secondNum);
        resultDisplay.textContent = result;
    }
  }));