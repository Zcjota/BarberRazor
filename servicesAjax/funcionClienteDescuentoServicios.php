<?php
	include "../lib/conex.php";
	$codcliente = isset($_POST['codigo']) ? $_POST['codigo'] : 0;
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = "SELECT A.cod_propietario, B.cod_fidelizacion, A.nombre, A.cant_corte, B.tipo_cliente, B.estado
		FROM propietario A
		INNER JOIN fidelizacion_cliente B ON A.cant_corte >= B.cant_corte AND B.ACTIVO =1
		WHERE A.ACTIVO = 1 AND A.cod_propietario = $codcliente
		ORDER BY B.cant_corte DESC
		LIMIT 0,1";
	$resultado = mysqli_query($conex, $sql);
	$data = array();
	// echo "/*$sql*/";
	while ($row = mysqli_fetch_array($resultado)) {
		$cont = 0;
		$sqld = "SELECT * from fidelizacion_servicio where ACTIVO = 1 AND cod_fidelizacion = " . $row['cod_fidelizacion'];
		$resultadod = mysqli_query($conex, $sqld);
		// echo "/*$sqld*/";
		while ($rowd = mysqli_fetch_array($resultadod)) {
			$cont++;
			array_push(
				$data,
				array(
					'corte' => $row['cant_corte'],
					'tipocliente' => $row['tipo_cliente'],
					'estado' => $row['estado'],
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
					'corte' => $row['cant_corte'],
					'tipocliente' => $row['tipo_cliente'],
					'estado' => $row['estado'],
					'servicio' => 0,
					'desc' => 0,
					'codfs' => 0,
				)
			);
		}
	}
	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
