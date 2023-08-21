<?php
	include "../lib/conex.php";

	$nombre = "'" . strtoupper($_POST["nom"]) . "'";
	$descripcion = "'" . strtoupper($_POST["descrip"]) . "'";
	$op = $_REQUEST["opcion"];
	$codigo = "'" . $_REQUEST["codigo"] . "'";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	switch ($op) {
		case "0":
			{
				$sql = ' INSERT INTO`cargo` (`nombre`,`descripcion`,`ACTIVO`) ' .
					' select ' . $nombre . ',' . $descripcion . ', 1 from dual ' .
					'where not exists(select nombre from cargo where nombre = ' . $nombre . ' and descripcion = ' . $descripcion . ')limit 1';
				break;
			}
		case "1":
			{
				$sql = ' UPDATE `cargo` SET' .
					' nombre = ' . $nombre .
					', descripcion = ' . $descripcion .
					' WHERE cod_cargo = ' . $codigo;
				break;
			}
	}
	//mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'America/La_Paz' ");
	if ($resultado = mysqli_query($conex, $sql)) {
		$pp = mysqli_affected_rows($conex);
		if ($pp > 0) {
			echo "{success: true}";
		} else {
			echo '{"Success": false, "errors":{"reason": "El Cargo ya existe."}}';
		}
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
