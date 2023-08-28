		var win_ts;	
		var codigo_ts;
		var opcion_ts;
		Ext.namespace('Ext.dsdata');
		var spot = new Ext.ux.Spotlight({
			easing: 'easeOut',
			duration: .9
		});
		var updateSpot = function(id){
			if(typeof id == 'string'){
				spot.show(id);
			}else if (!id && spot.active){
				spot.hide();
			}
		};
		storeServicio = new Ext.data.JsonStore(
		{   
			url:'../servicesAjax/DSListaServicioCBAJAX.php',			
			root: 'data',  
			totalProperty: 'total',
			fields: ['codservicio', 'nombservicio']			
		});		
		storeServicio.load();
		var cboServicio_ts = new Ext.form.ComboBox(
		{   			
			hiddenName: 'cbservicio_ts',		
			fieldLabel: 'Servicio',	
			anchor:'100%',
			typeAhead: true,					
			forceSelection: true,
			allowBlank: false,
			store: storeServicio, 
			emptyText: 'Seleccionar servicio.',
			mode: 'local',
			forceSelection: true,
			triggerAction: 'all',
			selectOnFocus: true,
			editable: false,		
			valueField: 'codservicio',			
			displayField:'nombservicio',
			listeners: {
					'select': function(cmb,record,index)
						{
							txtNombreCuenta.focus(true,300);
						}	          
			}		
		});	
		var myDataTipoPrecio = [['1','FIJO'],['2','VARIBLE'],['3','PROMOCION']];
		var storetipoprecio = new Ext.data.ArrayStore({
			fields: ['cod','nomb']
		});

		storetipoprecio.loadData(myDataTipoPrecio);	
		var cboTipoPrecio_ts = new Ext.form.ComboBox(
			{
				//id: 'cbestado_d',		
				hiddenName: 'cbtipoprecio_ts',		
				fieldLabel: 'Tipo Precio',
				anchor:'100%',
				typeAhead: true,					
				forceSelection: true,
				allowBlank: false,
				store: storetipoprecio, 	
				mode: 'local',
				style : {textTransform: "uppercase"},
				// emptyText:'oblig.',
				forceSelection: true,
				triggerAction: 'all',
				selectOnFocus: true,
				editable: false,		
				valueField: 'cod',			
				displayField:'nomb',
			}
		);	
		var btnAceptar_ts = new Ext.Button({
		    id: 'btnAceptar_ts',
			x: 150,
			y: 265,
			text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
			style : { background :'#BCF5A9',borderRadius: '0px'},
			minWidth: 80,
			handler:function(){
				frm_ts.guardarDatos();
			} 
		});
		
		var btnLimpiar_ts = new Ext.Button({
		    id: 'btnLimpiar_ts',
			x: 245,
			y: 265,
			text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
			style : { background :'#F6CECE',borderRadius: '0px'},
			minWidth: 80,
			handler:function(){
				IniCompPermiso_ts();
				win_ts.hide();
			} 
		});	
		var frm_ts = new Ext.FormPanel({ 
			id:'frm_ts',
			frame:true, 	
			autoScroll:true,		
			labelAlign: 'top',
			layout: 'column',		
			items:[	
				{
					columnWidth:1,
					layout: 'form',
					defaultType: 'combo',
					items: [
						cboServicio_ts
					]
				},{
					columnWidth:1,
					layout: 'form',
					defaultType: 'textfield',
					items: [
						{
							name: 'nombre_ts',
							id: 'nombre_ts',
							fieldLabel: 'Nombre',
							anchor:'100%',
							maxLength : 100,    
							allowBlank	: false,
							readOnly: false,
							//style : {textTransform: "uppercase", background : '#CDCDCD', color : 'black',fontSize: '1.6em' ,borderRadius: '4px',textAlign: 'right'},
							style : {textTransform: "uppercase"},
							blankText: 'Campo requerido',
							enableKeyEvents: true,
							selectOnFocus: true,
							//value:0
						}
					]
				},{
					columnWidth:1,
					layout: 'form',
					defaultType: 'combo',
					items: [
						cboTipoPrecio_ts
					]
				},{
					columnWidth:.5,
					layout: 'form',
					defaultType: 'numberfield',
					items: [
						{
							name: 'precio_ts',
							id: 'precio_ts',
							fieldLabel: 'Precio',
							anchor:'95%',
							maxLength : 10,    
							allowBlank	: false,
							readOnly: false,
							//style : {textTransform: "uppercase", background : '#CDCDCD', color : 'black',fontSize: '1.6em' ,borderRadius: '4px',textAlign: 'right'},
							style : {textTransform: "uppercase"},
							blankText: 'Campo requerido',
							enableKeyEvents: true,
							selectOnFocus: true,
							//value:0
						}
					]
				},{
					columnWidth:.5,
					layout: 'form',
					defaultType: 'numberfield',
					items: [
						{
							name: 'orden_ts',
							id: 'orden_ts',
							fieldLabel: 'Orden',
							anchor:'100%',
							maxLength : 10,    
							allowBlank	: false,
							readOnly: false,
							//style : {textTransform: "uppercase", background : '#CDCDCD', color : 'black',fontSize: '1.6em' ,borderRadius: '4px',textAlign: 'right'},
							style : {textTransform: "uppercase"},
							blankText: 'Campo requerido',
							enableKeyEvents: true,
							selectOnFocus: true,
							//value:0
						}
					]
				}
			],
			guardarDatos: function(){				
				if (this.getForm().isValid()) {
					this.getForm().submit({
						url: '../servicesAjax/DSabmTipoServicioAJAX.php',						
						params :{codigo: codigo_ts, opcion: opcion_ts},	
						method: 'POST',
						waitTitle: 'Conectando',
						waitMsg: 'Enviando datos...',
						success: function(form, action){
								var frm = frm_ts.getForm();
								frm.reset();
								frm.clearInvalid();
								win_ts.hide();
								Ext.dsdata.storeTipoServicio.load({params:{start:0,limit:100}});
						},
						failure: function(form, action){
							if (action.failureType == 'server') {
								var data = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('No se pudo conectar', data.errors.reason, function(){
									txtNombreCuenta.focus(true, 1000);
								});
							}
							else {
								Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
							}					
						}
					});
				}
			}
		});		
		function IniCompPermiso_ts()
		{
			var frm = frm_ts.getForm();
			frm.reset();
			frm.clearInvalid();
		}
	
        function NuevoServicio(){		
			if (!win_ts) {
				win_ts = new Ext.Window({
					layout: 'fit',
					width: 290,
					height: 400,		
					title: 'Tipo Servicio',			
					resizable: false,
					closeAction: 'hide',
					closable: true,
					draggable: false,
					plain: true,
					border: false,		
					modal: true,
					items: [frm_ts],
					buttonAlign:'center',				
					buttons:[
						btnLimpiar_ts,'-','-','-','-','-', btnAceptar_ts
					],
					listeners: {					
						show: function(){
							IniCompPermiso_ts();
						},
						hide: function(){
							updateSpot(false);
						}
					}
				});
			}		
			opcion_ts = 0;
			win_ts.show();
			updateSpot('frm_ts');
		}
		
		function ModificarServicio(indice_ts){		
			if (!win_ts) {
				win_ts = new Ext.Window({
					layout: 'fit',
					width: 420,
					height: 400,		
					title: 'Tipo Servicio',			
					resizable: false,
					closeAction: 'hide',
					closable: true,					
					draggable: false,
					plain: true,
					border: false,				
					modal: true,					
					items: [frm_ts],
					buttonAlign:'center',				
					buttons:[
						btnLimpiar_ts,'-','-','-','-','-', btnAceptar_ts
					],
					listeners: {					
						show: function(){
							IniCompPermiso_ts();
						},
						hide: function(){
							updateSpot(false);
						}
					}
				});
			}		
			opcion_ts = 1;			
			win_ts.show();
			updateSpot('frm_ts');
			cargarDatos_ts(indice_ts);
		}
		function cargarDatos_ts(indicedatos)
		{
			codigo_ts = Ext.dsdata.storeTipoServicio.getAt(indicedatos).get('codigo');
			Ext.getCmp('nombre_ts').setValue(Ext.dsdata.storeTipoServicio.getAt(indicedatos).get('nombre'));			
			Ext.getCmp('precio_ts').setValue(Ext.dsdata.storeTipoServicio.getAt(indicedatos).get('precio'));			
			Ext.getCmp('orden_ts').setValue(Ext.dsdata.storeTipoServicio.getAt(indicedatos).get('orden'));			
			cboServicio_ts.setValue(Ext.dsdata.storeTipoServicio.getAt(indicedatos).get('codservicio'));			
			cboTipoPrecio_ts.setValue(Ext.dsdata.storeTipoServicio.getAt(indicedatos).get('codtipoprecio'));			
		}