var z = new Array(4);
for (var i = 0; i < 4; i++) {
  z[i] = new Array(4).fill("&nbsp;");
}
var x = Math.floor(Math.random() * 4);
var y = Math.floor(Math.random() * 4);
var xTouch = null;
var yTouch = null;
z[x][y] = 2;
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

function displayGrid(z) {
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
  }
  displayGrid(z);
}

function right(z) {
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
  }
  displayGrid(z);
}

function up(z) {
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
  }
  displayGrid(z);
}

function down(z) {
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
  }
  displayGrid(z);
}
