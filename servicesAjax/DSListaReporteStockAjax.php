<?php     
	include("../lib/conex.php");
	// include("DSfuncionConfRolesAjax.php");   
	$start = isset($_POST['start'])?$_POST['start']:0;	
	$limit = isset($_POST['limit'])?$_POST['limit']:1000;
	$buscar = isset($_POST['buscar'])?$_POST['buscar']:'';
	//$fechai = isset($_POST['fechai'])?$_POST['fechai']:Date('Y-m-d');
	//$fechaf = isset($_POST['fechaf'])?$_POST['fechaf']:Date('Y-m-d');
	$sql_buscarF = " AND A.fecha BETWEEN  '$fechai 00:00:00' AND '$fechaf 23:59:59' ";					 
	
	if ((strcmp($buscar, '') == 0) || (strcmp(trim($buscar), '*') == 0)) {
        $sql_buscar = '';
    } else {
        $sql_buscar = " AND P.descripcion LIKE '%" . str_replace('*', '%', trim(strtoupper($buscar))) . "%'";
    }
          
	
	include('../lib/session.php');	
    if (VerificaConBD()) {
		echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';
		exit;
	}

	$conex = ConectarConBD();
	 
    $sql = "SELECT S.cod_stock AS codigo, S.cod_producto AS codigop,P.descripcion AS nombrep,M.descripcion AS marcap,
            S.cantidad_disponible AS cantidad 
            FROM stock S INNER JOIN producto P ON S.cod_producto = P.cod_producto 
            INNER JOIN marca_producto M ON M.cod_marca = P.cod_marca 
            WHERE P.ACTIVO = 1 $sql_buscar";        
 echo "/*$sql*/";

	// $stotal = mysqli_query(ConectarConBD(),"SELECT COUNT(A.cod_ingreso) AS TOTAL FROM ingreso A WHERE A.ACTIVO = 1 and A.COD_SUCURSAL = $idsuc " . $sql_buscar . $sql_buscarF );
	// $total = mysqli_fetch_array($stotal);	
	
	$resultado=mysqli_query(ConectarConBD(),$sql);
	$data = array();     
	$cont =0;	
	while ($row = mysqli_fetch_array($resultado)) 
	{		
		
		// }
		array_push($data, array( 
								"codigo"=> $row['codigo'], 
                                "codigop"=> $row['codigop'],
                                "nombrep" => strtoupper($row['nombrep']),   
                                "marcap" => strtoupper($row['marcap']), 
                                "cantidad" => $row['cantidad']   													
								//"comentario" => strtolower($row['comentario'] . '' . $row['comentario_ii']), 							
								
								));
	}		
	
	
	$paging = array	(
	'success'=>true,
	//'total'=>$total['TOTAL'],
	'data'=> $data);
	echo json_encode($paging);
	
?> 