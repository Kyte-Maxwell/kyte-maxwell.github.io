function getJSON() {
  var variable = new XMLHttpRequest();
  var object;
  variable.onreadystatechange = function() {
	   if (this.readyState == 4 && this.status == 200) {
		     object = JSON.parse(this.responseText);
         document.getElementById("Output").innerHTML = object.name;
	      }
      };
      variable.open("GET", "JSONTest.txt", true);
      variable.send();
}
