<?php
	include "../lib/conex.php";

	$start = isset($_POST['start']) ? $_POST['start'] : 0; 
	$limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND ( A.nombre LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%'" .
		" OR concat(A.nombre,' ', A.app, ' ', A.apm) LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%'" .
		" OR A.app LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%'" .
		" OR A.celular LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%'" .
		" OR A.apm LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%')";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}
	$conex = ConectarConBD();
	$sql = "SELECT A.*, concat(B.nombre,' ', B.app) as b_principal
		FROM propietario A
		left join personal B on A.barbero_princ = B.cod_personal
		WHERE A.ACTIVO = 1 $sql_buscar
		ORDER BY A.nombre ASC, A.app ASC
		LIMIT $start , $limit";

	$stotal = mysqli_query($conex, "SELECT COUNT(A.cod_propietario) AS TOTAL FROM propietario A WHERE A.ACTIVO = 1 $sql_buscar ");
	$total = mysqli_fetch_array($stotal);

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['cod_propietario'],
			"nombfactura" => strtoupper($row['nombre_factura']),
			"nit" => strtoupper($row['nit']),
			"nombre" => strtoupper($row['nombre']),
			"nacimiento" => $row['nacimiento'],
			"app" => strtoupper($row['app']),
			"apm" => strtoupper($row['apm']),
			"nombre_completo" => strtoupper($row['nombre'] . ' ' . $row['app'] . ' ' . $row['apm']),
			"telefono" => $row['telefono'],
			"celular" => $row['celular'],
			"corte" => str_pad($row['cant_corte'], 4, "0", STR_PAD_LEFT),
			"mail" => strtoupper($row['mail']),
			"direccion" => strtoupper($row['detalle_dir']),
			"ref_corte" => strtoupper($row['ref_corte']),
			//"b_principal" => strtoupper($row['b_principal']) ,
			//"b_auxiliar" => strtoupper($row['b_auxiliar']) ,
			"b_principal" => strtoupper($row['barbero_princ']),
			"b_principal_n" => strtoupper($row['b_principal']),
			// "b_auxiliar" => strtoupper($row['barbero_aux']),

			"cod_tp" => $row['cod_tp'],
			"adulto" => $row['adulto'],
			"edad" => $row['edad'],
			"cod_vinculacion" => $row['cod_vinculacion']
		));
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data,
	);
	echo json_encode($paging);
