<?php
	/*!
	* DSoft-TPMV
	* Copyright(c) 2011
	*/
	include "../lib/conex.php";
	$op = isset($_POST['op']) ? $_POST['op'] : 1;

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql;
	switch ($op) {
		case 1:
			$sql = "select cod_personal as codigo, concat(nombre, ' ', app) as nombre, codigo_sistema as codsistema from personal where ACTIVO = 1 order by nombre ASC";
		break;
		case 2:
			$sql = "select cod_proveedor as codigo, nombre, ('0') as codsistema from proveedor where ACTIVO = 1 order by nombre ASC";
		break;
	}
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"cod" => $row['codigo'],
				"nomb" => mb_strtoupper($row['nombre']),
				"codsistema" => $row['codsistema'],
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
