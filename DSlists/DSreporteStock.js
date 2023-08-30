/*!
 * RAZOR- DEV
 * 2023
 */
Ext.onReady(function(){
	  Ext.namespace('Ext.dsdata');
	   var indice = 'e';
	   var confP='';
		Ext.dsdata.storeIEA = new Ext.data.JsonStore(
		{
			url: '../servicesAjax/DSListaReporteStockAjax.php',
			root: 'data',
			totalProperty: 'total',
			fields: ['codigo','codigop', 'nombrep','marcap','cantidad','buscar'],
			listeners: { 		       
					load: function(thisStore, record, ids) 
					{  				
						//alert(Ext.dsdata.storeIEA.getAt(0).get('configuracion'))															
						// configuracionRoles(record[0].data.configuracion)
					}
				}
		});			
		
		var pagingProductoBar = new Ext.PagingToolbar(
		{
			pageSize: 1000, 
			store: Ext.dsdata.storeIEA,
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
		
		
		var ProductoColumnMode = new Ext.grid.ColumnModel(  
		[
			{  
				header: 'ID',  
				dataIndex: 'codigo',  
				width: 50,
				sortable: true,
				hidden :true
			},{  
				header: 'Codigo Producto',  
				dataIndex: 'codigop',  
				width: 120,
				sortable: true
			},{  
				header: 'Cantidad',  
				dataIndex: 'cantidad',  
				width: 40,
				sortable: true,
				//renderer: tooltipNroFicha
			},{  
				header: 'Nombre Producto',  
				dataIndex: 'nombrep',  
				width: 120,
				sortable: true
			}
            ,{  
				header: 'Marca Producto',  
				dataIndex: 'marcap',  
				width: 120,
				sortable: true
			}
            			        				
		]  
       );

       var gridCN = new Ext.grid.GridPanel({
		id: 'gridCN',
		store: Ext.dsdata.storeIEA,
		region: 'center',
		cm: ProductoColumnMode,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingProductoBar
        ,
		listeners: {
			render: function () {
				Ext.dsdata.storeIEA.load({ params: { start: 0, limit: 1000 } });
			}
		},
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true,
			listeners: {
				rowselect: function (sm, row, rec) {
					indice = row;
				}
			}
		}),
	});

	var filter = new Ext.form.TextField({ name: 'filterValue' });
	var bfilter = new Ext.Toolbar.Button({
		text: 'Buscar',
		tooltip: "Utilizar '*' para busquedas ",
		icon: '../img/view.png',
		handler: function (btn, e) {
			var o = { start: 0, limit: 1000 };
            var filterVal = filter.getValue();
            Ext.dsdata.storeIEA.baseParams['buscar'] = filterVal;
			//Ext.dsdata.storeIEA.baseParams['fechai'] = Ext.getCmp('fechai').getRawValue();
			//Ext.dsdata.storeIEA.baseParams['fechaf'] = Ext.getCmp('fechaf').getRawValue();
			Ext.dsdata.storeIEA.reload({ params: o });
		}
	});
     						
        var PAmenu = new Ext.Panel({
        region: 'north',
        id: 'PAcabecera1',
        height: 29,          
        tbar: [
				{
					text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Excel</a>',
					icon: '../img/excel.png',
					handler: function(t)
					{
						//var filterFechaf = Ext.getCmp('fechaf').getRawValue();
						//var filterFechai = Ext.getCmp('fechai').getRawValue();
						//var pagina = "../servicesAjax/DSExcelReporteIngresoAjax.php?&fechai=" + filterFechai + "&fechaf=" + filterFechaf;
						var opciones = "toolbar=yes, location=no, directories=yes, status=no, menubar=yes, scrollbars=yes, resizable=no, fullscreen=yes";
						window.open(pagina,"",opciones);
					}
				}, '->',
				// {
				// 	xtype: 'datefield',
				// 	id: 'fechai',
				// 	allowBlank: true,			
				// 	format : 'Y-m-d',
				// 	value: new Date()
				// },{
				// 	xtype: 'datefield',
				// 	id: 'fechaf',
				// 	allowBlank: true,			
				// 	format : 'Y-m-d',
				// 	value: new Date()
				// },
                '-', filter, bfilter											
			]
    });					
	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [ PAmenu, gridCN]
	  }); 
});