<?php     
/*!
 * RAZOR -DEV
 * Copyright(c) 2023
 */
	include("../lib/conex.php");
	// $op = isset($_REQUEST['op'])?$_REQUEST['op']:true;
	if (VerificaConBD())	
	{	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
		exit;
	}	

	// if($op){
		$sql =  'SELECT * FROM proveedor WHERE ACTIVO = 1 ORDER BY nombre ASC';
	// }
	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	
	while ($row = mysqli_fetch_array($resultado)) 
	{
		array_push($data, 
			array(	"codproveedor" 		=> $row['cod_proveedor'],
					"nombproveedor" 	    => strtoupper($row['nombre'])
				));							
	}      				
	
	$paging = array	(
		'success'=>true,
		'data'=> $data);
	echo json_encode($paging);
	
?> 