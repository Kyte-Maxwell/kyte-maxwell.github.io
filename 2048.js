var z;
var xTouch = null;
var yTouch = null;
document.onkeydown = function(a) {
  switch (a.keyCode) {
    case 37:
      left(z);
      break;
    case 38:
      up(z);
      break;
    case 39:
      right(z);
      break;
    case 40:
      down(z);
      break;
  }
}

var gameState = 1;
var swipeSound = new Audio('2048swipe.mp3');

document.addEventListener('touchstart', touchStart, false);
document.addEventListener('touchmove', touchMove, false);

function touchStart(touchEvent) {
  xTouch = touchEvent.touches[0].clientX;
  yTouch = touchEvent.touches[0].clientY;
};

function touchMove(touchEvent) {
  if (xTouch && yTouch) {
    var xEnd = touchEvent.touches[0].clientX;
    var yEnd = touchEvent.touches[0].clientY;
    var xChange = xTouch - xEnd;
    var yChange = yTouch - yEnd;
    if (Math.abs(xChange) > Math.abs(yChange)) {
      if (xChange > 0) {
        left(z);
      } else {
        right(z);
      }
    } else {
      if (yChange > 0) {
        up(z);
      } else {
        down(z);
      }
    }
    xTouch = null;
    yTouch = null;
  } else {
    return;
  }
}

function createGrid() {
  var array = new Array(4);
  for (var i = 0; i < 4; i++) {
    array[i] = new Array(4).fill("&nbsp;");
  }
  var x = Math.floor(Math.random() * 4);
  var y = Math.floor(Math.random() * 4);
  array[x][y] = 2;
  z = array;
  displayGrid(z);
}

function displayGrid(z) {
  gameState = 2;
  var table = '<table>';
  for (var i = 0; i < z.length; i++) {
    table += '<tr>';
    for(var j = 0; j < z[i].length; j++) {
      table += '<td>' + z[i][j] + '</td>';
    }
    table += '</tr>';
  }
  table += '</table>';
  document.getElementById("grid").innerHTML = table;
  checkWinLose(z);
}

function checkWinLose(z) {
  var empty = 0;
  var win = 0;
  for (var i = 0; i < z.length; i++) {
    for(var j = 0; j < z[i].length; j++) {
      if (z[i][j] == "&nbsp;") {
        empty = 1;
      }
      if (z[i][j] == 2048) {
        win = 1;
      }
    }
  }
  if (win == 1) {
    gameState = 1;
    displayWin();
  } else if (empty == 0) {
    gameState = 1;
    displayLose();
  }
}

function displayWin() {
  var canvas = document.createElement("canvas");
  canvas.id = "winCanvas";
  canvas.width = "415";
  canvas.height = "150";
  canvas.style = "border:1px solid black";
  var context = canvas.getContext("2d");
  var fillColor = context.createLinearGradient(0,0,415,0);
  fillColor.addColorStop(0,"orange");
  fillColor.addColorStop(1,"blue");
  context.fillStyle = fillColor;
  context.fillRect(0,0,415,150);
  context.font = "40px Courier";
  context.fillStyle = "yellow";
  context.fillText("You Win!",125,85);
  var grid = document.getElementById("grid");
  grid.appendChild(canvas);
}

function displayLose() {
  var canvas = document.createElement("canvas");
  canvas.id = "winCanvas";
  canvas.width = "415";
  canvas.height = "150";
  canvas.style = "border:1px solid black";
  var context = canvas.getContext("2d");
  var fillColor = context.createLinearGradient(0,0,415,0);
  fillColor.addColorStop(0,"black");
  fillColor.addColorStop(1,"gray");
  context.fillStyle = fillColor;
  context.fillRect(0,0,415,150);
  context.font = "40px Verdana";
  context.strokeStyle = "white";
  context.strokeText("You Lose",125,85);
  var grid = document.getElementById("grid");
  grid.appendChild(canvas);
}

function addNum(z) {
  var done = 0;
  while (done == 0) {
    var x = Math.floor(Math.random() * 4);
    var y = Math.floor(Math.random() * 4);
    if(z[x][y] == "&nbsp;") {
      z[x][y] = 2;
      done = 1;
    }
  }
}


function left(z) {
  if (gameState == 1) {
    return;
  }
  var moved = 0;
  for(var a = 0; a < 3; a++) {
    for(var i = 0; i < 4; i++) {
      for(var j = 3; j > 0; j--) {
        if(z[i][j] !== "&nbsp;") {
          if(z[i][j-1] == "&nbsp;") {
            z[i][j-1] = z[i][j];
            z[i][j] = "&nbsp;";
            moved = 1;
          } else if(z[i][j-1] == z[i][j]) {
            z[i][j-1] = z[i][j] * 2;
            z[i][j] = "&nbsp;";
            moved = 1;
          }
        }
      }
    }
  }
  if(moved == 1) {
    addNum(z);
    swipeSound.play();
  }
  displayGrid(z);
}

function right(z) {
  if (gameState == 1) {
    return;
  }
  var moved = 0;
  for(var a = 0; a < 3; a++) {
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 3; j++) {
        if(z[i][j] !== "&nbsp;") {
          if(z[i][j+1] == "&nbsp;") {
            z[i][j+1] = z[i][j];
            z[i][j] = "&nbsp;";
            moved = 1;
          } else if(z[i][j+1] == z[i][j]) {
            z[i][j+1] = z[i][j] * 2;
            z[i][j] = "&nbsp;";
            moved = 1;
          }
        }
      }
    }
  }
  if(moved == 1) {
    addNum(z);
    swipeSound.play();
  }
  displayGrid(z);
}

function up(z) {
  if (gameState == 1) {
    return;
  }
  var moved = 0;
  for(var a = 0; a < 3; a++) {
    for(var i = 3; i > 0; i--) {
      for(var j = 0; j < 4; j++) {
        if(z[i][j] !== "&nbsp;") {
          if(z[i-1][j] == "&nbsp;") {
            z[i-1][j] = z[i][j];
            z[i][j] = "&nbsp;";
            moved = 1;
          } else if(z[i-1][j] == z[i][j]) {
            z[i-1][j] = z[i][j] * 2;
            z[i][j] = "&nbsp;";
            moved = 1;
          }
        }
      }
    }
  }
  if(moved == 1) {
    addNum(z);
    swipeSound.play();
  }
  displayGrid(z);
}

function down(z) {
  if (gameState == 1) {
    return;
  }
  var moved = 0;
  for(var a = 0; a < 3; a++) {
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 4; j++) {
        if(z[i][j] !== "&nbsp;") {
          if(z[i+1][j] == "&nbsp;") {
            z[i+1][j] = z[i][j];
            z[i][j] = "&nbsp;";
            moved = 1;
          } else if(z[i+1][j] == z[i][j]) {
            z[i+1][j] = z[i][j] * 2;
            z[i][j] = "&nbsp;";
            moved = 1;
          }
        }
      }
    }
  }
  if(moved == 1) {
    addNum(z);
    swipeSound.play();
  }
  displayGrid(z);
}
