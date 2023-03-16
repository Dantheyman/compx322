
    <?php
    

    require_once "connect.php";
    $con=connectlab();

    $event = $_GET["event"];


    $query= "SELECT * FROM `events`" ;
    $result = $con->query($query);
    if ($result==FALSE)
    {

    }
    else
    {
        
        
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
        
                
            while ($row = $result->fetch())
            {
                $id=$row['id'];
                $name=$row['name'];
                if ($id==$event)
                {
                    $cat=$row['category'];
                    $time=$row['time'];
                    $day=$row['day'];
                    $month=$row['month'];
                    $cost=$row['cost'];
                    $location = $row['location'];
                    $lon_lat=$row['lon_lat'];
                    $latitude=lat($lon_lat);
                    $longitude=long($lon_lat);
                    $date=dateFormat($day,$month);
                    echo    
                    "<h2>$name</h2>  
                    <table>
                        <tr>
                            <th>Category</th>
                            <th>date</th>
                            <th>time</th>
                            <th>cost</th>
                            <th>location</th>
                            <th>latitude</th>
                            <th>longitude</th>
                
                        </tr>
                        <tr>
                            <td>$cat</td>
                            <td>$date</td>
                            <td>$time</td>
                            <td>$cost</td>
                            <td>$location</td>
                            <td id='lat'>$latitude</td>
                            <td id='lon'>$longitude</td>
                        </tr>
                    
                    </table>";

                   

                                    
                
                   

                }
                
                        
            }    
        
            

        }
    


    }
    

    function lat($lon_lat)
    {
        $a=explode(",",$lon_lat);
        $lat=$a[0];
        return $lat;
        

    }
    function long($lon_lat)
    {
        $a=explode(",",$lon_lat);
        $lon=$a[1];
        return $lon;

    }

    function dateFormat($day,$month)
    {
        $date="$day/$month/2023";
        return $date;

    }
    
     
    
    
   
    


    

    ?>

        
