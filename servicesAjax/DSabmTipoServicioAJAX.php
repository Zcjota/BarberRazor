<?php
	include "../lib/conex.php";

	$nombre_ts = strtoupper($_POST['nombre_ts'] ?? "");
	$cbservicio_ts = $_POST['cbservicio_ts'] ?? 0;
	$cbtipoprecio_ts = $_POST['cbtipoprecio_ts'] ?? 0;
	$orden_ts = $_POST['orden_ts'] ?? 0;
	$precio_ts = $_POST['precio_ts'] ?? 0;
	$op = $_POST['opcion'] ?? 0;
	$codigo = $_POST['codigo'] ?? 0;

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	//agregado 2023
	$conex = ConectarConBD();
	switch ($op) {
		case "0":
			{
				$sql = " INSERT INTO `tipo_servicio` (`cod_servicio`, `nombre`, `tipo_precio`, `precio`, `orden`, `ACTIVO`)
							values ($cbservicio_ts,'$nombre_ts',$cbtipoprecio_ts, $precio_ts, $orden_ts, 1)";

				break;
			}
		case "1":
			{
				$sql = " UPDATE `tipo_servicio` SET
					nombre = '$nombre_ts'
					, cod_servicio = $cbservicio_ts
					, tipo_precio = $cbtipoprecio_ts
					, precio = $precio_ts
					, orden = $orden_ts
					WHERE cod_ts = $codigo";
				break;
			}
	}
	// echo "/*$sql*/";
	mysqli_query($conex, "SET NAMES 'utf8'");
	if ($resultado = mysqli_query($conex, $sql)) {
		echo "{success: true}";
	} else {
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}
