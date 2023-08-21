<?php 
    include("../lib/conex.php");
	include('../lib/session.php');	 
	// $idsuc = 0;
	// echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo.",id:1}}';
	// exit;
    if (VerificaSessionBD()==false){	
		echo '{"message":{"reason": "Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo.",id:99}}';
    	 exit;
    }else{
        $idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}
	
	$codigo = isset($_POST['codigo'])?$_POST['codigo']:-1;
	$pin = isset($_POST['pin'])?$_POST['pin']:-1;
	$op = isset($_POST['op'])?$_POST['op']:0;
	$codpersonal = isset($_POST['codpersonal'])?$_POST['codpersonal']:0;
	
	
	if (VerificaConBD()) {	
		echo '{"message":{"reason": "No se puede conectar con la BD",id:1}}';
		exit;
	}

	$conex = ConectarConBD();
	
	//mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'America/La_Paz' ");
	$sql='';
	switch($op){
		case '0':
			$sql = "SELECT A.cod_personal, A.nombre, A.app, B.nombre, C.cod_up
			FROM personal A 
			INNER JOIN nivel_seguridad B ON A.cod_ns = B.cod_ns
			INNER JOIN detalle_seguridad_pin C ON A.cod_ns = C.cod_ns AND C.ACTIVO = 1
			WHERE A.ACTIVO = 1 AND A.codigo_sistema = $pin AND C.cod_up = $codigo";
		break;
		case '1':
			$sql = "SELECT A.cod_personal, A.nombre, A.app, B.nombre, C.cod_up
			FROM personal A 
			INNER JOIN nivel_seguridad B ON A.cod_ns = B.cod_ns
			INNER JOIN detalle_seguridad_pin C ON A.cod_ns = C.cod_ns AND C.ACTIVO = 1
			WHERE A.ACTIVO = 1 AND A.codigo_sistema = $pin AND C.cod_up = $codigo AND A.cod_personal = $codpersonal";
		break;
	}
echo "/*$sql*/";
	if ($resultado = mysqli_query($conex, $sql)){
		$nf= mysqli_num_rows($resultado);
		$row = mysqli_fetch_array($resultado);
		if($nf > 0){
			echo '{"message":{"reason": "'.$row["cod_personal"].'",id:2}}';
		}else{
			echo '{"message":{"reason": "Estimado Usuario el PIN Introducido no Coinciden con los Permitidos por Sistema, Desea Volver a Intentarlo?",id:1}}';
		}
	} else{
		echo '{"message":{"reason": "El Proceso no Finalizó Correctamente, Volver a Intentarlo.",id:1}}';
		exit;
	}
	