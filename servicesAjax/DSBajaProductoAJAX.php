<?php
	include "../lib/conex.php";
	include '../lib/session.php';
	session_start();

	$registros = $_POST['registros'];
	$records = json_decode(stripslashes($registros));

	$idpersonal = 0;
	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		echo '{"Success": false, "errors":{"reason": "Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo."}}';
		exit;
	} else {
		$idpersonal = $_SESSION['IdPersonal'];
		$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}


	
	$conex = ConectarConBD();
	/// agregado jr
	foreach ($records as $record) {
		$codproducto = $record->codigo;
		$sql = 'UPDATE producto A inner join stock B on A.cod_producto = B.cod_producto SET A.ACTIVO = 0, B.cantidad_disponible = 0 WHERE A.cod_producto = ' . $codproducto;

		$resultado = mysqli_query($conex, $sql);
		$sql3 = " INSERT INTO bitacora_producto (`cod_producto`, `tipo`, `personal`, `fecha`, COD_SUCURSAL) " .
			" VALUES ($codproducto ,'B',$idpersonal, NOW(), $idsuc)";

		$resultado3 = mysqli_query($conex, $sql3);
	}
	if (1 == 1) {
		echo "{success: true}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Registro No Desactivado"}}';
	}
