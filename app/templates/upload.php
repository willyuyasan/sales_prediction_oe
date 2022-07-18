<?php

$file=$_FILES['myfile'];
move_uploaded_file($file['tmp_name'],"inputs/".$file['name']);
//here the "photos" folder is in same folder as the upload.php, 
//otherwise complete url has to be mentioned

//echo "File Name<b>::</b> ".$file['name'];
echo '{"output": "input delivered"}';
?>