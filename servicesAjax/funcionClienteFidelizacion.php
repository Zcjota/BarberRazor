<?php
	include "../lib/conex.php";
	$codcliente = isset($_POST['codigo']) ? $_POST['codigo'] : 0;
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$cod_fc = 0;
	$tipo_cliente = "NORMAL";
	$sql = "SELECT *FROM fidelizacion_cliente where estado = 1 and ACTIVO = 1 ";
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)){
		$fecha_actual = date('Y-m-d');
		$fecha_ini = $row['fecha_ini'];
		$cortes = $row['cant_corte'];
		$estado = $row['estado'];
		$intervalo = $row['val_dias'];
		if($fecha_ini <= $fecha_actual){
			$mod_date = strtotime($fecha_actual."- $intervalo days");
			$fecha_a =  date("Y-m-d", $mod_date);
			$sql_t = "SELECT COUNT(fs.cod_fs) AS TOTAL FROM propietario p 
				INNER JOIN ficha_servicio fs ON p.cod_propietario = fs.cod_propietario
				INNER JOIN detalle_servicio ds ON fs.cod_fs = ds.cod_fs
				WHERE p.cod_propietario = $codcliente AND ds.ACTIVO = 1 AND (cod_ts=13 OR cod_ts=14) 
				AND fs.fecha_servicio BETWEEN '$fecha_a' AND '$fecha_actual'
			";
			$row_t = mysqli_fetch_array(mysqli_query($conex, $sql_t));
			$total_c = $row_t['TOTAL'];
			if($total_c >= $cortes){
				$cod_fc = $row['cod_fidelizacion'];
				$tipo_cliente = $row['tipo_cliente'];
			}
		}
		// echo "/*$sql_t*/";
	}
	$data = array();
	$cont = 0;
	$sqld = "SELECT * from fidelizacion_servicio where cod_fidelizacion = $cod_fc";
	$resultadod = mysqli_query($conex, $sqld);
	while ($rowd = mysqli_fetch_array($resultadod)) {
		$cont++;
		array_push(
			$data,
			array(
				'corte' => $cortes,
				'tipocliente' => $tipo_cliente,
				'estado' => $estado,
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
				'corte' => $cortes,
				'tipocliente' => $tipo_cliente,
				'estado' => $estado,
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
