// NEED TO:
// - refactor input testing


// Set initial operation buttons/display
var exp = '';
var display = document.querySelector('#display');
var buttons = document.querySelectorAll('button');


// Add event handler to buttons
buttons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var input = btn.textContent;

    // check if equals or clear clicked
    if (input === '=') {
      // evaluate exp, show in display
      // display.textContent = math.eval(exp);
      updateDisplay(math.eval(exp));
    } else if (input === 'AC') {
      // reset exp to 0
      exp = '';
      updateDisplay('0');
    }

    // test if exp is empty
    else if (exp.length === 0) {
      // test if input is operation
      if (isOperation(input)) {
        // can't have an operation as first input, keep exp empty
        exp = '';
        updateDisplay('0');
      } else {
        // not an operation, add to exp and display
        updateDisplay(input);
        exp += input;
      }
    } 

    // test if exp.length === 1
    else if (exp.length === 1) {
      // check if input is an operation
      if (isOperation(input)) {
        // add to exp, keep display as is
        exp += input;
      } else {
        // not an op, add input to display and exp
        display.textContent += input;
        exp += input;
      }
    } 

    // test if exp.length >= 2
    else if (exp.length > 1) {
      if (isOperation(input)) {
        // check if input is an operation?
        if (isOperation(exp[exp.length - 1])) {
          // can't have two ops in a row, replace with latest op input
          exp = exp.slice(0, exp.length - 1) + input;
        } else {
          // not two ops in a row, add op to exp
          exp += input;
        }
      } else if (isOperation(exp[exp.length - 1])) {
        // if input is a num/decimal and last digit was an op
        // replace display with new number
        exp += input;
        display.textContent = input;
      } else if (isDecimal(input)) {
        // check if last digit was also decimal
        if (!isDecimal(exp[exp.length - 1])) {
          exp += input;
          display.textContent += input;
        }
      } else {
        // input is num/dec && last digit wasn't an op
        // add input to exp and display
        exp += input;
        display.textContent += input;
      }
    }
  });
});


function updateDisplay(val) {
  display.textContent = val;
}

function isNumber(input) {
  return !!Number(input);
}

function isDecimal(input) {
  return input === '.';
}

function isOperation(input) {
  var re = /\+|\-|\*|\//;
  var found = input.match(re);
  return found;
}