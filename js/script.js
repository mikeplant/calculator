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
    
    let btnType = 
      e.target.classList.contains('digit') ? 'digit' : 
      e.target.classList.contains('operator') ? 'operator' :
      false;

    switch (btnType) {
      case 'digit':
        operatorActive = false;
        inputDisplay.textContent += e.target.dataset.btn;
        break;
      case 'operator':   
        if (operatorActive) {
          let currentDisplay = inputDisplay.textContent.split('').slice(0, -2).join('');
          inputDisplay.textContent = currentDisplay + ` ${e.target.textContent} `;
        } else {
          inputDisplay.textContent += ` ${e.target.textContent} `;
          operatorActive = true;
        }
        
        
        break;
    }
  }));