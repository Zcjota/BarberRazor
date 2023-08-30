<?php
	include '../lib/conex.php';
	include '../lib/session.php';

	date_default_timezone_set('America/La_Paz');
	$codigo = isset($_POST['codigo']) ? $_POST['codigo'] : 0;
	$tp = isset($_POST['tp']) ? $_POST['tp'] : 0;
	$cant = isset($_POST['cant']) ? $_POST['cant'] : 0;
	$codpers = isset($_POST['codpers']) ? $_POST['codpers'] : 0;
	$pago = isset($_POST['pago']) ? $_POST['pago'] : 0;
	$total = isset($_POST['total']) ? $_POST['total'] : 0;

	if (VerificaConBD()) {
		echo "No se puede conectar con la base de datos";
		exit;
	}

	$conex = ConectarConBD();
	mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'America/La_Paz' ");
	if (is_numeric($tp)) {
		$sql = " update ingreso set " .
			" tipo_pago=$tp" .
			" ,cantidad=$cant" .
			" ,pago=$pago" .
			" ,total=$total" .
			" ,fecha_mod=NOW()" .
			" ,usuario_mod=$codpers" .
			" where cod_ingreso = " . $codigo;

	} else {
		$sql = " update ingreso set " .
			" cantidad=$cant" .
			" ,pago=$pago" .
			" ,total=$total" .
			" ,fecha_mod=NOW()" .
			" ,usuario_mod=$codpers" .
			" where cod_ingreso = " . $codigo;
	}
	if ($resultado = mysqli_query($conex, $sql)) {
		echo "{success: true}";
		exit;
	} else {
		echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 1", id:1}}';
		exit;
	}
