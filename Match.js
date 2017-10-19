var cursorX = 0;
var cursorY = 0;
var timer;
speed = 2000;
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
    case 17:
      swap();
      break;
  }
}

var cursorStyle = "thick solid black";

function newGame() {
  document.getElementById("score").innerHTML = 0;
  cursorX = 0;
  cursorY = 0;
  var trList = document.getElementsByTagName("tr");
  clearScreen();
  createRow();
  createRow();
  createRow();
  createRow();
  trList[0].firstChild.style.border = cursorStyle;
  trList[1].firstChild.style.border = cursorStyle;
  clearInterval(timer);
  if (document.getElementById("speed").value > 0) {
    speed = 1000 / document.getElementById("speed").value;
  }
  timer = setInterval(createRow, speed);
}

function createRow() {
  var trList = document.getElementsByTagName("tr");
  for (var i = 0; i < trList.length; i++) {
    var type = Math.floor(Math.random()*6);
    var tdSquare = document.createElement("td");
    switch(type) {
      case 0:
        tdSquare.style.backgroundColor = "red";
        break;
      case 1:
        tdSquare.style.backgroundColor = "blue";
        break;
      case 2:
        tdSquare.style.backgroundColor = "green";
        break;
      case 3:
        tdSquare.style.backgroundColor = "yellow";
        break;
      case 4:
        tdSquare.style.backgroundColor = "orange";
        break;
      case 5:
        tdSquare.style.backgroundColor = "purple";
        break;
    }
    tdSquare.style.width = "100px";
    tdSquare.style.height = "100px";
    trList[i].appendChild(tdSquare);
  }
  checkMatch();
  for (var j = 0; j < trList.length; j++) {
    var tdList =  trList[j].childNodes;
    if (tdList.length > 20) {
      clearInterval(timer);
      clearScreen();
    }
  }
}

function clearScreen() {
  var trList = document.getElementsByTagName("tr");
  for (var i = 0; i < trList.length; i++) {
    while (trList[i].hasChildNodes()) {
      trList[i].removeChild(trList[i].lastChild);
    }
  }
}

function left() {
  if (cursorX > 0) {
    removeCursor();
    cursorX -= 1;
    addCursor();
  }
}

function right() {
  var tdId1 = "t"+cursorY;
  var tdId2 = "t"+(cursorY+1);
  var tdList1 = document.getElementById(tdId1).childNodes;
  var tdList2 = document.getElementById(tdId2).childNodes;
  if (tdList1.length > cursorX + 1 || tdList2.length > cursorX + 1) {
    removeCursor();
    cursorX += 1;
    addCursor();
  }
}

function up() {
  if (cursorY > 0) {
    removeCursor();
    cursorY -= 1;
    addCursor();
  }
}

function down() {
  if (cursorY < 4) {
    removeCursor();
    cursorY += 1;
    addCursor();
  }
}

function removeCursor() {
  var tdList = document.getElementsByTagName("td");
  for (var i = 0; i < tdList.length; i++) {
    tdList[i].style.border = "none";
  }
}

function addCursor() {
  var tdId1 = "t"+cursorY;
  var tdId2 = "t"+(cursorY+1);
  var tdList1 = document.getElementById(tdId1).childNodes;
  var tdList2 = document.getElementById(tdId2).childNodes;
  if (tdList1[cursorX]) {
    tdList1[cursorX].style.border = cursorStyle;
  }
  if (tdList2[cursorX]) {
    tdList2[cursorX].style.border = cursorStyle;
  }
}

function swap() {
  var tdId1 = "t"+cursorY;
  var tdId2 = "t"+(cursorY+1);
  var tdList1 = document.getElementById(tdId1).childNodes;
  var tdList2 = document.getElementById(tdId2).childNodes;
  if (tdList1[cursorX] && tdList2[cursorX]) {
    var cursorStore1 = tdList1[cursorX].style.backgroundColor;
    var cursorStore2 = tdList2[cursorX].style.backgroundColor;
    tdList1[cursorX].style.backgroundColor = cursorStore2;
    tdList2[cursorX].style.backgroundColor = cursorStore1;
  } else if (tdList1[cursorX]) {
    var tdSquare = document.createElement("td");
    tdSquare.style.backgroundColor = tdList1[cursorX].style.backgroundColor;
    tdSquare.style.width = "100px";
    tdSquare.style.height = "100px";
    document.getElementById(tdId2).appendChild(tdSquare);
    var deleteSquare = tdList1[cursorX];
    deleteSquare.remove();
  } else if (tdList2[cursorX]) {
    var tdSquare = document.createElement("td");
    tdSquare.style.backgroundColor = tdList2[cursorX].style.backgroundColor;
    tdSquare.style.width = "100px";
    tdSquare.style.height = "100px";
    document.getElementById(tdId1).appendChild(tdSquare);
    var deleteSquare = tdList2[cursorX];
    deleteSquare.remove();
  }
  checkMatch();
}

function checkMatch() {
  var removeList = new Array(0);
  var trList = document.getElementsByTagName("tr");
  for (var i = 0; i < trList.length; i++) {
    var tdList = trList[i].childNodes;
    for (var j = 0; j < tdList.length; j++) {
      if (tdList.length > j + 2) {
        var a = tdList[j].style.backgroundColor;
        var b = tdList[j + 1].style.backgroundColor;
        var c = tdList[j + 2].style.backgroundColor;
        if (a == b && a == c) {
          removeList.push(tdList[j], tdList[j+1], tdList[j+2]);
        }
      }
    }
  }
  for (var l = 0; l < 20; l++) {
    for (var m = 0; m < 4; m++) {
      var aId = "t" + m;
      var bId = "t" + (m + 1);
      var cId = "t" + (m + 2);
      var aList = document.getElementById(aId).childNodes;
      var bList = document.getElementById(bId).childNodes;
      var cList = document.getElementById(cId).childNodes;
      if (aList[l] && bList[l] && cList[l]) {
        var a = aList[l].style.backgroundColor;
        var b = bList[l].style.backgroundColor;
        var c = cList[l].style.backgroundColor;
        if (a == b && a == c) {
          removeList.push(aList[l], bList[l], cList[l]);
        }
      }
    }
  }
  for (var z = 0; z < removeList.length; z++) {
    if (removeList[z]) {
      removeList[z].remove();
      var score = parseInt(document.getElementById("score").innerHTML);
      score += 100;
      document.getElementById("score").innerHTML = score;
    }
  }
}
