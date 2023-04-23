
    <?php
    //connects to database and creates pdo
    require_once "connect.php";
    $con=connecthome();
    //retrives id from url
    $event = $_GET["event"];

    //selects all rows from events database
    $query= "SELECT * FROM `events`" ;
    $result = $con->query($query);
    // if an error occours print nothing to the screen
    if ($result==FALSE)
    {

    }
    else
    {
        
        // if no event has been selected print all the events in a list 
        if ($event==0)
        {
        
            
            echo"<h1> Events</h1>";
         
            while ($row = $result->fetch())
                {
                    $id=$row['id'];
                    $name=$row['name'];
                    echo "<p onclick=\"getDataAjax('AJAXevents.php?event=$id')\">$name</p>";
                }    

        }
        else 
        {
        
            //finds the row we want then prints all the values out in a table  
            while ($row = $result->fetch())
            {
                $id=$row['id'];
                $name=$row['name'];
                if ($id==$event)
                {
                    $cat=$row['category'];
                    $time=$row['time'];
                    $note=$row['notes'];
                    $cost=$row['cost'];
                    $location = $row['location'];
                    $id=$row['id'];
                    $latitude=lat($row['lon_lat']);
                    $longitude=long($row['lon_lat']);
                    $date=dateFormat($row['day'],$row['month']);
                    
                    echo    
                    "<h2>$name</h2>
                     <div id='data'>
                        <table>
                            <tr>
                                <th>Category</th>
                                <th>date</th>
                                <th>time</th>
                                <th>cost</th>
                                <th>location</th>
                                <th>ID</th>
                                <th>Notes</th>
                                <th>latitude</th>
                                <th>longitude</th>
                                
                    
                            </tr>
                            <tr>
                                <td>$cat</td>
                                <td>$date</td>
                                <td>$time</td>
                                <td>$cost</td>
                                <td>$location</td>
                                <td id='id'>$id</td>
                                <td>$note</td>
                                <td id='lat'>$latitude</td>
                                <td id='lon'>$longitude</td>
                                
                            </tr> 
                        </table>";

                        //prints out button for user to interact with 
                        echo "
                        <button onclick=\"getWeather($latitude,$longitude)\">Get Weather</button>
                        <button type='button' onclick=\"home('AJAXevents.php?event=0')\">HOME</button>
                    </div>
                    <div id='change'>
                        <button id = 'changeBut' onclick=\"details()\">Change Details</button>
                    </div>";
                    
                    
                }
                
                        
            }    
        
            

        }
    


    }
    
    //extracts the latitude from long_lat string
    function lat($lon_lat)
    {
        $a=explode(",",$lon_lat);
        $lat=$a[0];
        return $lat;
        

    }
    //extracts the longitude from long_lat string
    function long($lon_lat)
    {
        $a=explode(",",$lon_lat);
        $lon=$a[1];
        return $lon;

    }

    //foramts the day and month into a single date format
    function dateFormat($day,$month)
    {
        $date="$day/$month/2023";
        return $date;

    }
    
     
    
    
   
    


    

    ?>

        
