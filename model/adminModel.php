<?php
session_start();
require_once "connection.php";

function checkSession(){
    if (isset($_SESSION['adminID']) && isset($_SESSION['adminEmail']) && isset($_SESSION['adminPassword']) ) {
        return ['result'=>true];
    }
    else{
        return ['result'=>false];
    }
}

function checkLoginQuery($email, $password) {
    $sql = "SELECT * FROM user WHERE email = ? AND type = 'Admin'";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute([$email]);
    $admin = $stmn->fetch(PDO::FETCH_ASSOC);
    if (!empty($admin)) {
        if ($password === $admin['password']) {
            $_SESSION['adminID'] = $admin['userID'];
            $_SESSION['adminEmail'] = $admin['email'];
            $_SESSION['adminPassword'] = $admin['password'];
            return ['result' => true, 'message' => 'Login successful'];
        } else {
            return ['result' => false, 'message' => 'Invalid password'];
        }
    } else {
        return ['result' => false, 'message' => 'User not found'];
    }
}

function updateAdminPasswordQuery($oldPassword,$newPassword){
    if($oldPassword===$_SESSION['adminPassword']){
        $sql = "UPDATE user SET passwordHash =? WHERE userID =? AND type = 'Admin'";
        $stmn = EtablishConnection()->prepare($sql);
        $stmn->execute([$newPassword, $_SESSION['adminID']]);
        $_SESSION['adminPassword']=$newPassword;
        return ['done' => true,'message'=> 'password updated successfully'];
    }
    else{
        return ['done' => false,'message'=> 'incorrect password'];
    }
}

function CreateAccountQuery($name,$email,$password,$type,$classID,$subjectID){
    try{
        if($type=='Student'){
            $sql="INSERT INTO user (userID, name,email,password,type,classID) values (null,?,?,?,'Student',?)";
            $stmn = EtablishConnection()->prepare($sql);
            $stmn->execute([$name,$email,$password,$classID]);
            return ['done' => true,'message'=> 'Account created successfully'];
        }
        else if ($type=='Teacher'){
            $sql="INSERT INTO user (userID, name, email, password, type, subjectID) values (null,?,?,?,'Teacher',?)";
            $stmn = EtablishConnection()->prepare($sql);
            $stmn->execute([$name,$email,$password,$subjectID]);
            return ['done' => true,'message'=> 'Account created successfully'];
        }
    }
    catch(PDOException $e){
        return ['done' => false,'message'=> $e->getMessage()];
    }
}

function DisplayAccountsQuery($type){
    $sql="SELECT * FROM user WHERE type = ?";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute([$type]);
    return $stmn->fetchAll(PDO::FETCH_ASSOC);
}

function DeleteAccountQuery($userID){
    $sql="DELETE FROM user WHERE userID =?";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute([$userID]);
}

function UpdateAccountQuery($userID,$name,$email,$password,$type,$class,$subject){
    try{
        if($type=='Student'){
            $sql="UPDATE user SET name=?, email=?, password=?, type='Student', classID=? WHERE userID =?";
            $stmn = EtablishConnection()->prepare($sql);
            $stmn->execute([$name,$email,$password,$class,$userID]);
            return ['done' => true,'message'=> 'Account updated successfully'];
        }
        else{
            $sql="UPDATE user SET name=?, email=?, password=?, type='Teacher', subjectID=? WHERE userID =?";
            $stmn = EtablishConnection()->prepare($sql);
            $stmn->execute([$name,$email,$password,$subject,$userID]);
            return ['done' => true,'message'=> 'Account updated successfully'];
        }
    }
    catch(PDOException $e){
        return ['done' => false,'message'=> $e->getMessage()];
    }
}

function DisplayClassesQuery(){
    $sql="SELECT * FROM class";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute();
    return $stmn->fetchAll(PDO::FETCH_ASSOC);
}

function DisplaySubjectsQuery(){
    $sql="SELECT * FROM subject";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute();
    return $stmn->fetchAll(PDO::FETCH_ASSOC);
}

?>