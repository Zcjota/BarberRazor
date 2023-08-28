<?php
	include "../lib/conex.php";
	$buscar = isset($_POST['busqueda']) ? $_POST['busqueda'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND (nombre LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%')";
	}
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	//agregado 2023
	$conex = ConectarConBD();
	mysqli_query($conex, "SET NAMES 'utf8'");
	$sql = 'SELECT * FROM servicio WHERE ACTIVO = 1' . $sql_buscar . ' order by nombre ASC';
	// echo $sql;
	$resultado = mysqli_query($conex, $sql);
	$data = array();
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data,
			array("codservicio" => $row['cod_servicio'],
				"nombservicio" => $row['nombre'],
			));
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
