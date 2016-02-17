<?php
$host = 'localhost';
$user = 'root';
$password = 'sipl@1234';
$dbName = 'rahulg_angular';
$conn = mysql_connect($host,$user,$password) or die("Unable to connect to MySQL");
$config = mysql_select_db($dbName,$conn);
