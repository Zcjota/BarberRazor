<?php
	include "../lib/conex.php";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	mysqli_query($conex, "SET NAMES 'utf8'");
	$sql = 'SELECT A.* FROM tipo_barbero A WHERE A.ACTIVO = 1';
	// echo $sql;
	$resultado = mysqli_query($conex, $sql);
	$data = array();

	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"codc" => $row['cod_tb'],
				"nombc" => strtoupper($row['nombre']),
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
