<?php
	include "../lib/conex.php";
	include '../lib/session.php';
	$codigo = $_POST['codigo'];

	if (isset($codigo)) {
		$idpersonal = 0;
		$idsuc = 0;
		if (VerificaSessionBD() == false) {
			echo '{"message":{"reason": "Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo.",id:99}}';
			exit;
		} else {
			$idpersonal = $_SESSION['IdPersonal'];
			$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
		}
		
		if (VerificaConBD()) {echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
			exit;
		}

		$conex = ConectarConBD();
		/// agregado jr

		$sql = 'UPDATE `propietario` SET ACTIVO = 0 WHERE cod_propietario = ' . $codigo;

		if ($resultado = mysqli_query($conex, $sql)) {
			$sql = " insert into bitacora_cliente(`cod_propietario`, `cod_personal`, `fecha`, `tipo`, `ACTIVO`, COD_SUCURSAL)" .
				" values($codigo, $idpersonal, NOW(), 'B',1,$idsuc)";
			if ($resultado = mysqli_query($conex, $sql)) {
				echo '{"message":{"reason": "El proceso finalizo correctamente.",id:2}}';
				exit;
			} else {
				echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo.",id:1}}';
				exit;
			}
		} else {
			echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo.",id:1}}';
		}
	} else {
		echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo.",id:1}}';
	}
