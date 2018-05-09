<?php

include 'conn.php';

$log_id = $_POST['log_id'];

$sql = "SELECT
  a.finished_work,
  a.unfinished_work,
  a.plan_work,
  a.create_by,
  a.create_date,
  a.remarks remark_a,
  b.project_name,
  b.hours,
  b.remarks remark_b
  FROM
    stock_work_log a
  LEFT JOIN stock_work_load b ON a.id = b.log_id
  WHERE
    a.del_flag = 0
  AND a.id = $log_id;";

$res = query($sql);

if($res){
  $arr = [];
  while ($row = mysqli_fetch_array($res,MYSQLI_ASSOC)) {
    array_push($arr,$row);
  }
  $data['status'] = 1;
  $data['msg'] = $arr;
}else {
  $data['status'] = 0;
}

echo json_encode($data);