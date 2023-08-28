<?php
	/*!
	* RAZOR-JR
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}
	$conex = ConectarConBD();
	mysqli_query($conex, "SET NAMES 'utf8'");
	$sql = 'SELECT * FROM nivel_seguridad WHERE ACTIVO = 1 ORDER BY nombre ASC';
	
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"codtp" => $row['cod_ns'],
				"nombtp" => strtoupper($row['nombre'])
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);