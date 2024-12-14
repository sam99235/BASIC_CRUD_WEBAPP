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
    case 'updateAdminPassword':
        updateAdminPassword();
        break;
    case 'create_account':
        CreateAccount();
        break;
    case 'update_account':
        UpdateAccount();
        break;
    case 'display_accounts':
        DisplayAccounts();
        break;
    case 'delete_account':
        DeleteAccount();
        break;
    case 'display_fields':
        DisplaySubjects();
        break;
    case 'display_classes':
        DisplayClasses();
        break;
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
    $response=checkSession();
    echo json_encode($response);
}


function updateAdminPassword() {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!empty($input['newPassword']) && !empty($input['oldPassword'])) {
        $response = updateAdminPasswordQuery($input['oldPassword'], $input['newPassword']);
        echo json_encode($response);
    } else {
        echo json_encode(['done' => false,'message' => 'Invalid input']);
    }
}

function CreateAccount(){
    $input = json_decode(file_get_contents('php://input'), true);
    if (!empty($input['name']) && !empty($input['email']) && !empty($input['password']) && !empty($input['accountType'])) {
        $result = CreateAccountQuery(
            $input['name'],
            $input['email'],
            $input['password'],
            $input['accountType'],
            $input['studentClass'],
            $input['teacherSubject'],
        );
        echo json_encode($result);
    }
}

function DisplayAccounts(){
    $input = json_decode(file_get_contents('php://input'), true);
    $result= DisplayAccountsQuery($input['accountType']);
    echo json_encode($result);
}
function UpdateAccount(){
    $input = json_decode(file_get_contents('php://input'), true);
    if (!empty($input['userID']) &&!empty($input['name']) &&!empty($input['email']) &&!empty($input['password'])) {
        $response=UpdateAccountQuery(
            $input['userID'],
            $input['name'],
            $input['email'],
            $input['password'],
            $input['accountType'],
            $input['studentClass'],
            $input['teacherSubject'],
        );
        echo json_encode($response);
    }
}

function DeleteAccount(){
    $input = json_decode(file_get_contents('php://input'), true);
    if (!empty($input['accountID'])) {
        DeleteAccountQuery($input['accountID']);
    }
}

function DisplayClasses(){
    $result=DisplayClassesQuery();
    echo json_encode($result);
}

function DisplaySubjects(){
    $result=DisplaySubjectsQuery();
    echo json_encode($result);
}
?>