// Convert Markdown file from 'url' to DOM 'elementId'
function convertMarkdown(url, elementId){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.send(null);
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			// var type = request.getResponseHeader('Content-Type');
			// if (type.indexOf("text") !== 1) {
			// 	return request.responseText;
			// }
			var converter = new showdown.Converter({tables: true, noHeaderId: true});
			var result = converter.makeHtml(request.responseText);
  		document.getElementById(elementId).innerHTML = result;
		}
	}
}

// Look for 'README.md' file in current dir, and convert it to HTML
var uri = window.location.pathname.substr(1);
var indexes = document.getElementsByClassName('indexcolname');
for (let i of indexes) {
  var a = i.getElementsByTagName('a')[0];
  var fn = a.text;
  if (fn.toLowerCase() == 'readme.md') {
	var url = window.location.href;
	convertMarkdown(url+fn, 'readme');
  }
}
