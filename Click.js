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
      var object = new makeObject(20, "blue");
      break;
    case 1:
      var object = new makeObject(15, "green");
      break;
    case 2:
      var object = new makeObject(10, "purple");
      break;
    case 3:
      var object = new makeObject(5, "red");
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
  target.style.left = horizontal;
  target.style.top = vertical;
}

function makeObject(size, color) {
  this.size = size;
  this.color = color;
}

function removeTarget(target) {
  target.parentNode.removeChild(target);
}
