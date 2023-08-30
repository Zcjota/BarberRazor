/*!
 * RAZOR - DEV
 * RAZOR - SOTO
 * RAZOR - JR
 * Copyright(c) 2015
 */
 
Ext.onReady(function(){
	  Ext.namespace('Ext.dsdata');
	   var indice = 'e';
	   var confP='';
		Ext.dsdata.storeComision = new Ext.data.JsonStore(
		{
			url: '../servicesAjax/DSListaComisionPAjax.php',
			root: 'data',
			totalProperty: 'total',
			fields: ['codigo', 'nombre', 'descripcion'],
			listeners: { 		       
					load: function(thisStore, record, ids) 
					{  				
						//alert(Ext.dsdata.storeComision.getAt(0).get('configuracion'))															
						// configuracionRoles(record[0].data.configuracion)
					}
				}
		});			
		
		var pagingCargoBar = new Ext.PagingToolbar(
		{
			pageSize: 100, 
			store: Ext.dsdata.storeComision,
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
			
		var CargoColumnMode = new Ext.grid.ColumnModel(  
		[
			{  
				header: 'ID',  
				dataIndex: 'codigo',  
				width: 50,
				sortable: true,
				hidden :true
			},{  
				header: 'Nombre',  
				dataIndex: 'nombre',  
				width: 200,
				sortable: true
			},{  
				header: 'descripcion',  
				dataIndex: 'descripcion',  
				width: 300,
				// hidden :true,
				sortable: true
			}    				        				
		]  
       );
		
	var CargoGrid = new Ext.grid.GridPanel(
	{  
		id: 'CargoGrid',
		store: Ext.dsdata.storeComision, 
		region:'center',
		cm: CargoColumnMode, 
		enableColLock:false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
		bbar: pagingCargoBar,
		listeners:
		{
			render:function()
			{
				Ext.dsdata.storeComision.load({params:{start:0,limit:100}});			
			},
			'celldblclick' :function()
			{
				// ModificarRubro(indice);
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
							Ext.dsdata.storeComision.baseParams['buscar'] = filterVal;
							Ext.dsdata.storeComision.reload({params:o});	
                        } else {
                            Ext.dsdata.storeComision.clearFilter();
                        }
                }
        });		
			
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
						NuevoCargo();							
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
						ModificarCargo(indice);																			
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
												url : '../servicesAjax/DSBajaComisionAJAX.php' , 
												params : {codigo : Ext.dsdata.storeComision.getAt(indice).get('codigo') },
												method: 'POST', 
												success: function ( result, request ) 
												{ 
													Ext.MessageBox.alert('MSG', 'Registro Desactivado'); 
													Ext.dsdata.storeComision.load({params:{start:0,limit:100}});
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
		items: [ PAmenu, CargoGrid]
	  }); 
});