function setQuestion(jArray) {
  var questionNum = Math.floor(Math.random() * jArray.length);
  var questionType = Math.floor(Math.random() * 2);
  var question
  if (questionType == 0) {
    question = "What is the capital of " + jArray[questionNum].state;
  } else {
    question = "What state is " + jArray[questionNum].capital + " the capital of?";
  }
  var questionCode = "<input type = 'text' id = 'field'><button onclick = 'getAnswer(" + questionNum + ", " + questionType + ")'>Answer</button><p id = 'output'>";
  document.getElementById("Response").innerHTML = questionCode;
}

function setAnswer(questionNum, questionType, jArray) {
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

function getQuestion() {
  var variable = new XMLHttpRequest();
  var jArray;
  variable.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
         jArray = JSON.parse(this.responseText);
         setQuestion(jArray);
     }
  };
  variable.open("GET", "AJAXQuiz1.txt", true);
  variable.send();
}

function getAnswer(questionNum, questionType) {
  var variable = new XMLHttpRequest();
  var jArray;
  variable.onreadystatechange = function() {
	   if (this.readyState == 4 && this.status == 200) {
		     jArray = JSON.parse(this.responseText);
         setAnswer(questionNum, questionType, jArray);
	   }
  };
  variable.open("GET", "AJAXQuiz1.txt", true);
  variable.send();
}
