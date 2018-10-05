// 0 = Green
// 1 = Blue
// 2 = Orange
// 3 = Red
// 4 = White
// 5 = Yellow

//-------------------------
//Data structure, selectors
//-------------------------

var pieces = [];
var edges = [];
var corners = [];

//Some pattern algorithms
var cubeInACube = ['F', 'L', 'F', 'Up', 'R', 'U', 'F', 'F', 'L', 'L', 'Up', 'Lp', 'B', 'Dp', 'Bp', 'L', 'L', 'U'];
var cross = ['R', 'R', 'Lp', 'D', 'F', 'F', 'Rp', 'Dp', 'Rp', 'L', 'Up', 'D', 'R', 'D', 'B', 'B', 'Rp', 'U', 'D', 'D'];
var stripeDot =['D', 'U', 'B', 'B', 'F', 'F', 'Dp', 'Up'];

var solvedState =
  [[0,2,4], [ ,2,4], [1,2,4], [0, ,4],        , [1, ,4], [0,3,4], [ ,3,4], [1,3,4],
   [0,2, ],        , [1,2, ],        ,        ,        , [0,3, ],        , [1,3, ],
   [0,2,5], [ ,2,5], [1,2,5], [0, ,5],        , [1, ,5], [0,3,5], [ ,3,5], [1,3,5]];

// Object that represents individual piece
function piece(position, colors) {
  this.position = position;
  this.colors = colors;
  this.isSolved = function() {
    return this.colors == solvedState[toBaseTen(this.position)];
  }
}

// Updates the selected pieces into the html table
function update(piecesToUpdate) {
  for (i = 0; i < piecesToUpdate.length; i++) {
    for (j = 0; j < 3; j++) {
      if (piecesToUpdate[i].colors[j] !== undefined) {
        document.getElementById("" + piecesToUpdate[i].position[0] + piecesToUpdate[i].position[1] + piecesToUpdate[i].position[2] + j).className = "c" + piecesToUpdate[i].colors[j];
      }
    }
  }
}

// Creating the pieces in their solved state
function startup() {
  // Creating pieces and assigning coordinates excluding the middle pieces (those that have 1 in at lest 2 places)
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      for (k = 0; k < 3; k++) {
        if (i != 1 && j != 1 || ((i != 1 || j != 1) && k != 1)) {
          pieces.push(new piece([i, j, k], []));
          if (i == 1 || j == 1 || k == 1) {
            edges.push(pieces[pieces.length - 1]);
          } else {
            corners.push(pieces[pieces.length - 1]);
          }

        }
      }
    }
  }

  colorise();
}

//Assigning color to the pieces based on their position so that the cube is in solved state
function colorise() {
  for (i=0; i<pieces.length; i++) {
    pieces[i].colors = solvedState[toBaseTen(pieces[i].position)];
  }
  update(pieces);
}

// Selects all pieces with specific coordinate value (x is 0; y is 1; z is 2)
function selectBySide(coordinate, value) {
  var output = [];
  for (i = 0; i < 20; i++) {
    if (pieces[i].position[coordinate] === value) {
      output.push(pieces[i]);
    }
  }
  return output;
}

//Converts an coordinate array into it's base 10 representation
function toBaseTen(array) {
  var number = array[0] + array[1]*3 + array[2]*9;
  return number;
}

function isSolved(array) {
  for (i=0; i<array.length; i++) {
    if(!array[i].isSolved()) {
      return false;
    }
  }
  return true;
}

//-----------------
//Turns, algorithms
//-----------------

//First two arguments select side, the third selects orientation of the turn
//Then the color orientation on unused coordinates switches
function turn(coordinate, coordinateValue, boolean) {
  side = selectBySide(coordinate, coordinateValue);

  switch (coordinate) {
    case 0:
      unused = [1, 2];
      break;
    case 1:
      unused = [0, 2];
      break;
    case 2:
      unused = [0, 1];
      break;
  }

  for (i = 0; i < 8; i++) {
    [side[i].colors[unused[0]], side[i].colors[unused[1]]] = [side[i].colors[unused[1]], side[i].colors[unused[0]]]
  }

  side = sort(side, unused);
  if (boolean) {
    [side[0].position, side[1].position, side[2].position, side[3].position] = [side[3].position, side[0].position, side[1].position, side[2].position];
    [side[4].position, side[5].position, side[6].position, side[7].position] = [side[7].position, side[4].position, side[5].position, side[6].position];
  } else {
    [side[3].position, side[0].position, side[1].position, side[2].position] = [side[0].position, side[1].position, side[2].position, side[3].position];
    [side[7].position, side[4].position, side[5].position, side[6].position] = [side[4].position, side[5].position, side[6].position, side[7].position];
  }
  update(side);
}

function sort(input, unused) {
  output = [];
  for (i = 0; i < 8; i++) {
    switch ("" + input[i].position[unused[0]] + input[i].position[unused[1]]) {
      case "00":
        output[0] = input[i];
        break;
      case "20":
        output[1] = input[i];
        break;
      case "22":
        output[2] = input[i];
        break;
      case "02":
        output[3] = input[i];
        break;
      case "01":
        output[4] = input[i];
        break;
      case "10":
        output[5] = input[i];
        break;
      case "21":
        output[6] = input[i];
        break;
      case "12":
        output[7] = input[i];
        break;
    }
  }
  return output;
}

//Basic turns molded from turn function
function L(x) {
  turn(0, 0, false)
};

function Lp(x) {
  turn(0, 0, true)
};

function R(x) {
  turn(0, 2, true)
};

function Rp(x) {
  turn(0, 2, false)
};

function B(x) {
  turn(1, 0, true)
};

function Bp(x) {
  turn(1, 0, false)
};

function F(x) {
  turn(1, 2, false)
};

function Fp(x) {
  turn(1, 2, true)
};

function U(x) {
  turn(2, 0, false)
};

function Up(x) {
  turn(2, 0, true)
};

function D(x) {
  turn(2, 2, true)
};

function Dp(x) {
  turn(2, 2, false)
};

//Perform an algorithm written in array
function doAlgorithm(algorithm, delay) {
  for (i = 0; i < algorithm.length; i++) {
    setTimeout(window[algorithm[i]], i * delay);
  }
}

//Change which side is in the reference point for turns 3:red (default) 1:blue 2:orange 0:green
//Flip turns the cube upside down
function transform(algorithm, rotate, flip) {
  var output = [];
  var m = ['L', 'R', 'B', 'F', 'U', 'D'];
  switch (rotate) {
    case 0:
      m = [m[1], m[0], m[3], m[2], m[4], m[5]];
      break;
    case 1:
      m = [m[2], m[3], m[1], m[0], m[4], m[5]];
      break;
    case 2:
      m = [m[1], m[0], m[3], m[2], m[4], m[5]];
      break;
    case 3:
      break;
  }
  if (flip) {
    m = [m[1], m[0], m[2], m[3], m[5], m[4]];
  }
  for (i = 0; i < algorithm.length; i++) {
    switch (algorithm[i][0]) {
      case 'L':
        output[i] = m[0];
        break;
      case 'R':
        output[i] = m[1];
        break;
      case 'B':
        output[i] = m[2];
        break;
      case 'F':
        output[i] = m[3];
        break;
      case 'U':
        output[i] = m[4];
        break;
      case 'D':
        output[i] = m[5];
        break;
    }
    if (algorithm[i].length == 2) {
      output[i] += 'p'
    }
  }
  return output;
}
