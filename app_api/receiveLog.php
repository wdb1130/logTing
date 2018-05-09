<?php

include 'conn.php';

$user = $_POST['user_id']; // user id
$nums = 20; //Display bar number per page

//which page
if(isset($_POST['page'])){
  $page = $_POST['page'];
}else {
  $page = 0;
}
$start = $page * $nums; //start index

if(isset($_POST['read_flag'])){ // has readed
  $sql = "SELECT
    a.id,
    a.finished_work,
    a.unfinished_work,
    a.plan_work,
    a.create_by,
    a.create_date,
    b.read_flag
    FROM
      stock_work_log a
    LEFT JOIN stock_work_receive b ON a.id = b.log_id
    WHERE
      a.del_flag = '0'
    AND b.del_flag = '0'
    AND b.receive_user_id = $user 
    AND b.read_flag = '0'
    ORDER BY a.id DESC
    ;";
} else {
  $sql = "SELECT
      a.id,
      a.finished_work,
      a.unfinished_work,
      a.plan_work,
      a.create_by,
      a.create_date,
      b.read_flag
      FROM
        stock_work_log a
      LEFT JOIN stock_work_receive b ON a.id = b.log_id
      WHERE
        a.del_flag = '0'
      AND b.del_flag = '0'
      AND b.receive_user_id = $user 
      ORDER BY a.id DESC
      LIMIT $start, $nums
      ;";
}




$res = query($sql);

if($res){
  $arr = [];
  while ($row = mysqli_fetch_array($res,MYSQLI_ASSOC)) {
    array_push($arr, $row);
  }
  $data['status'] = 1;
  $data['msg'] = $arr;
} else{
  $data['status'] = 0;
}

echo json_encode($data);