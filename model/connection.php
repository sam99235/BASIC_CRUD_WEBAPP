<?php
    function EtablishConnection(){
        try{
            $connection=new PDO("mysql:host=localhost;dbname=estsb_cms","root","root");
            return $connection;
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
    }
?>