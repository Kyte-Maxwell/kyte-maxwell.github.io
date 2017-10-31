speed = 2000;
var timer;
var number = 0;

function newGame() {
  timer = setInterval(makeTarget, speed);
  var divs = document.getElementsByClassName("target");
  divs.length = 0;
}

function makeTarget() {
  var type = Math.floor(Math.random()*4);
  switch(type) {
    case 0:
      var object = new makeObject(50, "blue");
      break;
    case 1:
      var object = new makeObject(62, "green");
      break;
    case 2:
      var object = new makeObject(75, "purple");
      break;
    case 3:
      var object = new makeObject(87, "red");
      break;
  }
  number += 1;
  var targetId = "target" + number;
  var targetText = "<img src = '" + object.color + ".png' class = " + object.color + " id = '" + targetId + "' onclick = 'removeTarget(this)'>";
  var container = document.getElementById("container");
  container.innerHTML += targetText;
  var target = document.getElementById(targetId);
  var horizontal = Math.floor(Math.random()*1000);
  var vertical = Math.floor(Math.random()*800);
  target.style.left = horizontal + object.size;
  target.style.top = vertical + object.size;
  var whiteId = "white" + number;
  var whiteText = "<img src = 'white.png' class = 'white' id = '" + whiteId + "' onmouseover = 'mouseOver(this)' onmouseout = 'mouseOut(this)'>";
  container.innerHTML += whiteText;
  var white = document.getElementById(whiteId);
  white.style.left = horizontal;
  white.style.top = vertical;
}

function makeObject(size, color) {
  this.size = size;
  this.color = color;
}

function removeTarget(target) {
  var score = parseInt(document.getElementById("score").innerHTML);
  var newScore = 0;
  switch(target.className) {
    case "blue":
      newScore = 1;
      break;
    case "green":
      newScore = 2;
      break;
    case "purple":
      newScore = 4;
      break;
    case "red":
      newScore = 8;
      break;
  }
  document.getElementById("score").innerHTML = score + newScore;
  var idNum = target.id.substring(6, number.toString().length + 6);
  target.parentNode.removeChild(target);
  var whiteId = "white" + idNum;
  var white = document.getElementById(whiteId);
  white.parentNode.removeChild(white);
}

function mouseOver(white) {
  var idNum = white.id.substring(5, number.toString().length + 5);
  var targetId = "target" + idNum;
  var target = document.getElementById(targetId);
  var horizontal = Math.floor(Math.random()*400 - 200);
  var vertical = Math.floor(Math.random()*400 - 200);
  white.style.transform = "translate(" + horizontal + "px, " + vertical + "px)";
  target.style.transform = "translate(" + horizontal + "px, " + vertical + "px)";
}

function mouseOut(white) {
  var idNum = white.id.substring(5, 6);
  var targetId = "target" + idNum;
  var target = document.getElementById(targetId);
  white.style.transform = "translate(0px, 0px)";
  target.style.transform = "translate(0px, 0px)";
}
