<?php

include 'conn.php';

$user = $_POST['user_id'];
$userName = userNameAcquire($user);

$sql = "SELECT * FROM user_inf WHERE user_id = $user;";

$res = query($sql);

if($res){
  $row = mysqli_fetch_array($res,MYSQLI_ASSOC);
  $arr = $row[0];
  
  if(!isset($arr['mobile_phone']))
    $arr['mobile_phone']='无';

  if(!isset($arr['sex']))
    $arr['sex']='未知';

  if(!isset($arr['age']))
    $arr['age']='未知';

  $arr['name'] = ''.$userName;
  $data['status'] = 1;
  $data['msg'] = $arr;

}else{
  $data['status'] = 0;
}

echo json_encode($data);