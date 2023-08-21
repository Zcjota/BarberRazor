<?php
	/*!
	* RAZOR
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";
	$buscar = isset($_POST['busqueda']) ? $_POST['busqueda'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND (DESCRIPCION LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%')";
	}
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = 'SELECT * FROM sucursal WHERE ACTIVO = 1' . $sql_buscar .
		' order by DESCRIPCION ASC';

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"codsuc" => $row['COD_SUCURSAL'],
				"nombsuc" => strtoupper($row['DESCRIPCION']),
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
