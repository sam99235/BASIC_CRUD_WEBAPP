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
    case 'display_events':
        DisplayEvents();
        break;
    case 'create_event':
        CreateEvent();
        break;
    case 'delete_event':
        DeleteEvent();
        break;
    case 'update_event':
        UpdateEvent();
        break;
    case 'fetchFields':
        fetchFields();
        break;
    case 'deleteSubject':
        deleteSubject();
        break;
    case 'updateSubject':
        updateSubject();
        break;
    case 'createSubject':
        createSubject();
        break;
    case 'fetchClasses':
        fetchClasses();
        break;
    case 'deleteClass':
        deleteClass();
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

function DisplayEvents(){
    $result=DisplayEventsQuery();
    echo json_encode($result);
}

function CreateEvent(){
    $input = json_decode(file_get_contents('php://input'), true);
    $imageData = base64_decode($input['image']);
    if (!empty($input['title']) &&!empty($input['description']) &&!empty($input['date'])) {
        $result=CreateEventQuery(
            $input['title'],
            $input['description'],
            $input['date'],
            $imageData,
        );
        echo json_encode($result);
    }
}

function DeleteEvent(){
    $input = json_decode(file_get_contents('php://input'), true);
    if (!empty($input['eventID'])) {
        DeleteEventQuery($input['eventID']);
    }
}

function UpdateEvent(){
    $input = json_decode(file_get_contents('php://input'), true);
    $imageData = base64_decode($input['image']);
    $date=$input['date'];
    if (!empty($input['eventID']) &&!empty($input['title']) &&!empty($input['description']) &&!empty($input['date'])) {
        $result=UpdateEventQuery(
            $input['title'],
            $input['description'],
            $input['date'],
            $imageData,
            $input['eventID'],
        );
        echo json_encode($result);
    }
}

function fetchFields(){
    $result=fetchFieldsQuery();
    echo json_encode($result);
}

function deleteSubject(){
    $input = json_decode(file_get_contents('php://input'), true);
    $result=deleteSubjectQuery($input['subjectID']);
    echo json_encode($result);
}

function updateSubject(){
    $input = json_decode(file_get_contents('php://input'), true);
    $result=UpdateSubjectQuery($input['subjectID'],$input['subjectName']);
    echo json_encode($result);
}

function CreateSubject(){
    $input = json_decode(file_get_contents('php://input'), true);
    $result=CreateSubjectQuery($input['subjectName']);
    echo json_encode($result);
}

function fetchClasses(){
    $result=fetchClassesQuery();
    echo json_encode($result);
}
?>