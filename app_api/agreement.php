<?php
/**
 * Created by PhpStorm.
 * User: adimin
 * Date: 2018/2/6
 * Time: 17:05
 */

include 'conn.php';

$user_id  = $_POST['user_id'];

$sql = "
      SELECT
        id,
        contract
      FROM
        stock_agreement
      WHERE
        salesman_id = $user_id
      OR FIND_IN_SET($user_id, member_id)
      ORDER BY
        id DESC; ";
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