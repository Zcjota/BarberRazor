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
			$sql = "INSERT INTO tipo_publicidad (nombre, descripcion, ACTIVO)
				select' $nombre', '$descripcion', 1 from dual
				where not exists(select nombre from tipo_publicidad where nombre = '$nombre'  and descripcion = '$descripcion') limit 1";
			break;
		case "1":
			$sql = "UPDATE tipo_publicidad SET
				nombre = '$nombre', descripcion = '$descripcion'
				WHERE cod_tp = $codigo";
			break;
	}
	// echo "/*$sql*/";
	if ($resultado = mysqli_query($conex, $sql)) {
		$pp = mysqli_affected_rows($conex);
		if ($pp > 0) {
			echo "{success: true}";
		} else {
			echo '{"Success": false, "errors":{"reason": "El Tipo de Publicidad ya Existe."}}';
		}
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al Guardar el Registro."}}';
	}
