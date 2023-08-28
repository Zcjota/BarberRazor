<?php
	/*!
	* RAZOR - ZCJOTA
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();

	$sql = "SELECT * FROM cuenta_ach WHERE ACTIVO = 1 order by nombre ASC";

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"cod" => $row['cod_cach'],
				"nomb" => $row['nombre'],
			)
		);
	}
	$paging = array(
		'success' => true,
		'data' => $data,
	);
	echo json_encode($paging);
