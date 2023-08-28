<?php
	include "../lib/conex.php";
	include '../lib/session.php';

	$codproveedor = isset($_POST['cbproveedor']) ? $_POST['cbproveedor'] : 0;
	$codpersonal = isset($_POST['codpersonal']) ? $_POST['codpersonal'] : 0;
	$fechar = isset($_POST['fechaR']) ? $_POST['fechaR'] : ''; //fecha de recepcion
	$hora = isset($_POST['hora']) ? $_POST['hora'] : ''; //hora de recepcion
	$comentario = isset($_POST['comentario']) ? $_POST['comentario'] : '';
	$registros = isset($_POST['registros']) ? $_POST['registros'] : '';
	$records = json_decode(stripslashes($registros));
	$gestion = isset($_POST['gestion']) ? $_POST['gestion'] : 0;
	
	$ids = 0;
	if (VerificaSessionBD() == false) {
		echo '{"Success": false, "errors":{"reason": "Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo."}}';
		exit;
	} else {
		$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	//
	// $numero = NuevoNumero($tipodoc, $sucursal, $periodo, $gestion);
	$numg = NuevoNumeroGlobal($gestion, $idsuc);
	$nump = NuevoNumeroProveedor($gestion, $codproveedor, $idsuc);
	// $sql = "INSERT INTO `recepcion_producto` (fecha, fecha_recep, hora, cod_proveedor, comentario, nro_global, nro_proveedor, ACTIVO, COD_SUCURSAL)" .
	// 	" VALUES ('$fechar','$fechar', '$hora', $codproveedor, '$comentario', $numg, $nump, 1,$idsuc)";
	$sql = "INSERT INTO `recepcion_producto` (fecha, fecha_recep, hora, cod_personal, cod_proveedor, comentario, nro_global, nro_proveedor, ACTIVO, COD_SUCURSAL)" .
	" VALUES ('$fechar','$fechar', '$hora', $codpersonal, $codproveedor, '$comentario', $numg, $nump, 1,$idsuc)";
	// echo "/*$sql*/";
	if ($resultado = mysqli_query($conex, $sql)) {
		$codrp = mysqli_insert_id($conex); //codigo recepcion producto
		$aux = 1;
		if ($records != '') {
			foreach ($records as $record) {
				$codproducto = $record->codigo;
				$cant = $record->cant;
				$venc = $record->venc;
				$sqlreg = "INSERT INTO `detalle_rp` (cod_rp, cod_producto, cant, fecha_vencimiento, ACTIVO)" .
					" VALUES ($codrp, $codproducto, $cant, '$venc',1)";

				if ($resultadoreg = mysqli_query($conex, $sqlreg)) {
					// $aux = 1;
					// if ($origen == 'ING')
					AumentarStock($codproducto, $cant, $idsuc);
					// else
					// {
					// $cant = 0 - $record -> cant;
					// AumentarStock($record -> codigo, $cant, $sucursal);
					// }
				}
			}
		}
	} else {
		$aux = 0;
	}

	if ($aux == 1) {
		echo '{"success":true}';
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
	////////////////////////////////////////////////////////////////////////////**************FUNCIONES******************///////////////////////////////////////////////////////////////////////////////////
	function str2date($in)	{
		$t = explode("/", $in);
		if (count($t) != 3) {
			$t = explode("-", $in);
		}
		if (count($t) != 3) {
			$t = explode(" ", $in);
		}
		if (count($t) != 3) {
			return -1;
		}
		if (!is_numeric($t[0])) {
			return -1;
		}
		if (!is_numeric($t[1])) {
			return -2;
		}
		if (!is_numeric($t[2])) {
			return -3;
		}
		if ($t[2] < 1902 || $t[2] > 2037) {
			return -3;
		}
		return mktime(0, 0, 0, $t[1], $t[0], $t[2]);
	}

	function AumentarStock($codproducto, $cantidad, $idsuc)	{
		global $conex;
		$sql = "SELECT cod_producto FROM `stock` WHERE COD_SUCURSAL = $idsuc and cod_producto = " . $codproducto;
		$resultado = mysqli_query($conex, $sql);
		$row = mysqli_fetch_array($resultado);
		if (mysqli_num_rows($resultado) > 0) {
			$sqls = ' UPDATE stock A inner join producto B on A.cod_producto = B.cod_producto set A.control_vigencia = 0, B.estado = 1, A.cantidad_disponible = A.cantidad_disponible + ' . $cantidad .
				"  WHERE A.COD_SUCURSAL = $idsuc AND A.cod_producto = " . $codproducto;
			// echo "/*$sqls*/";
		} else {
			$sqls = 'INSERT INTO stock (cod_producto, cantidad_disponible, COD_SUCURSAL)' .
				'VALUES(' . $codproducto . ',' . $cantidad . ',' . $idsuc . ')';
		}
		$resultadosk = mysqli_query($conex, $sqls);
	}

	function NuevoNumeroGlobal($gest, $idsuc){
		global $conex;
		$sql = ' SELECT nro_global FROM `recepcion_producto` WHERE COD_SUCURSAL = ' . $idsuc . ' and YEAR(fecha_recep) = ' . $gest . ' ORDER BY nro_global DESC LIMIT 0,1';
		// echo "/**$sql**/";
		$resultado = mysqli_query($conex, $sql);
		$row = mysqli_fetch_array($resultado);

		if (mysqli_num_rows($resultado) > 0) {
			$nuevo = $row['nro_global'] + 1;
		} else {
			$nuevo = 1;
		}
		return $nuevo;
	}

	function NuevoNumeroProveedor($gest, $codprov, $idsuc)	{
		global $conex;
		$sql = ' SELECT nro_proveedor FROM `recepcion_producto` WHERE COD_SUCURSAL = ' . $idsuc . ' and YEAR(fecha_recep) = ' . $gest . ' and cod_proveedor = ' . $codprov . ' ORDER BY nro_proveedor DESC LIMIT 0,1';
		// echo "/**$sql**/";
		$resultado = mysqli_query($conex, $sql);
		$row = mysqli_fetch_array($resultado);
		if (mysqli_num_rows($resultado) > 0) {
			$nuevo = $row['nro_proveedor'] + 1;
		} else {
			$nuevo = 1;
		}
		return $nuevo;
	}
