<?php
	include "../lib/conex.php";
	$codconvenio = isset($_POST['cod']) ? $_POST['cod'] : 0;
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}
	$conex = ConectarConBD();
	$data = array();
	$cont = 0;
	$sqld = " SELECT A.* from descuento_servicio A 
	inner join convenio B on A.cod_descuento = B.cod_descuento
	where A.ACTIVO = 1 
	AND B.cod_convenio =  " . $codconvenio;
	$resultadod = mysqli_query($conex, $sqld);
	//echo "/*$sqld*/";
	while ($rowd = mysqli_fetch_array($resultadod)) {
		$cont++;
		array_push(
			$data,
			array(
				
				'codconvenio' => $codconvenio,
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
				'codconvenio' => $codconvenio,
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
