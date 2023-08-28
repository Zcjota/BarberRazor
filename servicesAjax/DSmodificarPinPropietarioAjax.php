<?php
	/*!
	* RAZOR-ZCJOTA
	* Copyright(c) 2020
	*/
	include("../lib/conex.php");
	$codigo = $_POST['codigo'] ?? 0;
	
	$pin = $_POST['txtpinreset'] ?? '';

	if (VerificaConBD()){	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';	
		exit;
	}

	$conex = ConectarConBD();
	
		$sql = " update propietario set codigo_sistema = '$pin' where cod_propietario = $codigo ";
		if ($resultado1 = mysqli_query($conex, $sql)) {
			echo '{success: true, "msg":{"reason": "Se Guardó Correctamente."}}';
		} else {
			echo '{"Success": false, "errors":{"reason": "Error al Guardar Registro."}}';
		}
	

	