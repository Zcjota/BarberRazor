<?php
	include "../lib/conex.php";
	$codigo = $_REQUEST['codigo'];

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = "SELECT A.cod_detalle, B.descripcion as product, B.cod_barra, B.pv, A.cant, A.fecha_vencimiento
				FROM detalle_rp A
				INNER JOIN producto B on A.cod_producto = B.cod_producto
				WHERE A.ACTIVO = 1 AND A.cod_rp = " . $codigo .
		" LIMIT 0, 1000";

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['cod_detalle'],
			"marca" => "",
			"producto" => strtoupper($row['product']),
			"cod" => $row['cod_barra'],
			"precio" => $row['pv'],
			"cant" => $row['cant'],
			"venc" => $row['fecha_vencimiento'],
		));
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
