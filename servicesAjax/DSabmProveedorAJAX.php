<?php
	include "../lib/conex.php";

	$nombre = "'" . strtoupper($_POST["nomb"]) . "'";
	$descripcion = "'" . strtoupper($_POST["des"]) . "'";
	$direccion = "'" . strtoupper($_POST["dir"]) . "'";
	$telefono = "'" . $_POST["telf"] . "'";
	$op = $_REQUEST["opcion"];
	$codigo = "'" . $_REQUEST["codigo"] . "'";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	switch ($op) {
		case "0": {
			$sql = 'INSERT INTO `proveedor` (nombre, telefono, direccion, descripcion, ACTIVO) VALUES' .
				'(' . $nombre . ',' . $telefono . ',' . $direccion . ',' . $descripcion . ', 1)';
			break;
		}
		case "1": {
			$sql = ' UPDATE `proveedor` SET ' .
				' nombre = ' . $nombre .
				',direccion = ' . $direccion .
				',telefono = ' . $telefono .
				',descripcion = ' . $descripcion .
				' WHERE cod_proveedor = ' . $codigo;
			break;
		}
	}
	//mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'America/La_Paz' ");
	if ($resultado = mysqli_query($conex, $sql)) {
		$id = $codigo;
		if ($op == 0) {
			$id = mysqli_insert_id($conex);
		}
		echo "{success: true, id:{id:$id}}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro."}}';
	}
