<?php
	include "../lib/conex.php";
	include '../lib/session.php';

	$registros = isset($_POST['registros']) ? $_POST['registros'] : '';
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
	$variableControlTransaccion = true;
	$iniciarTransaccion = "BEGIN;"; /////////iniciar transaccion
	$finalizarTransaccion = "COMMIT;"; //////finalizar transaccion
	$deshacerTransaccion = "ROLLBACK;"; /////deshacer transaccion

	//mysqli_query($conex, "SET NAMES 'utf8', time_zone = 'America/La_Paz' ");
	$resultadoTransaccion = mysqli_query($conex, $iniciarTransaccion);
	foreach ($records as $record) {
		$codmarca = $record->codmarca;
		$codtipo = $record->codsubcategoria;
		$descripcion = $record->descripcion;
		$ubicacion = $record->ubicacion;
		$codbarra = $record->codbarra;
		$pc = $record->pc;
		$pv = $record->pv;
		$sql = " INSERT INTO producto (cod_tipop, cod_marca, descripcion, ubicacion, cod_barra, pc, pv, ACTIVO) " .
			" VALUES ($codtipo ,$codmarca , '$descripcion', '$ubicacion', '$codbarra', $pc, $pv, 1)";

		if ($resultado = mysqli_query($conex, $sql)) {
			$id = mysqli_insert_id($conex);
			/*INSERT INTO stock (cod_producto, cantidad_disponible, COD_SUCURSAL)
			SELECT 8000, 1, A.COD_SUCURSAL from sucursal A WHERE A.ACTIVO = 1*/
			$sql = " INSERT INTO stock (cod_producto, cantidad_disponible, COD_SUCURSAL) " .
				" SELECT $id ,0, A.COD_SUCURSAL from sucursal A WHERE A.ACTIVO = 1";

			if ($resultado = mysqli_query($conex, $sql)) {
				$sql3 = " INSERT INTO bitacora_producto (`cod_producto`, `tipo`, `personal`, `fecha`, COD_SUCURSAL) " .
					" VALUES ($id ,'A',$idpersonal, NOW(), $idsuc)";
					
				$resultado3 = mysqli_query($conex, $sql3);
			} else {
				$variableControlTransaccion = false;
				$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
				echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 2", id:1}}';
				exit;
			}
		} else {
			$variableControlTransaccion = false;
			$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
			echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 1", id:1}}';
			exit;
		}
	}

	if ($variableControlTransaccion == true) {
		$resultadoTransaccion = mysqli_query($conex, $finalizarTransaccion);
		echo "{success: true}";
		exit;
	} else {
		$variableControlTransaccion = false;
		$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
		echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 3", id:1}}';
		exit;
	}
