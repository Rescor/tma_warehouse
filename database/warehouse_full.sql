/*
 Navicat Premium Data Transfer

 Source Server         : RSX
 Source Server Type    : MySQL
 Source Server Version : 101106 (10.11.6-MariaDB-0+deb12u1)
 Source Host           : 049406.xyz:3306
 Source Schema         : warehouse

 Target Server Type    : MySQL
 Target Server Version : 101106 (10.11.6-MariaDB-0+deb12u1)
 File Encoding         : 65001

 Date: 03/04/2024 23:15:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for item_groups
-- ----------------------------
DROP TABLE IF EXISTS `item_groups`;
CREATE TABLE `item_groups`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of item_groups
-- ----------------------------
INSERT INTO `item_groups` VALUES (1, 'Yellow');
INSERT INTO `item_groups` VALUES (2, 'Blue');
INSERT INTO `item_groups` VALUES (3, 'Green');
INSERT INTO `item_groups` VALUES (4, 'Red');

-- ----------------------------
-- Table structure for items
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `group_id` int NOT NULL,
  `measure` float NOT NULL,
  `measure_unit_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(15, 2) NOT NULL,
  `storage_location` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `contacts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `photo` blob NULL,
  `status` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `default_quantity` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `group_id`(`group_id` ASC) USING BTREE,
  INDEX `measure_unit_id`(`measure_unit_id` ASC) USING BTREE,
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `item_groups` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `items_ibfk_2` FOREIGN KEY (`measure_unit_id`) REFERENCES `measure_units` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO `items` VALUES (12, 'Notebook', 3, 1, 1, 200, 300.00, 'Area 51', '', NULL, '', 5);
INSERT INTO `items` VALUES (15, 'Strawberry', 4, 5, 3, 2, 1000.00, 'Fridge', '', NULL, 'Open', 1);
INSERT INTO `items` VALUES (16, 'Pizza', 1, 800, 2, 100, 400.00, 'Kitchen', 'Mike Anderson', NULL, 'Hot', 1);
INSERT INTO `items` VALUES (17, 'Blueberry Juice', 2, 10, 5, 5, 1500.00, 'Room 28', '', NULL, '', 1);

-- ----------------------------
-- Table structure for measure_units
-- ----------------------------
DROP TABLE IF EXISTS `measure_units`;
CREATE TABLE `measure_units`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `unit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of measure_units
-- ----------------------------
INSERT INTO `measure_units` VALUES (1, 'pcs');
INSERT INTO `measure_units` VALUES (2, 'g');
INSERT INTO `measure_units` VALUES (3, 'kg');
INSERT INTO `measure_units` VALUES (4, 'ml');
INSERT INTO `measure_units` VALUES (5, 'l');
INSERT INTO `measure_units` VALUES (6, 'cm');
INSERT INTO `measure_units` VALUES (7, 'm');

-- ----------------------------
-- Table structure for requests
-- ----------------------------
DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `employee_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `measure` decimal(15, 2) NOT NULL,
  `measure_unit_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(15, 2) NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status_id` int NULL DEFAULT 1,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `item_id`(`item_id` ASC) USING BTREE,
  INDEX `measure_id`(`measure_unit_id` ASC) USING BTREE,
  INDEX `status_id`(`status_id` ASC) USING BTREE,
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`measure_unit_id`) REFERENCES `measure_units` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `requests_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of requests
-- ----------------------------
INSERT INTO `requests` VALUES (35, 16, 'Alice Patterson', 1600.00, 2, 2, 800.00, 'With ham and cheese!', 2, 3);
INSERT INTO `requests` VALUES (36, 12, 'Alice Patterson', 5.00, 1, 5, 1500.00, '', 3, 3);
INSERT INTO `requests` VALUES (37, 15, 'Mike Anderson', 5.00, 3, 1, 1000.00, '', 1, 4);

-- ----------------------------
-- Table structure for statuses
-- ----------------------------
DROP TABLE IF EXISTS `statuses`;
CREATE TABLE `statuses`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of statuses
-- ----------------------------
INSERT INTO `statuses` VALUES (1, 'New');
INSERT INTO `statuses` VALUES (2, 'Approve');
INSERT INTO `statuses` VALUES (3, 'Reject');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'employee',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', 'Chloe Ward', 'administrator');
INSERT INTO `users` VALUES (2, 'coordinator', 'John Parker', 'coordinator');
INSERT INTO `users` VALUES (3, 'employee1', 'Alice Patterson', 'employee');
INSERT INTO `users` VALUES (4, 'employee2', 'Mike Anderson', 'employee');

SET FOREIGN_KEY_CHECKS = 1;
