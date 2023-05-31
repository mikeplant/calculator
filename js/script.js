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