<?php

/*!
 * RAZOR
 * Copyright(c) 2023
 */
	include("../lib/conex.php");
	session_start();
	$regMod = $_POST['modulo'];	
	$codperfil = "'" .$_REQUEST["codperfil"]."'";
	$recordMod = json_decode(stripslashes($regMod));	
	if (VerificaConBD())
	{	echo '{"Success": false, "errors":{"reason": "No se puede conectar con la BD"}}';	
		exit;
	}

	/*if (DarPermiso($Cod_usuario,$reg))
	{
		echo "{success: true}";
	}
	else
	{
		echo '{"Success": false, "errors":{"reason": "Error al guardar registro"}}';
	}					
	  */	 										
	  $roles;
	  $sqlreinicia = ' UPDATE `detalle_perfil` set'.					   
					 ' ACTIVO = 0'.
					 ' WHERE COD_TIPOU = '.$codperfil;	
					 
		if($resulReinicia = mysqli_query(ConectarConBD(),$sqlreinicia))
		{  
		  foreach($recordMod as $record1)
			{
					$cont;
					$sql = ' SELECT DP.*'.
						   ' FROM detalle_perfil DP'.
						   ' WHERE DP.COD_TIPOU = '.$codperfil;			
					$resuldp = mysqli_query(ConectarConBD(),$sql);
					$cont=0;
					$cod_sm1 = $record1->codigosub;		
					
					 
					while($row = mysqli_fetch_array($resuldp))
					{ 								
						if($row['COD_SUB_MENU']==$cod_sm1)
						{
							if($row['ACTIVO']==0)
							{
							   $sqla = ' UPDATE `detalle_perfil` SET'. 
							   ' ACTIVO = 1'.                  				  				   
							   ' WHERE COD_SUB_MENU = '.$cod_sm1.
							   ' AND COD_TIPOU = '.$codperfil;			
								mysqli_query(ConectarConBD(),$sqla);
							}						
							$cont++;
						}				
					}						
					if($cont<=0)
					{							
						$sqli = ' INSERT INTO `detalle_perfil` (`COD_SUB_MENU`, `COD_TIPOU`, `ACTIVO`)'.
								' VALUES ('.$cod_sm1.','.$codperfil.',1)';		
								mysqli_query(ConectarConBD(),$sqli);				
					}		
			}	
		}		
?>