<?php     
/*! 
 * RAZOR
 * Copyright(c) 2023
 */
include("../lib/conex.php");   
	
$codigo  = isset($_POST['codigo'])?$_POST['codigo']:'';

if (VerificaConBD())	
{	
	echo '{"Succiss": false, "errors":{"reason": "No se puede conectar con la BD"}}';		
	exit;
}	


$data = array();     

if($codigo==0)
{
	$sql="select COD_SUCURSAL,DESCRIPCION,ACTIVO from sucursal WHERE ACTIVO=1 order by DESCRIPCION";
	$resultado = mysqli_query(ConectarConBD(),$sql);
	while ($row = mysqli_fetch_array($resultado)) 	
	{
		array_push($data, 
		array(
				"codsucursal"		=>  $row['COD_SUCURSAL'], 
				"nombre_sucursal" 			=>  $row['DESCRIPCION'], 
				"ticket"		=>0
			));	
		
	}
}
else
{
	$sql="select COD_SUCURSAL,DESCRIPCION,ACTIVO from sucursal WHERE ACTIVO=1 order by DESCRIPCION";
	$resultado = mysqli_query(ConectarConBD(),$sql);
	while ($row = mysqli_fetch_array($resultado)) 	
	{
		 $sql1="select count(hu.COD_SUCURSAL) as total from usuario_suc hu ".
		" WHERE hu.ACTIVO=1 AND hu.COD_USUARIO = ". $codigo." and hu.COD_SUCURSAL=".$row['COD_SUCURSAL'];
		//echo "/*$sql1*/";
		
		$resultadoex1=mysqli_query(ConectarConBD(),$sql1);
		$tot2 = mysqli_fetch_array($resultadoex1);
		$t=$tot2['total'];
		$tick=0;
		if($t>0){ $tick=1;}
	
		array_push($data, 
		array(
				"codsucursal"		=>  $row['COD_SUCURSAL'], 
				"nombre_sucursal" 			=>  $row['DESCRIPCION'], 
				"ticket"		=>$tick
			));	
	}
	
		
	
}


$paging = array	(
	'success'=>true,
	'data'=> $data);
echo json_encode($paging);

?> 