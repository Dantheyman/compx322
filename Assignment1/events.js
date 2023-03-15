
var request = new XMLHttpRequest();

window.addEventListener('load',function(){

    getDataAjax("events.php?event=0");   
    
});
function getDataAjax(url)
{
    
    request.addEventListener("load", displayData);
    request.open("GET", url);
	request.send("");
    
}

function displayData()
{
    var response = request.responseText;
    var div = document.getElementById("data");
    div.innerHTML= response;
}




	

