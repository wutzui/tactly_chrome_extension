var checkbox = document.getElementById("check-box");
checkbox.setAttribute("checked", "checked");

function toggleTactly (){
	if(checkbox.checked == "checked"){
		chrome.tabs.executeScript(null, {
      		"url": chrome.extension.getURL("content.js");
    	});
	}
}

document.addEventListener('DOMContentLoaded', function() {
	toggleTactly();
});