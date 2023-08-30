<?php
	include '../lib/conex.php';

	$start = isset($_POST['start']) ? $_POST['start'] : 0;
	$limit = isset($_POST['limit']) ? $_POST['limit'] : 1000;
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND P.nombre LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "' " .
		" OR P.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "' " .
		" OR P.direccion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "' ";
	}

	if (VerificaConBD()) {
		echo '{success:false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = ' SELECT P.* ' .
		' FROM proveedor P WHERE P.ACTIVO = 1 ' . $sql_buscar .
		' ORDER BY P.nombre ASC  LIMIT ' . $start . ',' . $limit;
		
	$sqltotal = ' SELECT COUNT(DISTINCT(P.cod_proveedor))AS TOTAL' .
		' FROM proveedor P WHERE P.ACTIVO = 1 ' . $sql_buscar;
	$restotal = mysqli_query($conex, $sqltotal);
	$rowtotal = mysqli_fetch_array($restotal);

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['cod_proveedor'],
			"nombre" => strtoupper($row['nombre']),
			"direccion" => strtoupper($row['direccion']),
			"telefono" => strtoupper($row['telefono']),
			"descripcion" => strtoupper($row['descripcion']),
		));
	}
	$paging = array(
		'success' => true,
		'total' => $rowtotal['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);
