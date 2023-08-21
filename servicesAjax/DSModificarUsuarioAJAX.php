<?php
	include '../lib/conex.php';

	$Codigo = $_REQUEST["codigo"];
	$Correo = "'" . strtoupper($_REQUEST["correo"]) . "'";
	$Usuario = "'" . strtoupper($_REQUEST["usuario"]) . "'";
	$Contrasenia = "'" . $_REQUEST["contrasenia"] . "'";
	$tipoUser = "'" . $_REQUEST["tipo_usuario"] . "'";
	$tsucursal = "'" . $_POST["tsucursal"] . "'";
	$reg = $_POST['registros'];
	$records = json_decode(stripslashes($reg));

	if (VerificaConBD()) {
		echo "No se puede conectar con la base de datos";
		exit;
	}

	$conex = ConectarConBD();
	//mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'GMT-4' ");

	$sql = ' UPDATE `usuario` SET ' .
		' LOGIN = ' . $Usuario .
		',PASSWORD = ' . $Contrasenia .
		',CORREO = ' . $Correo .
		',COD_TIPOU = ' . $tipoUser .
		',COD_SUCURSAL =' . $tsucursal .
		' WHERE COD_USUARIO = ' . $Codigo;

	if ($resultado = mysqli_query($conex, $sql)) {
		$sqluser = "UPDATE usuario_suc set ACTIVO=0 where COD_USUARIO=" . $Codigo;

		$res = mysqli_query($conex, $sqluser);
		$records = json_decode(stripslashes($reg));
		foreach ($records as $record) {
			$codsucursal = $record->codsucursal;
			$sqlreg = "INSERT INTO usuario_suc(COD_USUARIO,COD_SUCURSAL,FECHA,ACTIVO) " .
				"values('$Codigo','$codsucursal', NOW(),'1')";
				
			$resulta = mysqli_query($conex, $sqlreg);
		}
		echo "{success: true}";
		exit;
	} else {
		echo '{"Success": false, "errors":{"reason": " Error al guardar!!!' . $sql . '"}}';
		exit;
	}
