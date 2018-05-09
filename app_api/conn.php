<?php
header("Content-type:text/html;charset= utf-8");

//主机名或IP地址
  // $url_or_ip="127.0.0.1";
$url_or_ip="192.168.20.230";
//数据库用户名
$user_name='root';
//数据库密码
$password='1qaz2wsx';
// $password=''; 
//设定数据库名
$datebase="project";

$lnk = mysqli_connect($url_or_ip, $user_name, $password, $datebase);

if (mysqli_connect_errno($lnk)) {
  echo "连接 MySQL 失败: " . mysqli_connect_error();
}
//调整编码模式
mysqli_query($lnk, "SET NAMES UTF8");
// echo $datebase;
//mysqli_select_db($datebase, $lnk) or die('<h10>第二步失败，没有成功的打开数据库'.$datebase.'，请检查数据库选择是否正确！！！</h10>' );
//执行SQL语句
function query($Query_String)
{
  global $lnk;
  $rs = mysqli_query($lnk, $Query_String) or die('{"status": 0, "msg":"sql执行错误,请联系管理员!", "sql": "第三步失败，执行SQL语句(' . $Query_String . ')发生错误，请检查SQL语句是否正确：' . mysqli_error($lnk) . '"}');;
//  $rs = mysqli_query($lnk, $Query_String) or die("<h10>第三步失败，执行SQL语句（</h10>" . $Query_String . "<h10>)发生错误，请检查SQL语句是否正确：" . mysqli_error($lnk) . "</h10>");;
  return $rs;
}

function Cquery($Query_String)
{
 
 		if(or_change2($Query_String))//如果是查询语句
		{
				if(isset($_SESSION["project_id"]))
					{
						if($_SESSION["project_id"]!="" and $_SESSION["project_id"]!=0)
						{
								$Query_String=sql_add_where($Query_String,"project_id=".$_SESSION["project_id"]);	
						}
					}
		}
 		if(or_change1($Query_String))//如果是插入数据语句
		{
				if(isset($_SESSION["project_id"]))
					{
						if($_SESSION["project_id"]!="" and $_SESSION["project_id"]!=0)
						{
								$Query_String=add_insert_list($Query_String,"project_id",$_SESSION["project_id"]);	
						}
					}
		}
	//	echo $Query_String;
		
		global $lnk;
//		echo $Query_String;
		$rs=mysqli_query($lnk,$Query_String) ;
		return  $rs;
}

function userNameAcquire ($id){
	$sql = "SELECT name FROM user WHERE id = $id";
	$rs = query($sql);
	$row = mysqli_fetch_array($rs);
	return $row['name'];
}