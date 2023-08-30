<?php
	include "../lib/conex.php";
	
	$descripcion = "'" . strtoupper($_POST["txtnombre"]) . "'";
	$codcategoria = $_POST["cbcategoriap"];
	$op = $_REQUEST["opcion"];
	$codigo = "'" . $_REQUEST["codigo"] . "'";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	switch ($op) {
		case "0": {
			$sql = ' INSERT INTO tipo_producto (cod_categoria,`descripcion`,`ACTIVO`) ' .
				' VALUES (' . $codcategoria . ', ' . $descripcion . ', 1)';
			break;
		}
		case "1": {
			$sql = ' UPDATE tipo_producto SET' .
				' descripcion = ' . $descripcion .
				' ,cod_categoria = ' . $codcategoria .
				' WHERE cod_tipop = ' . $codigo;
			break;
		}
	}

	if ($resultado = mysqli_query($conex, $sql)) {
		echo "{success: true}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
