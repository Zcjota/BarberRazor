<?php     
	include("../lib/conex.php");
	header("Content-type: application/vnd.ms-excel");
	header("Content-Disposition:  filename=\"ReporteIngreso.XLS\";");
	$fechai = isset($_REQUEST['fechai'])?$_REQUEST['fechai']:Date('Y-m-d');
	$fechaf = isset($_REQUEST['fechaf'])?$_REQUEST['fechaf']:Date('Y-m-d');
	$sql_buscarF = " AND A.fecha BETWEEN  '$fechai 00:00:00' AND '$fechaf 23:59:59' ";					 

	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) 
	{
	   $sql_buscar = '';
	} 
	else 
	{
		$sql_buscar = " AND A.2nivel LIKE '" . str_replace('*', '%', trim(strtoupper($buscar))). "'";					 
	}	  	
	
	include('../lib/session.php');	
    $idsuc = 0;
    if (VerificaSessionBD()==false)
    {	
        echo 'Estimado usuario su session finalizo, debe loguearse de nuevo.';		
            exit;
    }else{
        $idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
    }
	if (VerificaConBD()){	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
		exit;
	}
	$conex = ConectarConBD();
	$Registros = $Registros . "<tr align='center'>";
	$Registros = $Registros ."<td>SUCURSAL</td>"
							."<td>FECHA</td>"
							."<td>FICHA</td>"
							."<td>CELULAR</td>"
							."<td>CLIENTE</td>"
							."<td>CONCEPTO</td>"
							."<td>DETALLE</td>"
							."<td>PERSONAL</td>"
							."<td>CODIGO</td>"
							."<td>CANTIDAD</td>"
							."<td>PRECIO</td>"
							."<td>SUBTOTAL</td>"
							."<td>DESCUENTO %</td>"
							."<td>TOTAL</td>"
							."<td>TIPO DE PAGO</td>";
	$Registros = $Registros . "</tr>";	

	$sql =  ' SELECT A.cod_ingreso as codingreso, S.DESCRIPCION AS 	SUCURSAL, A.*, B.fecha_servicio, C.comentario, CURDATE() as fa, D.celular, CONCAT(F.nombre, " ", F.app," ", F.apm) as personal from ingreso A '.
			' left join ficha_servicio B on A.cod_fs = B.cod_fs' .
			' left join recibo C on A.cod_recibo = C.cod_recibo' .
			' left join propietario D on B.cod_propietario = D.cod_propietario' .
			' left join detalle_servicio E on A.cod_fs = E.cod_fs AND A.cod_ts = E.cod_ts' .
			' left join personal F on E.cod_personal = F.cod_personal' .
			' left join sucursal S on A.COD_SUCURSAL = S.COD_SUCURSAL' .
			' WHERE A.ACTIVO = 1 AND A.COD_SUCURSAL =  '. $idsuc . $sql_buscar . $sql_buscarF .
			' ORDER BY A.fecha DESC ';
 //echo "/*$sql*/";
 mysqli_query($conex, "SET NAMES 'utf8', SQL_BIG_SELECTS=1");

	$resultado=mysqli_query($conex, $sql);
	$data = array();     
	$cont =0;	
	while ($row = mysqli_fetch_array($resultado)) 
	{		
		$tipopago;
		$codigo = $row['codigo'];
		switch($row['tipo_pago']){
			case 1:
				$tipopago = 'EFECTIVO';
			break;
			case 2:
				$tipopago = 'TRANSFERENCIA';
			break;
			case 3:
				$tipopago = 'TARJETA';
			break;
			case 4:
				$tipopago = 'CHEQUE';
			break;
		}
		if($row['cod_ts'] == 4){
			//$sqlb = ;
			$row2 = mysqli_fetch_array(mysqli_query($conex, "select cod_barra from producto where cod_producto=" . $row['cod_producto']));
			$codigo = $row2['cod_barra'];
		}
		$Registros = $Registros . "<tr>";
		$Registros = $Registros ."<td>".$row['SUCURSAL']."</td>"
								."<td>".$row['fecha']."</td>"
								."<td>".($row['nro_ficha']==0?'':$row['nro_ficha'])."</td>"
								."<td>".$row['celular']."</td>"
								."<td>".$row['cliente']."</td>"
								."<td>".$row['2nivel']."</td>"
								."<td>".$row['3nivel']."</td>"
								."<td>".$row['personal']."</td>"
								."<td>".$codigo."</td>"
								."<td align='right'>".$row['cantidad']."</td>"
								."<td align='right'>".$row['precio']."</td>"
								."<td align='right'>".number_format($row["cantidad"]*$row["precio"],2)."</td>"
								."<td align='right'>".$row['descuento']."</td>"
								."<td align='right'>".$row['total']."</td>"
								."<td>".$tipopago."</td>";
		$Registros = $Registros . "</tr>";
	}		
	echo "<table border = 1>" .$Registros . '</table>';
	
?> 