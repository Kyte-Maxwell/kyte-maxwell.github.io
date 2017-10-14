function getQuestion() {
  var jArray = readJSON();
  var questionNum = var x = Math.floor(Math.random() * jArray.length);
  var questionType = var x = Math.floor(Math.random() * 2);
  var question
  if (questionType == 0) {
    question = "What is the capital of " + jArray[questionNum].0;
  } else {
    question = "What state is " + jArray[questionNum].1 + " the capital of?";
  }
  var questionCode = "<input type = 'text' id = 'field'><button onclick = 'answerQuestion(" + questionNum + ", " + questionType + ")'>Answer</button><p id = 'output'>";
  document.getElementById("Response").innerHTML = questionCode;
}

function answerQuestion(questionNum, questionType) {
  var answer;
  var jArray = readJSON();
  if (questionType == 0) {
    answer = jArray[questionNum].1;
  } else {
    answer = jArray[questionNum].0;
  }
  var field = document.getElementById("field").value;
  if (answer == field) {
    document.getElementById("output").innerHTML = "Correct!";
  } else {
    document.getElementById("output").innerHTML = "Incorrect. Try Again.";
  }
}

function readJSON() {
  var variable = new XMLHttpRequest();
  var jArray;
  variable.onreadystatechange = function() {
	   if (this.readyState == 4 && this.status == 200) {
		     jArray = JSON.parse(this.responseText);
         return jArray;
	   }
  };
  variable.open("GET", "AJAXQuiz1.txt", true);
  variable.send();
}
