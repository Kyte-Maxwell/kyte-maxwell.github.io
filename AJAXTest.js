function getJSON() {
  var variable = new XMLHttpRequest();
  variable.onreadystatechange = function() {
	   if (this.readyState == 4 && this.status == 200) {
		     document.getElementById("Output").innerHTML = this.responseText;
	      }
      };
      variable.open("GET", "JSONTest.txt", true);
      variable.send();
}
