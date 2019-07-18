// [Note]
// Use style.backgroundColor rather than style.background
// (it's compatible with more browers)

// Declare Variables
var numSquares = 6;
var h1 = document.querySelector('h1');
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll('.square');
var pickedColor = pickColor();
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var resetBtn = document.querySelector('#reset');
var modeBtns = document.querySelectorAll('.mode');

colorDisplay.textContent = pickedColor;

init();

resetBtn.addEventListener('click', function() {
  reset();
});

// Define Functions
function init() {
  setupMode();
  setupSquares();
  reset();
}

function setupMode() {
  for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener('click', function() {
      // remove class "selected" from all mode buttons
      for (var j = 0; j < modeBtns.length; j++) {
        modeBtns[j].classList.remove('selected');
      }
      // add class to clicked button
      this.classList.add('selected');
      // change the numSquares
      switch (this.textContent) {
        case 'Easy':
          numSquares = 3;
          break;
        case 'Medium':
          numSquares = 6;
          break;
        default:
          numSquares = 9;
      }
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // Add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    // Add click event listeners to squares
    squares[i].addEventListener('click', function() {
      // Grab color of clicked square
      var clickedColor = this.style.backgroundColor;

      // Compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        h1.style.backgroundColor = pickedColor;
        changeColors(clickedColor);
        resetBtn.textContent = 'Play Again?';
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again!';
      }
    });
  }
}

function reset() {
  // Generate all new colors
  colors = generateRandomColors(numSquares);
  // pick a new random color from array
  pickedColor = pickColor();
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  // reset the resetButton content
  resetBtn.textContent = 'New Colors';
  // clear the messageDisplay
  messageDisplay.textContent = '';
  // change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      // Add initial colors to squares
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = 'block';
    } else {
      squares[i].style.display = 'none';
    }
  }
  // change the h1 background
  h1.style.backgroundColor = 'steelblue';
}

function changeColors(color) {
  // Loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // Change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var arr = [];
  // add num random colors to array
  for (var i = 0; i < num; i++) {
    // Get random color and push into arr
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}
