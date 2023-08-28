<?php
	include "../lib/conex.php";
	session_start();
	$codigo = $_POST['codigo'];

	if (isset($codigo)) {
		if (VerificaConBD()) {
			echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
			exit;
		}

		$conex = ConectarConBD();
		$sql = 'UPDATE `cargo` SET ACTIVO = 0 WHERE cod_cargo = ' . $codigo;

		if ($resultado = mysqli_query($conex, $sql)) {
			echo "{success: true}";
		} else {
			echo '{"Success": false, "errors":{"reason": "Registro No Desactivado"}}';
		}
	} else {
		echo '{"Success": false, "errors":{"reason": "No se ha enviado el paramtro correcto"}}';
	}
