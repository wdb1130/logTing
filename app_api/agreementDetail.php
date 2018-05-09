<?php
/**
 * Created by PhpStorm.
 * User: adimin
 * Date: 2018/2/6
 * Time: 19:07
 */

include 'conn.php';
if(isset($_POST['id'])){
  $sql = "SELECT * FROM stock_agreement WHERE id = " .$_POST['id'];
  $sql = "SELECT
            a.contract,
            a.project,
            a.signing_date,
            a.company,
            a.contract_delivery_date,
            a.contract_amount,
            a.collection_date,
            a.content,
            a.enter_time,
            b. NAME bname,
            c. NAME cname,
            d. NAME dname,
            e. NAME ename
          FROM
            stock_agreement a
          LEFT JOIN product b ON a.product_type = b.id
          LEFT JOIN `user` c ON a.salesman_id = c.id
          LEFT JOIN industry d ON a.industry_type = d.id
          LEFT JOIN _area e ON a.city_id = e.id
          WHERE
            a.id = ".$_POST['id'];

} else{
    die ('{"status":0}');
}
$result = query($sql);

if($res = mysqli_fetch_array($result,MYSQLI_ASSOC)){
  $data['status'] = 1;
  $data['msg'] = $res;
} else {
  $data['status'] = 0;
}
echo json_encode($data);
