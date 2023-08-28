<?php     

include("lib/conex.php");        
session_start();
function DevuelveListaMenuItem() { 
	if (VerificaConBD()) {			
		echo '';
	} else {
		// $sql = ' SELECT DP.*,S.COD_MENU, S.COD_SUB_MENU, S.RUTA, S.DESCRIPCION, S.ICON, S.ORDEN, M.ORDEN, M.DESCRIPCION AS MENU, M.ICON AS IMENU'.
		// 	' FROM `detalle_perfil` DP inner join `submenu` S on DP.COD_SUB_MENU = S.COD_SUB_MENU'.
		// 	' inner join `menu` M on S.COD_MENU = M.COD_MENU'.			
		// 	' where DP.ACTIVO = 1 and DP.COD_TIPOU = '.$_SESSION['tipoUser'].
		// 	' ORDER BY M.ORDEN ASC,S.ORDEN ASC';
		$sql = ' SELECT DP.*,S.COD_MENU, S.COD_SUB_MENU, S.RUTA, S.DESCRIPCION, S.ICON, S.ORDEN, M.ORDEN, M.DESCRIPCION AS MENU, M.ICON AS IMENU'.
		' FROM `detalle_perfil` DP inner join `submenu` S on DP.COD_SUB_MENU = S.COD_SUB_MENU'.
		' inner join `menu` M on S.COD_MENU = M.COD_MENU'.			
		' where DP.ACTIVO = 1 and DP.COD_TIPOU = '.$_SESSION['tipoUser'].
		' ORDER BY M.ORDEN ASC,S.ORDEN ASC';
	$resultado=mysqli_query(ConectarConBD(),$sql);	
		//  echo "$sql";
	// echo mysql_error();		
	$nreg = mysqli_num_rows($resultado); 	
	$cmenu = '';
	$rmenu = '';
	$fmenu = "]}),	listeners: { 'render' : FNcentral, 'click' : FNcentralclick}}";
	$pmenu = '';	
	$data = '';
		$reg_cab = 1;  		
		$i = 0;
		
		while ($row = mysqli_fetch_array($resultado)) {		
			$valor_menu = $row['COD_SUB_MENU'] * 1;				
					if (strcmp($pmenu, $row['COD_MENU']) == 0) {				
						  if (strlen($cmenu) == 0) {
					  $cmenu = "{	xtype: 'treepanel', title:'<b>" . $row['MENU'] . "</b>', iconCls:'" . $row['IMENU'] . "',	id: 'MENU" . $row['MENU'] . 
							  "',	margins: '2 2 0 2', autoScroll: true, lines: false, rootVisible: false, root: new Ext.tree.AsyncTreeNode({ children: ["; 
				  }
						  // $rmenu .= " {text: '<b style = color:#000000; >" . $row['DESCRIPCION'] . "</b>', leaf: true, id:'SUB" . $row['COD_SUB_MENU'] . "', url: '" . $row['RUTA'] . "', iconCls:'" . $row['IMENU'] . "'},";//SE REPITE EL ICONO DEL MENU EN EL SUBMENU
						  $rmenu .= " {text: '<b style =color:#000000;  >" . $row['DESCRIPCION'] . "</b>', leaf: true, id:'SUB" . $row['COD_SUB_MENU'] . "', url: '" . $row['RUTA'] . "', iconCls:'TIJERA'},";//UN ICONO POR DEFAUL EN EL SUBMENU
					}	else {
					  if (strcmp($pmenu, '') != 0) {
						  if (strlen($rmenu) > 0)
					$rmenu = substr($rmenu,0,strlen($rmenu) -1);  	
				  if (strlen($cmenu) == 0) {
					  $cmenu = "{	xtype: 'treepanel', title:'<b>" . $row['MENU'] . "</b>', iconCls:'" . $row['IMENU'] . "',	id: 'MENU" . $row['MENU'] . 
							  "',	margins: '2 2 0 2', autoScroll: true,lines: false, rootVisible: false, root: new Ext.tree.AsyncTreeNode({ children: ["; 
						}
						$data .= $cmenu . $rmenu . $fmenu . ',';	 					  	
						  $rmenu = ''; $reg_cab = 1;
					  }	
					  if ($reg_cab == 1){	
						$cmenu = "{	xtype: 'treepanel', title:'<b>" . $row['MENU'] . "</b>', iconCls:'" . $row['IMENU'] . "',	id: 'MENU" . $row['MENU'] . 
							  "',	margins: '2 2 0 2', autoScroll: true,lines: false, rootVisible: false, root: new Ext.tree.AsyncTreeNode({ children: ["; 
					$reg_cab = 0; 
				  }
				  // $rmenu .= " {text: '<b style =color:#000000;  >" . $row['DESCRIPCION'] . "</b>', leaf: true, id:'SUB" . $row['COD_SUB_MENU'] . "', url: '" . $row['RUTA'] . "', iconCls:'" . $row['IMENU'] . "'},";//SE REPITE EL ICONO DEL MENU EN EL SUBMENU
				  $rmenu .= " {text: '<b style =color:#000000;  >" . $row['DESCRIPCION'] . "</b>', leaf: true, id:'SUB" . $row['COD_SUB_MENU'] . "', url: '" . $row['RUTA'] . "', iconCls:'TIJERA'},";//UN ICONO POR DEFAUL EN EL SUBMENU

				  }				  			
			$pmenu = $row['COD_MENU'];
			if (($i+1) == $nreg) {
				if (strlen($rmenu) > 0)
			  $rmenu = substr($rmenu,0,strlen($rmenu) -1);  	
			  $data .= $cmenu . $rmenu . $fmenu;
			}
			$i = $i + 1;				
	}	
	echo $data; 
	}

}	
// DevuelveListaMenuItem();
?> 