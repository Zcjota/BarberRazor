<?php
	include '../lib/conex.php';
	include '../lib/session.php';

	$idpersonal = 0;
	$idsuc = 0;
	if (VerificaSessionBD() == false) {
		echo '{success:false, errors:{reason:"Estimado usuario su session finalizo, para no perder los datos debe loguearse de nuevo.", id:99}}';
		exit;
	} else {
		$idpersonal = $_SESSION['IdPersonal'];
		$idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
	}
	if (VerificaConBD()) {
		echo "No se puede conectar con la base de datos";
		exit;
	}
	
	// ///////////////////////DATOS RECIBO
	$codpropietario = isset($_POST['cbpropietario']) ? $_POST['cbpropietario'] : 0;
	$cliente = isset($_POST['cliente']) ? $_POST['cliente'] : 0;
	$codpropietario = $codpropietario != '' ? $codpropietario : 0;
	$nit = isset($_POST['nit']) ? $_POST['nit'] : '';
	$nacimiento = isset($_POST['nacimiento']) ? $_POST['nacimiento'] : '';
	$razonsocial = isset($_POST['razonsocial']) ? $_POST['razonsocial'] : '';
	$total_servicio = isset($_POST['subtotalS']) ? $_POST['subtotalS'] : 0;
	$totalbs = isset($_POST['totalST']) ? $_POST['totalST'] : 0;
	$pagobs = isset($_POST['montoSTB']) ? ($_POST['montoSTB'] == '' ? 0 : $_POST['montoSTB']) : 0;
	$pagous = isset($_POST['montoSTD']) ? ($_POST['montoSTD'] == '' ? 0 : $_POST['montoSTD']) : 0;
	$pagototalbs = isset($_POST['pagoST']) ? $_POST['pagoST'] : 0;
	$cambiobs = isset($_POST['cambioST']) ? $_POST['cambioST'] : 0;
	$tipopago = isset($_POST['idtp']) ? $_POST['idtp'] : 0;
	$pc = isset($_POST['pc']) ? $_POST['pc'] : 0;
	$comentario = isset($_POST['comentario']) ? $_POST['comentario'] : '';
	$usuario = $_SESSION['Usuario'];
	$ingresoIE = isset($_POST['ingresoIE']) ? $_POST['ingresoIE'] : 0; // 0 = ingreso interno y 1 igual a ingreso externo = recibo
	$registrosS = isset($_POST['registrosST']) ? $_POST['registrosST'] : '';
	$records = json_decode(stripslashes($registrosS));
	$controlcalidad = 0;
	$idrecibo = 0;

	$cod_ach = $_POST['cod_cach'] ?? 0;
	$coment_ach = $_POST['coment_ach'] ?? '';
	$cddescuento = $_POST['cddescuento'] ?? 0;
	$cddescuento = ($cddescuento=="") ? 0 : $cddescuento;

	/*************************************************************************** */
	$tipo_descuento = $_POST['tipo_descuento'] ?? 0;
	$registros_d = $_POST['registrosDT'] ?? '';
	$records_d = json_decode(stripcslashes($registros_d));
	$cod_personal_ds = $_POST['cod_personal_ds']??0;
	/************************************************************** */

	// exit;

	$conex = ConectarConBD();
	$variableControlTransaccion = true;
	$iniciarTransaccion = "BEGIN;"; /////////iniciar transaccion
	$finalizarTransaccion = "COMMIT;"; //////finalizar transaccion
	$deshacerTransaccion = "ROLLBACK;"; /////deshacer transaccion

	$resultadoTransaccion = mysqli_query($conex, $iniciarTransaccion);
	/// agregado jr
	$gest = date('Y');
	function traercomision($codper, $codtiposerv) {
		global $conex;
		$sqlcomison = "SELECT B.cod_comision FROM personal A INNER JOIN comision_barbero B ON A.cod_tb = B.cod_tb WHERE A.ACTIVO = 1 AND B.ACTIVO = 1 and A.cod_personal = $codper AND B.cod_ts = $codtiposerv";
		$res = mysqli_query($conex, $sqlcomison);
		$contc = 0;
		$idcomision = 0;
		while ($rowcomision = mysqli_fetch_array($res)) {
			$idcomision = $rowcomision["cod_comision"];
		}
		return $idcomision;
	}
	function actualizarCantCorte($codcliente) {
		global $conex;
		$sql = "update propietario set cant_corte = cant_corte + 1 where cod_propietario = $codcliente";
		$res = mysqli_query($conex, $sql);
	}
	switch ($ingresoIE) {
		case '1':
			$resultG = mysqli_query($conex, "select nro from recibo where creacion >='$gest" . "-01-01' order by cod_recibo DESC limit 1"); //validacion para cambio de gestion
			$rowNroG = mysqli_fetch_array($resultG);
			$nroG = $rowNroG['nro'] + 1;
			//implementacion para editar campos de cliente jr
			$sqlActualizarPropietario = "UPDATE propietario SET nit='$nit', nacimiento='$nacimiento',
			 nombre_factura='$razonsocial' WHERE cod_propietario=$codpropietario";
			
			if ($resultado0 = mysqli_query($conex, $sqlActualizarPropietario)) 
			{

			$sql = "INSERT INTO recibo(cod_propietario, nit, razonsocial, nro, totalbs, pagobs, pagous, pagototalbs, cambiobs, 
				tipo_pago, pc, comentario, cod_personal, usuario, creacion, ACTIVO, cod_cach, fecha_ach, coment_ach, estado_ach)
				VALUES($codpropietario, '$nit', '$razonsocial', $nroG, $totalbs, $pagobs, $pagous, $pagototalbs, $cambiobs, 
				$tipopago, $pc, '$comentario', $idpersonal, '$usuario', NOW(), 1, $cod_ach, NOW(), '$coment_ach', 1)
			";

			if ($resultado = mysqli_query($conex, $sql)) { //inserto recibo
				$idrecibo = mysqli_insert_id($conex);
				$cont_control_ficha = 0;
				$idficha = 0;
				foreach ($records as $record) {
					$tipoingreso = $record->tipoingreso;
					if ($tipoingreso == 1) { ////////////////////SERVICIO
						$controlcalidad = 1;
						$codigo = $record->codigo; //codtiposervicio
						$personal = $record->personal;
						$tiposervicio = $record->tiposervicio;
						$precio = $record->precio;
						$cant = $record->cant;
						$servicio = $record->servicio;
						$descuento = $record->descuento;
						$total = $record->total;
						$fidelizacion = ($record->codfidelizacionservicio == '') ? 0 : $record->codfidelizacionservicio;
						$idcomision = traercomision($personal, $codigo);
						$sql = "INSERT INTO `ficha_servicio`(`cod_propietario`, `fecha_creacion`, `fecha_servicio`, `estado_pago`, `total`, `total_pagado`, `nro_ficha`, COD_SUCURSAL, `ACTIVO`, `cd_descuento`)
									VALUES ($codpropietario, NOW(), NOW(), 1, $total_servicio, $total_servicio, $nroG, $idsuc, 1, $cddescuento)";
						if ($cont_control_ficha == 0) {
							actualizarCantCorte($codpropietario);
							$cont_control_ficha++;
							if ($resultado = mysqli_query($conex, $sql)) { //genera ficha cliente
								$idficha = mysqli_insert_id($conex);
								$sql2 = "INSERT INTO `detalle_servicio`( `cod_fs`, `cod_ts`, `cod_personal`, `cod_comision`, `precio`, `cant`, `descuento`, `total`, `ACTIVO`,`cod_fidelizacion`)
												VALUES ($idficha, $codigo, $personal,$idcomision, $precio, $cant, $descuento, $total,1,$fidelizacion)";
								echo "/*$sql2*/";
								if ($resultado2 = mysqli_query($conex, $sql2)) { //genera detalle ficha cliente
									$sql3 = " insert INTO ingreso(`cod_recibo`, `cod_fs`, `cod_ts`, `nro_ficha`, `fecha`, `cliente`, " .
										"`2nivel`, `3nivel`, `cantidad`, `precio`, `descuento`, `total`, `pago`, `tipo_pago`, `tipo_ingreso`, COD_SUCURSAL, `ACTIVO`)" .
										" VALUES($idrecibo, $idficha, $codigo, $nroG, NOW(), '$cliente', " .
										"'$tiposervicio','$servicio', $cant, $precio, $descuento, $total, $total, $tipopago, $tipoingreso, $idsuc, 1)";
									//echo "/*$sql3*/";
									if ($resultado3 = mysqli_query($conex, $sql3)) { //INSERTO EL INGRESO
										$idIngreso = mysqli_insert_id($conex);
										if($cod_personal_ds > 0){
											$sql_d = " insert into control_descuento(cod_fs, tipo, fecha, otorgado_a, acreditado_por, tipo_descuento, subtotal, descuento, total, motivo, ACTIVO)
												values($idIngreso, 1, NOW(), $codpropietario, $cod_personal_ds, 1, $precio*$cant, $descuento, $total, 'Descuento de los Servicios', 1) ";
											if($resultado_d = mysqli_query($conex, $sql_d)){

											} else {
												$variableControlTransaccion = false;
												$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
												echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 5s", id:1}}';
												exit;
											}
										}
									} else {
										$variableControlTransaccion = false;
										$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
										echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 4", id:1}}';
										exit;
									}
								} else {
									$variableControlTransaccion = false;
									$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
									echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 3a", id:1}}';
									exit;
								}
							} else {
								$variableControlTransaccion = false;
								$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
								echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 2", id:1}}';
								exit;
							}
						} else {
							$sql2 = "INSERT INTO `detalle_servicio`( `cod_fs`, `cod_ts`, `cod_personal`, `cod_comision`, `precio`, `cant`, `descuento`, `total`, `ACTIVO`,`cod_fidelizacion`)
								VALUES ($idficha, $codigo, $personal, $idcomision, $precio, $cant, $descuento, $total,1,$fidelizacion)";
							if ($resultado2 = mysqli_query($conex, $sql2)) { //genera detalle ficha cliente
								$sql3 = " insert INTO ingreso(`cod_recibo`, `cod_fs`, `cod_ts`, `nro_ficha`, `fecha`, `cliente`, " .
									"`2nivel`, `3nivel`, `cantidad`, `precio`, `descuento`, `total`, `pago`, `tipo_pago`, `tipo_ingreso`, COD_SUCURSAL, `ACTIVO`)" .
									" VALUES($idrecibo, $idficha, $codigo, $nroG, NOW(), '$cliente', " .
									"'$tiposervicio','$servicio', $cant, $precio, $descuento, $total, $total, $tipopago, $tipoingreso, $idsuc, 1)";
								//echo "/*$sql3*/";
								if ($resultado3 = mysqli_query($conex, $sql3)) { //INSERTO EL INGRESO
								} else {
									$variableControlTransaccion = false;
									$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
									echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 4", id:1}}';
									exit;
								}
							} else {
								$variableControlTransaccion = false;
								$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
								echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 3d", id:1}}';
								exit;
							}
						}
					} else { //////////////////TIENDA
						$codigo = $record->codigo;
						$tipo = $record->tipo;
						$marca = $record->marca;
						$detalle = $record->detalle;
						$pv = $record->pv;
						$cantidad = $record->cantidad;
						$descuento = $record->descuento;
						$total = $record->total;
						$codbarra = $record->codbarra;
						// $sqlttt = " update inventario_fisico A inner join toma_inventario B on A.cod_tm = B.cod_tm set" .
						// 	" A.cant = A.cant - $cantidad " .
						// 	" where A.cod_producto = $codigo and B.estado = 0 AND A.COD_SUCURSAL = $idsuc";
						//$resultadottt = mysqli_query($conex, $sqlttt);
						$sql2 = " update stock set " .
							" cantidad_disponible = cantidad_disponible - $cantidad " .
							" where cod_producto = $codigo AND COD_SUCURSAL = $idsuc";
						if ($resultado2 = mysqli_query($conex, $sql2)) { //ACTUALIZO EL DETALLE SERVICIO
							$sql3 = " insert INTO ingreso(`cod_recibo`, `cod_producto`, `fecha`, `2nivel`, `3nivel`, `codigo`, `cantidad`, `precio`, `descuento`, " .
								"`total`, `pago`, `tipo_pago`, `tipo_ingreso`, `ACTIVO`, `cliente`,COD_SUCURSAL)" .
								" VALUES($idrecibo, $codigo, NOW(), '$marca','$detalle', '$codbarra', $cantidad, $pv, $descuento," .
								" $total, $total, $tipopago, $tipoingreso, 1, '$cliente', $idsuc)";
							if ($resultado3 = mysqli_query($conex, $sql3)) { //INSERTO EL INGRESO
								$idIngreso = mysqli_insert_id($conex);
								if($descuento > 0){
									foreach($records_d as $record_d){
										$cod_producto = $record_d->cod_producto;
										$otorgado = $record_d->cod_otorgado_a;
										$acreditado = $record_d->cod_acreditado_por;
										$subtotal_d = $record_d->total;
										$tipo_descuento = $record_d->tipo_descuento;
										$descuento_d = $record_d->descuento;
										$total_d = $record_d->saldo;
										$motivo_d = $record_d->motivo;
										if($cod_producto == $codigo){ /**** preguntamos si el cod del producto es igual a array del descuento que se le esta asignando. */
											$sql_d = " insert into control_descuento(cod_fs, tipo, fecha, otorgado_a, acreditado_por, tipo_descuento, subtotal, descuento, total, motivo, ACTIVO)
														values($idIngreso, 2, NOW(), $otorgado, $acreditado, $tipo_descuento, $subtotal_d, $descuento_d, $total_d, '$motivo_d', 1) ";
											if($resultado_d = mysqli_query($conex, $sql_d)){

											} else {
												$variableControlTransaccion = false;
												$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
												echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 5", id:1}}';
												exit;
											}
										}
									}
								}
							} else {
								$variableControlTransaccion = false;
								$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
								echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 4", id:1}}';
								exit;
							}
						} else {
							$variableControlTransaccion = false;
							$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
							echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 3f", id:1}}';
							exit;
						}
					}
				}
			} 
		}else {
				$variableControlTransaccion = false;
				$resultadoTransaccion = mysqli_query($conex, $deshacerTransaccion);
				echo '{success:false, errors:{reason:"Error al guardar Datos. Codificacion 1", id:1}}';
				exit;
			}
		break;
	}
	if ($variableControlTransaccion == true) {
		if ($controlcalidad == 1) {
			$codper = 0;
			$codaux = 0;
			$codcliente = 0;
			$sql = "SELECT A.cod_recibo, A.cod_propietario, C.cod_fs, C.cod_ts, D.cod_servicio, C.cod_personal
				FROM recibo A
				INNER JOIN ingreso B ON A.cod_recibo = B.cod_recibo
				INNER JOIN detalle_servicio C ON C.cod_fs = B.cod_fs AND C.cod_ts = B.cod_ts
				INNER JOIN tipo_servicio D ON C.cod_ts = D.cod_ts
				WHERE A.cod_recibo = $idrecibo";
			$resultado0 = mysqli_query($conex, $sqlActualizarPropietario);
			$resultado = mysqli_query($conex, $sql);
			while ($row = mysqli_fetch_array($resultado)) {
				$codcliente = $row['cod_propietario'];
				if ($row['cod_servicio'] == '2') {
					$codper = $row['cod_personal'];
				} else {
					$codaux = $row['cod_personal'];
				}
			}
			$sql = " insert INTO control_calidad(`cod_recibo`, `cod_cliente`, `cod_barbero`, `cod_aux`, `fecha_corte`, `estado`, `ACTIVO`, `COD_SUCURSAL`)
				values($idrecibo, $codcliente, $codper, $codaux, NOW(), 0, 1, $idsuc)";
			$resultado = mysqli_query($conex, $sql);
		}
		$resultadoTransaccion = mysqli_query($conex, $finalizarTransaccion);
		echo "{success: true}";
		exit;
	}
	/*
	[{"id":"ext-record-145","codigo":"1","tipoingreso":1,"tiposervicio":"CORTE ADULTO","servicio":"BARBERIA"
	,"personal":"3","precio":"50","preciobk":"50","cant":2,"descuento":0,"total":100},{"id":"ext-record-146"
	,"codigo":"7","tipoingreso":1,"tiposervicio":"LAVADO SIMPLE","servicio":"AUXILIAR","personal":"4","precio"
	:"10","preciobk":"10","cant":1,"descuento":0,"total":10},{"id":"53","codigo":"53","tipo":"SIN CATEGORIA"
	,"marca":"LOREAL PARIS","detalle":"AMINEXIL ADVANCE ANTICAIDA ","pv":"40","cantidad":1,"descuento":0
	,"total":40,"tipoingreso":2,"codbarra":"","codcategoria":"1"}]
	*/
