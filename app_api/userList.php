<?php
/**
 * Created by PhpStorm.
 * User: adimin
 * Date: 2018/3/5
 * Time: 13:43
 */

include 'conn.php';

$user_id = $_POST['user_id'];

$sql = "SELECT id,name FROM user WHERE post_id = 1 and id != $user_id";
$result = query($sql);

if($result){
  $arr = [];
  while ($res = mysqli_fetch_array($result,MYSQLI_ASSOC)){
    array_push($arr,$res);
  }
  $data['status'] = 1;
  $data['msg'] = $arr;
  echo json_encode($data);
} else {
  echo '{"status":0}';
}