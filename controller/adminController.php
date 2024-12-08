<?php
require_once '../model/adminModel.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/x-www-form-urlencoded");

$requestMethod = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'checkLogin':
        CheckLogin();
        break;
    case 'verifySession':
        verifySession();
        break;
    case 'logout':
    default:
        echo json_encode(['error' => 'Invalid action']);
        break;
}

function CheckLogin() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!empty($input['password']) && !empty($input['email'])) {
        $response = checkLoginQuery($input['email'], $input['password']);
        echo json_encode($response);
    } else {
        echo json_encode(['result' => false, 'message' => 'Invalid input']);
    }
}


function verifySession() {
    if (checkSession()==false) {
        echo json_encode(['result' => false]);
    }
    else{
        echo json_encode(['result' => $_SESSION['user_id']]);
    }
}
?>