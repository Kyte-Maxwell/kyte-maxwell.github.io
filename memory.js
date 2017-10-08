var displayState
var tiles

function makeGrid() {
  displayState = new Array(4);
  for (var i = 0; i < 4; i++) {
    displayState[i] = new Array(4).fill(1);
  }
  tiles = new Array(4);
  for (var i = 0; i < 4; i++) {
    tiles[i] = new Array(4).fill("Empty");
  }
  var colors = ["Blue", "Red", "Green", "Yellow"];
  for (i = 0; i < 4; i++) {
    var placed = 0;
    do {
      var x = Math.floor(Math.random() * 4);
      var y = Math.floor(Math.random() * 4);
      if (tiles[x][y] == "Empty") {
        tiles[x][y] = colors[i];
        placed += 1;
      }
    } while (placed < 4);
  }
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var tdId = i + ", " + j;
      document.getElementById(tdId).style.backgroundColor = "darkgrey";
    }
  }
}

 function checkClick(i, j) {
   checkState();
   if (displayState[i][j] == 1) {
     var tdId = i + ", " + j;
     document.getElementById(tdId).style.backgroundColor = tiles[i][j];
     var checkStates = 0;
     var m = -1;
     var n = -1;
     for (var k = 0; k < 4; k++) {
       for (var l = 0; l < 4; l++) {
         if (displayState[k][l] == 2) {
           checkStates = 1;
           m = k;
           n = l;
         }
       }
     }
     var tdId1 = i + ", " + j;
     var tdId2 = m + ", " + n;
     if (checkStates == 0) {
       displayState[i][j] = 2;
     } else {
       if (tiles[i][j] == tiles[m][n]) {
         displayState[i][j] = 3;
         displayState[m][n] = 3;
       } else {
         displayState[i][j] = 1;
         displayState[m][n] = 1;
       }
     }
   }
 }

 function checkState() {
   for (var i = 0; i < 4; i++) {
     for (var j = 0; j < 4; j++) {
       var tdId = i + ", " + j;
       if (displayState[i][j] == 1) {
         document.getElementById(tdId).style.backgroundColor = "darkgrey";
       } else if (displayState[i][j] == 3) {
         document.getElementById(tdId).style.backgroundColor = "black";
       }
     }
   }
 }
