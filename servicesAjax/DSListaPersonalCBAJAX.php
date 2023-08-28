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
		
	$sql =  'SELECT * FROM personal WHERE ACTIVO = 1 order by nombre';
	// echo $sql;
	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	while ($row = mysqli_fetch_array($resultado)) 
	{
		array_push($data, 
			array(	"codpersonal" 		=> $row['cod_personal'],
					"nombpersonal" 	    => strtoupper($row['nombre'].' '.$row['app']),
					"codsistema" 	    => $row['codigo_sistema'],
					"codcargo" 	    => $row['cod_cargo']
				));							
	}      				
	
	$paging = array	(
		'success'=>true,
		'data'=> $data);
	echo json_encode($paging);
	
?> 