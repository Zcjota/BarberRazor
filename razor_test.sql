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

 Date: 28/08/2023 02:41:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bitacora_cliente
-- ----------------------------
DROP TABLE IF EXISTS `bitacora_cliente`;
CREATE TABLE `bitacora_cliente`  (
  `cod_bc` int NOT NULL AUTO_INCREMENT,
  `cod_propietario` int NOT NULL,
  `cod_personal` int NOT NULL,
  `fecha` datetime NOT NULL,
  `tipo` char(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'A=alta, B=baja, M=modificar',
  `ACTIVO` tinyint(1) NOT NULL,
  `COD_SUCURSAL` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`cod_bc`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of bitacora_cliente
-- ----------------------------
INSERT INTO `bitacora_cliente` VALUES (1, 7899, 1, '2023-08-27 21:34:39', 'A', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (2, 7899, 1, '2023-08-27 21:36:55', 'M', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (3, 7899, 1, '2023-08-27 21:37:03', 'M', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (4, 7899, 1, '2023-08-27 21:39:45', 'M', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (5, 7899, 1, '2023-08-27 21:39:53', 'B', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (6, 1, 1, '2023-08-27 21:41:40', 'A', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (7, 2, 1, '2023-08-28 00:49:25', 'A', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (8, 2, 1, '2023-08-28 00:49:45', 'M', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (9, 1, 1, '2023-08-28 00:49:55', 'M', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (10, 2, 1, '2023-08-28 00:50:03', 'M', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (11, 1, 1, '2023-08-28 00:50:12', 'M', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (12, 3, 1, '2023-08-28 00:50:43', 'A', 1, 1);
INSERT INTO `bitacora_cliente` VALUES (13, 3, 1, '2023-08-28 00:51:19', 'B', 1, 1);

-- ----------------------------
-- Table structure for bitacora_producto
-- ----------------------------
DROP TABLE IF EXISTS `bitacora_producto`;
CREATE TABLE `bitacora_producto`  (
  `cod_bp` int NOT NULL AUTO_INCREMENT,
  `cod_producto` int NOT NULL,
  `tipo` varchar(2) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'A = alta, B = baja',
  `personal` int NOT NULL,
  `fecha` datetime NOT NULL,
  `COD_SUCURSAL` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`cod_bp`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bitacora_producto
-- ----------------------------
INSERT INTO `bitacora_producto` VALUES (1, 1, 'A', 1, '2023-08-27 18:23:52', 1);
INSERT INTO `bitacora_producto` VALUES (2, 2, 'A', 1, '2023-08-27 22:44:38', 1);
INSERT INTO `bitacora_producto` VALUES (3, 3, 'A', 1, '2023-08-28 00:52:31', 1);
INSERT INTO `bitacora_producto` VALUES (4, 4, 'A', 1, '2023-08-28 00:53:45', 1);
INSERT INTO `bitacora_producto` VALUES (5, 5, 'A', 1, '2023-08-28 00:53:45', 1);
INSERT INTO `bitacora_producto` VALUES (6, 6, 'A', 1, '2023-08-28 00:53:45', 1);
INSERT INTO `bitacora_producto` VALUES (7, 6, 'B', 1, '2023-08-28 00:54:16', 1);
INSERT INTO `bitacora_producto` VALUES (8, 7, 'A', 1, '2023-08-28 00:55:59', 1);

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
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cargo
-- ----------------------------
INSERT INTO `cargo` VALUES (1, 'SISTEMA', 'ENCARGADO DE SISTEMA1', 1);
INSERT INTO `cargo` VALUES (2, 'CAJA', 'ENCARGADO DE CAJA', 0);
INSERT INTO `cargo` VALUES (3, 'BARBERO', 'BABEROS', 1);
INSERT INTO `cargo` VALUES (4, 'AUXILIAR', 'ENCARGADO ASISTIR ALOS BARBEROS O MANEJAR CAJA', 1);
INSERT INTO `cargo` VALUES (5, 'CARGO PRUEBAS', 'PAR PROBAR FALLAS EN EL SISTMEA', 0);
INSERT INTO `cargo` VALUES (6, 'TEST', 'PRUEBAS DE CARGO', 0);
INSERT INTO `cargo` VALUES (7, 'AUXILIAR 2', '', 0);
INSERT INTO `cargo` VALUES (8, 'TEST', 'TEST 1', 0);

-- ----------------------------
-- Table structure for categoria_producto
-- ----------------------------
DROP TABLE IF EXISTS `categoria_producto`;
CREATE TABLE `categoria_producto`  (
  `cod_categoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_categoria`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_producto
-- ----------------------------
INSERT INTO `categoria_producto` VALUES (1, 'BEBIDAS', 1);
INSERT INTO `categoria_producto` VALUES (2, 'SNACK', 1);
INSERT INTO `categoria_producto` VALUES (3, 'TIENDA', 1);

-- ----------------------------
-- Table structure for categoria_producto_copy1
-- ----------------------------
DROP TABLE IF EXISTS `categoria_producto_copy1`;
CREATE TABLE `categoria_producto_copy1`  (
  `cod_categoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_categoria`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_producto_copy1
-- ----------------------------

-- ----------------------------
-- Table structure for comision_barbero
-- ----------------------------
DROP TABLE IF EXISTS `comision_barbero`;
CREATE TABLE `comision_barbero`  (
  `cod_comision` int NOT NULL AUTO_INCREMENT,
  `cod_tb` int NOT NULL,
  `cod_ts` int NOT NULL,
  `monto_bs` double NOT NULL,
  `porcentaje` double NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_comision`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of comision_barbero
-- ----------------------------

-- ----------------------------
-- Table structure for control_calidad
-- ----------------------------
DROP TABLE IF EXISTS `control_calidad`;
CREATE TABLE `control_calidad`  (
  `cod_control` int NOT NULL AUTO_INCREMENT,
  `cod_cliente` int NOT NULL,
  `cod_recibo` int NOT NULL,
  `cod_barbero` int NOT NULL,
  `cod_aux` int NOT NULL,
  `fecha_corte` date NOT NULL,
  `cod_personal` int NOT NULL,
  `fecha_contacto` datetime NOT NULL,
  `cod_contacto` int NOT NULL,
  `cod_respuesta` int NOT NULL,
  `cod_sugerencia` int NOT NULL,
  `comentario` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `no_visita` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `medio` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL COMMENT '0=sin atender, 1=atendido',
  `ACTIVO` tinyint(1) NOT NULL,
  `COD_SUCURSAL` int NOT NULL,
  PRIMARY KEY (`cod_control`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of control_calidad
-- ----------------------------
INSERT INTO `control_calidad` VALUES (1, 1, 4, 0, 6, '2023-08-27', 0, '0000-00-00 00:00:00', 0, 0, 0, '', '', '', 0, 1, 1);
INSERT INTO `control_calidad` VALUES (2, 1, 5, 0, 6, '2023-08-27', 0, '0000-00-00 00:00:00', 0, 0, 0, '', '', '', 0, 1, 1);
INSERT INTO `control_calidad` VALUES (3, 1, 9, 0, 6, '2023-08-28', 0, '0000-00-00 00:00:00', 0, 0, 0, '', '', '', 0, 1, 1);

-- ----------------------------
-- Table structure for control_descuento
-- ----------------------------
DROP TABLE IF EXISTS `control_descuento`;
CREATE TABLE `control_descuento`  (
  `cod_cd` int NOT NULL AUTO_INCREMENT,
  `cod_fs` int NOT NULL COMMENT 'codigo de la ficha o ingreso',
  `tipo` tinyint(1) NOT NULL COMMENT '1= ficha, 2=ingreso, 3=ingreso ACH, 4=por categoria cliente',
  `fecha` datetime NOT NULL,
  `otorgado_a` int NOT NULL COMMENT 'codigo del propietario/cliente',
  `acreditado_por` int NOT NULL COMMENT 'quien autorizo la accion',
  `tipo_descuento` tinyint(1) NOT NULL COMMENT '1 = %, 2 = Bs',
  `subtotal` double NOT NULL,
  `descuento` double NOT NULL,
  `total` double NOT NULL,
  `motivo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_cd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of control_descuento
-- ----------------------------
INSERT INTO `control_descuento` VALUES (1, 6, 1, '2023-08-28 02:38:12', 1, 1, 1, 45, 5, 42.75, 'Descuento de los Servicios', 1);

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
INSERT INTO `detalle_perfil` VALUES (4, 2, 1);
INSERT INTO `detalle_perfil` VALUES (3, 4, 1);
INSERT INTO `detalle_perfil` VALUES (4, 3, 0);
INSERT INTO `detalle_perfil` VALUES (3, 3, 0);
INSERT INTO `detalle_perfil` VALUES (5, 1, 1);
INSERT INTO `detalle_perfil` VALUES (6, 1, 1);
INSERT INTO `detalle_perfil` VALUES (7, 1, 1);
INSERT INTO `detalle_perfil` VALUES (8, 1, 1);
INSERT INTO `detalle_perfil` VALUES (9, 1, 1);
INSERT INTO `detalle_perfil` VALUES (10, 1, 1);
INSERT INTO `detalle_perfil` VALUES (11, 1, 1);
INSERT INTO `detalle_perfil` VALUES (12, 1, 1);
INSERT INTO `detalle_perfil` VALUES (13, 1, 1);
INSERT INTO `detalle_perfil` VALUES (14, 1, 1);
INSERT INTO `detalle_perfil` VALUES (15, 1, 1);
INSERT INTO `detalle_perfil` VALUES (2, 7, 0);
INSERT INTO `detalle_perfil` VALUES (1, 7, 0);
INSERT INTO `detalle_perfil` VALUES (3, 7, 0);
INSERT INTO `detalle_perfil` VALUES (4, 7, 0);
INSERT INTO `detalle_perfil` VALUES (6, 7, 0);
INSERT INTO `detalle_perfil` VALUES (5, 7, 0);
INSERT INTO `detalle_perfil` VALUES (7, 7, 0);
INSERT INTO `detalle_perfil` VALUES (9, 7, 0);
INSERT INTO `detalle_perfil` VALUES (10, 7, 0);
INSERT INTO `detalle_perfil` VALUES (14, 7, 0);
INSERT INTO `detalle_perfil` VALUES (12, 7, 0);
INSERT INTO `detalle_perfil` VALUES (13, 7, 0);
INSERT INTO `detalle_perfil` VALUES (8, 7, 0);
INSERT INTO `detalle_perfil` VALUES (11, 7, 0);
INSERT INTO `detalle_perfil` VALUES (15, 7, 0);

-- ----------------------------
-- Table structure for detalle_rp
-- ----------------------------
DROP TABLE IF EXISTS `detalle_rp`;
CREATE TABLE `detalle_rp`  (
  `cod_detalle` int NOT NULL AUTO_INCREMENT,
  `cod_rp` int NOT NULL,
  `cod_producto` int NOT NULL,
  `cant` int NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_detalle`, `cod_rp`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of detalle_rp
-- ----------------------------
INSERT INTO `detalle_rp` VALUES (1, 5, 2, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (2, 6, 1, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (3, 7, 1, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (4, 8, 2, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (5, 9, 2, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (6, 10, 2, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (7, 11, 4, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (8, 11, 5, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (9, 11, 1, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (10, 11, 3, 15, '2023-08-29', 1);
INSERT INTO `detalle_rp` VALUES (11, 11, 7, 10, '0000-00-00', 1);
INSERT INTO `detalle_rp` VALUES (12, 12, 4, 200, '0000-00-00', 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of detalle_seguridad_pin
-- ----------------------------
INSERT INTO `detalle_seguridad_pin` VALUES (1, 1, 3, '2023-08-20 04:33:54', 1);
INSERT INTO `detalle_seguridad_pin` VALUES (2, 1, 1, '2023-08-20 04:45:11', 1);
INSERT INTO `detalle_seguridad_pin` VALUES (3, 1, 4, '2023-08-28 02:33:30', 1);
INSERT INTO `detalle_seguridad_pin` VALUES (4, 1, 5, '2023-08-28 02:37:30', 1);

-- ----------------------------
-- Table structure for detalle_servicio
-- ----------------------------
DROP TABLE IF EXISTS `detalle_servicio`;
CREATE TABLE `detalle_servicio`  (
  `cod_detalle` int NOT NULL AUTO_INCREMENT,
  `cod_fs` int NOT NULL,
  `cod_ts` int NOT NULL,
  `cod_personal` int NOT NULL,
  `cod_comision` int NOT NULL COMMENT 'Mayor a 0 es una comision, 0 = a no corresponde',
  `cod_fidelizacion` int NOT NULL COMMENT 'Mayor a 0 es una fidelizacion, 0 = a no corresponde',
  `precio` double NOT NULL,
  `cant` int NOT NULL,
  `descuento` double NOT NULL,
  `total` double NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_detalle`) USING BTREE,
  INDEX `cod_fs`(`cod_fs`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of detalle_servicio
-- ----------------------------
INSERT INTO `detalle_servicio` VALUES (1, 1, 1, 6, 0, 0, 45, 1, 0, 45, 1);
INSERT INTO `detalle_servicio` VALUES (2, 2, 1, 6, 0, 0, 45, 1, 0, 45, 1);
INSERT INTO `detalle_servicio` VALUES (3, 3, 1, 6, 0, 0, 45, 1, 0, 45, 1);
INSERT INTO `detalle_servicio` VALUES (4, 4, 1, 6, 0, 0, 45, 2, 0, 90, 1);
INSERT INTO `detalle_servicio` VALUES (5, 5, 1, 6, 0, 0, 45, 1, 5, 42.75, 1);

-- ----------------------------
-- Table structure for ficha_servicio
-- ----------------------------
DROP TABLE IF EXISTS `ficha_servicio`;
CREATE TABLE `ficha_servicio`  (
  `cod_fs` int NOT NULL AUTO_INCREMENT,
  `cod_propietario` int NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_servicio` date NOT NULL,
  `estado_pago` tinyint(1) NOT NULL COMMENT '0=debe ; 1=pagado; 2=cortesia',
  `hora_asignado` time NOT NULL,
  `total` double NOT NULL,
  `total_pagado` double NOT NULL,
  `nro_ficha` int NOT NULL,
  `COD_SUCURSAL` int NOT NULL DEFAULT 1,
  `ACTIVO` tinyint(1) NOT NULL,
  `cd_descuento` int NULL DEFAULT 0,
  PRIMARY KEY (`cod_fs`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ficha_servicio
-- ----------------------------
INSERT INTO `ficha_servicio` VALUES (3, 1, '2023-08-27 22:00:28', '2023-08-27', 1, '00:00:00', 45, 45, 1, 1, 1, 0);
INSERT INTO `ficha_servicio` VALUES (4, 1, '2023-08-27 22:02:05', '2023-08-27', 1, '00:00:00', 90, 90, 2, 1, 1, 0);
INSERT INTO `ficha_servicio` VALUES (5, 1, '2023-08-28 02:38:12', '2023-08-28', 1, '00:00:00', 42, 42, 4, 1, 1, 0);

-- ----------------------------
-- Table structure for ingreso
-- ----------------------------
DROP TABLE IF EXISTS `ingreso`;
CREATE TABLE `ingreso`  (
  `cod_ingreso` int NOT NULL AUTO_INCREMENT,
  `cod_recibo` int NOT NULL,
  `cod_fs` int NOT NULL,
  `cod_ts` int NOT NULL,
  `cod_producto` int NOT NULL,
  `nro_ficha` int NOT NULL,
  `fecha` datetime NOT NULL,
  `cliente` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `2nivel` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `3nivel` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `codigo` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cantidad` int NOT NULL,
  `precio` double NOT NULL,
  `descuento` double NOT NULL,
  `total` double NOT NULL COMMENT 'lo pendiente de pago',
  `pago` double NOT NULL,
  `tipo_pago` tinyint(1) NOT NULL COMMENT '1=efectivo; 2=transferencia, 3=tarjeta, 4= cheque',
  `tipo_ingreso` tinyint(1) NOT NULL COMMENT '0=interno, 1= servicio, 2= tienda',
  `comentario_ii` varchar(400) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'comentario para ingreso interno',
  `fecha_mod` datetime NOT NULL,
  `usuario_mod` int NOT NULL,
  `fecha_anu` datetime NOT NULL,
  `usuario_anu` int NOT NULL,
  `memo_anu` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  `COD_SUCURSAL` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`cod_ingreso`) USING BTREE,
  INDEX `cod_recibo`(`cod_recibo` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso
-- ----------------------------
INSERT INTO `ingreso` VALUES (3, 4, 3, 1, 0, 1, '2023-08-27 22:00:28', 'JUNIOR AGUILAR  LEAÑOS', 'CORTE GENERAL', 'CORTES', '', 1, 45, 0, 45, 45, 1, 1, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0, '', 1, 1);
INSERT INTO `ingreso` VALUES (4, 5, 4, 1, 0, 2, '2023-08-27 22:02:05', 'JUNIOR AGUILAR  LEAÑOS', 'CORTE GENERAL', 'CORTES', '', 2, 45, 0, 90, 90, 1, 1, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0, '', 1, 1);
INSERT INTO `ingreso` VALUES (5, 8, 0, 0, 1, 0, '2023-08-27 23:56:47', 'JUNIOR AGUILAR  LEAÑOS', 'COCA COLA', 'COCA COLA PEQUE', '0001', 9, 3, 0, 27, 27, 1, 2, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0, '', 1, 1);
INSERT INTO `ingreso` VALUES (6, 9, 5, 1, 0, 4, '2023-08-28 02:38:12', 'JUNIOR AGUILAR  LEAÑOS', 'CORTE GENERAL', 'CORTES', '', 1, 45, 5, 42.75, 42.75, 1, 1, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0, '', 1, 1);
INSERT INTO `ingreso` VALUES (7, 9, 0, 0, 1, 0, '2023-08-28 02:38:12', 'JUNIOR AGUILAR  LEAÑOS', 'COCA COLA', 'COCA COLA PEQUE', '0001', 2, 3, 0, 6, 6, 1, 2, '', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00', 0, '', 1, 1);

-- ----------------------------
-- Table structure for marca_producto
-- ----------------------------
DROP TABLE IF EXISTS `marca_producto`;
CREATE TABLE `marca_producto`  (
  `cod_marca` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_marca`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of marca_producto
-- ----------------------------
INSERT INTO `marca_producto` VALUES (1, 'COCA COLA', 1);
INSERT INTO `marca_producto` VALUES (2, 'TES', 0);
INSERT INTO `marca_producto` VALUES (3, 'INSUMOS', 1);

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
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, 'SISTEMA', 1, 1, 'NUL');
INSERT INTO `menu` VALUES (2, 'CONFIGURACION', 2, 1, 'MAN');
INSERT INTO `menu` VALUES (3, 'CAJA', 3, 1, '');
INSERT INTO `menu` VALUES (4, 'REPORTES', 4, 1, 'MAN');

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
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of personal
-- ----------------------------
INSERT INTO `personal` VALUES (1, 'JUNIOR', 'AGUILAR', 'LEAÑO', 13048539, 'AV/PERIMETRAL', '', '60852098', '2023-08-17', 1, 1304, 1, '1', 5000, 4, 1);
INSERT INTO `personal` VALUES (2, 'GUSTAVO', 'SOTO', 'PECHO', 0, '', '', '', '2023-08-18', 1, 1234, 1, '1', 5000, 4, 1);
INSERT INTO `personal` VALUES (3, 'JORGE', 'MORON', 'AVILA', 0, '', '', '', '2023-08-18', 1, 4444, 1, '1', 5000, 4, 1);
INSERT INTO `personal` VALUES (4, 'XIMENA', 'JUSTINIANO', 'LUJAN', 0, '', '', '', '2023-08-19', 1, 5555, 1, '1', 5000, 4, 1);
INSERT INTO `personal` VALUES (5, 'TEST', 'TEST P', 'TEST M', 1304, '', '', '', '2023-08-20', 6, 1304, 0, '1', 5000, 2, 0);
INSERT INTO `personal` VALUES (6, 'TEST', 'TEST', 'TEST', 12, '', '', '', '2023-08-22', 3, 5555, 0, '1', 1304, 2, 1);
INSERT INTO `personal` VALUES (7, 'TEST', 'TEST', 'TEWS34', 1354654, '', '', '', '2023-08-28', 3, 6666, 0, '1', 5000, 4, 0);

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `cod_producto` int NOT NULL AUTO_INCREMENT,
  `cod_tipop` int NOT NULL,
  `cod_marca` int NOT NULL,
  `descripcion` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ubicacion` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_barra` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pc` double NOT NULL,
  `pv` double NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0= discontinuo, 1=vigente',
  PRIMARY KEY (`cod_producto`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (1, 2, 1, 'COCA COLA PEQUE', 'TIENDA', '0001', 2, 3, 1, 1);
INSERT INTO `producto` VALUES (2, 2, 1, 'COCA COLA PERSONAL', '', '', 4, 9, 1, 1);
INSERT INTO `producto` VALUES (3, 3, 3, 'PAN DE ARROZ', '', '', 2, 3, 1, 1);
INSERT INTO `producto` VALUES (4, 2, 1, 'AGUA VITAL', '', '', 4, 6, 1, 1);
INSERT INTO `producto` VALUES (5, 2, 1, 'FANTA PERSONAL', '', '', 4, 7, 1, 1);
INSERT INTO `producto` VALUES (6, 2, 1, 'COCA COLA MINI ', '', '', 1, 1.5, 0, 1);
INSERT INTO `producto` VALUES (7, 3, 3, 'ARROZ CON LECHE ', '', '', 2, 6, 1, 1);

-- ----------------------------
-- Table structure for propietario
-- ----------------------------
DROP TABLE IF EXISTS `propietario`;
CREATE TABLE `propietario`  (
  `cod_propietario` int NOT NULL AUTO_INCREMENT,
  `nombre_factura` varchar(300) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nit` bigint NOT NULL,
  `nombre` varchar(80) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `app` varchar(80) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `apm` varchar(80) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefono` int NOT NULL,
  `celular` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `detalle_dir` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `mail` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `barbero_princ` int NOT NULL,
  `barbero_aux` int NOT NULL,
  `ref_corte` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cant_corte` int NOT NULL COMMENT 'cortes realizados',
  `cod_fidelizacion` int NOT NULL,
  `ultimo_corte` date NOT NULL,
  `cant_corte_fide` int NOT NULL,
  `cod_convenio` int NOT NULL,
  `telf_conv` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  `cod_tp` int NOT NULL COMMENT 'tipo de publicidad o referencia',
  `adulto` tinyint(1) NULL DEFAULT 1 COMMENT '1 = adulto, 2 = niños',
  `edad` int NOT NULL COMMENT 'edad del niño, en caso de ser niño',
  `nacimiento` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_vinculacion` int NOT NULL COMMENT 'cod_vinculacion del padre',
  `codigo_sistema` varchar(4) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`cod_propietario`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of propietario
-- ----------------------------
INSERT INTO `propietario` VALUES (1, 'JUNIOR', 130485964, 'JUNIOR', 'AGUILAR ', 'LEAÑOS', 0, '60852098', '', '', 6, 0, 'ALTO', 3, 0, '0000-00-00', 0, 0, '', 1, 7, 1, 0, '2023-08-25', 0, '');
INSERT INTO `propietario` VALUES (2, 'TEST', 454545, 'TEST', 'TEST', 'TES', 0, '74942512', '', '', 6, 0, 'BAJO', 0, 0, '0000-00-00', 0, 0, '', 1, 7, 1, 0, '', 0, '');
INSERT INTO `propietario` VALUES (3, 'JUNIOR', 78754587, 'TEST', 'TEST', 'TES', 0, '74848952', '', '', 6, 0, 'BAJO', 0, 0, '0000-00-00', 0, 0, '', 0, 8, 1, 0, '', 0, '');

-- ----------------------------
-- Table structure for proveedor
-- ----------------------------
DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor`  (
  `cod_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `direccion` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefono` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descripcion` varchar(400) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_proveedor`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proveedor
-- ----------------------------
INSERT INTO `proveedor` VALUES (1, 'COCA COLA', '', '', '', 1);
INSERT INTO `proveedor` VALUES (2, 'PERSI', '', '', '', 1);
INSERT INTO `proveedor` VALUES (3, 'SNACK', '', '', '', 1);
INSERT INTO `proveedor` VALUES (4, 'TESTTE', '', '', '', 0);

-- ----------------------------
-- Table structure for recepcion_producto
-- ----------------------------
DROP TABLE IF EXISTS `recepcion_producto`;
CREATE TABLE `recepcion_producto`  (
  `cod_rp` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NULL DEFAULT NULL,
  `fecha_recep` date NULL DEFAULT NULL,
  `hora` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `cod_personal` int NULL DEFAULT NULL,
  `cod_proveedor` int NULL DEFAULT NULL,
  `cant_producto` int NULL DEFAULT NULL,
  `comentario` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `nro_global` int NULL DEFAULT NULL COMMENT 'nro que identifica la recpcion en una gestion',
  `nro_proveedor` int NULL DEFAULT NULL COMMENT 'nro correlativo que identifica a un proveedor',
  `estado` tinyint(1) NULL DEFAULT 1 COMMENT '1= aprobado, 2 = anulado',
  `personal_anu` int NULL DEFAULT NULL,
  `ACTIVO` tinyint(1) NULL DEFAULT 1,
  `COD_SUCURSAL` int NULL DEFAULT 1,
  PRIMARY KEY (`cod_rp`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of recepcion_producto
-- ----------------------------
INSERT INTO `recepcion_producto` VALUES (1, '2023-08-27 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1);
INSERT INTO `recepcion_producto` VALUES (2, '2023-08-27 00:00:00', '2023-08-27', '23:19 PM', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1);
INSERT INTO `recepcion_producto` VALUES (3, '2023-08-27 00:00:00', '2023-08-27', '23:19 PM', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1);
INSERT INTO `recepcion_producto` VALUES (4, '2023-08-27 00:00:00', '2023-08-27', '23:22 PM', NULL, 1, NULL, '1212', 1, 1, 1, NULL, 1, 1);
INSERT INTO `recepcion_producto` VALUES (5, '2023-08-27 00:00:00', '2023-08-27', '23:23 PM', NULL, 1, NULL, 'Test 1', 2, 2, 1, NULL, 1, 1);
INSERT INTO `recepcion_producto` VALUES (6, '2023-08-27 00:00:00', '2023-08-27', '23:42 PM', NULL, 1, NULL, 'dsf', 3, 3, 1, NULL, 1, 1);
INSERT INTO `recepcion_producto` VALUES (7, '2023-08-27 00:00:00', '2023-08-27', '23:44 PM', NULL, 1, NULL, '12', 4, 4, 1, NULL, 1, 1);
INSERT INTO `recepcion_producto` VALUES (8, '2023-08-27 00:00:00', '2023-08-27', '23:47 PM', 1, 1, NULL, '4545', 5, 5, 2, 1, 1, 1);
INSERT INTO `recepcion_producto` VALUES (9, '2023-08-27 00:00:00', '2023-08-27', '23:47 PM', 1, 2, NULL, '10', 6, 1, 2, 4, 1, 1);
INSERT INTO `recepcion_producto` VALUES (10, '2023-08-27 00:00:00', '2023-08-27', '23:47 PM', 3, 1, NULL, 'po', 7, 6, 2, 1, 1, 1);
INSERT INTO `recepcion_producto` VALUES (11, '2023-08-28 00:00:00', '2023-08-28', '0:54 AM', 1, 3, NULL, 'TEST PRUEBA', 8, 1, 2, 1, 1, 1);
INSERT INTO `recepcion_producto` VALUES (12, '2023-08-28 00:00:00', '2023-08-28', '0:58 AM', 1, 1, NULL, 'R', 9, 7, 2, 1, 1, 1);

-- ----------------------------
-- Table structure for recibo
-- ----------------------------
DROP TABLE IF EXISTS `recibo`;
CREATE TABLE `recibo`  (
  `cod_recibo` int NOT NULL AUTO_INCREMENT,
  `cod_propietario` int NOT NULL,
  `nit` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `razonsocial` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nro` int NOT NULL,
  `totalbs` double NOT NULL,
  `pagobs` double NOT NULL,
  `pagous` double NOT NULL,
  `pagototalbs` double NOT NULL,
  `cambiobs` double NOT NULL,
  `tipo_pago` tinyint(1) NOT NULL COMMENT '1=efectivo; 2=transferencia, 3=tarjeta',
  `pc` double NOT NULL COMMENT 'precio compra del dolar por lo gral es 6.86',
  `comentario` varchar(400) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cod_personal` int NOT NULL,
  `usuario` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `creacion` datetime NOT NULL COMMENT 'fecha de creacion del registro',
  `ACTIVO` tinyint(1) NOT NULL,
  `cod_cach` int NOT NULL COMMENT 'codigo de cuenta Ach',
  `fecha_ach` datetime NOT NULL,
  `coment_ach` varchar(512) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `estado_ach` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_recibo`) USING BTREE,
  INDEX `cod_propietario`(`cod_propietario` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of recibo
-- ----------------------------
INSERT INTO `recibo` VALUES (4, 1, '130485964', 'junior', 1, 45, 45, 0, 45, 0, 1, 6.9, '', 1, 'JR', '2023-08-27 22:00:28', 1, 0, '2023-08-27 22:00:28', '', 1);
INSERT INTO `recibo` VALUES (5, 1, '130485964', 'junior', 2, 90, 90, 0, 90, 0, 1, 6.9, '', 1, 'JR', '2023-08-27 22:02:05', 1, 0, '2023-08-27 22:02:05', '', 1);
INSERT INTO `recibo` VALUES (8, 1, '130485964', 'junior', 3, 27, 27, 0, 27, 0, 1, 6.9, 'preubas ', 1, 'JR', '2023-08-27 23:56:47', 1, 0, '2023-08-27 23:56:47', '', 1);
INSERT INTO `recibo` VALUES (9, 1, '130485964', 'JUNIOR', 4, 48, 50, 0, 50, 2, 1, 6.9, 'PREUBAS', 1, 'JR', '2023-08-28 02:38:12', 1, 0, '2023-08-28 02:38:12', '', 1);

-- ----------------------------
-- Table structure for servicio
-- ----------------------------
DROP TABLE IF EXISTS `servicio`;
CREATE TABLE `servicio`  (
  `cod_servicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_servicio`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of servicio
-- ----------------------------
INSERT INTO `servicio` VALUES (1, 'CORTES', 'GENERAL', 1);

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`  (
  `cod_stock` int NOT NULL AUTO_INCREMENT,
  `cod_producto` int NOT NULL,
  `cantidad_disponible` int NOT NULL,
  `control_vigencia` int NOT NULL COMMENT 'lleva un conteo de cuanta veces consecutiva se pone cero a producto en una toma de inventario',
  `COD_SUCURSAL` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`cod_stock`, `cod_producto`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES (1, 1, 9, 0, 1);
INSERT INTO `stock` VALUES (2, 2, 10, 0, 1);
INSERT INTO `stock` VALUES (3, 3, 0, 0, 1);
INSERT INTO `stock` VALUES (4, 4, 0, 0, 1);
INSERT INTO `stock` VALUES (5, 5, 0, 0, 1);
INSERT INTO `stock` VALUES (6, 6, 0, 0, 1);
INSERT INTO `stock` VALUES (7, 7, 0, 0, 1);

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
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of submenu
-- ----------------------------
INSERT INTO `submenu` VALUES (1, 1, 'Usuarios', 'DSlists/DSListadoUsuario.php', 2, 1, '');
INSERT INTO `submenu` VALUES (2, 1, 'Perfil Usuario', 'DSlists/DSListadoTipoU.php', 1, 1, '');
INSERT INTO `submenu` VALUES (3, 2, 'Cargos', 'DSlists/DSListadoCargo.php', 1, 1, '');
INSERT INTO `submenu` VALUES (4, 2, 'Personal', 'DSlists/DSListadoPersonal.php', 2, 1, '');
INSERT INTO `submenu` VALUES (5, 2, 'Tipo Servicios', 'DSlists/DSListadoTipoServicio.php', 3, 1, '');
INSERT INTO `submenu` VALUES (6, 2, 'Tipo Barberos', 'DSlists/DSListadoComisionP.php', 4, 1, '');
INSERT INTO `submenu` VALUES (7, 3, 'Categoria Productos', 'DSlists/DSListadoCategoriaP.php', 6, 1, '');
INSERT INTO `submenu` VALUES (8, 3, 'Subcategoria Productos', 'DSlists/DSListadoTipoP.php', 5, 1, '');
INSERT INTO `submenu` VALUES (9, 3, 'Marca Productos', 'DSlists/DSListadoMarcaP.php', 4, 1, '');
INSERT INTO `submenu` VALUES (10, 3, 'Productos', 'DSlists/DSListadoProducto.php', 3, 1, '');
INSERT INTO `submenu` VALUES (11, 3, 'Venta', 'DSlists/DSListadoIngresoEgresoArqueo.php', 1, 1, '');
INSERT INTO `submenu` VALUES (12, 3, 'Registrar Clientes', 'DSlists/DSListadoPropietario.php', 2, 1, '');
INSERT INTO `submenu` VALUES (13, 3, 'Stock', 'DSlists/DSListadoRecepcionProducto.php', 7, 1, '');
INSERT INTO `submenu` VALUES (14, 3, 'Proveedor', 'DSlists/DSListadoProveedores.php', 8, 1, '');
INSERT INTO `submenu` VALUES (15, 4, 'Ventas', 'DSlists/DSreporteIngreso.php', 1, 1, '');

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
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_barbero
-- ----------------------------
INSERT INTO `tipo_barbero` VALUES (1, 'AUXILIAR', '', 1);
INSERT INTO `tipo_barbero` VALUES (2, 'JUNIOR', '', 1);
INSERT INTO `tipo_barbero` VALUES (3, 'SENIOR', '', 1);
INSERT INTO `tipo_barbero` VALUES (4, 'MASTER', '', 1);
INSERT INTO `tipo_barbero` VALUES (5, 'TEST', 'PARA TEST 2', 0);
INSERT INTO `tipo_barbero` VALUES (6, 'TEST', 'TEST 2', 0);

-- ----------------------------
-- Table structure for tipo_producto
-- ----------------------------
DROP TABLE IF EXISTS `tipo_producto`;
CREATE TABLE `tipo_producto`  (
  `cod_tipop` int NOT NULL AUTO_INCREMENT,
  `cod_categoria` int NOT NULL,
  `descripcion` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `relevamiento` int NOT NULL COMMENT 'cada cuanto se debe hacer relevamiento de los producto con esa subcategoria.',
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_tipop`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_producto
-- ----------------------------
INSERT INTO `tipo_producto` VALUES (1, 1, 'CERBEZAS', 0, 1);
INSERT INTO `tipo_producto` VALUES (2, 1, 'BEBIDAS', 0, 1);
INSERT INTO `tipo_producto` VALUES (3, 2, 'DESAYUNOS', 0, 1);

-- ----------------------------
-- Table structure for tipo_publicidad
-- ----------------------------
DROP TABLE IF EXISTS `tipo_publicidad`;
CREATE TABLE `tipo_publicidad`  (
  `cod_tp` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `descripcion` varchar(512) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `ACTIVO` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`cod_tp`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_publicidad
-- ----------------------------
INSERT INTO `tipo_publicidad` VALUES (1, ' RECOMENDACION AMIGO', 'UN AMIGO LO RECOMENDO', 1);
INSERT INTO `tipo_publicidad` VALUES (2, ' RECOMENDACION BARBERO', 'EL BARBERO LE EXTENDIO LA INVITACION', 1);
INSERT INTO `tipo_publicidad` VALUES (3, ' FACEBOOK', '', 1);
INSERT INTO `tipo_publicidad` VALUES (4, ' INSTAGRAM', '', 1);
INSERT INTO `tipo_publicidad` VALUES (5, ' GOOGLE', '', 1);
INSERT INTO `tipo_publicidad` VALUES (6, ' PASO POR LA ZONA', '', 1);
INSERT INTO `tipo_publicidad` VALUES (7, ' CORTESIA', '', 1);
INSERT INTO `tipo_publicidad` VALUES (8, ' INFLUENCER', '', 1);
INSERT INTO `tipo_publicidad` VALUES (9, ' NO APLICA SISTEMA', 'CLIENTES PRUEBAS SISTEMA', 1);
INSERT INTO `tipo_publicidad` VALUES (10, ' CORTE SOLIDARIO', 'CORTES DE APOYO A RIFAS Y EVENTOS BENEFICOS', 1);
INSERT INTO `tipo_publicidad` VALUES (11, ' RETORNO CLIENTE CENTRO', 'CLIENTE QUE FRECUENTABAN A SOLO EL DEL CENTRO Y ESTAN RETORNANDO', 1);
INSERT INTO `tipo_publicidad` VALUES (12, ' TIK TOK', '', 1);

-- ----------------------------
-- Table structure for tipo_servicio
-- ----------------------------
DROP TABLE IF EXISTS `tipo_servicio`;
CREATE TABLE `tipo_servicio`  (
  `cod_ts` int NOT NULL AUTO_INCREMENT,
  `cod_servicio` int NOT NULL,
  `nombre` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tipo_precio` tinyint(1) NOT NULL COMMENT '1=fijo ; 2=variable; 3= promocion',
  `precio` double NOT NULL,
  `orden` int NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`cod_ts`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_servicio
-- ----------------------------
INSERT INTO `tipo_servicio` VALUES (1, 1, 'CORTE GENERAL', 1, 45, 1, 1);
INSERT INTO `tipo_servicio` VALUES (2, 1, 'CORTE MULLETT', 1, 50, 2, 1);
INSERT INTO `tipo_servicio` VALUES (3, 1, 'TEST', 2, 45, 3, 0);

-- ----------------------------
-- Table structure for tipo_usuario
-- ----------------------------
DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE `tipo_usuario`  (
  `COD_TIPOU` int NOT NULL AUTO_INCREMENT,
  `NOMB_TIPOU` varchar(90) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ACTIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`COD_TIPOU`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_usuario
-- ----------------------------
INSERT INTO `tipo_usuario` VALUES (1, 'ADMIN-SYSTEM', 1);
INSERT INTO `tipo_usuario` VALUES (2, 'CAJA', 1);
INSERT INTO `tipo_usuario` VALUES (3, 'BARBERO', 1);
INSERT INTO `tipo_usuario` VALUES (4, 'TEST', 0);
INSERT INTO `tipo_usuario` VALUES (5, 'TEST2', 0);
INSERT INTO `tipo_usuario` VALUES (6, 'JUNIOR', 0);
INSERT INTO `tipo_usuario` VALUES (7, 'TEST222', 1);
INSERT INTO `tipo_usuario` VALUES (8, 'TESTET', 0);

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
INSERT INTO `ubicacion_pin` VALUES (3, 11, '2023-08-20 09:12:54', 'sin definir', '', 1);
INSERT INTO `ubicacion_pin` VALUES (4, 11, '2023-08-20 09:12:55', 'sin definir', '', 1);
INSERT INTO `ubicacion_pin` VALUES (5, 11, '2023-08-20 09:12:55', ' DESCUENTO PARA VENTAS', '', 1);

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
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 'JR', '1304', 'JUNIORLDJR@GMAIL.COM', 1, 1, 1, 1);
INSERT INTO `usuario` VALUES (2, 'SOTO', '4444', 'SOTO@GMAIL.COM', 2, 1, 1, 1);
INSERT INTO `usuario` VALUES (3, 'ZCJOTA', '1304', 'JUNIORLDJR@GMAIL.COM', 1, 7, 1, 1);
INSERT INTO `usuario` VALUES (4, 'TE4', '1304', 'FDSF@GMAIL.COM', 1, 7, 1, 0);

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
