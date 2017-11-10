var xTouch = null;
var yTouch = null;
document.onkeydown = function(a) {
  switch (a.keyCode) {
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 39:
      right();
      break;
    case 40:
      down();
      break;
    case 32:
      space();
      break;
  }
}

var gameState = 1;
var swipeSound = new Audio('2048swipe.mp3');

document.addEventListener('touchstart', touchStart, false);
document.addEventListener('touchmove', touchMove, false);

function newGame() {
  var divs = document.getElementsByTagName('div');
  for (var i = divs.length - 1; i > -1; i--) {
    divs[i].parentNode.removeChild(divs[i]);
  }
  newBlock();
  gameState = 2;
  if (window.innerHeight < window.innerWidth) {
    document.getElementById("gameButton").className = "gameStart";
  }
}

function newBlock() {
  var done = false;
  while (!done) {
    var newBlock = document.createElement('div');
    newBlock.innerHTML = "<span>2</span>";
    newBlock.className = "class2";
    var xGrid = Math.floor((Math.random() * 4));
    var yGrid = Math.floor((Math.random() * 4) + 1);
    newBlock.x = (xGrid + 1);
    newBlock.y = (yGrid);
    var divs = document.getElementsByTagName("div");
    var match = false;
    for (var i = 0; i < divs.length; i++) {
      if (divs[i].x == newBlock.x && divs[i].y == newBlock.y) {
        match = true;
      }
    }
    if (match == false) {
      var trs = document.getElementsByTagName("tr");
      var space = trs[xGrid].childNodes[yGrid];
      var x = space.offsetLeft;
      var y = space.offsetTop;
      newBlock.style.left = x;
      newBlock.style.top = y;
      var grid = document.getElementById("grid");
      grid.appendChild(newBlock);
      done = true;
    }
  }
}

function space() {
  var divs = document.getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {
    divs[i].childNodes[0].innerHTML *= 2;
    divs[i].className = "class" + divs[i].childNodes[0].innerHTML;
  }
}

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
        left();
      } else {
        right();
      }
    } else {
      if (yChange > 0) {
        up();
      } else {
        down();
      }
    }
    xTouch = null;
    yTouch = null;
  } else {
    return;
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

function left() {
  if (gameState == 1) {
    return;
  }
  var moved = false;
  var divs = document.getElementsByTagName("div");
  for (var y = 2; y < 5; y++) {
    for (var i = divs.length - 1; i > -1; i--) {
      if (divs[i].y == y) {
        var isMoved;
        do {
          var oldX = divs[i].x;
          var oldY = divs[i].y;
          var newX = divs[i].x;
          var newY = parseInt(divs[i].y) - 1;
          isMoved = moveBlock(oldX, oldY, newX, newY);
          if (isMoved) {
            moved = true;
          }
        }
        while (isMoved && divs[i] != null);
      }
    }
  }
  if (moved) {
    swipeSound.play();
    newBlock();
  }
}

function right() {
  if (gameState == 1) {
    return;
  }
  var moved = false;
  var divs = document.getElementsByTagName("div");
  for (var y = 3; y > 0; y--) {
    for (var i = divs.length - 1; i > -1; i--) {
      if (divs[i].y == y) {
        var isMoved;
        do {
          var oldX = divs[i].x;
          var oldY = divs[i].y;
          var newX = divs[i].x;
          var newY = parseInt(divs[i].y) + 1;
          isMoved = moveBlock(oldX, oldY, newX, newY);
          if (isMoved) {
            moved = true;
          }
        }
        while (isMoved && divs[i] != null);
      }
    }
  }
  if (moved) {
    swipeSound.play();
    newBlock();
  }
}

function down() {
  if (gameState == 1) {
    return;
  }
  var moved = false;
  var divs = document.getElementsByTagName("div");
  for (var x = 3; x > 0; x--) {
    for (var i = divs.length - 1; i > -1; i--) {
      if (divs[i].x == x) {
        var isMoved;
        do {
          var oldX = divs[i].x;
          var oldY = divs[i].y;
          var newX = parseInt(divs[i].x) + 1;
          var newY = divs[i].y;
          isMoved = moveBlock(oldX, oldY, newX, newY);
          if (isMoved) {
            moved = true;
          }
        }
        while (isMoved && divs[i] != null);
      }
    }
  }
  if (moved) {
    swipeSound.play();
    newBlock();
  }
}

function up() {
  if (gameState == 1) {
    return;
  }
  var moved = false;
  var divs = document.getElementsByTagName("div");
  for (var x = 2; x < 5; x++) {
    for (var i = divs.length - 1; i > -1; i--) {
      if (divs[i].x == x) {
        var isMoved;
        do {
          var oldX = divs[i].x;
          var oldY = divs[i].y;
          var newX = parseInt(divs[i].x) - 1;
          var newY = divs[i].y;
          isMoved = moveBlock(oldX, oldY, newX, newY);
          if (isMoved) {
            moved = true;
          }
        }
        while (isMoved && divs[i] != null);
      }
    }
  }
  if (moved) {
    swipeSound.play();
    newBlock();
  }
}

function moveBlock(x1, y1, x2, y2) {
  var divs = document.getElementsByTagName("div");
  var tds = document.getElementsByTagName("td");
  var occupied = false;
  var block;
  var moved = false;
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].x == x1 && divs[i].y == y1) {
      block = divs[i];
    }
  }
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].x == x2 && divs[i].y == y2) {
      occupied = true;
      var amt = block.childNodes[0].innerHTML;
      var amt2 = divs[i].childNodes[0].innerHTML
      if (amt == amt2) {
        divs[i].childNodes[0].innerHTML *= 2;
        divs[i].className = "class" + (amt2 * 2);
        for (var j = 0; j < tds.length; j++) {
          if (tds[j].getAttribute("x") == x2 && tds[j].getAttribute("y") == y2) {
            var x = tds[j].offsetLeft;
            var y = tds[j].offsetTop;
            block.style.left = x;
            block.style.top = y;
            block.x = tds[j].getAttribute("x");
            block.y = tds[j].getAttribute("y");
          }
        }
        block.x = 0;
        block.y = 0;
        block.addEventListener("transitionend", function() {block.parentNode.removeChild(block); });
        moved = true;
      }
    }
  }
  if (occupied == false) {
    for (var j = 0; j < tds.length; j++) {
      if (tds[j].getAttribute("x") == x2 && tds[j].getAttribute("y") == y2) {
        var x = tds[j].offsetLeft;
        var y = tds[j].offsetTop;
        block.style.left = x;
        block.style.top = y;
        block.x = tds[j].getAttribute("x");
        block.y = tds[j].getAttribute("y");
        moved = true;
      }
    }
  }
  if (moved == true) {
    return true;
  } else {
    return false;
  }
}

function removeBlock(block) {
  block.parentNode.removeChild(block);
}
