<?php
	include "../lib/conex.php";
	$start = $_POST['start'] ?? 0;
	$limit = $_POST['limit'] ?? 100;
	$buscar = $_POST['buscar'] ?? '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND NOMB_TIPOU LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = "SELECT COD_TIPOU, NOMB_TIPOU
		FROM tipo_usuario
		WHERE ACTIVO = 1 $sql_buscar
		ORDER BY NOMB_TIPOU
		LIMIT $start, $limit
	";
	$stotal = mysqli_query($conex, "SELECT COUNT(COD_TIPOU) AS TOTAL FROM tipo_usuario WHERE ACTIVO = 1");
	$total = mysqli_fetch_array($stotal);

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"codigo" => $row['COD_TIPOU'],
				"nombre" => $row['NOMB_TIPOU'],
			)
		);
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data);
	echo json_encode($paging);
