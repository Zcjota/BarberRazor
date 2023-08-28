<?php     
/*!
 * RAZOR
 * Copyright(c) 2023
 */
	include("../lib/conex.php");        	
	$buscar = isset($_POST['busqueda'])?$_POST['busqueda']:'';
	
	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) 
	{
	   $sql_buscar = '';
	} 
	else 
	{
		$sql_buscar = " AND (nombre LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%')";					
	}
	if (VerificaConBD())	
	{	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
		exit;
	}	

	$sql =  'SELECT * FROM cargo WHERE ACTIVO = 1'.$sql_buscar . ' order by nombre ASC';
	// echo $sql;
	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	
	while ($row = mysqli_fetch_array($resultado)) 
	{
		array_push($data, 
			array(	"codcargo" 		=> $row['cod_cargo'],
					"nombcargo" 	    => $row['nombre']
				));							
	}      				
	
	$paging = array	(
		'success'=>true,
		'data'=> $data);
	echo json_encode($paging);
	
?> 