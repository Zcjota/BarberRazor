
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Listado de Ingreso</title>		
		
	<!-- <script type="text/javascript" src="https://ff.kis.v2.scr.kaspersky-labs.com/FD126C42-EBFA-4E12-B309-BB3FDD723AC1/main.js?attr=6mT2D3w27QQSkC53E-xhKLVGNfde8wJ08_1DI-yVCMsJIXLHd5troD2I7xi7_mN6tfEpD54gecEvpxiiBSYveFxJAfnhg6ZSQCEzcz0BEDIRNVEHWrlLDRwdq-wXtfSYUxMe5HXft316vzteGU87HQ" charset="UTF-8"></script><link rel="stylesheet" crossorigin="anonymous" href="https://ff.kis.v2.scr.kaspersky-labs.com/E3E8934C-235A-4B0E-825A-35A08381A191/abn/main.css?attr=aHR0cHM6Ly93d3cuZXF1YW50YS1hdWRpdG9yZXMuY29tL1NPTE9FTF9UMjMvRFNsaXN0cy9EU0xpc3RhZG9JbmdyZXNvRWdyZXNvQXJxdWVvLnBocA"/> -->
	<div id="DSinicio" class="divcentro">
  	<div align="center"><img src="../img/al.gif"/><br/></div>  	
  </div>	
	<link rel="stylesheet" type="text/css" href="../ext/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-gray.css" />
	<link rel="stylesheet" type="text/css" href="../ext/ux/css/RowEditor.css" />
    <!-- GC -->
 	<!-- LIBS -->
 	<script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
 	<!-- ENDLIBS -->

	<script type="text/javascript" src="../ext/ext-all.js"></script>	
	<script type="text/javascript" src="../ext/ux/Spotlight.js"></script>
	<script type="text/javascript" src="../ext/locale/ext-lang-es.js"></script>
	<script type="text/javascript" src="../ext/ux/RowEditor.js"></script>
	<script type="text/javascript" src="../ext/password.js"></script>
	
	<script src="DSListadoIngresoEgresoArqueo.js" type='text/javascript'></script>
	<script src="../DSforms/DSaltaIngreso.js" type='text/javascript'></script>
	<script src="../DSforms/DSaltaDescuento.js" type='text/javascript'></script>
	<script src="../DSforms/DSaltaClienteIngreso.js" type='text/javascript'></script>
	<script src="../DSforms/DSabmTipoPublicidadCliente.js" type='text/javascript'></script>
	<script src="../DSforms/DScuentaACH.js" type='text/javascript'></script>
	<script src="../DSforms/DSaltaIngresoAjuste.js" type='text/javascript'></script>
	<script src="../DSforms/DSaltaIngresoInterno.js" type='text/javascript'></script>
	<style type="text/css">
		.zoom{ /* Aumentamos la anchura y altura durante 2 segundos 
		*/ transition: width 2s, height 2s, transform 2s; 
		-moz-transition: width 2s, height 2s, -moz-transform 2s; -webkit-transition: width 2s, height 2s, -webkit-transform 2s; -o-transition: width 2s, height 2s,-o-transform 2s; } .zoom:hover{ /* tranformamos el elemento al pasar el mouse por encima al doble de su tama�o con scale(2). */ transform : scale(2); -moz-transform : scale(2); /* Firefox */ -webkit-transform : scale(2); /* Chrome - Safari */ -o-transform : scale(2); /* Opera */ }
		.x-grid3-row-alt {
		background-color: #cccccc ;  
		}.x-grid3-row-over {		
			background-color:#bbdd99;
			background-image: none;
			font-weight:bold !important;
		}.x-grid3-row-selected {
			background-color:#000000  !important;
			color: #ffffff;
		}.estadoRojo{
			background-color: #FC4050 !important;			
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
		}.comboDescuentos{
			background: #BCF5A9;			
			color: #000000;
			
		}.comboFormato1{
			background: #ffffff;			
			color: #000000;
			
		}
		
	</style>
  <script type="text/javascript">document.getElementById('DSinicio').innerHTML = '';</script>
	</head>
	<body>
	</body>
</html>
