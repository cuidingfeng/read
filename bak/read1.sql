/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : read

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2015-10-23 20:00:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tags` varchar(255) DEFAULT NULL COMMENT '所在分类，多个分类名称',
  `title` varchar(255) DEFAULT NULL COMMENT '书名',
  `author` varchar(255) DEFAULT NULL COMMENT '作者',
  `site` varchar(255) DEFAULT NULL COMMENT '采集站点',
  `childNum` int(11) DEFAULT NULL COMMENT '章节数',
  `finish` int(11) NOT NULL DEFAULT '1' COMMENT '是否完结，0未完结，1完结',
  `lastDate` datetime DEFAULT NULL COMMENT '最后更新日期',
  `pic` varchar(255) DEFAULT NULL COMMENT '封面图',
  `intro` text COMMENT '简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for column
-- ----------------------------
DROP TABLE IF EXISTS `column`;
CREATE TABLE `column` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '栏目表',
  `pid` int(11) DEFAULT NULL COMMENT '父ID，根栏目没有父ID',
  `title` varchar(255) DEFAULT NULL COMMENT '栏目名称',
  `bookNum` int(11) DEFAULT NULL COMMENT '有几本书',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for section
-- ----------------------------
DROP TABLE IF EXISTS `section`;
CREATE TABLE `section` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '章节表',
  `bid` int(11) DEFAULT NULL COMMENT '图书ID',
  `url` varchar(255) DEFAULT NULL COMMENT '下载地址',
  `content` longtext COMMENT '章节内容',
  `title` varchar(255) DEFAULT NULL COMMENT '章节名称',
  `sequence` varchar(255) DEFAULT NULL COMMENT '章节序号',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标签关系',
  `cid` int(11) DEFAULT NULL COMMENT '栏目id',
  `bid` int(11) DEFAULT NULL COMMENT '书id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
