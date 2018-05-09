<?php
  /**
 * Created by PhpStorm.
 * User: adimin
 * Date: 2018/3/7
 * Time: 17:19
 */

include 'conn.php';

$user_id = $_POST['user_id'];

$sql = "SELECT id,name FROM `project_main` WHERE type = 1 AND member LIKE '%,".$user_id.",%'";

$res = query($sql);

$arr=[];

if($res){
  while ($row = mysqli_fetch_array($res,MYSQLI_ASSOC)) {
    array_push($arr,$row);
  }
  echo json_encode($arr);
}
