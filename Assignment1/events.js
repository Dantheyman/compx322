
var request = new XMLHttpRequest();

window.addEventListener('load',function(){

    getDataAjax("AJAXevents.php?event=0");   
    
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
    
    lat=getLat();
    lon=getLon();
    getWeather(lat,lon);
}

async function getWeather(lat,lon)
{

    if(lat)
    {
        let response= await fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=749ff8538d7dcd9b857624af877fb0ec");
        let data = await response.json();
        console.log("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=749ff8538d7dcd9b857624af877fb0ec");
        console.log(data);
    }
    
}

function getLat()
{
    if (div = document.getElementById("lat"))
    {
        return div.textContent;
    }
   
    

}

function getLon()
{
    
    if (div = document.getElementById("lon"))
    {
        return div.textContent.trim();
    }
    

}


	

