<?php
	/*!
	* DSoft-TPMV
	* Copyright(c) 2011
	*/
	include "../lib/conex.php";
	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = 'SELECT A.* FROM propietario A  WHERE A.ACTIVO = 1 order by A.nombre ASC, A.app ASC, A.apm ASC';

	$resultado = mysqli_query($conex, $sql);
	$data = array();

	while ($row = mysqli_fetch_array($resultado)) {
		array_push(
			$data,
			array("codigop" => $row['cod_propietario'],
				"codigob" => $row['celular'],
				"nit" => $row['nit'],
				"razonsocial" => $row['nombre_factura'],
				"codfide"         => $row['cod_fidelizacion'],
				"cant_corte_fide"         => $row['cant_corte_fide'],
				"pin_cliente"         => $row['codigo_sistema'],
				"ultimo_corte"         => $row['ultimo_corte'],
				"codconvenio"         => $row['cod_convenio'],
				"nombrep" => strtoupper($row['nombre'] . ' ' . $row['app'] . ' ' . $row['apm']),
				"nacimiento"  => $row['nacimiento'],
			)
		);
	}

	$paging = array(
		'success' => true,
		'data' => $data,
	);
	echo json_encode($paging);
