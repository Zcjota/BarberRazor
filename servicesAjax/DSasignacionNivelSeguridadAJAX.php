<?php
	include('../lib/conex.php');
	include('../lib/session.php');
	
	if (VerificaSessionBD()==false){	
		echo '{"errors":{"reason": "Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo.",id:99}}';
		exit;
	}
		
	if (VerificaConBD()){	
		echo "No se puede conectar con la base de datos";
		exit;
	}
	$cbnseguridad = isset($_POST['cbnseguridad'])?$_POST['cbnseguridad']:0;
	$codigo = isset($_POST['codigo'])?$_POST['codigo']:'';
	$cod_personal = $_POST['cod_personal'];
	// exit;

	$conex = ConectarConBD();
	$variableControlTransaccion = true;
	$iniciarTransaccion = "BEGIN;";/////////iniciar transaccion	
	$finalizarTransaccion = "COMMIT;";//////finalizar transaccion
	$deshacerTransaccion = "ROLLBACK;";/////deshacer transaccion

	$resultadoTransaccion = mysqli_query($conex, $iniciarTransaccion);
	//mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'America/La_Paz'");

	$sql2 = " UPDATE personal 
				SET cod_ns = $cbnseguridad 
				WHERE cod_personal = $codigo";

	if($resultado2 = mysqli_query($conex, $sql2)){ //ACTUALIZO EL DETALLE SERVICIO
	}else{
		$variableControlTransaccion = false;
		$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);	
		echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 3", id:1}}';
		exit;
	}
	if($variableControlTransaccion == true){
		$resultadoTransaccion = mysqli_query($conex, $finalizarTransaccion);	
		echo "{success: true}";
		exit;
	}