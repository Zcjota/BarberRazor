<?php
	include "../lib/conex.php";
	$start = $_POST['start'] ?? 0;
	$limit = $_POST['limit'] ?? 100;
	$buscar = $_POST['buscar'] ?? '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND ( C.nombre LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR P.app LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR P.nombre LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "')";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	mysqli_query($conex, "SET NAMES 'utf8'"); 
	$sql = "SELECT P.*, C.cod_cargo,C.nombre AS CARGO, TB.nombre as comision,
			(select nombre from nivel_seguridad where cod_ns = P.cod_ns) as seguridad	
		FROM personal P
		LEFT JOIN cargo C on P.cod_cargo = C.cod_cargo
		LEFT JOIN tipo_barbero TB on P.cod_tb = TB.cod_tb
		WHERE P.ACTIVO = 1 $sql_buscar
		ORDER BY P.nombre ASC 
		LIMIT  $start , $limit
	";

	// echo "/*$sql*/";
	$stotal = mysqli_query($conex, 'SELECT COUNT(P.cod_personal) AS TOTAL, P.*, C.cod_cargo,C.nombre AS CARGO' .
		' FROM personal P ' .
		' LEFT JOIN cargo C on P.cod_cargo = C.cod_cargo' .
		' WHERE P.ACTIVO = 1' . $sql_buscar);

	$total = mysqli_fetch_array($stotal);
	$resultado = mysqli_query($conex, $sql);
	$data = array();
	$cont = 0;
	while ($row = mysqli_fetch_array($resultado)) {
		$cont++;
		$nombre = $row['nombre'] . " " . $row['app'] . " " . $row['apm'];
		array_push(
			$data,
			array(
				"codigo" => $row['cod_personal'],
				"nombreC" => $nombre,
				"cod_cargo" => $row['cod_cargo'],
				"cargo" => $row['CARGO'],
				"nombre" => $row['nombre'],
				"app" => $row['app'],
				"apm" => $row['apm'],
				"nit" => $row['nit'],
				"fecha_ingreso" => $row['fecha_ingreso'],
				"codsistema" => $row['codigo_sistema'],
				"horario" => $row['horario'],
				"sueldo" => $row['sueldo_bs'],
				"codtb" => $row['cod_tb'],
				"comision" => $row['comision'],
				"cod_ns"=> ($row['cod_ns']!=0)?$row['cod_ns']:'',
				"seguridad" => $row['seguridad']
			)
		);
	}
	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);
