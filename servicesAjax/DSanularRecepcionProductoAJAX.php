<?php
	include "../lib/conex.php";
	include '../lib/session.php';
	session_start();

	$codigo = $_POST['codigo'];
	$codpersonal = $_POST['codpersonal'];

	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		echo '{message:{reason:"Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo.", id:99}}';
		exit;
	} else {
		$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}

	if (VerificaConBD()) {
		echo '{"message":{"reason": "No se puede conectar con la BD",id:1}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = 'UPDATE `recepcion_producto` SET estado = 2, personal_anu = ' . $codpersonal . ' WHERE cod_rp = ' . $codigo;

	$resultado = mysqli_query($conex, $sql);
	$sql2 = "select * from detalle_rp where ACTIVO = 1 and cod_rp = " . $codigo;

	$resultado2 = mysqli_query($conex, $sql2);
	while ($row = mysqli_fetch_array($resultado2)) {
		$cant = $row['cant'];
		$codproducto = $row['cod_producto'];
		$sqlu = " UPDATE stock B
					SET B.cantidad_disponible = B.cantidad_disponible - $cant
					WHERE B.COD_SUCURSAL = $idsuc and B.cod_producto = $codproducto";

		$resultadou = mysqli_query($conex, $sqlu);
	}
	if (1 == 1) {
		echo '{"message":{"reason": "El proceso finalizo correctamente.",id:2}}';
		exit;
	} else {
		echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo 3.",id:1}}';
		exit;
	}
