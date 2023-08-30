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
			url: '../servicesAjax/DSListaReporteIngresoAjax.php',
			root: 'data',
			totalProperty: 'total',
			fields: ['codigo','codingreso', 'tipoingreso','fa','fechaservicio', 'fecha','ficha', 'propietario', '2nivel', '3nivel', 'codigo', 'cantidad','precio','descuento', 
					 'total','pago','saldo','tipopago','comentario'],
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
		function tooltipNroFicha(value, metadata, record, rowIndex, colIndex, store) {
			if((record.data.fechaservicio != record.data.fa) && (record.data.tipoingreso == 1)){
				metadata.attr = 'style="white-space:normal; background-color: yellow; font-size:17px"';	
				metadata.attr = String.format('{0}title="{1}"', metadata.attr, record.data.fechaservicio);
			}
			return value;
		}
		function tooltipComentario(value, metadata, record, rowIndex, colIndex, store) {
			metadata.attr = String.format('{0}title="{1}"', metadata.attr, 'Comentario:\n'+record.data.comentario);
			return value;
		}
		function diferenciaT(value, metadata, record, rowIndex, colIndex, store) {
			var desc = record.data.descuento;
			var prec = record.data.precio;
			var cant = record.data.cantidad;
			prec = parseFloat(prec * cant) - parseFloat(((prec*cant) * desc)/100);
			return parseFloat(prec).toFixed(2);
		}
		function tooltipSubtotal(value, metadata, record, rowIndex, colIndex, store) {
			return parseFloat(record.data.precio * record.data.cantidad).toFixed(2); 
		}
		var storetp = new Ext.data.SimpleStore(
		{
			fields: ['codigotp', 'nombretp'],
			data : [										
						['1', 'EFECTIVO'],		
						['2', 'TRANSFERENCIA'],                      
						['3', 'TARJETA'],                      
						['4', 'CHEQUE'],                      
				],   
				autoLoad: false 		
		});
		var ProductoColumnMode = new Ext.grid.ColumnModel(  
		[
			{  
				header: 'ID',  
				dataIndex: 'codingreso',  
				width: 50,
				sortable: true,
				hidden :true
			},{  
				header: 'Fecha',  
				dataIndex: 'fecha',  
				width: 120,
				sortable: true
			},{  
				header: 'Ficha',  
				dataIndex: 'ficha',  
				width: 40,
				sortable: true,
				//renderer: tooltipNroFicha
			},{  
				header: 'Cliente',  
				dataIndex: 'propietario',  
				width: 120,
				sortable: true
			},{  
				header: 'Concepto',  
				dataIndex: '2nivel',  
				width: 150,
				sortable: true,
				renderer: tooltipComentario
			},{  
				header: 'Detalle',  
				dataIndex: '3nivel',  
				width: 150,
				sortable: true,
				renderer: tooltipComentario
			},{  
				header: 'Codigo',  
				dataIndex: 'codigo',  
				width: 50,
				sortable: true
			},{  
				header: 'Cant',  
				dataIndex: 'cantidad',  
				width: 50,
				align: 'center',
				sortable: true
			},{  
				xtype: 'numbercolumn',
				header: 'Precio',  
				dataIndex: 'precio',  
				align: 'right',
				width: 80,
				sortable: true
			},{  
				// xtype: 'numbercolumn',
				header: 'Subtotal',  
				// dataIndex: 'precio',  
				align: 'right',
				width: 80,
				renderer: tooltipSubtotal,
				sortable: true
			},{  
				xtype: 'numbercolumn',
				header: 'desc %',  
				dataIndex: 'descuento',  
				align: 'right',
				width: 80,
				sortable: true
			},{  
				// xtype: 'numbercolumn',
				header: 'Total',  
				// dataIndex: 'precio',  
				align: 'right',
				width: 70,
				renderer: diferenciaT,
				sortable: true
			},
		
			{  
				header: 'Tipo de Pago',  
				dataIndex: 'tipopago',  
				width: 100,
			
				sortable: true
			}    				        				
		]  
       );
	   function actualizarServicio(cod,tp,codpers)
		{
				Ext.Ajax.request(
					{
						url : '../servicesAjax/DSactualizarTipoPagoAJAX.php' , 
						params : {codigo : cod, tp:tp,codpers:codpers, cant:cant_a, total:total_a, pago: pago_a},
						method: 'POST', 
						success: function ( result, request ) 
						{ 
							Ext.MessageBox.alert('MSG', 'Operacion Exitosa'); 
							Ext.dsdata.storeIEA.load({params:{start:0,limit:1000}});			
						},
						failure: function ( result, request) 
						{ 
							Ext.MessageBox.alert('ERROR', result.responseText); 
						} 
					});  	
		}
	var codtp;
	var codigoi;
	var cant_a;
	var total_a;
	var pago_a;
	var editor = new Ext.ux.grid.RowEditor({
        saveText: 'Actualizar',		
		listeners: {
                    afteredit: {
                        fn:function(rowEditor, obj,data, rowIndex ){
							// 'cantidad','precio','descuento', 
					 		//'total','pago',
							codtp = Ext.dsdata.storeIEA.getAt(rowIndex).get('tipopago');
							codigoi = Ext.dsdata.storeIEA.getAt(rowIndex).get('codingreso');
							cant_a = Ext.dsdata.storeIEA.getAt(rowIndex).get('cantidad');
							var pp =  Ext.dsdata.storeIEA.getAt(rowIndex).get('precio');
							var dd =  Ext.dsdata.storeIEA.getAt(rowIndex).get('descuento');
							total_a = (cant_a * pp);
							total_a = total_a -(total_a*dd/100);
							pago_a = total_a;
							Ext.MessageBox.passwordPrompt('Codigo de Verificacion.','Introducir Codigo Administrador/Caja',verificacionAdmin_i);
                        }
                    }
                }
		});		
		storePersonal = new Ext.data.JsonStore(
		{   
			url:'../servicesAjax/DSListaPersonalCSAJAX.php',			
			root: 'data',  
			totalProperty: 'total',
			fields: ['codpersonal', 'codsistema', 'codcargo'],			
		});		
		function verificacionAdmin_i(btn, text)
		{
			if(btn == 'ok')
			{
				if(text == "")
				{
					alert("Debe Introducir Un Codigo.");
					Ext.MessageBox.passwordPrompt('Codigo de Verificacion.','Introducir Codigo Administrador/Caja',verificacionAdmin_i);
				}else{
				
					var posicion = storePersonal.find('codsistema', text);
					if(posicion >= 0)
					{
						codpersonalAdmin =  storePersonal.getAt(posicion).get('codpersonal');
						cargo =  storePersonal.getAt(posicion).get('codcargo');
						if(cargo == 1 || cargo == 5 || cargo == 2){
							actualizarServicio(codigoi,codtp,codpersonalAdmin);
						}else{
							Ext.MessageBox.show({							   
							   title:'Advertencia',
							   msg: 'Codigo invalido, desea introducir el codigo nuevamente?',
							   buttons: Ext.MessageBox.YESNO,				           
							   icon: Ext.MessageBox.WARNING,
							   multiline: false,
							   fn:function(btn){
									if(btn == 'yes')									
									{
										Ext.MessageBox.passwordPrompt('Codigo de Verificacion.','Introducir Codigo Administrador/Caja',verificacionAdmin_i);													
									}else{Ext.dsdata.storeIEA.load({params:{start:0,limit:1000}});			}
							   }
							});	
						}
					}else{
						Ext.MessageBox.show({							   
						   title:'Advertencia',
						   msg: 'Codigo invalido, desea introducir el codigo nuevamente?',
						   buttons: Ext.MessageBox.YESNO,				           
						   icon: Ext.MessageBox.WARNING,
						   multiline: false,
						   fn:function(btn){
								if(btn == 'yes')									
								{
									Ext.MessageBox.passwordPrompt('Codigo de Verificacion.','Introducir Codigo Administrador/Caja',verificacionAdmin_i);													
								}else{Ext.dsdata.storeIEA.load({params:{start:0,limit:100}});			}
						   }
						});	
					}
				}
			}
		}
	var ProductoGrid = new Ext.grid.GridPanel(
	{  
		id: 'ProductoGrid',
		store: Ext.dsdata.storeIEA, 
		region:'center',
		plugins: [editor],
		cm: ProductoColumnMode, 
		// enableColLock:false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
		bbar: pagingProductoBar,
		listeners:
		{
			render:function()
			{
				Ext.dsdata.storeIEA.load({params:{start:0,limit:1000}});		
				storePersonal.load();
			},
			// 'celldblclick' :function()
			// {
				// // ModificarProducto(indice);																			
			// }
		},
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true,
			listeners: {					
					rowselect: function(sm, row, rec)
					{  
						indice = row;									
					}      
				}
		}),		
		clicksToEdit: 1
		});		
	
		var filter = new Ext.form.TextField({name: 'filterValue'});

		var bfilter = new Ext.Toolbar.Button({
            text: 'Buscar',
            tooltip: "Utilizar '*' para busquedas ",            
            icon: '../img/view.png',
            handler: function(btn,e) {
					var o = {start : 0, limit:1000};					
					Ext.dsdata.storeIEA.baseParams['fechai'] = Ext.getCmp('fechai').getRawValue();
					Ext.dsdata.storeIEA.baseParams['fechaf'] = Ext.getCmp('fechaf').getRawValue();
					Ext.dsdata.storeIEA.reload({params:o});	
                }
        });		
						// AltaIngreso();							
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
						var filterFechaf = Ext.getCmp('fechaf').getRawValue();
						var filterFechai = Ext.getCmp('fechai').getRawValue();
						var pagina = "../servicesAjax/DSExcelReporteIngresoAjax.php?&fechai=" + filterFechai + "&fechaf=" + filterFechaf;
						var opciones = "toolbar=yes, location=no, directories=yes, status=no, menubar=yes, scrollbars=yes, resizable=no, fullscreen=yes";
						window.open(pagina,"",opciones);
					}
				}, '->',
				{
					xtype: 'datefield',
					id: 'fechai',
					allowBlank: true,			
					format : 'Y-m-d',
					value: new Date()
				},{
					xtype: 'datefield',
					id: 'fechaf',
					allowBlank: true,			
					format : 'Y-m-d',
					value: new Date()
				},'-', filter, bfilter											
			]
    });					
	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [ PAmenu, ProductoGrid]
	  }); 
});