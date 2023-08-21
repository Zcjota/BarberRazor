<?php
	/*!
	* RAZOR-JR
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";
	session_start();
	$start = isset($_POST['start']) ? $_POST['start'] : 0;
	$limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {$sql_buscar = '';} else {
		$sql_buscar = " AND (p.nombre LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR p.app LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR p.apm LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "')";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = " SELECT u.*,p.*, tu.NOMB_TIPOU, s.DESCRIPCION AS SUCURSAL " .
		" FROM `usuario` u INNER JOIN tipo_usuario tu ON u.COD_TIPOU = tu.COD_TIPOU " .
		" LEFT JOIN sucursal s on u.COD_SUCURSAL = s.COD_SUCURSAL " .
		" INNER JOIN personal p on u.cod_personal = p.cod_personal WHERE u.ACTIVO = 1" . $sql_buscar .
		" ORDER BY u.COD_USUARIO DESC " .
		" LIMIT " . $start . "," . $limit;

	$stotal = mysqli_query($conex, "SELECT  u.*,p.*, COUNT(u.COD_USUARIO) AS TOTAL FROM `usuario` u INNER JOIN personal p on u.cod_personal = p.cod_personal WHERE u.ACTIVO = 1" . $sql_buscar);
	$total = mysqli_fetch_array($stotal);
	
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['COD_USUARIO'],
			"nombre" => $row['nombre'],
			"apellidopaterno" => $row['app'],
			"apellidomaterno" => $row['apm'],
			"usuario" => $row['LOGIN'],
			"contrasenia" => $row['PASSWORD'],
			"correo" => $row['CORREO'],
			"tipo_usuario" => $row['NOMB_TIPOU'],
			"cod_tu" => $row['COD_TIPOU'],
			"ci" => $row['nit'],
			"codpersonal" => $row['cod_personal'],
			"codsucursal" => $row['COD_SUCURSAL'],
			"sucursal" => $row['SUCURSAL'],
			//"configuracion" => $configRoles,
		));
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);
