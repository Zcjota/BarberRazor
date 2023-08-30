<?php
	include "../lib/conex.php";
	include "../lib/session.php";
	// include("DSfuncionConfRolesAjax.php");
	$start = $_POST['start'] ?? 0;
	$limit = $_POST['limit'] ?? 1000;
	$buscar = $_POST['buscar'] ?? '';
	$fecha = $_POST['fecha'] ?? Date('Y-m-d');

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND A.2nivel LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'";
	}
	if ((strcmp($fecha, '') == 0) || (strcmp(trim($fecha), '*') == 0)) {
		$sql_buscarF = '';
	} else {
		$sql_buscarF = " AND A.fecha like '%$fecha%'";
	}
	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		$data = array();
		array_push($data, array("propietario" => "Finalizo Session."));
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
	$sql = "SELECT A.cod_ingreso as codingreso, A.*, B.fecha_servicio, C.comentario, CURDATE() as fa, 
		concat(D.nombre,' ',D.app ,' ',D.apm) as personalanu, concat(F.nombre,' ',F.app) as personalcre 
		from ingreso A
		left join ficha_servicio B on A.cod_fs = B.cod_fs
		left join recibo C on A.cod_recibo = C.cod_recibo
		left join personal D on A.usuario_anu = D.cod_personal
		LEFT join control_descuento E on A.cod_ingreso=E.cod_fs
		left join personal F on E.acreditado_por=F.cod_personal
		WHERE A.ACTIVO >=0 AND A.COD_SUCURSAL = $idsuc $sql_buscar $sql_buscarF
		ORDER BY A.fecha DESC
		LIMIT $start, $limit
	";
	// echo "/*$sql*/";
	$stotal = mysqli_query($conex, "SELECT COUNT(A.cod_ingreso) AS TOTAL FROM ingreso A WHERE A.ACTIVO = 1 AND A.COD_SUCURSAL = $idsuc" . $sql_buscar . $sql_buscarF);
	$total = mysqli_fetch_array($stotal);
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		$tipopago;
		$codigo = $row['codigo'];
		switch ($row['tipo_pago']) {
			case 1:
				$tipopago = 'EFECTIVO';
				break;
			case 2:
				$tipopago = 'TRANSFERENCIA';
				break;
			case 3:
				$tipopago = 'TARJETA';
				break;
			case 4:
				$tipopago = 'CHEQUE';
				break;
		}
		if ($row['cod_ts'] == 4) {
			//$sqlb = ;
			$row2 = mysqli_fetch_array(mysqli_query($conex, "SELECT cod_barra from producto where cod_producto=" . $row['cod_producto']));
			$codigo = $row2['cod_barra'];
		}
		$color = 'b';
		if ($row['ACTIVO'] == 0) {
			$color = 'r';
		}
		array_push($data, array(
			"codingreso" => $row['cod_ingreso'],
			"codigo" => $codigo,
			"fecha" => $row['fecha'],
			"fechaservicio" => $row['fecha_servicio'],
			"fa" => $row['fa'],
			"ficha" => $row['nro_ficha'] == 0 ? '' : $row['nro_ficha'],
			"propietario" => strtoupper($row['cliente']),
			"2nivel" => strtoupper($row['2nivel']),
			"3nivel" => strtoupper($row['3nivel']),
			"tipoingreso" => $row['tipo_ingreso'],
			"cantidad" => $row['cantidad'],
			"precio" => $row['precio'],
			"descuento" => $row['descuento'],
			"total" => $row['total'],
			"pago" => $row['pago'],
			"saldo" => $row['total'] - $row['pago'],
			"tipopago" => $tipopago,
			"color" => $color,
			"comentario" => strtolower($row['comentario'] . '' . $row['comentario_ii']),
			"anulacion" => strtolower($row['memo_anu']),
			"personalanu" => strtoupper($row['personalanu']),
			"personalcre" => strtoupper($row['personalcre']),
			// "configuracion" => configuracionRol(12),
		));
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data);
	echo json_encode($paging);
