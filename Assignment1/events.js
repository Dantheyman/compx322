
var request = new XMLHttpRequest();


//used to load the data intially 
window.addEventListener('load',function(){

    getDataAjax("AJAXevents.php?event=0");   
    
});

//sends request to AJAXevents script then calls display function when results come back 
function getDataAjax(url)
{
    request = new XMLHttpRequest();
    request.addEventListener("load", displayData);
    request.open("GET", url);
	request.send("");
    
}
//displays html recieved from host in container div 
function displayData()
{
    var response = request.responseText;
    console.log(" we here and text is" + response);
    var div = document.getElementById("container");
    div.innerHTML= response;
    
   
}

//retieves weather info from api and dispalys on screen inside weather div
async function getWeather(lat,lon)
{

    //sends fetch request then waits for reponse
    let response= await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=749ff8538d7dcd9b857624af877fb0ec");
    let data = await response.json();


    // extracts relevant data from json object then dynamically adds html
    let div = document.getElementById("weather");

    let descrip = data['weather'][0]["description"];
    let temp = data["main"]["temp"];

    let Text = "<p> Current weather: "+descrip+"</p><p>Current temperature: "+temp+" </p> "
    div.innerHTML=Text;

}


// creates the form to update database 
function details()
{
    //finds div object for form 
    let div = document.getElementById('change');

    //gets rid of change data button 
    let but = document.getElementById('changeBut');
    but.remove();


    //creates array for drop down menu
    var array = ["Name","Category","Month","Day","Time","Cost","location","Notes"];


    //creates drop down bar for value being changed and appends to div 
    let select = document.createElement("select");
    select.setAttribute("id","type");

    //creates all the options 
    for (var i = 0; i < array.length; i++) 
    {
        var option = document.createElement("option");
        option.value = array[i].toLowerCase();
        option.text = array[i];
        select.appendChild(option);
    }
    div.appendChild(select);

        

    //creates text box for input and appends to div 
    let text = document.createElement('input');
    text.setAttribute("type", "text");
    text.setAttribute("id","inputText");
    div.appendChild(text);


   


    //creates submit button  and appends to div 
    but = document.createElement("button");
    but.setAttribute("onclick","submitDetails()");
    but.innerText="Submit";
    div.appendChild(but);

    //appends div to body 
    document.body.appendChild(div);

}

// sends a post request to the update script 
function submitDetails()
{
    //gets relevant data from page
    var input = document.getElementById("inputText").value;
    var coloum = document.getElementById("type").value;
    var row = document.getElementById("id").innerText;
   
  
    //creates new request object and callback function for when data  is recieved
    req= new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            update(req);
        }
    }
    //creates body of request then sends 
    req.open("POST", "update.php");
    req.setRequestHeader("Content-type","application/json");
    let data = '{"value":"'+input+'","coloum":"'+coloum+'","id":"'+row+'"}';
	req.send(data);
}

// updates the values in the table to represent what the client changed 
function update(req)
{
    //shows repsonse from update script to show whether update was succesfull or not 
    let response = req.responseText
    var info = document.getElementById("info");
    info.innerHTML=response;

    //updates the page by calling getDataAjax
    var id = document.getElementById("id").innerText;
    var url = "AJAXevents.php?event="+id;
    getDataAjax(url);

    //removes form used for updating values 
    var div = document.getElementById("change");
    div.remove();
}

//makes sure all other divs are empty then reloads intial state of page 
function home(url)
{
    document.getElementById("info").innerHTML=("");
    document.getElementById("weather").innerHTML=("");
    document.getElementById("change").innerHTML=("");
    getDataAjax(url);
}




	

