<?php

//Retriving values from the form
$id_form = $_POST["id_form"];
$name = $_POST["name"];
$words = $_POST["words"];
$age = $_POST["age"];
$genre = filter_input(INPUT_POST,"genre",FILTER_SANITIZE_SPECIAL_CHARS);
$labor_status = filter_input(INPUT_POST,"labor_status",FILTER_VALIDATE_INT);
$check = filter_input(INPUT_POST,"check",FILTER_VALIDATE_BOOL);

//Conditions to validate the correct filling
if (!$check){
    die('{"output": "Sorry, you dont want to know your chances of being happy"}');
}

if (!$genre){
    die('{"output":"You should specify your genre"}');
}

if (!$labor_status){
    die('{"output":"You should specify your labor status"}');
}

if ($age=="--"){
    die('{"output":"You should specify your age"}');
}


//var_dump($name, $words, $age, $genre, $labor_status, $check);

//connection to the database
// Conncetion parameters
$host = "mysql_host";
$dbname = "forms";
$username = "root";
$password = "william";

//connection
$conn = mysqli_connect(hostname: $host, 
                        username: $username, 
                        password: $password, 
                        database: $dbname);

//Kills the program if connection is unsuccessful
if (mysqli_connect_errno()){
    //die("connection error: " . mysqli_connect_error());
    die('{"output": mysqli_connect_error()}');
}

//echo '{"output": "Record saved"}';

//Create the sql script to insert the form data
$sql = "INSERT INTO happiness_form (id_form, name, words, age, genre, labor_status)
        VALUES (?,?,?,?,?,?)";

//Creates the statement object
$stmt = mysqli_stmt_init($conn);

if (! mysqli_stmt_prepare($stmt,$sql) ) {
    die(mysqli_error());
}

//Binding the values to the espaces
mysqli_stmt_bind_param($stmt,"sssssi",
                        $id_form,
                        $name, 
                        $words, 
                        $age, 
                        $genre, 
                        $labor_status);


mysqli_stmt_execute($stmt);

echo '{"output": "Record saved"}';

//header("location:response.html")


?>

