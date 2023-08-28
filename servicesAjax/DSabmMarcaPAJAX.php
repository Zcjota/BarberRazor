<?php
	include "../lib/conex.php";
	$descripcion = "'" . strtoupper($_POST["txtnombre"]) . "'";

	$op = $_REQUEST["opcion"];
	$codigo = "'" . $_REQUEST["codigo"] . "'";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	switch ($op) {
		case "0": {
			$sql = ' INSERT INTO marca_producto (`descripcion`,`ACTIVO`) ' .
				' VALUES (' . $descripcion . ', 1)';
			break;
		}
		case "1": {
			$sql = ' UPDATE marca_producto SET' .
				' descripcion = ' . $descripcion .
				' WHERE cod_marca = ' . $codigo;
			break;
		}
	}

	if ($resultado = mysqli_query($conex, $sql)) {
		echo "{success: true}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
