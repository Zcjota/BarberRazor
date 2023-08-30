
  	var winComision;
	
		var codigo_c;
		var opcion;

		var txtNombre = new Ext.form.TextField({
				name: 'nom',
				hideLabel: true,	
				maxLength : 150,    
				width: 265,
				x: 100,
				y: 15,
				allowBlank: false,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							txtDescripcion.focus();
						}
					}
				}
		});	
		var txtDescripcion = new Ext.form.TextArea({
				name: 'descrip',
				hideLabel: true,	
				maxLength : 150,    
				width: 265,
				x: 100,
				y: 45,
				allowBlank: true,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							btnAceptar.focus();
						}
					}
				}
		});	
		
			
		// Labels
		var lblNombre = new Ext.form.Label({
			text: 'Nombre:',
			x: 10,
			y: 20,
			height: 70,
			cls: 'x-label'
		});	
		var lblDescripcion = new Ext.form.Label({
			text: 'Descripcion:',
			x: 10,
			y: 70,
			height: 70,
			cls: 'x-label'
		});			
		// botones

		var btnAceptar = new Ext.Button({
		    id: 'btnAceptar',
			x: 100,
			y: 125,
			text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
			style : { background :'#BCF5A9',borderRadius: '0px'},
			minWidth: 80,
			handler:function(){
				frmComision.guardarDatos();
			} 
		});		
		
		var btnLimpiar = new Ext.Button({
		    id: 'btnLimpiar',
			x: 190,
			y: 125,
			text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
			style : { background :'#F6CECE',borderRadius: '0px'},
			minWidth: 80,
			handler:function(){
				var frm = frmComision.getForm();
				frm.reset();
				frm.clearInvalid();
				winComision.hide();
			} 
		});		
		
		var frmComision = new Ext.FormPanel({ 
			frame:true, 		
			layout: 'absolute',
			items:[lblNombre,lblDescripcion,
					txtNombre,txtDescripcion,
					//btnAceptar, btnLimpiar
				],
			guardarDatos: function(){				
				if (this.getForm().isValid()) {
					this.getForm().submit({
						url: '../servicesAjax/DSabmComisionAJAX.php',						
						params :{codigo: codigo_c, opcion: opcion},	
						method: 'POST',
						waitTitle: 'Conectando',
						waitMsg: 'Enviando datos...',
						success: function(form, action){
								var frm = frmComision.getForm();
								frm.reset();
								frm.clearInvalid();
								winComision.hide();
								Ext.dsdata.storeComision.load({params:{start:0,limit:100}});
						},
						failure: function(form, action){
							if (action.failureType == 'server') {
								var data = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('No se pudo conectar', data.errors.reason, function(){
									txtNombre.focus(true, 100);
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
		function IniCompCargo()
		{
			var frm = frmComision.getForm();
			frm.reset();
			frm.clearInvalid();
		}
		function CargCompCargo(indice)
		{	
			codigo_c = Ext.dsdata.storeComision.getAt(indice).get('codigo');
			txtNombre.setValue(Ext.dsdata.storeComision.getAt(indice).get('nombre'));		
			txtDescripcion.setValue(Ext.dsdata.storeComision.getAt(indice).get('descripcion'));
		}
        function NuevoCargo(){		
			if (!winComision) {
				winComision = new Ext.Window({
					layout: 'fit',
					width: 400,
					height: 200,		
					title: 'Comision',			
					resizable: false,
					closeAction: 'hide',
					closable: true,
					draggable: false,
					plain: true,
					border: false,		
					modal: true,
					items: [frmComision],
					buttonAlign:'center',				
					buttons:[btnLimpiar,'-','-','-','-','-', btnAceptar],
					listeners: {				
						show: function(){
							IniCompCargo();
							txtNombre.focus(true, 300);
						}
					}
				});
			}		
			opcion = 0;
			winComision.show();
		}
		function ModificarCargo(indice){		
			if (!winComision) {
				winComision = new Ext.Window({
					layout: 'fit',
					width: 400,
					height: 200,		
					title: 'Comision',			
					resizable: false,
					closeAction: 'hide',
					closable: true,
					draggable: false,
					plain: true,
					border: false,				
					modal: true,					
					items: [frmComision],
					buttonAlign:'center',				
					buttons:[btnLimpiar,'-','-','-','-','-', btnAceptar],
					listeners: {				
						show: function(){
							IniCompCargo();
							txtNombre.focus(true, 300);
							}
					}
				});
			}		
			opcion = 1;		
			winComision.show();
			CargCompCargo(indice);
		}
