<?php

$datapath = date("Y") . "/" . date("m") . "/" . date("d"). "/" ;
$uploadDir = "../upfile/log/" . $datapath;  //图片存储目录



$base_img = json_decode($_POST['baseImg']);

// make img dir 
if (!file_exists($uploadDir)) {
  creatDir($uploadDir);
}

for($i= 0; $i<count($base_img); $i++){
  $img = str_replace(' ', '+', $base_img[$i]);
  get_base64_img($img,$uploadDir,$i);
}




/**
 * base64转码图片
 * @param $base64
 * @param string $path
 * @param string img index
 * @return bool|string
 */
function get_base64_img($base64,$path = '../upfile/log/',$index){
   if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64, $result)){
     $type = $result[2];
     // $new_file = $path.time().".{$type}";
     $new_file = $path.time().''.$index.".{$type}";
     
     $arr = [];
     if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64)))){

      insertAttach($new_file,$_POST['file_type']);
       $arr['name']  = $new_file;
       $arr['msg']  = 'success';
       // echo json_encode($arr);
     }else{
       $arr['name']  = '';
       $arr['msg']  = 'error';
       // echo json_encode($arr);
     }
   }
}

/**
 * [creatDir创建目录]
 * @param  [url] $path 
 * @return [type]       
 */
function creatDir($path){
  $path_part = explode("/", $path);//分割目录
  $i = 1;
  while ($i <= count($path_part))//创建目录
  {
    $m = 0;
    $file_path = "";
    while ($m <= $i - 1)//创建新目录，用于判断
    {
      $file_path = $file_path . $path_part[$m] . "/";
      $m++;
    }
    if (!is_dir($file_path)) {        //判断指定目录是否存在
      mkdir($file_path);          //创建目录
    }
    $i++;
  }
}

/**
 * [insertAttach 路径插入附件表]
 * @param  [type] $path      [img url]
 * @param  [type] $file_type [sheet id]
 * @param  [type] $main_id   [log_id]
 * @return [type]            [description]
 */
function insertAttach($path,$file_type){
   $path = './'.explode('../',$path)[1];   //拼接成 ./upfile格式
   $sql = "insert into attachment (           
              main_id,
              file_type_id,
              path
            ) values (
              '".$_SESSION['log_id']."',
              '".$file_type."',
              '".$path."'
            );";
  query($sql);
}
      
