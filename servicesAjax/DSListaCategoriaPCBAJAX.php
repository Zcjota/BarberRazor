<?php
	/*!
	* DSoft-TPMV
	* Copyright(c) 2011
	*/
	include "../lib/conex.php";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}
	$conex = ConectarConBD();
	$sql = 'SELECT * FROM categoria_producto WHERE ACTIVO = 1 ORDER BY descripcion ASC';
	
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array(
				"codcategoriap" => $row['cod_categoria'],
				"nombcategoriap" => strtoupper($row['descripcion']),
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
