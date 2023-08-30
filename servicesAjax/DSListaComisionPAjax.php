<?php
	include "../lib/conex.php";
	$start = $_POST['start'] ?? 0;
	$limit = $_POST['limit'] ?? 100;
	$buscar = $_POST['buscar'] ?? '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND nombre LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = ' SELECT * from tipo_barbero' .
		' WHERE ACTIVO = 1' . $sql_buscar .
		' ORDER BY nombre ASC ' .
		' LIMIT ' . $start . ',' . $limit;

	mysqli_query($conex, "SET NAMES 'utf8'");
	$stotal = mysqli_query($conex, "SELECT COUNT(cod_tb) AS TOTAL FROM tipo_barbero WHERE ACTIVO = 1");
	$total = mysqli_fetch_array($stotal);

	$resultado = mysqli_query($conex, $sql);
	$data = array();
	$cont = 0;
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['cod_tb'],
			"nombre" => $row['nombre'],
			"descripcion" => $row['descripcion'],
			// "configuracion" => configuracionRol(12),
		));
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);
