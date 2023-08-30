<?php
	include "../lib/conex.php";

	$codigo = $_POST['id'];
	$usario = $_POST['usuario'];
	$memo = $_POST['memo'];
	$fecha = $_POST['fecha'];

	if (isset($codigo)) {
		if (VerificaConBD()) {
			echo '{"message":{"reason": "No se puede conectar con la BD",id:1}}';
			exit;
		}
		$conex = ConectarConBD();
		/// agregado jr

		$fechaarqueo = ultimoarqueo();
		if ($fecha > $fechaarqueo) {
			$sql = "UPDATE `ingreso` SET ACTIVO = 0, fecha_anu = NOW(), usuario_anu=$usario, memo_anu = '$memo' WHERE cod_ingreso = " . $codigo;

			if ($resultado = mysqli_query($conex, $sql)) {
				$sql = "UPDATE ingreso A INNER JOIN detalle_servicio B ON A.cod_fs = B.cod_fs SET B.ACTIVO = 0 WHERE A.cod_ingreso = " . $codigo;
				$resultado = mysqli_query($conex, $sql);
				echo '{"message":{"reason": "El proceso finalizo correctamente.",id:2}}';
				exit;
			} else {
				echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo.",id:1}}';
				exit;
			}
		} else {
			echo '{"message":{"reason": "El ingreso pertenece a un arqueo no se puede eliminar.",id:1}}';
			exit;
		}
	} else {
		echo '{"message":{"reason": "El proceso no finalizo correctamente, volver a intentarlo.",id:1}}';
		exit;
	}
	function ultimoarqueo() {
		global $conex;
		$sql = "SELECT A.fecha from arqueo A WHERE A.ACTIVO = 1 ORDER BY A.cod_arqueo DESC LIMIT 0,1";
		$resultado = mysqli_query($conex, $sql);
		$row = mysqli_fetch_array($resultado);
		return $row['fecha'];
	}
