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
  }
}

var gameState = 1;
var highest = 2;
var swipeSound = new Audio('2048swipe.mp3');
var jingle1 = new Audio('2048jingle1.mp3');
var jingle2 = new Audio('2048jingle2.mp3');
var loseSound = new Audio('2048lose.mp3');
var win = new Audio('2048win.mp3');
var lose = {left: 1, right: 1, up: 1, down: 1};

document.addEventListener('touchstart', touchStart, false);
document.addEventListener('touchmove', touchMove, false);

function newGame() {
  var divs = document.getElementsByTagName('div');
  for (var i = divs.length - 1; i > -1; i--) {
    divs[i].parentNode.removeChild(divs[i]);
  }
  var canvas = document.getElementsByTagName('canvas');
  for (var i = canvas.length - 1; i > -1; i--) {
    canvas[i].parentNode.removeChild(canvas[i]);
  }
  hasMoved();
  newBlock();
  gameState = 2;
  highest = 2;
}

function newBlock() {
  var done = false;
  while (!done) {
    var newBlock = document.createElement('div');
    newBlock.innerHTML = "<span>2</span>";
    newBlock.className = "class0";
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
      var block = grid.appendChild(newBlock);
      block.className = "class2";
      checkLose();
      done = true;
    }
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
  var size;
  if (window.innerWidth > window.innerHeight) {
    size = window.innerHeight;
  } else {
    size = window.innerWidth;
  }
  canvas.width = size;
  canvas.height = size;
  var context = canvas.getContext("2d");
  var fillColor = context.createLinearGradient(0,0,size,0);
  fillColor.addColorStop(0,'rgba(255,100,100,0.5)');
  fillColor.addColorStop(1,'rgba(100,100,255,0.5)');
  context.fillStyle = fillColor;
  context.fillRect(0,0,size,size);
  context.font = "100px Georgia";
  context.fillStyle = "yellow";
  context.textAlign = "center";
  context.fillText("You Win!", size * .5, size * .5);
  var grid = document.getElementById("grid");
  grid.appendChild(canvas);
  gameState = 1;
  win.play();
}

function displayLose() {
  var canvas = document.createElement("canvas");
  canvas.id = "winCanvas";
  var size;
  if (window.innerWidth > window.innerHeight) {
    size = window.innerHeight;
  } else {
    size = window.innerWidth;
  }
  canvas.width = size;
  canvas.height = size;
  var context = canvas.getContext("2d");
  var fillColor = context.createLinearGradient(0,0,size,0);
  fillColor.addColorStop(0,'rgba(0,0,0,0.5)');
  fillColor.addColorStop(1,'rgba(100,100,100,0.5)');
  context.fillStyle = fillColor;
  context.fillRect(0,0,size,size);
  context.font = "100px Verdana";
  context.strokeStyle = "white";
  context.textAlign = "center";
  context.strokeText("You Lose", size * .5, size * .5);
  var grid = document.getElementById("grid");
  grid.appendChild(canvas);
  gameState = 1;
  loseSound.play();
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
  if (moved && gameState == 2) {
    swipeSound.play();
    newBlock();
    hasMoved();
  }
  if (!moved) {
    lose[left] = 0;
    checkLose();
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
  if (moved && gameState == 2) {
    swipeSound.play();
    newBlock();
    hasMoved();
  }
  if (!moved) {
    lose[right] = 0;
    checkLose();
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
  if (moved && gameState == 2) {
    swipeSound.play();
    newBlock();
    hasMoved();
  }
  if (!moved) {
    lose[down] = 0;
    checkLose();
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
  if (moved && gameState == 2) {
    swipeSound.play();
    newBlock();
    hasMoved();
  }
  if (!moved) {
    lose[up] = 0;
    checkLose();
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
        if (amt2 * 2 > highest) {
          newHighest(amt2 * 2);
        } else {
          jingle1.play();
        }
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
        block.x = null;
        block.y = null;
        block.className = "class0";
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

function newHighest(amt) {
  jingle2.play();
  highest = amt;
  if (amt == 2048) {
    displayWin();
  }
  getFact("http://numbersapi.com/" + highest + "/math");
}

function checkLose() {
  if (!left && !right && !up && !down) {
    displayLose();
  }
}

function removeBlock(block) {
  block.parentNode.removeChild(block);
}

function getFact(url) {
  quizURL = url;
  var variable = new XMLHttpRequest();
  variable.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         setFact(this.responseText);
     }
  };
  variable.open("GET", url, true);
  variable.send();
}

function setFact(text) {
  document.getElementById("fact").innerHTML = text;
}

function hasMoved() {
  lose[up] = 1;
  lose[down] = 1;
  lose[right] = 1;
  lose[left] = 1;
}

function checkLose() {
  if (lose[up] == 0 && lose[down] == 0 && lose[left] == 0 && lose[right] == 0) {
    displayLose();
  }
}

function saveGame() {
  var divs = document.getElementsByTagName("div");
  var saveData = [];
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].x != null && divs[i].y != null) {
      var block = {class: divs[i].childNodes[0].innerHTML, x: divs[i].x, y: divs[i].y};
      saveData.push(block);
    }
  }
  var saveString = JSON.stringify(saveData);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("gameSave", saveString);
    document.getElementById("fact").innerHTML = "Game saved.";
  } else {
    document.getElementById("fact").innerHTML = "Error saving game.";
  }
}

function loadGame() {
    if (localStorage.getItem("gameSave") != null) {
      var divs = document.getElementsByTagName('div');
      for (var i = divs.length - 1; i > -1; i--) {
        divs[i].parentNode.removeChild(divs[i]);
      }
      var canvas = document.getElementsByTagName('canvas');
      for (var i = canvas.length - 1; i > -1; i--) {
        canvas[i].parentNode.removeChild(canvas[i]);
      }
      hasMoved();
      gameState = 2;
      highest = 2;
    var saveString = localStorage.getItem("gameSave");
    var saveArray = JSON.parse(saveString);
    for (var j = 0; j < saveArray.length; j++) {
      setBlock(saveArray[j].class, saveArray[j].x, saveArray[j].y);
    }
    localStorage.removeItem("gameSave");
  } else {
    document.getElementById("fact").innerHTML = "Save data not found.";
  }
}

function setBlock(blockClass, xGrid, yGrid) {
  var newBlock = document.createElement('div');
  newBlock.innerHTML = "<span>" + blockClass + "</span>";
  newBlock.className = "class0";
  newBlock.x = (xGrid);
  newBlock.y = (yGrid);
  var trs = document.getElementsByTagName("tr");
  var space = trs[xGrid - 1].childNodes[yGrid];
  var x = space.offsetLeft;
  var y = space.offsetTop;
  newBlock.style.left = x;
  newBlock.style.top = y;
  var grid = document.getElementById("grid");
  var block = grid.appendChild(newBlock);
  block.className = "class" + blockClass;
  checkLose();
}
