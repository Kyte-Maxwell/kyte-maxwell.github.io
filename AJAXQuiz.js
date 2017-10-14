function setQuestion(url, jArray, questionType, questionNum) {
  questionNum = Math.floor(Math.random() * jArray.length);
  questionType = Math.floor(Math.random() * 2);
  var question
  if (questionType == 0) {
    question = "What is the capital of " + jArray[questionNum].state;
  } else {
    question = "What state is " + jArray[questionNum].capital + " the capital of?";
  }
  var questionCode = "<input type = 'text' id = 'field'><button onclick = 'getJSON(" + url + ", setAnswer, " + questionType + ", " + questionNum + ")'>Answer</button><p id = 'output'>";
  document.getElementById("Response").innerHTML = questionCode;
}

function setAnswer(url, jArray, questionType, questionNum) {
  var answer;
  var jArray = readJSON();
  if (questionType == 0) {
    answer = jArray[questionNum].capital;
  } else {
    answer = jArray[questionNum].state;
  }
  var field = document.getElementById("field").value;
  if (answer == field) {
    document.getElementById("output").innerHTML = "Correct!";
  } else {
    document.getElementById("output").innerHTML = "Incorrect. Try Again.";
  }
}

function getJSON(url, setFunction, questionType, questionNum) {
  var variable = new XMLHttpRequest();
  var jArray;
  variable.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         setFunction(url, JSON.parse(this), questionType, questionNum);
     }
  };
  variable.open("GET", url, true);
  variable.send();
}
