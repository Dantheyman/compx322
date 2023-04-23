//stores all the commoddity objects for use in functions 
var objects=[];

//used to load the data from databse. save it and load page dynamically 
window.addEventListener('load',function(){

    url ="AJAXCommodities.php"; 
    var req= new XMLHttpRequest();
    req.responseType = 'json';
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            storeData(req);
            dropdown();
            
        }
    }
    req.open("GET", url);
	req.send("");  
    
});

//stores database response as an array of object literals 
//then sorts the alphabetically based of name property 
function storeData(req)
{
    var response = req.response;
    var i=0;
    while(response[i]!=null)
    {
        var commoditie = { 
            id: response[i]["id"],
            name: response[i]["name"],
            info: response[i]["info"],
            code: response[i]["code"]
        };
        objects[i]=commoditie;
        i+=1;
    }
    objects.sort((a, b) =>(a.name>b.name));
    
 


}
//creates a dropdown menu of all the commoditys 
function dropdown()
{
    select=document.getElementById("com");
    for(let i =0;i<objects.length;i++)
    {
        var object = objects[i];
        var option = document.createElement("option");
        option.text =object.name;
        option.value=object.name;
        select.add(option);
    }
    
    
    
}

//creates a widget and loads its ui and creates a click event for the graph button
function createWidget()
{
    var value= document.getElementById("com").value;

   for ( var i=0;i<objects.length;i++)
   {
        if (objects[i].name==value)
        { 
            //checks to make sure widget not already on the page 
            if (checkPage(objects[i].name))
            {
                break;
            }
            var w= new comWidget(objects[i].name,objects[i].info,objects[i].code);
        
            w.createUI(document.getElementById("widgets"));
            var button = document.getElementById(w.name+"_but");
            button.addEventListener("click", function() {
                graph(w);
            });
            
            
            break;

        }


    }

}

//deletes the widget by deleting the div that contains everything 
function deleteWidget(div)
{
    
    div.remove();

}

//checks to see if widget is currently in the dom 
function checkPage(name)
{
    var widget= document.getElementById(name+"_Widget");
    if (widget)
    {
        return true;
    }
    else
    {
        return false; 
    }
}

  