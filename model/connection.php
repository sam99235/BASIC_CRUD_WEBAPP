<?php
    function EtablishConnection(){
        try{
            $connection=new PDO("mysql:host=localhost;dbname=cms_estsb","root","root");
            return $connection;
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
    }
?>