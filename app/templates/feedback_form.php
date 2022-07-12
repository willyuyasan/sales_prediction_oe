<?php

//Retriving values from the form
$id_form = $_POST["id_form"];
$real_happiness = $_POST["real_happiness"];
$happiness_probability = $_POST["happiness_probability"];

//Conditions to validate the correct filling
if ($real_happiness==0){
    die('{"output": "Sorry, you dont say your real happiness mood"}');
}

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

//echo '{"output": "connection succesfull"}';

//Create the sql script to insert the form data
$sql = "INSERT INTO happiness_feedback (id_form, real_happiness,happiness_probability)
        VALUES (?,?,?)";

//Creates the statement object
$stmt = mysqli_stmt_init($conn);

if (! mysqli_stmt_prepare($stmt,$sql) ) {
    die(mysqli_error());
}

//Binding the values to the espaces
mysqli_stmt_bind_param($stmt,"sss",
                        $id_form,
                        $real_happiness, 
                        $happiness_probability);


mysqli_stmt_execute($stmt);

echo '{"output": "Feedback saved"}';

?>

