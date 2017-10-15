var questionType;
var questionNum;
var quizURL;

function setQuestion(jString) {
  var type = typeof jString;
  var jArray = JSON.parse(jString);
  questionNum = Math.floor(Math.random() * jArray.states.length);
  questionType = Math.floor(Math.random() * 2);
  var question
  if (questionType == 0) {
    question = "What is the capital of " + jArray.states[questionNum].state;
  } else {
    question = "What state is " + jArray.states[questionNum].capital + " the capital of?";
  }
  var questionCode = "<input type = 'text' id = 'field'><button onclick = 'getJSON(" + quizURL + ", setAnswer, " + questionType + ", " + questionNum + ")'>Answer</button><p id = 'output'></p>";
  document.getElementById("Question").innerHTML = question;
  document.getElementById("Response").innerHTML = questionCode;
}

function setAnswer(jString) {
  var jArray = JSON.parse(jString);
  var answer;
  if (questionType == 0) {
    answer = jArray.states[questionNum].capital;
  } else {
    answer = jArray.states[questionNum].state;
  }
  var field = document.getElementById("field").value;
  if (answer == field) {
    document.getElementById("output").innerHTML = "Correct!";
  } else {
    document.getElementById("output").innerHTML = "Incorrect. Try Again.";
  }
}

function getJSON(url, setFunction) {
  quizURL = url;
  var variable = new XMLHttpRequest();
  variable.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         setFunction(this.responseText);
     }
  };
  variable.open("GET", url, true);
  variable.send();
}
