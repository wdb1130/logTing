<?php

include 'conn.php';

$log_id = $_POST['log_id'];
$sql = "SELECT
          a.remarks,
          a.update_date,
          b.name
        FROM
          stock_work_receive a
        LEFT JOIN user b ON a.receive_user_id = b.id
        WHERE
          a.del_flag = 0
        AND a.read_flag = 1
        AND a.log_id = $log_id;";

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