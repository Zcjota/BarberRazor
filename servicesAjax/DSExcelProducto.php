<?php
	/*!
	* DSoft-TPMV
	* Copyright(c) 2012
	*/
	include "../lib/conex.php";

	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition:  filename=\"ReporteProductp.XLS\";");
	$buscar = isset($_REQUEST['buscar']) ? $_REQUEST['buscar'] : '';

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
		$sql_buscar = '';
	} else {
		$sql_buscar = " AND (A.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR B.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "'" .
		" OR C.descripcion LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))) . "')";
	}

	if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	function numConCeros($numeroOrig) {
		$res = "";
		if ($numeroOrig >= 10000) {$res = "" . $numeroOrig;return $res;}
		if ($numeroOrig >= 1000) {$res = "0" . $numeroOrig;return $res;}
		if ($numeroOrig >= 100) {$res = "00" . $numeroOrig;return $res;}
		if ($numeroOrig >= 10) {$res = "000" . $numeroOrig;return $res;}
		if ($numeroOrig >= 1) {$res = "0000" . $numeroOrig;return $res;}
	}
	$meses = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiempre', 'Octubre', 'Noviembre', 'Diciembre');
	$dias = array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "S�bado");
	
	$Encabezados = "<table border = 1>" .
		"		<tr>" .
		"			<th colspan='7'><font color = #00008B> REPORTE PRODUCTO </th> " .
		"		</tr>" .
		"		<tr>" .
		"			<th colspan='7'><font color = #00008B> Fecha :</font><font color = #2F4F4F > " . $dias[date('w')] . " " . date('d') . " de " . $meses[date('n') - 1] . " del " . date('Y') . " </th> " .
		"		</tr>" .
		"		<tr'>" .
		"			<td colspan='7' style='text-align:LEFT'> <b>Comentario:</b> </td> " .
		"		</tr>" .
		"		<tr> " .
		"			<th> <font color = 'blue'> CATEGORIA  </th> " .
		"			<th> <font color = 'blue'> SUBCATEGORIA </th> " .
		"			<th><font color = 'blue'> MARCA </th> " .
		"			<th><font color = 'blue'> DESCRIPCION </th> " .
		"			<th><font color = 'blue'> COD. BARRA </th> " .
		"			<th><font color = 'blue'> P.C. </th> " .
		"			<th><font color = 'blue'> P.V. </th> " .
		"		</tr>";
	$conex = ConectarConBD();
	mysqli_query($conex, "SET NAMES 'utf8'");

	$sql = ' SELECT A.*, B.descripcion as marca, C.cod_tipop, C.descripcion as tipo, D.cod_categoria, D.descripcion as categoria from producto A' .
		' inner join marca_producto B on A.cod_marca = B.cod_marca' .
		' inner join tipo_producto C on A.cod_tipop = C.cod_tipop' .
		' inner join categoria_producto D on C.cod_categoria = D.cod_categoria' .
		' WHERE A.ACTIVO = 1' . $sql_buscar .
		' ORDER BY D.descripcion ASC, C.descripcion ASC, B.descripcion ASC, A.descripcion ASC ';

	$Registros = '';
	$estadoColor = true;
	$data = array();
	$resultado = mysqli_query($conex, $sql);
	while ($row = mysqli_fetch_array($resultado)) {
		$color = '';
		if ($estadoColor == true) {
			$color = '#CDCDCD';
			$estadoColor = false;
		} else {
			$color = '#FFFFFF';
			$estadoColor = true;
		}
		$Registros = $Registros .
			"	<tr align='center' valign='middle' > " .
			"		<td bgcolor='$color'> " . mb_strtoupper($row['categoria']) . " </th>" .
			"		<td bgcolor='$color'> " . mb_strtoupper($row['tipo']) . " </td>" .
			"		<td bgcolor='$color'> " . mb_strtoupper($row['marca']) . " </td>" .
			"		<td bgcolor='$color'> " . mb_strtoupper($row['descripcion']) . " </td>" .
			"		<td bgcolor='$color'> " . $row['cod_barra'] . " </td>" .
			"		<td bgcolor='$color'> " . ($row['pc'] > 0 ? $row['pc'] : '') . " </td>" .
			"		<td bgcolor='$color'> " . ($row['pv'] > 0 ? $row['pv'] : '') . " </td>" .
			"	</tr>";
	}

	echo $Encabezados . $Registros . '</table>';
