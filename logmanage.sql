/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : logmanage

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-05-09 10:21:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for industry
-- ----------------------------
DROP TABLE IF EXISTS `industry`;
CREATE TABLE `industry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id0` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id0` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project_main
-- ----------------------------
DROP TABLE IF EXISTS `project_main`;
CREATE TABLE `project_main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id0` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `family` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `member` text,
  `expiration_date` date DEFAULT NULL,
  `build_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `start_time` date DEFAULT NULL,
  `builder` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `leader` int(11) DEFAULT NULL,
  `manager` int(11) DEFAULT NULL,
  `file_tree` int(11) DEFAULT NULL,
  `document_tree` int(11) DEFAULT NULL,
  `function` text COMMENT '项目功能',
  `editor` text,
  `useful` int(11) DEFAULT NULL COMMENT '删除标记，1在用，0回收',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for stock_agreement
-- ----------------------------
DROP TABLE IF EXISTS `stock_agreement`;
CREATE TABLE `stock_agreement` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL COMMENT '项目ID',
  `project` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '项目名称',
  `salesman_id` int(11) DEFAULT NULL COMMENT '业务员',
  `member_id` text COLLATE utf8_bin COMMENT '相关人员',
  `company` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '公司名称',
  `contract_NO` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '合同编号',
  `contract` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '合同名称',
  `contract_amount` float DEFAULT NULL COMMENT '合同额',
  `pay_ratio` float DEFAULT NULL COMMENT '付款比例',
  `back_amount` float DEFAULT NULL COMMENT '回款金额',
  `back_pay_ratio` float DEFAULT NULL COMMENT '回款比例',
  `invoice_company` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '开票单位',
  `invoice_amount` float DEFAULT NULL COMMENT '开票金额',
  `receivables` float DEFAULT NULL COMMENT '应收账款',
  `signing_date` date DEFAULT NULL COMMENT '签订日期',
  `contract_delivery_date` date NOT NULL COMMENT '合同交货日期',
  `collection_date` date DEFAULT NULL COMMENT '收款日期',
  `expiration_date` date DEFAULT NULL COMMENT '质保到期日期',
  `industry_type` int(11) DEFAULT NULL COMMENT '行业类型',
  `product_type` int(11) DEFAULT NULL COMMENT '产品类型',
  `city_id` int(11) DEFAULT NULL COMMENT '城市',
  `designing_institute` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '设计院名称',
  `file_type_id` int(11) DEFAULT NULL COMMENT '附件',
  `content` text COLLATE utf8_bin COMMENT '备注',
  `enter_id` int(11) DEFAULT NULL COMMENT '录入人',
  `enter_time` datetime DEFAULT NULL COMMENT '录入时间',
  `mulu1` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `city_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`,`contract_delivery_date`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for stock_work_load
-- ----------------------------
DROP TABLE IF EXISTS `stock_work_load`;
CREATE TABLE `stock_work_load` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` varchar(64) DEFAULT NULL COMMENT '填报人',
  `log_id` varchar(64) DEFAULT NULL COMMENT '日志ID',
  `project_id` varchar(64) DEFAULT NULL COMMENT '项目ID',
  `project_name` varchar(200) DEFAULT NULL COMMENT '项目名称',
  `hours` double DEFAULT NULL COMMENT '时间',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建者',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT NULL COMMENT '更新者',
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=427 DEFAULT CHARSET=utf8 COMMENT='项目工作量';

-- ----------------------------
-- Table structure for stock_work_log
-- ----------------------------
DROP TABLE IF EXISTS `stock_work_log`;
CREATE TABLE `stock_work_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int(11) DEFAULT NULL,
  `finished_work` varchar(2000) DEFAULT NULL,
  `unfinished_work` varchar(2000) DEFAULT NULL,
  `plan_work` varchar(2000) DEFAULT NULL COMMENT '计划工作',
  `comment` varchar(2000) DEFAULT NULL COMMENT '评论信息',
  `pic_address` varchar(500) DEFAULT NULL COMMENT '图片地址',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建者',
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_by` varchar(64) DEFAULT NULL COMMENT '更新者',
  `update_time` timestamp NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(255) DEFAULT NULL COMMENT '删除标记 0删除 1正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for stock_work_receive
-- ----------------------------
DROP TABLE IF EXISTS `stock_work_receive`;
CREATE TABLE `stock_work_receive` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` varchar(64) DEFAULT NULL COMMENT '填报人',
  `log_id` varchar(64) DEFAULT NULL,
  `receive_user_id` varchar(64) DEFAULT NULL COMMENT '接收人',
  `receive_group_id` varchar(64) DEFAULT NULL COMMENT '接受组',
  `receive_type` char(1) DEFAULT NULL COMMENT '接受类型',
  `read_flag` char(1) DEFAULT NULL COMMENT '是否阅读',
  `read_time` date DEFAULT NULL COMMENT '阅读时间',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建者',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT NULL COMMENT '更新者',
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8 COMMENT='工作日志查收人';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL COMMENT '真实姓名',
  `mulu1` tinyint(4) DEFAULT NULL COMMENT '部门id',
  `mulu2` tinyint(4) DEFAULT NULL,
  `mulu3` smallint(6) DEFAULT NULL,
  `mulu4` mediumint(9) DEFAULT NULL,
  `mulu5` mediumint(9) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL COMMENT '职位id',
  `code` char(20) DEFAULT NULL,
  `user_name` char(50) DEFAULT '' COMMENT '用户名',
  `user_password` char(50) DEFAULT '8' COMMENT '用户密码',
  `expire_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_project
-- ----------------------------
DROP TABLE IF EXISTS `user_project`;
CREATE TABLE `user_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `p_manager` varchar(255) DEFAULT NULL,
  `p_leader` varchar(255) DEFAULT NULL,
  `p_member` varchar(255) DEFAULT NULL,
  `p_f_manager` varchar(255) DEFAULT NULL,
  `p_f_leader` varchar(255) DEFAULT NULL,
  `p_f_member` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for _area
-- ----------------------------
DROP TABLE IF EXISTS `_area`;
CREATE TABLE `_area` (
  `id` int(11) NOT NULL,
  `id0` int(11) NOT NULL DEFAULT '0' COMMENT '父级ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `SHORT_NAME` varchar(50) NOT NULL COMMENT '简称',
  `LONGITUDE` float NOT NULL DEFAULT '0' COMMENT '经度',
  `LATITUDE` float NOT NULL DEFAULT '0' COMMENT '纬度',
  `LEVEL` int(1) NOT NULL COMMENT '等级(1省/直辖市,2地级市,3区县,4镇/街道)',
  `SORT` int(3) NOT NULL DEFAULT '1' COMMENT '排序',
  `STATUS` int(1) NOT NULL DEFAULT '0' COMMENT '状态(0禁用/1启用)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
