<?php
	/*!
	* RAZOR 
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';
	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND A.nombre LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%')";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	mysqli_query($conex, "SET NAMES 'utf8', SQL_BIG_SELECTS=1"); 
	$sql = "SELECT A.*, B.nombre as servicio
		FROM tipo_servicio A
		INNER JOIN servicio B ON A.cod_servicio = B.cod_servicio
		WHERE A.ACTIVO = 1 " . $sql_buscar .
		" ORDER BY A.orden ";
	//echo "/*$sql*/";
	$resultado = mysqli_query($conex, $sql);
	$data = array();

	while ($row = mysqli_fetch_array($resultado)) {
		$tipo_precio = "FIJO";
		if ($row["tipo_precio"] == "2") {
			$tipo_precio = "VARIABLE";
		} elseif ($row["tipo_precio"] == "3") {
			$tipo_precio = "PROMOCION";
		}
		array_push(
			$data,
			array(
				'codigo' => $row['cod_ts'],
				'codservicio' => $row['cod_servicio'],
				'nombre' => $row['nombre'],
				'servicio' => $row['servicio'],
				'codtipoprecio' => $row['tipo_precio'],
				'tipoprecio' => $tipo_precio,
				'precio' => $row['precio'],
				'orden' => $row['orden'],
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data);
	echo json_encode($paging);
