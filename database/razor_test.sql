/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : razor_test

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 20/08/2023 20:01:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cargo
-- ----------------------------
DROP TABLE IF EXISTS `cargo`;
CREATE TABLE `cargo`  (
  `cod_cargo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_cargo`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cargo
-- ----------------------------
INSERT INTO `cargo` VALUES (1, 'SISTEMA', 'ENCARGADO DE SISTEMA1', 1);
INSERT INTO `cargo` VALUES (2, 'CAJA', 'ENCARGADO DE CAJA', 0);
INSERT INTO `cargo` VALUES (3, 'BARBERO', 'BABERO ', 1);
INSERT INTO `cargo` VALUES (4, 'AUXILIAR', 'ENCARGADO ASISTIR ALOS BARBEROS O MANEJAR CAJA', 1);
INSERT INTO `cargo` VALUES (5, 'CARGO PRUEBAS', 'PAR PROBAR FALLAS EN EL SISTMEA', 0);

-- ----------------------------
-- Table structure for detalle_perfil
-- ----------------------------
DROP TABLE IF EXISTS `detalle_perfil`;
CREATE TABLE `detalle_perfil`  (
  `COD_SUB_MENU` int NOT NULL,
  `COD_TIPOU` int NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`COD_SUB_MENU`, `COD_TIPOU`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of detalle_perfil
-- ----------------------------
INSERT INTO `detalle_perfil` VALUES (2, 1, 1);
INSERT INTO `detalle_perfil` VALUES (1, 1, 1);
INSERT INTO `detalle_perfil` VALUES (3, 1, 1);
INSERT INTO `detalle_perfil` VALUES (4, 1, 1);
INSERT INTO `detalle_perfil` VALUES (4, 4, 1);
INSERT INTO `detalle_perfil` VALUES (1, 4, 1);

-- ----------------------------
-- Table structure for detalle_seguridad_pin
-- ----------------------------
DROP TABLE IF EXISTS `detalle_seguridad_pin`;
CREATE TABLE `detalle_seguridad_pin`  (
  `cod_detalle_sp` int NOT NULL AUTO_INCREMENT,
  `cod_ns` int NOT NULL,
  `cod_up` int NOT NULL,
  `created_at` datetime NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_detalle_sp`, `cod_ns`, `cod_up`) USING BTREE,
  INDEX `cod_ns`(`cod_ns` ASC) USING BTREE,
  INDEX `cod_up`(`cod_up` ASC) USING BTREE,
  CONSTRAINT `detalle_seguridad_pin_ibfk_1` FOREIGN KEY (`cod_ns`) REFERENCES `nivel_seguridad` (`cod_ns`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detalle_seguridad_pin_ibfk_2` FOREIGN KEY (`cod_up`) REFERENCES `ubicacion_pin` (`cod_up`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of detalle_seguridad_pin
-- ----------------------------
INSERT INTO `detalle_seguridad_pin` VALUES (1, 1, 3, '2023-08-20 04:33:54', 1);
INSERT INTO `detalle_seguridad_pin` VALUES (2, 1, 1, '2023-08-20 04:45:11', 1);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `COD_MENU` int NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ORDEN` int NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  `ICON` varchar(6) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`COD_MENU`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, 'SISTEMA', 1, 1, 'NUL');
INSERT INTO `menu` VALUES (2, 'CONFIGURACION', 2, 1, 'MAN');

-- ----------------------------
-- Table structure for nivel_seguridad
-- ----------------------------
DROP TABLE IF EXISTS `nivel_seguridad`;
CREATE TABLE `nivel_seguridad`  (
  `cod_ns` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_ns`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of nivel_seguridad
-- ----------------------------
INSERT INTO `nivel_seguridad` VALUES (1, 'SISTEMA', 'DESARROLLO DEL SISTEMA', 1);

-- ----------------------------
-- Table structure for personal
-- ----------------------------
DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal`  (
  `cod_personal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `app` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `apm` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nit` int NOT NULL,
  `direccion` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefono` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `celular` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `cod_cargo` int NOT NULL,
  `codigo_sistema` int NOT NULL,
  `cod_ns` int NOT NULL,
  `horario` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `sueldo_bs` double NOT NULL,
  `cod_tb` tinyint(1) NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_personal`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of personal
-- ----------------------------
INSERT INTO `personal` VALUES (1, 'JUNIOR', 'AGUILAR', 'LEAÑO', 13048539, 'AV/PERIMETRAL', '', '60852098', '2023-08-17', 1, 1304, 1, '1', 5000, 4, 1);
INSERT INTO `personal` VALUES (2, 'GUSTAVO', 'SOTO', 'PECHO', 0, '', '', '', '2023-08-18', 1, 1234, 1, '1', 5000, 4, 1);
INSERT INTO `personal` VALUES (3, 'JORGE', 'MORON', 'AVILA', 0, '', '', '', '2023-08-18', 1, 4444, 1, '1', 5000, 4, 1);
INSERT INTO `personal` VALUES (4, 'XIMENA', 'JUSTINIANO', 'LUJAN', 0, '', '', '', '2023-08-19', 1, 5555, 1, '1', 5000, 4, 1);

-- ----------------------------
-- Table structure for submenu
-- ----------------------------
DROP TABLE IF EXISTS `submenu`;
CREATE TABLE `submenu`  (
  `COD_SUB_MENU` int NOT NULL AUTO_INCREMENT,
  `COD_MENU` int NOT NULL,
  `DESCRIPCION` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `RUTA` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ORDEN` int NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  `ICON` varchar(6) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`COD_SUB_MENU`) USING BTREE,
  INDEX `COD_MENU`(`COD_MENU`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of submenu
-- ----------------------------
INSERT INTO `submenu` VALUES (1, 1, 'Usuarios', 'DSlists/DSListadoUsuario.php', 2, 1, '');
INSERT INTO `submenu` VALUES (2, 1, 'Perfil Usuario', 'DSlists/DSListadoTipoU.php', 1, 1, '');
INSERT INTO `submenu` VALUES (3, 2, 'Cargos', 'DSlists/DSListadoCargo.php', 1, 1, '');
INSERT INTO `submenu` VALUES (4, 2, 'Personal', 'DSlists/DSListadoPersonal.php', 2, 1, '');

-- ----------------------------
-- Table structure for sucursal
-- ----------------------------
DROP TABLE IF EXISTS `sucursal`;
CREATE TABLE `sucursal`  (
  `COD_SUCURSAL` int NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`COD_SUCURSAL`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sucursal
-- ----------------------------
INSERT INTO `sucursal` VALUES (1, 'MATRIZ', 1);

-- ----------------------------
-- Table structure for tipo_barbero
-- ----------------------------
DROP TABLE IF EXISTS `tipo_barbero`;
CREATE TABLE `tipo_barbero`  (
  `cod_tb` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descripcion` varchar(400) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_tb`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_barbero
-- ----------------------------
INSERT INTO `tipo_barbero` VALUES (1, 'AUXILIAR', '', 1);
INSERT INTO `tipo_barbero` VALUES (2, 'JUNIOR', '', 1);
INSERT INTO `tipo_barbero` VALUES (3, 'SENIOR', '', 1);
INSERT INTO `tipo_barbero` VALUES (4, 'MASTER', '', 1);

-- ----------------------------
-- Table structure for tipo_usuario
-- ----------------------------
DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE `tipo_usuario`  (
  `COD_TIPOU` int NOT NULL AUTO_INCREMENT,
  `NOMB_TIPOU` varchar(90) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`COD_TIPOU`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_usuario
-- ----------------------------
INSERT INTO `tipo_usuario` VALUES (1, 'ADMIN-SYSTEM', 1);
INSERT INTO `tipo_usuario` VALUES (2, 'CAJA', 1);
INSERT INTO `tipo_usuario` VALUES (3, 'BARBERO', 1);
INSERT INTO `tipo_usuario` VALUES (4, 'TEST', 1);

-- ----------------------------
-- Table structure for ubicacion_pin
-- ----------------------------
DROP TABLE IF EXISTS `ubicacion_pin`;
CREATE TABLE `ubicacion_pin`  (
  `cod_up` int NOT NULL AUTO_INCREMENT,
  `cod_submenu` int NOT NULL,
  `created_at` datetime NOT NULL,
  `nombre` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_up`) USING BTREE,
  INDEX `cod_submenu`(`cod_submenu` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ubicacion_pin
-- ----------------------------
INSERT INTO `ubicacion_pin` VALUES (1, 4, '2023-08-20 09:12:53', 'Nuevo/Modificar/Eliminar', '', 1);
INSERT INTO `ubicacion_pin` VALUES (2, 4, '2023-08-20 09:12:54', 'Asignar Nivel de Seguridad', '', 1);
INSERT INTO `ubicacion_pin` VALUES (3, 0, '2023-08-20 09:12:54', 'Por asignar', '', 0);
INSERT INTO `ubicacion_pin` VALUES (4, 0, '2023-08-20 09:12:55', 'Por asignar', '', 0);
INSERT INTO `ubicacion_pin` VALUES (5, 0, '2023-08-20 09:12:55', 'Por asignar', '', 0);

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `COD_USUARIO` int NOT NULL AUTO_INCREMENT,
  `LOGIN` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `PASSWORD` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `CORREO` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_personal` int NOT NULL,
  `COD_TIPOU` int NOT NULL,
  `COD_SUCURSAL` int NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`COD_USUARIO`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 'JR', '1304', 'JUNIORLDJR@GMAIL.COM', 1, 1, 1, 1);

-- ----------------------------
-- Table structure for usuario_suc
-- ----------------------------
DROP TABLE IF EXISTS `usuario_suc`;
CREATE TABLE `usuario_suc`  (
  `COD_US` int NOT NULL AUTO_INCREMENT,
  `COD_USUARIO` int NOT NULL,
  `COD_SUCURSAL` int NOT NULL,
  `FECHA` datetime NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`COD_US`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of usuario_suc
-- ----------------------------
INSERT INTO `usuario_suc` VALUES (1, 1, 1, '2023-08-20 19:08:04', 1);

SET FOREIGN_KEY_CHECKS = 1;
