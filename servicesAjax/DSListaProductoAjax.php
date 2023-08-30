<?php
	include "../lib/conex.php";

	$start = isset($_POST['start']) ? $_POST['start'] : 0;
	$limit = isset($_POST['limit']) ? $_POST['limit'] : 1000;
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND (A.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR B.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR C.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "')";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = ' SELECT A.*, B.descripcion as marca, C.cod_tipop, C.descripcion as tipo, D.cod_categoria, D.descripcion as categoria from producto A' .
		' inner join marca_producto B on A.cod_marca = B.cod_marca' .
		' inner join tipo_producto C on A.cod_tipop = C.cod_tipop' .
		' inner join categoria_producto D on C.cod_categoria = D.cod_categoria' .
		' WHERE A.ACTIVO = 1' . $sql_buscar .
		' ORDER BY D.descripcion ASC, C.descripcion ASC, B.descripcion ASC, A.descripcion ASC ' .
		' LIMIT ' . $start . ',' . $limit;


	$stotal = mysqli_query($conex, 'SELECT COUNT(A.cod_producto) AS TOTAL FROM producto A inner join marca_producto B on A.cod_marca = B.cod_marca' .
		' inner join tipo_producto C on A.cod_tipop = C.cod_tipop' .
		' inner join categoria_producto D on C.cod_categoria = D.cod_categoria' .
		' WHERE A.ACTIVO = 1' . $sql_buscar);

	$total = mysqli_fetch_array($stotal);
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		$estado = "VIGENTE";
		if ($row['estado'] == '0') {
			$estado = "DISCONTINUO";
		}
		array_push(
			$data,
			array(
				"codigo" => $row['cod_producto'],
				"codmarca" => $row['cod_marca'],
				"codtipo" => $row['cod_tipop'],
				"codcategoria" => $row['cod_categoria'],
				"descripcion" => strtoupper($row['descripcion']),
				"categoria" => strtoupper($row['categoria']),
				"tipo" => strtoupper($row['tipo']),
				"marca" => strtoupper($row['marca']),
				"codbarra" => $row['cod_barra'],
				"ubicacion" => strtoupper($row['ubicacion']),
				"pc" => $row['pc'] > 0 ? $row['pc'] : '',
				"pv" => $row['pv'] > 0 ? $row['pv'] : '',
				"estado" => $estado
			)
		);
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);
