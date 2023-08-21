<?php
session_start();
header('Content-Type: text/html; charset=iso-8859-1');
//header("Content-Type: application/x-javascript'");
//header("Cache-Control: max-age=1, must-revalidate, no-cache");
//header("Content-Type: text/javascript");

//header("Pragma: public");
//header("Expires: 1"); // set expiration time
?>
//
//Creamos el popup para mostrar las sucursales
//

var winMostrarSucursales;
var indice='e';

var storeSucursal_val = new Ext.data.JsonStore({   
    url: 'servicesAjax/DSListadoSucursalesGralAjax.php',   
    root: 'data',   		
    fields: [
        {name:'codigo'},
        {name:'nombre',type:'string'},
        {name: 'estado', type: 'string'}
    ]
}); 
//storeSucursal_val.load();
var sm2_val = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true,
        listeners: {
            rowselect: function (sm, row, rec) {
                indice = row;
            }, // para cuando deselecciona el check del grid
            rowdeselect: function (sm, row, rec) {
                indice = -1;
            }
        }
    });

var Columnas_val = new Ext.grid.ColumnModel(  
[new Ext.grid.RowNumberer({width: 23}),
    {                  
        //header: 'codigo',  
        dataIndex: 'codigo',  
        hidden :true				
    },{  
        header: 'Nombre',  
        dataIndex: 'nombre',  
        width: 250,
        sortable: true            
    },{
        header: 'Estado',
        dataIndex: 'estado',
        width:80
    },
    sm2_val
]  
);	

var GridSucursales_val = new Ext.grid.EditorGridPanel(
{  
    width : 400,
    xtype: 'grid',
    height : 220,
    id: 'gridsucursalval',
    store: storeSucursal_val,
    region : 'center',
    cm: Columnas_val,
    clicksToEdit: 1,
    enableColLock:false,

    sm:sm2_val
});	

var btnAceptar_val = new Ext.Button({
    id: 'btnAceptar_val',
    x: 220,
    y: 285,
    text: '<span style="color:black; font: bold 12px arial, tahoma;">Aceptar</span>',
    minWidth: 80,
    style: 'background-color: #92c95d;',
    handler: function ()
    {
        frmMostrarSucursales_val.Insertar();
    }
});

var frmMostrarSucursales_val = new Ext.FormPanel({
    frame: true,
    
    items: [
    GridSucursales_val,
    {
            layout: 'hbox',
            layoutConfig: {
                padding: '4',
                pack: 'center',
                align: 'middle'
            },
            bodyStyle: ' margin-top: 5px; ',
            items: [
                {
                    bodyStyle: ' margin-right: 5px; ',
                    items: [
                        btnAceptar_val
                    ]
                }]
    }
    ],
    Insertar: function () {
        
        if (this.getForm().isValid() && indice != 'e') {
        var CodS_val = parseInt(storeSucursal_val.getAt(indice).get('codigo'));
            this.getForm().submit({
                url:'servicesAjax/DSConfigSucursalesAjax.php',
                    method: 'POST',
                    waitTitle: 'Actualizando',
                    waitMsg: 'Enviando Configuracion...',
                    params: {sucursal: CodS_val},
                    success: function (form, action) {
                        winMostrarSucursales.hide();
                        window.location.reload();
                        history.go(0);
                        window.location.href=window.location.href;                        
                    },
                    failure: function (form, action) {
                        if (action.failureType == 'server')
                        {
                            var data = Ext.util.JSON.decode(action.response.responseText);
                            Ext.Msg.alert('ERROR', data.errors.reason, function (){});
                        }
                        else
                        {
                            Ext.Msg.alert('ERROR', 'Imposible conectar con servidor : ' + action.response.responseText);
                        }
                    }
            });
        }else{
            winMostrarSucursales.hide();
        }
    }
});	

function MostrarSucursales()
{
    if (!winMostrarSucursales)
    {
        winMostrarSucursales = new Ext.Window({
            layout: 'fit',
            width: 400,
            height: 300,
            title: 'SUCURSALES',
            resizable: false,
            closeAction: 'hide',
            closable: true,
            draggable: false,
            plain: true,
            border: false,
            modal: true,
            items: [frmMostrarSucursales_val]
        });
    }
	storeSucursal_val.load();
    winMostrarSucursales.show();
}


/*!
 * RAZOR-JR
 * Copyright(c) 2023
 */

Ext.onReady(function(){    
	Ext.namespace('Ext.dsdata');
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    //Panel central
    Ext.dsdata.PAcentral = new Ext.TabPanel({
					region: 'center', 
					deferredRender: false,
					autoScroll: true, 
					margins:'0 4 4 0',
					activeTab: 0,     
					items: [{
						xtype: 'iframepanel',    
				  	id : 'TABcentral',    
				  	title : 'Bienvenido',    
				  	loadMask  : true,    				  	
				  	defaultSrc : 'DSpoliticaprivacidad.html',    
				  	closable:false
					}]
				});
	var FNcentral = function(tp){
				tp.getSelectionModel().on('selectionchange', function(tree, node){
				  var newFrame = Ext.dsdata.PAcentral.add({    
				  	xtype: 'iframepanel',    
				  	id : node.id,    
				  	title : node.attributes.text,    
				  	loadMask  : true,    				  	
				  	defaultSrc : node.attributes.url,    
				  	closable:true});
				  	Ext.dsdata.PAcentral.doLayout();  //if TabPanel is already rendered
				  	Ext.dsdata.PAcentral.setActiveTab(newFrame); 
				})
			}		
						
	var FNcentralclick = function(node) {			        	
			  var newFrame = Ext.dsdata.PAcentral.add({    
			  	xtype: 'iframepanel',    
			  	id : node.id,    
			  	title : node.attributes.text,    
			  	loadMask  : true,    			  	
			  	defaultSrc : node.attributes.url,    
			  	closable:true});
			  	Ext.dsdata.PAcentral.doLayout();  //if TabPanel is already rendered
			  	Ext.dsdata.PAcentral.setActiveTab(newFrame); 
			}

    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
        // cabecera para menu o imagenes
        new Ext.BoxComponent({
            region: 'north',
            id: 'PAcabecera',
            height: 58, // tamaño cabecera            
            autoEl: {
                tag: 'div',
                html: '<table width="100%" border="0"> <tr><td width="145"><img align="left" src="img/logoEncabezado.png" height="60" width="110"/> ' +
				//html: '<table width="100%" border="0"> <tr><td width="145"><img style="height: 45%; width: 45%; object-fit: contain" align="left" src="img/logoEncabezado.png"/> ' +
                	'</td><td>' +
                	'<div id="menudsh"><ul>'+
                	'<li><a href="DScerrarsesion.php"><img src="img/salir.png" align="absmiddle" border="0"/>&nbsp;CERRAR SESION</a></li>'+								      	
	                '<li><a href="#"><img src="img/user.png" align="absmiddle" border="0"/>'+
	                <?php
	                  if (isset($_SESSION['Nombre'])) {
	                  	echo "'&nbsp;" . $_SESSION['Nombre'] . " " . $_SESSION['Apellido1'] . "'+";
	                  } else {
	                  	echo "'&nbsp;Desconocido'+";
	                  }
	                ?>	
	                '</a></li>'+	 
					'<li><a href="#" onclick="MostrarSucursales()"><img src="img/comunicacion.png" align="absmiddle" border="0"/>'+
	                <?php
	                  if (isset($_SESSION['Sucursal'])) {
	                  	echo "'&nbsp;" . $_SESSION['Sucursal'] . "'+";
	                  } else {
	                  	echo "'&nbsp;Desconocido'+";
	                  }
	                ?>	
	                '</a></li>'+	                
					        '</ul></div>' +					      
                	'</td><td width="10"></td></tr></table>'
                
            }
        }), {
            region: 'west',
            id: 'PAmenu', // see Ext.getCmp() below
            title: 'Menu Principal',
            split: true,
            width: 200,
            minSize: 175,
            maxSize: 400,
            collapsible: true,            
            margins: '0 0 0 5',
            layout: {
                type: 'accordion',
                animate: true
            },
            items: [
						<?php     
						include("DSlibListaITEMS.php"); 
						DevuelveListaMenuItem();
						?>
					]
        }, Ext.dsdata.PAcentral
        
        ]
    });    
});

