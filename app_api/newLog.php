<?php
/**
 * Created by PhpStorm.
 * User: adimin
 * Date: 2018/3/7
 * Time: 17:19
 */

include 'conn.php';



$user_id = $_POST['user_id'];
$userName = userNameAcquire($user_id);


$finished_work = $_POST['finished_work'];
if (!isset($_POST['unfinished_work']))
  $_POST['unfinished_work'] = null;
if (!isset($_POST['plan_work']))
  $_POST['plan_work'] = null;
if (!isset($_POST['remarks']))
  $_POST['remarks'] = null;
if (!isset($_POST['hours']))
  $_POST['hours'] = null;

//TODO get project information
if (!isset($_POST['project_id']))
  $_POST['project_id'] = null;
if (!isset($_POST['project_name']))
  $_POST['project_name'] = null;




//inserd data to stock_work_log
$sql = "insert into stock_work_log (id,user_id,finished_work,unfinished_work,plan_work,remarks,create_by,del_flag) VALUES (  null, 
    '".$user_id."', '".$finished_work."', '".$_POST['unfinished_work'] ."', '".$_POST['plan_work'] ."', '". $_POST['remarks'] . "', '". $userName . "', 0);";
$res_log = query($sql);


if ($res_log) {
  $log_id = $lnk->insert_id;

  //insert image msg to attachment
  if(isset($_POST['baseImg'])){
    $_SESSION['log_id'] = $log_id;
    include 'img_base64_fn.php';
  }

 //inserd data to stock_work_load
 $i = 0;
 while ( !empty($_POST['name-'.$i]) ) {
  if(!isset($_POST['remark-'.$i])){
    $_POST['remark-'.$i] = '';
    continue;
  }
  if (!empty($_POST['hour-'.$i])) {
    $sql_load = "insert into stock_work_load (id,user_id,log_id,project_id,project_name,hours,create_by, remarks, del_flag) VALUES 
            (null,'".$user_id."','".$log_id."','".$_POST['project-'.$i]."','".$_POST['name-'.$i]."','".$_POST['hour-'.$i]."', '". $userName . "', '". $_POST['remark-'.$i] . "',0);";
    $res_load = query($sql_load);
  }
  $i++;
 }


 //inserd data to stock_work_receive
 if (isset($_POST['receive_people'])){
    $people = explode(',',$_POST['receive_people']);
    $i = 0;
    while (isset($people[$i])) {
      $sql_receive = "insert into stock_work_receive (id,user_id,log_id,receive_user_id,create_by,read_flag,del_flag) VALUES (null,'".$user_id."','".$log_id."','".$people[$i]."', '". $userName . "',0,0);";
      query($sql_receive);
      $i++;
    }  
  }

  echo '{"status":1}';
} else {
  echo '{"status":0}';
}
