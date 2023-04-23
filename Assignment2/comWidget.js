

//class for the commodiity widget 
class comWidget

{
    name;
    info;
    code;
    constructor(name,info,code)
    {
        this.name=name;
        this.info=info;
        this.code=code;
    };
  


   
    

    //retrives data from api for current widget
    async getdata()
    {
     
        //sends fetch request to stock api 
        var response= await fetch("https://www.alphavantage.co/query?function="+this.code+"&apikey=Z2DCZ9VLD5I7MIAB");
        var data = await response.json();
        var i =0
        var months=[]; 
   
        //takes the most recent 12 months and returns that data 
        for (i=0;i<12;i++)
        {
           months[i]=data["data"][i];
        }
        //reverses months so most recent month is at the back of the list 
        months.reverse();
        return months;

    }
    

    //creates the ui interface for the widget 
    createUI(insertDiv) 
    {
        //creates div for widget 
        var div=document.createElement('div');
        div.id= this.name+"_Widget";
        div.classList.add("com_Widget");
        insertDiv.appendChild(div);
        
        //creates header showing commodidty name
        var h1=document.createElement('h1');
        h1.innerText=this.name;
        div.appendChild(h1);

        //adds commodity info to widget 
        var p=document.createElement('p');
        p.innerText=this.info;
        div.appendChild(p);

        // add graph button to widget 
        var button=document.createElement('button');
        button.innerText="Graph"
        button.id=this.name+("_but");
        div.appendChild(button);

        //add delete button with event listner 
        var button=document.createElement('button');
        button.innerText="Delete"
        button.addEventListener("click", function() {
            deleteWidget(button.parentElement);
        });
        div.appendChild(button);



    }

    //adds dropdown menu for you to compare two commoditites to te widget that currently 
    //is being graphed 
    addCompare()
    {
        //deletes all elemetsn associated with the compare dropdown 
        var del=Array.from(document.getElementsByClassName("compare"));
        for (var i=0;i<del.length;i++){
            del[i].remove();
        }

        //finds the widget div to add too
        var widg=document.getElementById(this.name+"_Widget");

        //adds label forselect 
        var label =document.createElement("LABEL");
        label.htmlFor=select;
        label.innerText="Compare to:"
        label.classList.add("compare");
        widg.appendChild(label);

        // creates select 
        var select=document.createElement('select');
        select.classList.add("compare");
        select.id="compareS"
        widg.appendChild(select);


        // adds default option if you dont want to compare anything
        var option = document.createElement("option");
        option.text ="Nothing";
        option.value="null";
        select.add(option);
        //populates select with other commodities leaving out the current widget 
        for(let i =0;i<objects.length;i++)
        {
            if (objects[i].name==this.name)
            {
                continue;
            }
            var object = objects[i];
            var option = document.createElement("option");
            option.text =object.name;
            option.value=object.name;
            select.add(option);
        }
    }

    
}

