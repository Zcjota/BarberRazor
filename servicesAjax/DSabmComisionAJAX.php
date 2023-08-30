<?php
	include "../lib/conex.php";
	$nombre = strtoupper($_POST["nom"]);
	$descripcion = strtoupper($_POST["descrip"]);
	$op = $_REQUEST["opcion"];
	$codigo = $_REQUEST["codigo"];

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	switch ($op) {
		case "0":
			$sql = " INSERT INTO tipo_barbero (nombre,descripcion,ACTIVO)
				SELECT '$nombre', '$descripcion', 1 FROM dual 
				WHERE NOT EXISTS( SELECT nombre 
					FROM tipo_barbero 
					WHERE nombre = '$nombre' and descripcion = '$descripcion'
				) LIMIT 1
			";
			break;
		case "1":
			$sql = "UPDATE tipo_barbero SET
				nombre = '$nombre', descripcion = '$descripcion'
				WHERE cod_tb = $codigo
			";
			break;
	}
	//  echo "/*$sql*/";
	if ($resultado = mysqli_query($conex, $sql)) {
		$pp = mysqli_affected_rows($conex);
		// echo "/* " . $pp . "*/";
		if ($pp > 0) {
			echo "{success: true}";
		} else {
			echo '{"Success": false, "errors":{"reason": "El tipo_barbero ya existe."}}';
		}
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
