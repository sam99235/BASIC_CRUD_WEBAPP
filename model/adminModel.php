<?php
session_start();
require_once "connection.php";

function checkSession(){
    if (isset($_SESSION['user_id'])) {
        return true;
    }
}

function checkLoginQuery($email, $password) {
    $sql = "SELECT * FROM user WHERE email = ? AND type = 'Admin'";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute([$email]);
    $admin = $stmn->fetch(PDO::FETCH_ASSOC);
    if (!empty($admin)) {
        if ($password === $admin['passwordHash']) {
            $_SESSION['user_id'] = $admin['userId'];
            return ['result' => true, 'message' => 'Login successful'];
        } else {
            return ['result' => false, 'message' => 'Invalid password'];
        }
    } else {
        return ['result' => false, 'message' => 'User not found'];
    }
}

function DeleteTeacher($teacherID){
    if(checkSession()==true){
        $sql = "DELETE FROM teachers WHERE teacherID = ?";
        $stmn = EtablishConnection()->prepare($sql);
        $stmn->execute([$teacherID]);
    }
}
function DeleteStudent($studentID){
    if(checkSession()==true){
        $sql = "DELETE FROM teacher WHERE teacherID = ?";
        $stmn = EtablishConnection()->prepare($sql);
        $stmn->execute([$teacherID]);
    }
}
?>