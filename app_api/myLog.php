<?php

include 'conn.php';

$user = $_POST['user_id'];
$nums = 5; //Display bar number per page

//which page
if(isset($_POST['page'])){
  $page = $_POST['page'];
}else {
  $page = 0;
}

$start = $page * $nums; //start index

$sql = "SELECT
          id,
          finished_work,
          unfinished_work,
          plan_work,
          create_by,
          create_date
        FROM 
          stock_work_log 
        WHERE 
          user_id = $user 
        AND  del_flag = '0' 
        ORDER BY id DESC
        LIMIT $start, $nums ;";

$res = query($sql);

$arr = [];
if($res){
  while ($row = mysqli_fetch_array($res,MYSQLI_ASSOC)) {
    array_push($arr, $row);
  }
  $data['status'] = 1;
  $data['msg'] = $arr;

}else{
  $data['status'] = 0;
}

echo json_encode($data);