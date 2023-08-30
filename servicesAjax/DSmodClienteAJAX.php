<?PHP
	include "../lib/conex.php";
	include '../lib/session.php';

	$codigo = $_REQUEST['codigo'] ?? 0;
	$txtnombre_mc = mb_strtoupper($_POST['txtnombre_mc'] ?? '', "utf-8");
	$txtapp_mc = mb_strtoupper($_POST['txtapp_mc'] ?? '', "utf-8");
	$txtapm_mc = mb_strtoupper($_POST['txtapm_mc'] ?? '', "utf-8");
	$txttelefono_mc = $_POST['txttelefono_mc'] ?? '';
	$txtcelular_mc = $_POST['txtcelular_mc'] ?? $_POST['txtcelular1_mc'];
	$txtdetalledir_mc = mb_strtoupper($_POST['txtdetalledir_mc'] ?? '', "utf-8");
	$txtcorreo_mc = $_POST['txtcorreo_mc'] ?? '';
	$txtnombrefactura_mc = mb_strtoupper($_POST['txtnombrefactura_mc'] ?? '', "utf-8");
	$txtrefcorte_mc = mb_strtoupper($_POST['txtrefcorte_mc'] ?? '', "utf-8");
	$txtnit_mc = mb_strtoupper($_POST['txtnit_mc'] ?? '', "utf-8");
	$cbbarbero1_mc = $_POST['cbbarbero1_mc'] ?? 0;
	if ($cbbarbero1_mc == "") {
		$cbbarbero1_mc = 0;
	}
	$cbbarbero2_mc = $_POST['cbbarbero2_mc'] ?? 0;
	if ($cbbarbero2_mc == "") {
		$cbbarbero2_mc = 0;
	}

	/**
	 * datos del tipo publicidad y del niño
	 */
	$cod_tp = $_POST['cbtipopublicidad'] ?? 0;
	$adulto = $_POST['idtp'] ?? 1;
	$edad = $_POST['edad'] ?? 0;

	$txtFechaNacimiento_mc = $_POST['txtFechaNacimiento_mc'] ?? '';

	$idpersonal = 0;
	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		echo '{"Success": false, "errors":{"reason": "Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo."}}';
		exit;
	} else {
		$idpersonal = $_SESSION['IdPersonal'];
		$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}

	if (VerificaConBD()) {echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql_b = "SELECT * from propietario where celular = '$txtcelular_mc' AND cod_propietario!=$codigo";
	$resultado_b = mysqli_query($conex, $sql_b);
	$cont = 0;
	$cod_vinculacion = 0;
	while ($row = mysqli_fetch_array($resultado_b)) {
		$cont ++;
		if($adulto == 1){
			echo '{success:false, errors:{reason:"El Código Celular ya se Encuentra Registrado, pertenece a ' . strtoupper($row['nombre'] . ' ' . $row['app'] . ' ' . $row['apm']) . '", id:1}}';
			exit;
		} else{
			$cod_vinculacion = $row['cod_propietario'];
			$i=1;
			while($i <= 100){
				$sql_c = "SELECT * from propietario where celular = '$txtcelular_mc-$i'";
				// echo "/*$sql_c*/";
				$resultado_c = mysqli_query($conex, $sql_c);
				if (mysqli_num_rows($resultado_c) > 0) {
					$i++;
				} else{
					$txtcelular_mc = $txtcelular_mc.'-'.$i;
					break;
				}
			}
		}
	}

	$variableControlTransaccion = true;
	$iniciarTransaccion = "BEGIN;"; /////////iniciar transaccion
	$finalizarTransaccion = "COMMIT;"; //////finalizar transaccion
	$deshacerTransaccion = "ROLLBACK;"; /////deshacer transaccion

	$resultadoTransaccion = mysqli_query($conex, $iniciarTransaccion);
	/// agregado jr

	$idpropietario = $codigo;
	$sql = " UPDATE propietario SET
		nombre = '$txtnombre_mc',
		app = '$txtapp_mc',
		apm = '$txtapm_mc',
		celular = '$txtcelular_mc',
		nombre_factura = '$txtnombrefactura_mc',
		nit = '$txtnit_mc',
		nacimiento = '$txtFechaNacimiento_mc',
		barbero_princ = $cbbarbero1_mc,
		ref_corte = '$txtrefcorte_mc',
		cod_tp = $cod_tp,
		adulto = $adulto,
		edad = $edad, 
		cod_vinculacion = $cod_vinculacion
		WHERE cod_propietario = $codigo
	";
	// echo "/*$sql*/";
	if ($resultado = mysqli_query($conex, $sql)) {
		$sql_v = "SELECT *from propietario where cod_vinculacion=$codigo";
		$resultado_v = mysqli_query($conex, $sql_v);
		while ($row_v = mysqli_fetch_array($resultado_v)) {
			$i=1;
			while($i <= 100){
				$sql_c = "SELECT * from propietario where celular = '$txtcelular_mc-$i'";
				// echo "/*$sql_c*/";
				$resultado_c = mysqli_query($conex, $sql_c);
				if (mysqli_num_rows($resultado_c) > 0) {
					$i++;
				} else{
					$cel = $txtcelular_mc.'-'.$i;
					$sql_vv = "UPDATE propietario set celular = '$cel' where cod_propietario = ".$row_v['cod_propietario'];
					// echo "/*$sql_vv*/";
					$resultado_vv = mysqli_query($conex, $sql_vv);
					break;
				}
			}
		}
		$sql = " INSERT into bitacora_cliente(cod_propietario, cod_personal, fecha, tipo, ACTIVO, COD_SUCURSAL)
			values($codigo, $idpersonal, NOW(), 'M',1, $idsuc)
		";
		if ($resultado = mysqli_query($conex, $sql)) {
			$resultadoTransaccion = mysqli_query($conex, $finalizarTransaccion);
			echo "{success: true}";
			exit;
		} else {
			$variableControlTransaccion = false;
			$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
			echo '{success:false, errors:{reason:"Error en la bitacora", id:1}}';
			exit;
		}
	} else {
		$variableControlTransaccion = false;
		$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
		echo '{success:false, errors:{reason:"Error al guardar Datos. Area Propietario", id:1}}';
		exit;
	}
