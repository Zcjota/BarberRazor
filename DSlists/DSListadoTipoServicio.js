/*!
 * RAZOR- JR
 * Copyright(c) 2023
 */
 
Ext.onReady(function(){
	  Ext.namespace('Ext.dsdata');
	   var indice = 'e';
	   var confP='';
		Ext.dsdata.storeTipoServicio = new Ext.data.JsonStore(
		{
			url: '../servicesAjax/DSListaTipoServicioAJAX.php',
			root: 'data',
			totalProperty: 'total',
			fields: ['codigo', 'codservicio', 'nombre', 'servicio','codtipoprecio','tipoprecio','precio','orden'],
			listeners: { 		       
					load: function(thisStore, record, ids) 
					{  				
						//alert(Ext.dsdata.storeTipoServicio.getAt(0).get('configuracion'))															
						// configuracionRoles(record[0].data.configuracion)
					}
				}
		});			
		
		var pagingTipoServicioBar = new Ext.PagingToolbar(
		{
			pageSize: 100, 
			store: Ext.dsdata.storeTipoServicio,
			displayInfo: true,
			afterPageText: 'de {0}',
			beforePageText: 'Pag.',
			firstText: 'Primera Pag.', 
			lastText: 'Ultima Pag.',
			nextText: 'Siguiente Pag.',
			prevText: 'Pag. Previa',
			refreshText: 'Refrescar',			
			displayMsg: 'Desplegando del {0} - {1} de {2}',
			emptyMsg: "No hay elementos para desplegar."
		});				
			
		var TipoServicioColumnMode = new Ext.grid.ColumnModel(  
		[
			{  
				header: 'ID',  
				dataIndex: 'codigo',  
				width: 50,
				sortable: true,
				hidden :true
			},{  
				header: 'ORDEN',  
				dataIndex: 'orden',  
				width: 60,
				sortable: true,
			},{  
				header: 'Servicio',  
				dataIndex: 'servicio',  
				width: 150,
				// hidden :true,
				sortable: true
			},{  
				header: 'Tipo Servicio',  
				dataIndex: 'nombre',  
				width: 250,
				// hidden :true,
				sortable: true
			},{  
				header: 'Tipo Precio',  
				dataIndex: 'tipoprecio',  
				width: 100,
				// hidden :true,
				sortable: true
			},{  
				header: 'Precio',  
				dataIndex: 'precio',  
				width: 80,
				// hidden :true,
				sortable: true
			}    				        				
		]  
       );
		
	var TipoServicioGrid = new Ext.grid.GridPanel(
	{  
		id: 'TipoServicioGrid',
		store: Ext.dsdata.storeTipoServicio, 
		region:'center',
		cm: TipoServicioColumnMode, 
		enableColLock:false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
		bbar: pagingTipoServicioBar,
		listeners:
		{
			render:function()
			{
				Ext.dsdata.storeTipoServicio.load({params:{start:0,limit:100}});			
			},
			'celldblclick' :function()
			{
				ModificarTipoServicio(indice);																			
			}
		},
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true,
			listeners: {					
					rowselect: function(sm, row, rec)
					{  
						indice = row;									
					}      
				}
		})		

		});		
	
		var filter = new Ext.form.TextField({name: 'filterValue'});

		var bfilter = new Ext.Toolbar.Button({
            text: 'Buscar',
            tooltip: "Utilizar '*' para busquedas ",            
            icon: '../img/view.png',
            handler: function(btn,e) {
                        var filterVal = filter.getValue();
                        if( filterVal.length > 0 )
						{   
							var o = {start : 0, limit:25};					
							Ext.dsdata.storeTipoServicio.baseParams['buscar'] = filterVal;
							Ext.dsdata.storeTipoServicio.reload({params:o});	
                        } else {
                            Ext.dsdata.storeTipoServicio.clearFilter();
                        }
                }
			});		
			//NuevoServicio();							
        var PAmenu = new Ext.Panel({
        region: 'north',
        id: 'PAcabecera1',
        height: 29,          
        tbar: [
				{
					id: 'nuev',
					text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Nuevo</a>',
					icon: '../img/Nuevo.png',
					handler: function(t)
					{
						NuevoServicio();							
					}
				},
				{
						xtype: 'tbseparator'
				},
				{
					id: 'modf',
					text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
					icon: '../img/Editar.png',
					handler: function(t)
					{		
						if(indice != 'e')
						{
							ModificarServicio(indice);																			
						}else{
							alert('Seleccione un registro');
						}
					}
				},
				{
						xtype: 'tbseparator'
				},
				{
					id: 'elim',
					text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Eliminar</a>',
					icon: '../img/Eliminar.png',
					handler: function(t)
					{	
						if(indice != 'e')
						{
						 Ext.MessageBox.show({							   
							   title:'Advertencia',
							   msg: 'Esta seguro que desea eliminar el registro seleccionado..?',
							   buttons: Ext.MessageBox.YESNO,				           
							   icon: Ext.MessageBox.WARNING,
							   fn:function(btn) {
										if(btn == 'yes')									
										{
											Ext.Ajax.request(
											{
												url : '../servicesAjax/DSBajaTipoServicioAJAX.php' , 
												params : {codigo : Ext.dsdata.storeTipoServicio.getAt(indice).get('codigo') },
												method: 'POST', 
												success: function ( result, request ) 
												{ 
													Ext.MessageBox.alert('MSG', 'Registro Desactivado'); 
													Ext.dsdata.storeTipoServicio.load({params:{start:0,limit:100}});
												},
												failure: function ( result, request) 
												{ 
													Ext.MessageBox.alert('ERROR', result.responseText); 
												} 
											});  	
										}
									}
							  });		
						}else{alert('Seleccione un registro por favor.....!');}							
					}
				} , '->', filter, bfilter											
			]
    });					
			
		 // function configuracionRoles(conf)
		 // {
			 // if(conf.substring(0,1) == 0)
			   // {					
					 // var items = PAmenu.topToolbar.items;
					 // items.get('nuev').disable(true);
			   // }						  
			  // if(conf.substring(1,2) == 0)
			   // {						
					 // var items = PAmenu.topToolbar.items;
					 // items.get('elim').disable(true);			 
			   // }						  
			   // if(conf.substring(2,3) == 0)
			   // {						
					 // var items = PAmenu.topToolbar.items;
					 // items.get('modf').disable(true);
			   // }						  
		 // }	
		
	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [ PAmenu, TipoServicioGrid]
	  }); 
});