<?php
    function EtablishConnection(){
        try{
            $connection=new PDO("mysql:host=localhost;dbname=ncshop","root","root");
            return $connection;
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
    }
?>