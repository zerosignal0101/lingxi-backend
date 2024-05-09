/*
Navicat MySQL Data Transfer

Source Server         : 116.62.197.58
Source Server Version : 80018
Source Host           : 116.62.197.58:3306
Source Database       : MakingFriends

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2024-05-09 22:28:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for PostInfo
-- ----------------------------
DROP TABLE IF EXISTS `PostInfo`;
CREATE TABLE `PostInfo` (
  `PostId` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `latitude` decimal(40,20) NOT NULL COMMENT '经度',
  `longitude` decimal(40,20) NOT NULL COMMENT '纬度',
  `content` varchar(5000) NOT NULL COMMENT '帖子的内容',
  `postingTime` datetime NOT NULL COMMENT '发帖人的游玩时间',
  `tags` varchar(5000) NOT NULL COMMENT 'Tags标签信息',
  `title` varchar(500) NOT NULL,
  `anthorName` varchar(255) NOT NULL COMMENT '发贴人作者，就是登录的用户名',
  `image` varchar(255) DEFAULT NULL COMMENT '发贴时使用的图片，二进制',
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL COMMENT '发贴人在发贴时填写的手机号',
  `address` varchar(255) DEFAULT NULL COMMENT '发贴的集合地点',
  PRIMARY KEY (`PostId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='帖子信息';

-- ----------------------------
-- Records of PostInfo
-- ----------------------------
INSERT INTO `PostInfo` VALUES ('2', '0.00000000000000000000', '0.00000000000000000000', 'string', '2024-05-09 14:25:20', 'string', 'string', 'string', 'string', 'string', 'string', 'string');

-- ----------------------------
-- Table structure for UserInfo
-- ----------------------------
DROP TABLE IF EXISTS `UserInfo`;
CREATE TABLE `UserInfo` (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userName` varchar(255) DEFAULT NULL COMMENT '登录名',
  `userStudentId` varchar(255) DEFAULT NULL COMMENT '学号',
  `creditScore` int(11) NOT NULL DEFAULT '0' COMMENT '信誉分',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息';

-- ----------------------------
-- Records of UserInfo
-- ----------------------------
INSERT INTO `UserInfo` VALUES ('1', '刘力萌', '2021210579', '0');
