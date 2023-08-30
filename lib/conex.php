<?php 
//date_default_timezone_set('-04:00');

function VerificaConBD()
{
      if (!isset($_SESSION['BD']))
		{ if (!($_SESSION['BD']=mysqli_connect("localhost","root","","razor_test"))) 
		    return true;		  
		}
	else
	  if (!($_SESSION['BD']))
		{ if (!($_SESSION['BD']=mysqli_connect("localhost","root","","razor_test")))
		    return true;	  
		}
	  else
	    return false;
	    
	    
}
function ConectarConBD()
{
    $conexion=mysqli_connect("localhost","root","")or die("error1");	
    $db=mysqli_select_db($conexion,"razor_test")or die("error2");
	return  $conexion;
}


?>