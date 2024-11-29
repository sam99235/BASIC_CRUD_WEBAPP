<?php
function AdminLogin($email, $password) {
    $sql = "SELECT * FROM admins WHERE email = ?";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute([$email]);
    $admin = $stmn->fetch(PDO::FETCH_ASSOC);

    if (!empty($admin)) {
        if ($password == $admin['password']) {
            return ['success' => true, 'admin' => $admin];
        } else {
            return ['success' => false, 'error' => 'Invalid email or password'];
        }
    } else {
        return ['success' => false, 'error' => 'Invalid email or password'];
    }
}

function DeleteTeacher($teacherID){
    $sql = "DELETE FROM teachers WHERE teacherID = ?";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute([$teacherID]);
}
function DeleteStudent($studentID){
    $sql = "DELETE FROM teacher WHERE teacherID = ?";
    $stmn = EtablishConnection()->prepare($sql);
    $stmn->execute([$teacherID]);
}
?>