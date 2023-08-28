<?php
	header ("Expires: Thu, 27 Mar 1980 23:59:00 GMT"); //la pagina expira en una fecha pasada
	header ("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); //ultima actualizacion ahora cuando la cargamos
	header ("Cache-Control: no-cache, must-revalidate"); //no guardar en CACHE
	header ("Pragma: no-cache");
// iso-8859-1
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Listado Usuario</title>
	<link rel="stylesheet" type="text/css" href="../ext/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-gray.css" />

    <!-- GC -->
 	<!-- LIBS -->
 	<script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
 	<!-- ENDLIBS -->

    <script type="text/javascript" src="../ext/ext-all.js"></script>	
	<script type="text/javascript" src="../ext/locale/ext-lang-es.js"></script> 
    
    <script src="DSListadoUsuario.js" type='text/javascript'></script>
	<script src="../DSforms/DSAltaUsuario.js" type='text/javascript'></script>
	<!-- <script src="../DSforms/DSabmCargo.js" type='text/javascript'></script>	
	<script src="../DSforms/DSabmPersonal.js" type='text/javascript'></script>	 -->
	<script src="../DSforms/DSModificarUsuario.js" type='text/javascript'></script>			
	<style type="text/css">
		.x-grid3-row-alt {
		background-color: #cccccc ;  
		}.x-grid3-row-over {		
			background-color:#bbdd99;
			background-image: none;
			font-weight:bold !important;
		}.x-grid3-row-selected {
			background-color:#000000  !important;
			color: #ffffff;
		}.x-window-tl .x-window-header {
			color: #000000;
			font: bold 12px tahoma,arial,verdana,sans-serif;
		}.x-panel-mc {
			color: #000000;
			font: 13px tahoma,arial,helvetica,sans-serif;
			background-color: #F1F1F1;  
		}.x-panel-ml {
			background-image: none;
			background-color: #f1f1f1;
		}.x-panel-mr {
			background-image: none;
		}.x-panel-bc {
			background-image: none;
		}.x-panel-bl {
			background-image: none;
		}.x-panel-br {
			background-image: none;
		}.x-window-plain .x-window-mc {
			color: #000000;
		}.x-grid3-hd-row td {
			font: bold 11px/15px arial,tahoma,helvetica,sans-serif;
		}.x-form-invalid, textarea.x-form-invalid {
			border-color: #c30;
		}  .x-btn-mc, .x-btn-ml, .x-btn-tc, .x-btn-mr, .x-btn-bc, .x-btn-br, .x-btn-tl, .x-btn-tr, .x-btn-bl {
			background-image:none;
		}.x-btn-over .x-btn-mc {
			 background-image: url("../ext/resources/images/default/button/btn.gif");
			 background-position: 0 -2168px;
		}.x-btn-over .x-btn-ml {
			 background-image: url("../ext/resources/images/default/button/btn.gif");
			background-position: -6px -24px;
		}.x-btn-over .x-btn-tc {
			 background-image: url("../ext/resources/images/default/button/btn.gif");
			 background-position: 0 -9px;
		}.x-btn-over .x-btn-mr {
			 background-image: url("../ext/resources/images/default/button/btn.gif");
			 background-position: -9px -24px;
		}.x-btn-over .x-btn-bc {
			 background-image: url("../ext/resources/images/default/button/btn.gif");
			background-position: 0 -18px;
		}.x-btn-over .x-btn-br {
			background-image: url("../ext/resources/images/default/button/btn.gif");
			background-position: -9px -3px;
		}.x-btn-over .x-btn-tl{
			background-image: url("../ext/resources/images/default/button/btn.gif");
			background-position: -6px 0;
		}.x-btn-over .x-btn-tr{
			background-image: url("../ext/resources/images/default/button/btn.gif");
			background-position: -9px 0;
		}.x-btn-over .x-btn-bl{
			background-image: url("../ext/resources/images/default/button/btn.gif");
			background-position: -6px -3px;
		}
	</style>
	</head>
	<body>
	</body>
</html>