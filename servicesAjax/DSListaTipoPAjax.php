<?php
	include "../lib/conex.php";

	$start = isset($_POST['start']) ? $_POST['start'] : 0;
	$limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
	$buscar = isset($_POST['buscar']) ? $_POST['buscar'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND A.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = ' SELECT A.*, B.descripcion as categoria from tipo_producto A' .
		' inner join categoria_producto B on A.cod_categoria = B.cod_categoria' .
		' WHERE A.ACTIVO = 1' . $sql_buscar .
		' ORDER BY B.descripcion ASC, A.descripcion ASC ' .
		' LIMIT ' . $start . ',' . $limit;

	$stotal = mysqli_query($conex, "SELECT COUNT(cod_tipop) AS TOTAL FROM tipo_producto  WHERE ACTIVO = 1");
	$total = mysqli_fetch_array($stotal);

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['cod_tipop'],
			"codcategoria" => $row['cod_categoria'],
			"descripcion" => strtoupper($row['descripcion']),
			"categoria" => strtoupper($row['categoria'])
			
		));
	}

	$paging = array(
		'success' => true,
		'total' => $total['TOTAL'],
		'data' => $data
	);
	echo json_encode($paging);
