<?php
	/*!
	* RAZOR
	* Copyright(c) 2023
	*/
	include "../lib/conex.php";
	$cod_perfil = isset($_POST['codperfil']) ? $_POST['codperfil'] : 0; // se cambio de '' a 0.
	$roles = isset($_POST['roles']) ? $_POST['roles'] : '';

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	$sql = ' SELECT A.COD_SUB_MENU AS CODS, A.DESCRIPCION AS SUBM, A.ACTIVO, A.COD_MENU AS CODM, B.DESCRIPCION AS MENU' .
		' FROM submenu A, menu B ' .
		' WHERE A.COD_MENU = B.COD_MENU AND A.ACTIVO =1 AND B.ACTIVO =1 ORDER BY A.COD_MENU ASC, A.DESCRIPCION ASC';

	$sqltram = 'SELECT DP.* FROM detalle_perfil DP WHERE ACTIVO = 1 AND DP.COD_TIPOU = ' . $cod_perfil;

	$data = array();
	$tick = 0;
	$comparacion = false;
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		$resTram = mysqli_query($conex, $sqltram);

		while ($rowConfig = mysqli_fetch_array($resTram)) {
			$rol = $rowConfig['ROL'];
			//echo $rowConfig['COD_SUB_MENU'];
			//echo $row['CODS'];
			if ($rowConfig['COD_SUB_MENU'] == $row['CODS']) {$comparacion = true;
				if ($roles == 'Modulo') {
					array_push($data, array("codigosub" => $row['CODS'],
						"nombresub" => $row['SUBM'],
						"codigomen" => $row['CODM'],
						"nombremen" => $row['MENU'],
						"ticket" => 1,
						"rol" => $roles,
					));
					$tick = 0;
				} else {
					if ($rol[0] == 1 && $roles == 'Alta') {$tick = 1;}
					if ($rol[1] == 1 && $roles == 'Baja') {$tick = 1;}
					if ($rol[2] == 1 && $roles == 'Modf') {$tick = 1;}
					if ($rol[3] == 1 && $roles == 'Selec') {$tick = 1;}
					if ($rol[4] == 1 && $roles == 'PDF') {$tick = 1;}
					if ($rol[5] == 1 && $roles == 'Excl') {$tick = 1;}
					array_push($data, array("codigosub" => $row['CODS'],
						"nombresub" => $row['SUBM'],
						"codigomen" => $row['CODM'],
						"nombremen" => $row['MENU'],
						"ticket" => $tick,
						"rol" => $roles,
					));
					$tick = 0;
				}
			}
		}
		if ($comparacion == false) {
			array_push($data, array("codigosub" => $row['CODS'],
				"nombresub" => $row['SUBM'],
				"codigomen" => $row['CODM'],
				"nombremen" => $row['MENU'],
				"ticket" => $tick,
				"rol" => $roles,
			));
		} else { $comparacion = false;}
	}

	$paging = array(
		'success' => true,
		'data' => $data
	);
	echo json_encode($paging);
