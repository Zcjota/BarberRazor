<?php
	include "../lib/conex.php";
	include '../lib/session.php';

	$txtnombre_ac = mb_strtoupper($_POST['txtnombre_ac'] ?? '', "utf-8");
	$txtapp_ac = mb_strtoupper($_POST['txtapp_ac'] ?? '', "utf-8");
	$txtapm_ac = mb_strtoupper($_POST['txtapm_ac'] ?? '', "utf-8");
	$txttelefono_ac = $_POST['txttelefono_ac'] ?? '';
	$txtcelular_ac = $_POST['txtcelular_ac'] ?? '';
	$txtcorreo_ac = $_POST['txtcorreo_ac'] ?? '';
	$txtnombrefactura_ac = mb_strtoupper($_POST['txtnombrefactura_ac'] ?? '', "utf-8");
	$txtnit_ac = mb_strtoupper($_POST['txtnit_ac'] ?? '', "utf-8");
	$cbbarbero1 = $_POST['cbbarbero1'] ?? 0;
	if ($cbbarbero1 == "") {
		$cbbarbero1 = 0;
	}
	$cbbarbero2 = $_POST['cbbarbero2'] ?? 0;
	if ($cbbarbero2 == "") {
		$cbbarbero2 = 0;
	}
	$txtdetalledir_ac = mb_strtoupper($_POST['txtdetalledir_ac'] ?? '', "utf-8");
	$txtrefcorte_ac = mb_strtoupper($_POST['txtrefcorte_ac'] ?? '', "utf-8");

	/**
	 * datos del tipo publicidad y del niño
	 */
	$cod_tp = $_POST['cbtipopublicidad'] ?? 0;
	$adulto = $_POST['idtp'] ?? 1;
	$edad = $_POST['edad'] ?? 0;
	
	$fechaNacimiento = $_POST['txtFechaNacimiento'] ?? '';

	$idpersonal = 0;
	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		echo '{"Success": false, "errors":{"reason": "Estimado usuario su sesión finalizó, para no perder los datos debe iniciar sesión nuevamente."}}';
		exit;
	} else {
		$idpersonal = $_SESSION['IdPersonal'];
		$idsuc = $_SESSION['Idsucursal'];
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la base de datos"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql_b = "SELECT * FROM propietario WHERE celular = '$txtcelular_ac' AND ACTIVO = 1";

	$resultado_b = mysqli_query($conex, $sql_b);
	$cont = 0;
	$cod_vinculacion = 0;
	while ($row = mysqli_fetch_array($resultado_b)) {
		$cont++;
		if ($adulto == 1) {
			echo '{success:false, errors:{reason:"El Código Celular ya se encuentra registrado, pertenece a ' . strtoupper($row['nombre'] . ' ' . $row['app'] . ' ' . $row['apm']) . '", id:1}}';
			exit;
		} else {
			$cod_vinculacion = $row['cod_propietario'];
			$i = 1;
			while ($i <= 100) {
				$sql_c = "SELECT * FROM propietario WHERE celular = '$txtcelular_ac-$i'";
				$resultado_c = mysqli_query($conex, $sql_c);
				if (mysqli_num_rows($resultado_c) > 0) {
					$i++;
				} else {
					$txtcelular_ac = $txtcelular_ac . '-' . $i;
					break;
				}
			}
		}
	}

	$variableControlTransaccion = true;
	$iniciarTransaccion = "BEGIN;";
	$finalizarTransaccion = "COMMIT;";
	$deshacerTransaccion = "ROLLBACK;";

	$resultadoTransaccion = mysqli_query($conex, $iniciarTransaccion);
	/// agregado jr

	$sql = "INSERT INTO propietario (nombre, app, apm, telefono, celular, mail, detalle_dir, nombre_factura, nit,
		barbero_princ, barbero_aux, ref_corte, ACTIVO, cod_tp, adulto, edad, cod_vinculacion, nacimiento)
		VALUES ('$txtnombre_ac', '$txtapp_ac', '$txtapm_ac', '$txttelefono_ac', '$txtcelular_ac', '$txtcorreo_ac', '$txtdetalledir_ac',
		'$txtnombrefactura_ac', '$txtnit_ac', $cbbarbero1, $cbbarbero2, '$txtrefcorte_ac', 1, $cod_tp, $adulto, $edad, $cod_vinculacion, '$fechaNacimiento')
	";

	if ($resultado = mysqli_query($conex, $sql)) {
		$codigo = mysqli_insert_id($conex);
		$sql = "INSERT INTO bitacora_cliente (`cod_propietario`, `cod_personal`, `fecha`, `tipo`, COD_SUCURSAL, `ACTIVO`)
			VALUES ($codigo, $idpersonal, NOW(), 'A', $idsuc, 1)
		";
		if ($resultado = mysqli_query($conex, $sql)) {
			$resultadoTransaccion = mysqli_query($conex, $finalizarTransaccion);
			echo "{success: true}";
			exit;
		} else {
			$variableControlTransaccion = false;
			$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
			echo '{success:false, errors:{reason:"Error en la bitácora", id:1}}';
			exit;
		}
	} else {
		$variableControlTransaccion = false;
		$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
		echo '{success:false, errors:{reason:"Error al guardar los datos del área Propietario", id:1}}';
		exit;
	}
?>
