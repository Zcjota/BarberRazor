<?php
	include "../lib/conex.php";
	$cod = isset($_POST['cod']) ? $_POST['cod'] : 0;
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}
	$conex = ConectarConBD();
	$data = array();
	$cont = 0;
	$sqld = "SELECT * from descuento_servicio where ACTIVO = 1 AND cod_descuento = " . $cod;
	$resultadod = mysqli_query($conex, $sqld);
	//echo "/*$sqld*/";
	while ($rowd = mysqli_fetch_array($resultadod)) {
		$cont++;
		array_push(
			$data,
			array(
				'servicio' => $rowd['cod_ts'],
				'desc' => $rowd['porc_barbero'] + $rowd['porc_negocio'],
				'codfs' => $rowd['cod_fs'],
			)
		);
	}
	if ($cont == 0) {
		array_push(
			$data,
			array(
				'servicio' => 0,
				'desc' => 0,
				'codfs' => 0,
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
