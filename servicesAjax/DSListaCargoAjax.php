<?php
	include "../lib/conex.php";

	$start = isset($_POST['start']) ? $_POST['start'] : 0;
	$limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';

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
	$sql = ' SELECT * from cargo' .
		' WHERE ACTIVO = 1' . $sql_buscar .
		' ORDER BY nombre ASC ' .
		' LIMIT ' . $start . ',' . $limit;

	$stotal = mysqli_query($conex, "SELECT COUNT(cod_cargo) AS TOTAL FROM cargo WHERE ACTIVO = 1");
	$total = mysqli_fetch_array($stotal);

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['cod_cargo'],
			"nombre" => $row['nombre'],
			"descripcion" => $row['descripcion']
		));
	}
	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);