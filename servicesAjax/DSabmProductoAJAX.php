<?php
	include "../lib/conex.php";
	include '../lib/session.php';

	$codmarca = isset($_POST["cbmarcap"]) ? $_POST['cbmarcap'] : 0;
	$codtipo = isset($_POST["cbtipop"]) ? $_POST['cbtipop'] : 0;
	$descripcion = strtoupper(isset($_POST["txtnombre"]) ? $_POST['txtnombre'] : '');
	$ubicacion = strtoupper(isset($_POST["txtubicacion"]) ? $_POST['txtubicacion'] : '');
	$codbarra = isset($_POST["txtcodbarra"]) ? $_POST['txtcodbarra'] : '';
	$pc = isset($_POST["txtpc"]) ? $_POST['txtpc'] : 0;
	$pv = isset($_POST["txtpv"]) ? $_POST['txtpv'] : 0;
	$codigo = "'" . $_REQUEST["codigo"] . "'";
	$op = $_REQUEST["opcion"];
	$ubicacion = ($ubicacion == 'UBICACION.') ? '' : $ubicacion;
	$codbarra = ($codbarra == "codigo de barra.") ? '' : $codbarra;
	$pc = ($pc == 'Precio.') ? 0 : $pc;
	$pv = ($pv == 'Precio.') ? 0 : $pv;

	$idpersonal = 0;
	if (VerificaSessionBD() == false) {
		echo '{"Success": false, "errors":{"reason": "Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo."}}';
		exit;
	} else {
		$idpersonal = $_SESSION['IdPersonal'];
	}

	if (VerificaConBD()) {echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	/// agregado jr

	switch ($op) {
		case "0": {
			$sql = " INSERT INTO producto (cod_tipop, cod_marca, descripcion, ubicacion, cod_barra, pc, pv, ACTIVO) " .
				" VALUES ($codtipo ,$codmarca , '$descripcion', '$ubicacion', '$codbarra', $pc, $pv, 1)";
			break;
		}
		case "1": {
			$sql = " UPDATE producto SET" .
				" descripcion = '$descripcion'" .
				" ,cod_tipop = $codtipo" .
				" ,cod_marca = $codmarca" .
				" ,ubicacion = '$ubicacion'" .
				" ,cod_barra = '$codbarra'" .
				" ,pc = $pc" .
				" ,pv = $pv" .
				" WHERE cod_producto = " . $codigo;
			break;
		}
	}
	if ($resultado = mysqli_query($conex, $sql)) {
		if ($op == "0") {
			$id = mysqli_insert_id($conex);
			$sql2 = " INSERT INTO stock (cod_producto, cantidad_disponible, COD_SUCURSAL) " .
					" SELECT $id ,0, A.COD_SUCURSAL from sucursal A WHERE A.ACTIVO = 1";
			$resultado2 = mysqli_query($conex, $sql2);
			$sql3 = "INSERT INTO bitacora_producto (`cod_producto`, `tipo`, `personal`, `fecha`)
					VALUES ($id ,'A',$idpersonal, NOW())";
			$resultado3 = mysqli_query($conex, $sql3);
		}
		echo "{success: true}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
