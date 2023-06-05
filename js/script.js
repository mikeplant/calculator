const buttons = document.querySelectorAll('button');
const firstNumDisplay = document.querySelector('.first-num-display');
const secondNumDisplay = document.querySelector('.second-num-display');
const operatorDisplay = document.querySelector('.operator-display');
const resultDisplay = document.querySelector('.result-display'); 
let firstNum = '';
let secondNum = '';
let operator = '';
let result = '';


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

function updateDisplay(display, content, replaceOrConcatenate) {
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
    let char = e.target.textContent;
    let btnType = 
      e.target.classList.contains('digit') ? 'digit' : 
      e.target.classList.contains('operator') ? 'operator' :
      e.target.classList.contains('btn-equals') ? 'operate' :
      e.target.classList.contains('btn-clear') ? 'clear' :
      e.target.classList.contains('btn-delete') ? 'delete' :
      '';

    switch (btnType) {
      case 'digit':
        if (!operator) {
          if (includesDecimal(firstNumDisplay, char) || firstNumDisplay.textContent.length > 10) break;
          updateDisplay(firstNumDisplay, char, 'concatenate')
        } else {
          if (includesDecimal(secondNumDisplay, char) || secondNumDisplay.textContent.length > 10) break;
          updateDisplay(secondNumDisplay, char, 'concatenate')
        }
        break;
      case 'operator':
        firstNum = parseFloat(firstNumDisplay.textContent);
        if (isNaN(firstNum)) break;
        let operatorSymbol = char;
        if (!isNaN(firstNum) && operator != '') secondNum = parseFloat(secondNumDisplay.textContent);
        if (((!isNaN(firstNum) && !isNaN(secondNum) && (firstNum !== '' && secondNum !== '')))) {
          if (zeroByZero()) {
            operate(operator, firstNum, secondNum);
            break;
          };
          operate(operator, firstNum, secondNum);
          firstNum = result;
          secondNum = '';
          clearInputDisplay();
          updateDisplay(firstNumDisplay, result, 'replace');
          updateDisplay(operatorDisplay, operatorSymbol, 'replace');
        }
        operator = e.target.dataset.btn;
        updateDisplay(operatorDisplay, ` ${operatorSymbol} `, 'replace');
        break;
      case 'clear':
        clearAll();
        break;
      case 'delete':
        if (secondNumDisplay.textContent !== '') {
          deleteChar(secondNumDisplay, 'second');
          break;
        }
        if (operatorDisplay.textContent !== '') {
          deleteChar(operatorDisplay, 'op');
          break;
        }
        if (firstNumDisplay.textContent !== '') {
          deleteChar(firstNumDisplay, 'first');
          break;
        }
      case 'operate':
        secondNum = parseFloat(secondNumDisplay.textContent);
        if (!isNaN(firstNum) && !isNaN(secondNum) && operator) operate(operator, firstNum, secondNum);
    }
  }));

  function deleteChar(display, value) {
    let charToDelete = (display === operatorDisplay) ? '' : display.textContent.split('').slice(0, -1).join('');
    updateDisplay(display, charToDelete, 'replace');

    if (value == 'second') secondNum = parseFloat(display.textContent);
    if (value == 'first') firstNum = parseFloat(display.textContent);
    if (value == 'op') operator = '';
  }