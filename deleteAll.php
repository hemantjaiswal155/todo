<?php
include('include/inc_connection.php');

  $query1 = "delete from tbl_todo";
  $response = mysql_query($query1);    

$query = "select * from tbl_todo where `task_complete`=0";
$response = mysql_query($query);
$result = array();
while($row = mysql_fetch_array($response)){
   $todo[] = array('id'=>$row['id'],'todo_task'=>$row['todo_task']);	
}


$query = "select * from tbl_todo where `task_complete`=1";
$response = mysql_query($query);
$result = array();
while($row = mysql_fetch_array($response)){
   $done[] = array('id'=>$row['id'],'todo_task'=>$row['todo_task']);	
}

$result['done']=$done;
$result['todo']=$todo;
echo json_encode($result);
?>
