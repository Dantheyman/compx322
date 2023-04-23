<?php 
// this file is used to update details in events database 



//connects to database 
require_once "connect.php";
$con=connecthome();


//gets json sent by client
$json = file_get_contents('php://input');
$data = json_decode($json);

//parses relebant details then sends query
$id = $data->id;
$coloum = $data->coloum;
$value = $data->value;
$sql = "UPDATE events SET $coloum = '$value' WHERE id=$id";

//tells host whather or not the update was succesful
if ($con->query($sql) == TRUE) 
{
    echo "<p>Record updated successfully</p>";
} 
else 
{
    echo "<p>Error updating record: </p>";
}




?>