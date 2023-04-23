<?php

//function used to connect to database from  home enviroment
function connecthome(){
    try{
        $con=new PDO('mysql:host=localhost;dbname=mysql','root');
        
        return $con;
    }
    catch(PDOException $e) {
        echo "database connection errror".$e->getMessage();
    
    }
    

}
//function used to connect to database from lab enviroment
function connectlab()
{
    try{
        $con=new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;dbname=dj66','dj66','my212025sql');
        return $con;
    }
    catch(PDOException $e) {
        echo "database connection errror:  ".$e->getMessage();
    
    }
    

}

?>