<?php
	include "../lib/conex.php";
	// include("DSfuncionConfRolesAjax.php");
	$codpropietario = isset($_POST['cod']) ? $_POST['cod'] : 0;
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = " SELECT A.cod_servicio, A.nombre as servicio, B.cod_ts, B.nombre as tiposervicio,B.precio
				from servicio A
				INNER JOIN tipo_servicio B on A.cod_servicio = B.cod_servicio
				WHERE B.ACTIVO = 1
				ORDER BY B.orden ASC";
	// echo "/*$sql*/";

	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		array_push($data, array(
			"codigo" => $row['cod_ts'],
			"tipoingreso" => 1,
			"tiposervicio" => $row['tiposervicio'],
			"servicio" => $row['servicio'],
			"precio" => $row['precio'],
			"preciobk" => $row['precio'],
			"cant" => 0,
			"subtotal" => 0,
			"descuento" => 0,
			"total" => 0,
			"descuentobs" => 0,
			"codfidelizacionservicio" => 0,
		));
	}
	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
