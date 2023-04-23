<?php

//connects to database and creates pdo
require_once "connect.php";
$con=connecthome();
 //selects all rows from events database
$query= "SELECT * FROM `commodities`" ;
$result = $con->query($query);


 // if an error occours print nothing to the screen
 if ($result==FALSE)
 {

 }
 else 
 {
     $objects =array();
     $i=0;
     //creates array of objects then encodes in json
     while ($row = $result->fetch())
     {
        
        $object = new commoditie($row['id'],$row['name'],
                                 $row['information'],$row['code']);
        $str=(string)$i;
         $objects["$i"]=$object;
         $i+=1;

    
     }
    $json= json_encode($objects);
    echo $json;

    
 }


 //class for creating commoditys 
 class commoditie
 {
    public $id;
    public $name;
    public $info;
    public $code;

    function __construct($id,$name,$info,$code)
    {
        $this->id=$id;
        $this->name=$name;
        $this->info=$info;
        $this->code=$code;
    }
 }
?>