<?php

include 'conn.php';

$server = 'http://116.62.114.62';


$log_id = $_POST['log_id'];
$sheet_id = $_POST['file_type_id'];

$sql = "SELECT
  path
  FROM
    attachment a
  WHERE
    a.file_type_id = $sheet_id
  AND a.main_id = $log_id;";


$res = query($sql);

if($res){
  $arr = [];
  while ($row = mysqli_fetch_array($res,MYSQLI_ASSOC)) {
    $row['path'] = $server.'/project8/lz/'.explode('./',$row['path'])[1];
    array_push($arr,$row);
  }
  $data['status'] = 1;
  $data['msg'] = $arr;
}else {
  $data['status'] = 0;
}

echo json_encode($data);