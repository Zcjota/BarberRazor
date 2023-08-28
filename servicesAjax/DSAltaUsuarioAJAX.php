<?php
	include '../lib/conex.php';
	$codpersonal = "'" . strtoupper($_REQUEST["Personal"]) . "'";
	$Usuario = "'" . strtoupper($_REQUEST["usuariou"]) . "'";
	$Contrasenia = "'" . $_REQUEST["contraseniau"] . "'";
	$Correo = "'" . strtoupper($_REQUEST["correou"]) . "'";
	$tipoUser = "'" . $_POST["tusuariou"] . "'";
	$tsucursal = "'" . $_POST["tsucursal"] . "'";
	$reg = $_POST['registros'];
	$records = json_decode(stripslashes($reg));

	if (VerificaConBD()) {
		echo "No se puede conectar con la base de datos";
		exit;
	}
	$conex = ConectarConBD();
	//mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'GMT-4' ");
	$sql = 'INSERT INTO `usuario` (LOGIN, PASSWORD, CORREO, COD_TIPOU, COD_SUCURSAL, cod_personal, ACTIVO)' .
		'VALUES (' . $Usuario . ',' . $Contrasenia . ',' . $Correo . ',' . $tipoUser . ',' . $tsucursal . ',' . $codpersonal . ',1)';

	if ($resultado = mysqli_query($conex, $sql)) {
		$codusuario = mysqli_insert_id($conex);
		foreach ($records as $record) {
			$codsucursal = $record->codsucursal;
			$sqlreg = "INSERT INTO usuario_suc(COD_USUARIO,COD_SUCURSAL,FECHA,ACTIVO) 
						values('$codusuario','$codsucursal', NOW(),'1')";
						
			$resulta = mysqli_query($conex, $sqlreg);
		}
		echo "{success: true}";
		exit;
	} else {
		echo '{"Success": false, "errors":{"reason": " Error al guardar!!!"}}';
		exit;
	}
