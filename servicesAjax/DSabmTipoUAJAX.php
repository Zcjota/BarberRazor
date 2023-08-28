<?php
	include "../lib/conex.php";
	$nombre = "'" . strtoupper($_POST["nom"]) . "'";
	$op = $_REQUEST["opcion"];
	$codigo = "'" . $_REQUEST["codigo"] . "'";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}
	$conex = ConectarConBD();
	switch ($op) {
		case "0": {
			$sql = ' INSERT INTO`tipo_usuario` (`NOMB_TIPOU`,`ACTIVO`) ' .
				' VALUES (' . $nombre . ', 1)';
			break;
		}
		case "1": {
			$sql = ' UPDATE `tipo_usuario` SET' .
				' NOMB_TIPOU = ' . $nombre .
				' WHERE COD_TIPOU = ' . $codigo;
			break;
		}
	}
	if ($resultado = mysqli_query($conex, $sql)) {
		echo "{success: true}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
