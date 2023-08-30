<?php
	include "../lib/conex.php";
	include '../lib/session.php';

	$start = isset($_POST['start']) ? $_POST['start'] : 0;
	$limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND ( B.nombre LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR C.app LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR C.nombre LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "')";
	}

	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		$data = array();
		array_push($data, array("proveedor" => "Finalizo Session."));
		$paging = array('success' => true, 'total' => 0, 'data' => $data);
		echo json_encode($paging);
		exit;
	} else {
		$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();

	// $sql = ' SELECT A.*, B.nombre as proveedor from recepcion_producto A ' .
	// 	' inner join proveedor B on A.cod_proveedor = B.cod_proveedor ' .
	// 	//' inner join personal C on A.cod_personal = C.cod_personal ' .
	// 	' WHERE A.ACTIVO = 1 and A.COD_SUCURSAL = ' . $idsuc . $sql_buscar .
	// 	' ORDER BY A.cod_rp DESC ' .
	// 	' LIMIT ' . $start . ',' . $limit;

	$sql = ' SELECT A.*, B.nombre as proveedor, concat(C.app," ",C.nombre) as personal from recepcion_producto A ' .
		' inner join proveedor B on A.cod_proveedor = B.cod_proveedor ' .
		' inner join personal C on A.cod_personal = C.cod_personal ' .
		' WHERE A.ACTIVO = 1 and A.COD_SUCURSAL = ' . $idsuc . $sql_buscar .
		' ORDER BY A.cod_rp DESC ' .
		' LIMIT ' . $start . ',' . $limit;

	$stotal = mysqli_query($conex, 'SELECT COUNT(A.cod_rp) AS TOTAL, B.nombre as proveedor, concat(C.app," ",C.nombre) as personal from recepcion_producto A ' .
		' inner join proveedor B on A.cod_proveedor = B.cod_proveedor ' .
		' inner join personal C on A.cod_personal = C.cod_personal ' .
		' WHERE A.ACTIVO = 1 and A.COD_SUCURSAL = ' . $idsuc . $sql_buscar);

	$total = mysqli_fetch_array($stotal);
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		$estado = "APRAB.";
		if ($row['estado'] == 2) {
			$estado = "ANU.";
		}
		array_push($data, array(
			"codigo" => $row['cod_rp'],
			"nrog" => $row['nro_global'],
			"nrop" => $row['nro_proveedor'],
			"codproveedor" => $row['cod_proveedor'],
			"proveedor" => strtoupper($row['proveedor']),
		    "codpersonal" => $row['cod_personal'],
			"personal" => strtoupper($row['personal']),
			"fecha" => $row['fecha_recep'] . ' ' . $row['hora'],
			"comentario" => strtoupper($row['comentario']),
			"estado" => $estado,
		));
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);
