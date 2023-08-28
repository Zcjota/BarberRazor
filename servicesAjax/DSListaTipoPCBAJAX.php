<?php
	/*!
	* DSoft-TPMV
	* Copyright(c) 2011
	*/
	include "../lib/conex.php";
	$codcateg = $_REQUEST['codcateg'];

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = 'SELECT * FROM tipo_producto WHERE ACTIVO = 1 and cod_categoria = ' . $codcateg . ' ORDER BY descripcion ASC';

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"codtipop" => $row['cod_tipop'],
				"nombtipop" => strtoupper($row['descripcion']),
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
