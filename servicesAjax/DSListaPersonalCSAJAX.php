<?php
	/*!
	* RAZOR -DEV
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = 'SELECT * FROM personal WHERE ACTIVO = 1 ';

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"codpersonal" => $row['cod_personal'],
				"codsistema" => $row['codigo_sistema'],
				"codcargo" => $row['cod_cargo'],
			)
		);
	}
	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
