<?php
/**
 * Created by PhpStorm.
 * User: adimin
 * Date: 2018/3/13
 * Time: 13:43
 */

include 'conn.php';

$user_id = $_POST['user_id'];
$log_id = $_POST['log_id'];
$comment = $_POST['comment'];

$sql = "UPDATE stock_work_receive SET remarks ='".$comment."' WHERE receive_user_id=$user_id and log_id=$log_id";
$result = query($sql);

if($result){
  $data['status'] = 1;
  echo json_encode($data);
} else {
  echo '{"status":0}';
}