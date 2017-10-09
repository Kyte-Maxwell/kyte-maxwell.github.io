function getJSON() {
  var variable = new XMLHttpRequest();
  var jsonText;
  variable.onreadystatechange = function() {
	   if (variable.readyState == 4 && variable.status == 200) {
		     jsonText = JSON.parse(variable.responseText);
	      }
      };
      variable.open("GET", "JSONTest.txt", true);
      variable.send();
      document.getElementById("Output").innerHTML = jsonText;
}
