<?php
	/*!
	* RAZOR - ZCJOTA
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";
	$buscar = $_POST['buscar'] ?? '';
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = "SELECT A.cod_propietario, A.cant_corte, fs.fecha_servicio FROM propietario A 
		INNER JOIN ficha_servicio fs ON A.cod_propietario = fs.cod_propietario
		WHERE A.ACTIVO = 1 AND fs.cod_propietario = $buscar ORDER BY fs.fecha_servicio asc LIMIT 1
	";
	$sql1 = "SELECT A.cod_propietario, A.cant_corte, fs.fecha_servicio FROM propietario A 
	INNER JOIN ficha_servicio fs ON A.cod_propietario = fs.cod_propietario
	WHERE A.ACTIVO = 1 AND fs.cod_propietario = $buscar ORDER BY fs.fecha_servicio desc LIMIT 1
	";
	$resultado1 = mysqli_query($conex, $sql1);
	$row1 = mysqli_fetch_array($resultado1);

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		$fecha_ini = $row['fecha_servicio'];
		$fecha_fin = $row1['fecha_servicio'];
		$cant_corte = $row['cant_corte'];

		$date1 = new DateTime($fecha_ini);
		$date2 = new DateTime($fecha_fin);
		$diff = $date1->diff($date2);
		$total_dias = $diff->days;
		$frecuencia = round($total_dias/$cant_corte);
		$date = date("d-m-Y");
		$mod_date = strtotime($fecha_fin."+ $frecuencia days");
		$proximo =  date("Y-m-d", $mod_date);
		array_push(
			$data,
			array(
				"codigo" => $row['cod_propietario'],
				"corte" => $row['cant_corte'],
				"fecha_primero" => $row['fecha_servicio'],
				"fecha_ultimo" => $row1['fecha_servicio'],
				"frecuencia" => $frecuencia,
				"proximo" => $proximo
			)
		);
	}
	$paging = array(
		'success' => true,
		'data' => $data,
	);
	echo json_encode($paging);
