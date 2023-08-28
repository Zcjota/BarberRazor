<?php     
/*!
 * DSoft-TPMV
 * Copyright(c) 2011
 */ 
	include("../lib/conex.php");        	
	$buscar = isset($_POST['busqueda'])?$_POST['busqueda']:'';
	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) 
	{
	   $sql_buscar = '';
	} 
	else 
	{
		$sql_buscar = " AND (A.cod_marca = " . $buscar . ")";					
	}
	if (VerificaConBD())	
	{	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
		exit;
	}	

	$sql =  'SELECT A.*, B.descripcion as marca, C.cod_tipop, C.cod_categoria, C.descripcion as tipo FROM producto A '. 
			' inner join marca_producto B on A.cod_marca = B.cod_marca ' .
			' inner join tipo_producto C on A.cod_tipop = C.cod_tipop ' . 
			'WHERE A.ACTIVO = 1'.$sql_buscar. ' order by A.descripcion ASC';
	// echo "/*$sql*/";
	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	while ($row = mysqli_fetch_array($resultado)) 
	{
		array_push($data, 
			array(	"codproducto" 		=> $row['cod_producto'],
					"codcategoria" 	    => $row['cod_categoria'],
					"codbarra" 	    => $row['cod_barra'],
					"precio" 	    => $row['pv'],
					"nombproducto" 	    => strtoupper($row['descripcion']),
					"tipo" 	    => strtoupper($row['tipo']),
					"marca" 	    => strtoupper($row['marca']),
					"descuento" 	    => 0,
					"tipoingreso" 	    => 2,
				));							
	}      				
	
	$paging = array	(
		'success'=>true,
		'data'=> $data);
	echo json_encode($paging);
	
?> 