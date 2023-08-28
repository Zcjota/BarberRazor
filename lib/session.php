<?php 
function VerificaSessionBD()
{
	
    session_start();
    if (!isset($_SESSION['IdPersonal']))
		{ return false;
		}
	else
	{
	  if (!($_SESSION['IdPersonal']))
		{  
		    return false;					  
		  
		}
		else
		return true;
	}
	
}



?>