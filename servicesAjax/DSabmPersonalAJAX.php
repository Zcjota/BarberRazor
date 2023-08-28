<?php
	include "../lib/conex.php";
	$nombre = mb_strtoupper("'" . strtoupper($_POST["txtnombre"]) . "'", 'utf8');
	$app = mb_strtoupper("'" . strtoupper($_POST["txtapp"]) . "'", 'utf8');
	$apm = mb_strtoupper("'" . strtoupper($_POST["txtapm"]) . "'", 'utf8');
	$nit = "'" . strtoupper($_POST["txtnit"]) . "'";
	$fecha_ingreso = "'" . date("Y/m/d", str2date($_POST["tfechaI"])) . "'";
	$cod_cargo = "'" . strtoupper($_POST["cbcargo"]) . "'";
	$cod_comision = "'" . strtoupper($_POST["cbcomision"]) . "'";
	$op = $_REQUEST["opcion"];
	$codigo = "'" . $_REQUEST["codigo"] . "'";
	$codsys = "'" . $_REQUEST["txtcodsys"] . "'";
	$horario = mb_strtoupper("'" . $_REQUEST["txthorario"] . "'", 'utf8');
	$sueldo = "'" . $_REQUEST["txtsueldo"] . "'";

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	switch ($op) {
		case "0":
			{
				$sql = " INSERT INTO`personal` (`nombre`,`app`,`apm`,`cod_cargo`,`cod_tb`,`fecha_ingreso`,`nit`,`codigo_sistema`,`horario`,`sueldo_bs`,`ACTIVO`) " .
					" VALUES ($nombre ,$app, $apm, $cod_cargo, $cod_comision, $fecha_ingreso, $nit, $codsys, $horario, $sueldo, 1)";
				break;
			}
		case "1":
			{
				$sql = ' UPDATE `personal` SET' .
					' nombre = ' . $nombre .
					', app = ' . $app .
					', apm = ' . $apm .
					', nit = ' . $nit .
					', fecha_ingreso = ' . $fecha_ingreso .
					', cod_cargo = ' . $cod_cargo .
					', cod_tb = ' . $cod_comision .
					', codigo_sistema = ' . $codsys .
					', horario = ' . $horario .
					', sueldo_bs = ' . $sueldo .
					' WHERE cod_personal = ' . $codigo;
				break;
			}
	}
	mysqli_query($conex, "SET NAMES 'utf8'");
	if ($resultado = mysqli_query($conex, $sql)) {
		echo "{success: true}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
	
	function str2date($in)
	{
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
