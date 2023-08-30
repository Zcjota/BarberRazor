<?php     
/*!
 * DSoft-TPMV
 * Copyright(c) 2011
 */
	include("../lib/conex.php");        	
	if (VerificaConBD())	
	{	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
		exit;
	}	

	$sql =  'SELECT * FROM tipo_producto WHERE ACTIVO = 1 ORDER BY descripcion ASC';
	// echo $sql;
	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	 
	while ($row = mysqli_fetch_array($resultado)) 
	{
		array_push($data, 
			array(	"codtipop" 		=> $row['cod_tipop'],
					"nombtipop" 	    => strtoupper($row['descripcion'])
				));							
	}      				
	
	$paging = array	(
		'success'=>true,
		'data'=> $data);
	echo json_encode($paging);
	
?> 