<?php     
/*!
 * DSoft-TPMV
 * Copyright(c) 2011
 */ 
	include("../lib/conex.php");        
	include('../lib/session.php');	
    $idsuc = 0;
    if (VerificaSessionBD()==false)
    {	
        $data = array();    
        array_push($data, array( "descripcion" => "Finalizo Session.")); 
        $paging = array	('success'=>true,'total'=>0,'data'=> $data);
        echo json_encode($paging);
        exit;
    }else{
        $idsuc = $_SESSION['Idsucursal']; //AND A.COD_SUCURSAL = $idsuc
    }	
	if (VerificaConBD())	
	{	
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
		exit;
	}	

	$sql =  ' SELECT A.cod_producto, A.descripcion, C.inicio ' .
			' FROM producto A '. 
			' inner join inventario_fisico B on A.cod_producto = B.cod_producto ' .
			' inner join toma_inventario C on B.cod_tm = C.cod_tm ' . 
			' WHERE A.ACTIVO = 1 and B.ACTIVO = 1 and C.ACTIVO = 1 AND C.estado = 0 and B.COD_SUCURSAL = ' . $idsuc;
	// echo "/*$sql*/";
	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	while ($row = mysqli_fetch_array($resultado)) 
	{
		array_push($data, 
			array(	"codproducto" 		=> $row['cod_producto'],
					"descripcion" 	    => $row['descripcion'],					
					"fecha" 	    => $row['inicio'],					
				));							
	}      				
	
	$paging = array	(
		'success'=>true,
		'data'=> $data);
	echo json_encode($paging);
	
?> 