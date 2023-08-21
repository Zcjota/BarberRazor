<?
function ControlSesionUsuario() { 
session_start();
if (isset($_SESSION['InicioSesion']))	{
	if (isset($_SESSION['Nombre'])) {
		$ultima = $_SESSION['ControlSesion'];
		$actual = date("YmdGi");	
		$minutos = $actual - $ultima;
		if ($minutos > 100) {		  
			header("Location: https://www.youtube.com/channel/UCCoMyZn5WuFd1vT6O5sJwGw");	
		  return false;}
		else {
		  $_SESSION['ControlSesion'] = date("YmdGi");	
		  return true;
	  }
	} else { 
		header("Location: https://www.youtube.com/channel/UCCoMyZn5WuFd1vT6O5sJwGw/");	
		return false;
}} else { 
		header("Location: https://www.youtube.com/channel/UCCoMyZn5WuFd1vT6O5sJwGw");	
		return false;
}
}
?>