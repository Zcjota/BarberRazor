<?php
	include '../lib/conex.php';
	include '../lib/session.php';

	$idpersonal = 0;
	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		echo '{success:false, errors:{reason:"Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo.", id:99}}';
		exit;
	} else {
		$idpersonal = $_SESSION['IdPersonal'];
		$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}
	if (VerificaConBD()) {
		echo "No se puede conectar con la base de datos";
		exit;
	}
	// ///////////////////////DATOS RECIBO
	$total = isset($_POST['montoB_AI']) ? $_POST['montoB_AI'] : 0;
	$comentarioII = isset($_POST['comentarioII_AI']) ? $_POST['comentarioII_AI'] : 0;

	$conex = ConectarConBD();
	$variableControlTransaccion = true;
	$iniciarTransaccion = "BEGIN;"; /////////iniciar transaccion
	$finalizarTransaccion = "COMMIT;"; //////finalizar transaccion
	$deshacerTransaccion = "ROLLBACK;"; /////deshacer transaccion

	$resultadoTransaccion = mysqli_query($conex, $iniciarTransaccion);
	/// agregado jr

	$sql3 = " insert INTO ingreso(`fecha`, `2nivel`, `3nivel`, `cantidad`, `precio`, `total`, `pago`, `tipo_pago`, `tipo_ingreso`, `comentario_ii`, `ACTIVO`,COD_SUCURSAL)" .
		" VALUES( NOW(), 'AJUSTE','$comentarioII', 1, $total, $total, $total, 1, 0,'' , 1,$idsuc)";

	if ($resultado3 = mysqli_query($conex, $sql3)) { //INSERTO EL INGRESO

	} else {
		$variableControlTransaccion = false;
		$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
		echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 1", id:1}}';
		exit;
	}
	if ($variableControlTransaccion == true) {
		$resultadoTransaccion = mysqli_query($conex, $finalizarTransaccion);
		echo "{success: true}";
		exit;
	}
