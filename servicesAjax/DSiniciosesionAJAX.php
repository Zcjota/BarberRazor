<?php 	
	include("../lib/conex.php");
	//include("../servicesAjax/DSEnvioAutomaticoEmail.php");
	// include("../servicesAjax/DSEmailAutomaticoOTCreditosAJAX.php");
	//session_start();
	$fa = date("Y/m/d",str2date($_REQUEST["fechaa"]));
	if (!isset($_REQUEST["usuario"])){
		echo '{success:false, errors:{reason: "Se requiere Usuario", id:1}}';
		exit;
	}

	if (!isset($_REQUEST["password"])) {
	   echo '{success:false, errors:{reason: "Se requiere password", id:2}}';
	   exit;
	}
	$fecha=explode("/",$fa);		
	$a = $fecha[0];
	$m = $fecha[1];
	$d = $fecha[2];											
							
	if (VerificaConBD()) 
	{
		echo '{success:false, errors:{reason:"Error al conectar con BD.", id:0}}';
	}
	else 
	{
		
		$sql = "SELECT U.COD_USUARIO, p.nombre, p.app, p.apm, U.LOGIN, U.PASSWORD, U.COD_TIPOU, p.nit, p.cod_personal,
			S.COD_SUCURSAL, S.DESCRIPCION AS SUCURSAL FROM `usuario` U " .
			" INNER JOIN tipo_usuario TU ON U.COD_TIPOU = TU.COD_TIPOU 
			  inner join personal p on U.cod_personal = p.cod_personal 
			  INNER JOIN sucursal S on U.COD_SUCURSAL = S.COD_SUCURSAL
			   WHERE U.LOGIN='".strtoupper($_REQUEST["usuario"])."' AND U.ACTIVO = 1 LIMIT 1";
		//echo mysql_error();	
		//  echo "/*$sql*/";
		$resultado = mysqli_query(ConectarConBD(),$sql);	
		$num_reg = mysqli_num_rows($resultado);
		if ($num_reg > 0) 
			{		 	 
				if(list($IdUsuariov, $Nombrev, $Apellido1v, $Apellido2v, $Usuariov, $Contraseniav, $tipov, $ci, $IdPersonalv,$Idsucursalv, $Sucursalv) = mysqli_fetch_array($resultado)) 						
				{			 	 
				 if (strcmp($Contraseniav, $_REQUEST["password"]) == 0) {								
					  session_start();
						$_SESSION['IdUsuario'] 	= $IdUsuariov;
						$_SESSION['Nombre'] 	= $Nombrev; 
						$_SESSION['Apellido1'] 	= $Apellido1v;
						$_SESSION['Apellido2'] 	= $Apellido2v;
						$_SESSION['Usuario'] 	= $Usuariov; 	
						$_SESSION['Contrasenia'] = $Contraseniav;						
						$_SESSION['tipoUser'] 	= $tipov;
						$_SESSION['ci'] 		= $ci;	
						$_SESSION['IdPersonal'] = $IdPersonalv;	
						$_SESSION['Idsucursal'] = $Idsucursalv;	
						$_SESSION['Sucursal'] = $Sucursalv;	

                        									
						echo "{success: true}";
						
					} else 
						echo '{success:false, errors:{reason:"Password Incorrecto", id:3}}';									    
				}
			} 
		else 
			echo '{success:false, errors:{reason:"Usuario Incorrecto", id:4}}';
	}
	
	function str2date($in)
	{
		$t = explode("/",$in);
		if (count($t)!=3) $t = explode("-",$in);
		if (count($t)!=3) $t = explode(" ",$in);
		if (count($t)!=3) return -1;
		if (!is_numeric($t[0])) return -1;
		if (!is_numeric($t[1])) return -2;
		if (!is_numeric($t[2])) return -3;

		if ($t[2]<1902 || $t[2]>2037) return -3;
		return mktime (0,0,0, $t[1], $t[0], $t[2]);
	}