<?php
/**
 * Created by PhpStorm.
 * User: adimin
 * Date: 2018/2/6
 * Time: 14:53
 */
if(!isset($_POST['userName'])){
  die('{"status": 2, "msg": "连接失败"}');
}

include 'conn.php';
$userPwd = Decode_p($_POST['userPwd'], "O0l1");

$sql = "SELECT id FROM user WHERE user_name = '". $_POST['userName'] ."' and user_password = '". $userPwd ."'";
$result = query($sql);

if($res = mysqli_fetch_array($result)){
  $data['status'] =1;
  $data['msg'] = $res;
  echo json_encode($data);
} else {
  die('{"status": 0, "msg": "用户名或密码有误！请重新输入。"}');
}


function Decode_p($str,$key)
{
  $str_code="";
  $arr_a=str_split($str, 8);
  foreach($arr_a as $value)
  {
    $str_code=$str_code.crypt($value,$key);
  }
  return $str_code;
}