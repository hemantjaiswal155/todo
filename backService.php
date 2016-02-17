<?php
include('include/inc_connection.php');
$postData = json_decode(file_get_contents("php://input"));
 if(isset($postData) && ($postData != '')){
     $task = mysql_real_escape_string($postData->newRule);
      $checkExistance = "select * from tbl_todo where `todo_task`='".$task."' and `task_complete`=0";
	  $response = mysql_query($checkExistance);
	  $count = mysql_num_rows($response);
        if($count == 0){
			   $query1 = "insert into tbl_todo set `todo_task`='".$task."'";
			   $response = mysql_query($query1);    
        }else{
				$result[] = 'false';
				echo json_encode($result);
				die;
	    }  
 }


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
