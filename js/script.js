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

function clearAll() {
  firstNum = '';
  secondNum = '';
  operator = '';
  result = '';
  resultDisplay.textContent = '';
  clearInputDisplay();
}

function operate(operator, firstNum, secondNum) {
  if(zeroByZero()) {
    clearAll();
    alert('Nice try! You can\'t divide 0 by 0');    
    return;
  };
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

function populateDisplay(display, content, replaceOrConcatenate) {
  if (replaceOrConcatenate === 'replace') display.textContent = content;
  if (replaceOrConcatenate === 'concatenate') display.textContent += content;
}

function zeroByZero() {
  return (operator === 'divide' && firstNum === 0 && secondNum === 0) ? true : false;
}

function includesDecimal (display, char) {
  return (display.textContent.includes('.') && char === '.') ? true : false;
}

buttons.forEach(btn => 
  btn.addEventListener('click', e => {
    const inputDisplay = document.querySelector('.input-display'); 
    let char = e.target.textContent;
    let btnType = 
      e.target.classList.contains('digit') ? 'digit' : 
      e.target.classList.contains('operator') ? 'operator' :
      e.target.classList.contains('btn-equals') ? 'operate' :
      e.target.classList.contains('btn-clear') ? 'clear' :
      '';

    switch (btnType) {
      case 'digit':
        if (!operator) {
          if (includesDecimal(firstNumDisplay, char)) break;
          populateDisplay(firstNumDisplay, char, 'concatenate')
        } else {
          if (includesDecimal(secondNumDisplay, char)) break;
          populateDisplay(secondNumDisplay, char, 'concatenate')
        }
        break;
      case 'operator':
        firstNum = parseFloat(firstNumDisplay.textContent);
        if (isNaN(firstNum)) break;
        let operatorSymbol = char;
        if (!isNaN(secondNum)) secondNum = parseFloat(secondNumDisplay.textContent);
        if (!isNaN(firstNum) && !isNaN(secondNum)) {
          if (zeroByZero()) {
            operate(operator, firstNum, secondNum);
            break;
          };
          operate(operator, firstNum, secondNum);
          firstNum = result;
          secondNum = '';
          clearInputDisplay();
          populateDisplay(firstNumDisplay, result, 'replace');
          populateDisplay(operatorDisplay, operatorSymbol, 'replace');
        }
        operator = e.target.dataset.btn;
        populateDisplay(operatorDisplay, ` ${operatorSymbol} `, 'replace');
        break;
      case 'clear':
        clearAll();
        break;
      case 'operate':
        secondNum = parseFloat(secondNumDisplay.textContent);
        if (!isNaN(firstNum) && !isNaN(secondNum) && operator) operate(operator, firstNum, secondNum);
    }
  }));

  // number divided by 0 returns infinity (25)
  // screen overflows - limit number of digits
  // round decimals
  // user able to keep adding digits after operate button is pressed
  // add back button?