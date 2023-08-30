<?php
	include "../lib/conex.php";

	$registros = isset($_POST['registros']) ? $_POST['registros'] : '';
	$dias = isset($_POST['dias']) ? $_POST['dias'] : '';
	$records = json_decode(stripslashes($registros));

	if (VerificaConBD()) {
		echo '{"message":{"reason": "No se puede conectar con la BD",id:1}}';
		exit;
	}
	$conex = ConectarConBD();
	foreach ($records as $record) {
		$codigo = $record->codigo;
		$sql = 'UPDATE `tipo_producto` SET relevamiento = ' . $dias . ' WHERE cod_tipop = ' . $codigo;
		if ($resultado = mysqli_query($conex, $sql)) {
		} else {
			echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo.",id:1}}';
			exit;
		}
	}
	echo '{"message":{"reason": "El proceso finalizo correctamente.",id:2}}';
