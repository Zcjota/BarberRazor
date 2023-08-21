<?php     
/*!
 * RAZOR
 * Copyright(c) 2023
 */
	include("../lib/conex.php");        

	if (VerificaConBD())	
	{	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
		exit;
	}	
	
	$sql =  'SELECT COD_TIPOU, NOMB_TIPOU FROM tipo_usuario WHERE ACTIVO = 1 ';

	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	
	while ($row = mysqli_fetch_array($resultado)) 
	{
		array_push($data, 
			array(	"codtu" 		=> $row['COD_TIPOU'],
					"nombtu" 	    => $row['NOMB_TIPOU']
				));							
	}      				
	
	$paging = array	(
		'success'=>true,
		'data'=> $data);
	echo json_encode($paging);
	
?> 