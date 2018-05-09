<?php

include 'conn.php';

$log_id = $_POST['log_id'];

$sql  = "UPDATE stock_work_log SET del_flag = '1'  WHERE id = $log_id";

$res = query($sql);

if($res){
  $data['status'] = 1;
}else {
  $data['status'] = 0;
}

echo json_encode($data);