<?php
	include "../lib/conex.php";
	$codigo = $_POST['id'];

	if (isset($codigo)) {
		if (VerificaConBD()) {
			echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
			exit;
		}

		$conex = ConectarConBD();
		$sql = 'UPDATE `proveedor` SET ACTIVO = 0 WHERE cod_proveedor = ' . $codigo;

		if ($resultado = mysqli_query($conex, $sql)) {
			echo "{success: true}";
		} else {
			echo '{"Success": false, "errors":{"reason": "Registro No Desactivado"}}';
		}
	} else {
		echo '{"Success": false, "errors":{"reason": "No se ha enviado el parametro correcto"}}';
	}
