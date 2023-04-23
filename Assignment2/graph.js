//script used for editing and creating the graph

//constant used in getMonth function
const MONTHS = [
    'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December'
   
 ];
 var chart;
 var datasets=[];

//returns the month assciated with the middle number of string in 
//format dd-mm-yy
 function getMonth(date)
    {
        var month=date.split("-")[1]
        month=parseInt(month);
        
        return MONTHS[month-1];
    }

//main fucnction for creating graph 
 async function graph(widget)
 {
    //retirves data for widget 
     var months=await widget.getdata();
     
     //parses months in the month labes and data values
     var labels=[];
     var data =[];
     var i =0;
     while  (months[i]!=null)
     {
         labels[i] =getMonth(months[i]["date"]);
         data[i]=Math.round(months[i]['value']);
         i++;
     }

     //creates dataset of the main widget 
     datasets[0]={
        label: widget.name,
        data: data,
        fill: false,
        showLine:true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        yAxisID:'y'
      }
     

    var select =document.getElementById("compareS");
    if(select)
    {
        //if a value for compares then adds data to data set 
        if (select.value!="null")
        {
            await compare(select.value);    
        }
        //makes sure datasets has 1 dataset
        else
        {
            datasets.length=1;
        }
    }
    

    //clears canvas and adds compare options to widget
    clearCanvas();
    widget.addCompare();

     //creates a new chart
    chart = new Chart(
        document.getElementById('chart'),
        {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                responsive: true,
                stacked: false,
                scales: {
                    y:{
                        type: 'linear',
                    display: true,
                    position: 'left',

                    },
                    
                
                
                     y1:{
                        type: 'linear',
                        display: true,
                        position: 'right',

                        // grid line settings
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                        
                     }

                }
                    
                }
            }
        
    );


 //this function first finds the right commodity object given its name 
 //and then parses the data into a data set the same way the graph 
 //function does. then adds data set datasets variable 
 async function compare(value)
 {
    for ( var i=0;i<objects.length;i++)
    {
        if (objects[i].name==value)
        { 
            w=new comWidget(objects[i].name,objects[i].info,objects[i].code);
        }
    }
    var months = await w.getdata(); 
    console.log("months:"+months);
    var i = 0;
    var data =[];
    while  (months[i]!=null)
    {
        data[i]=Math.round(months[i]['value']);
        i++; 
    }
    
    
        datasets[1] ={
                label: w.name,
                data: data,
                fill: false,
                showLine:true,
                borderColor: 'rgb(190, 192, 75)',
                tension: 0.1,
                yAxisID:'y1'
            }
}
              


 

 //destroys the chart if there is one
 function clearCanvas()
 {
    if (chart)
    {
        chart.destroy();
        chart=null;
    }
 }

 }