		var winPersonal;	
		var codigo;
		var opcion;
		Ext.namespace('Ext.dsdata');
		var txtNombrePersonal = new Ext.form.TextField({
				name: 'txtnombre',
				hideLabel: true,	
				maxLength : 150,    
				width: 265,
				x: 100,
				y: 10,
				allowBlank: false,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							txtapp.focus();
						}
					}
				}
		});	
		var txtapp = new Ext.form.TextField({
				name: 'txtapp',
				hideLabel: true,	
				maxLength : 150,    
				width: 265,
				x: 100,
				y: 40,
				allowBlank: false,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							txtapm.focus();
						}
					}
				}
		});			
		var txtapm = new Ext.form.TextField({
				name: 'txtapm',
				hideLabel: true,	
				maxLength : 150,    
				width: 265,
				x: 100,
				y: 70,
				allowBlank: false,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							txtnit.focus();
						}
					}
				}
		});		
		var txtnit = new Ext.form.NumberField({
				name: 'txtnit',
				hideLabel: true,	
				maxLength : 18,    
				width: 265,
				x: 100,
				y: 100,
				allowBlank: false,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							txtFechaIngreso.focus();
						}
					}
				}
		});				
		var txtFechaIngreso = new Ext.form.DateField({
			name: 'tfechaI',
			hideLabel: true, 
			maxLength :10,
			width: 265,
			x: 100,	
			y: 130,				
			format : 'd/m/Y',
			allowBlank: true,			
			enableKeyEvents: true,
			selectOnFocus: true,
			listeners: {
				keypress: function(t,e){				
					if(e.getKey()==13){
							cboCargo.focus(true, 300);					    					
					}
				}
			}				
		});
		Ext.dsdata.storeCargo = new Ext.data.JsonStore(
		{   
			url:'../servicesAjax/DSListaCargoCBAJAX.php',			
			root: 'data',  
			totalProperty: 'total',
			fields: ['codcargo', 'nombcargo']			
		});		
		Ext.dsdata.storeCargo.load();
		var cboCargo = new Ext.form.ComboBox(
		{   			
			hiddenName: 'cbcargo',		
			width: 185,		
			x: 100,
			y: 160,
			typeAhead: true,					
			forceSelection: true,
			allowBlank: false,
			store: Ext.dsdata.storeCargo, 	
			mode: 'local',
			forceSelection: true,
			triggerAction: 'all',
			selectOnFocus: true,
			editable: false,		
			valueField: 'codcargo',			
			displayField:'nombcargo',
			listeners: {
					'select': function(cmb,record,index)
						{
							txthorario.focus();
						}	          
			}		
		});	
		Ext.dsdata.storeComision = new Ext.data.JsonStore(
			{   
				url:'../servicesAjax/DSListaComisionCBAJAX.php',			
				root: 'data',  
				totalProperty: 'total',
				fields: ['codc', 'nombc']			
			});		
			Ext.dsdata.storeComision.load();
			var cboComision = new Ext.form.ComboBox(
			{   			
				hiddenName: 'cbcomision',		
				width: 265,		
				x: 100,
				y: 190,
				typeAhead: true,					
				forceSelection: true,
				allowBlank: false,
				store: Ext.dsdata.storeComision, 	
				mode: 'local',
				forceSelection: true,
				triggerAction: 'all',
				selectOnFocus: true,
				editable: false,		
				valueField: 'codc',			
				displayField:'nombc',
				listeners: {
						'select': function(cmb,record,index)
							{
								txthorario.focus();
							}	          
				}		
			});	
		var txthorario = new Ext.form.TextField({
				name: 'txthorario',
				hideLabel: true,	
				maxLength : 100,    
				width: 265,
				x: 100,
				y: 220,
				allowBlank: false,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							txtCodSystem.focus();
						}
					}
				}
		});				
		var txtsueldo = new Ext.form.NumberField({
				name: 'txtsueldo',
				hideLabel: true,
				maxLength : 4,    
				width: 95,
				x: 100,
				y: 250,
				allowBlank: false,
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							btnAceptar_p.focus();
						}
					}
				}
		});	
		var txtCodSystem = new Ext.form.NumberField({
				name: 'txtcodsys',
				hideLabel: true,
				maxLength : 4,    
				width: 40,
				x: 325,
				y: 250,
				allowBlank: false,
				inputType:'password', 
				style : {textTransform: "uppercase"},
				blankText: 'Campo requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							btnAceptar_p.focus();
						}
					}
				}
		});	
		var PAmenuC = new Ext.Panel({	      
        id: 'PAcabecera1R',      
		border:5,		
		minWidth: 80,			
		x: 300,
		y: 155,				
        tbar: [
				{		
					text:'<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Cargo</a>',
					icon: '../img/Nuevo.png',										
					handler: function(t)
					{							
						NuevoCargo();
					}					
				}										
			]
		});		
	
		// Labels
		var lblNombre = new Ext.form.Label({
			text: 'Nombre:',
			x: 10,
			y: 15,
			height: 70,
			cls: 'x-label'
		});
		var lblapp = new Ext.form.Label({
			text: 'Apellido P.:',
			x: 10,
			y: 45,
			height: 70,
			cls: 'x-label'
		});		
		var lblapm = new Ext.form.Label({
			text: 'Apellido M.:',
			x: 10,
			y: 75,
			height: 70,
			cls: 'x-label'
		});	
		var lblnit = new Ext.form.Label({
			text: 'C.I:',
			x: 10,
			y: 105,
			height: 70,
			cls: 'x-label'
		});				
		var lblfn = new Ext.form.Label({
			text: 'Fecha Ingreso:',
			x: 10,
			y: 135,
			height: 70,
			cls: 'x-label'
		});	
		var lblcargo = new Ext.form.Label({
			text: 'Cargo:',
			x: 10,
			y: 165,
			height: 70,
			cls: 'x-label'
		});
		var lblcomision = new Ext.form.Label({
			text: 'Comision:',
			x: 10,
			y: 195,
			height: 70,
			cls: 'x-label'
		});
		var lblhorario = new Ext.form.Label({
			text: 'Horario:',
			x: 10,
			y: 225,
			height: 70,
			cls: 'x-label'
		});			
		var lblsueldo = new Ext.form.Label({
			text: 'Sueldo en Bs.:',
			x: 10,
			y: 255,
			height: 70,
			cls: 'x-label'
		});			
		var lblcodsystem = new Ext.form.Label({
			text: 'Cod. System:',
			x: 220,
			y: 255,
			height: 70,
			cls: 'x-label'
		});			
		// botones

		var btnAceptar_p = new Ext.Button({
		    id: 'btnAceptarp',
			x: 120,
			y: 225,
			// icon: '../img/save.png',
			// iconCls: 'x-btn-text-icon',
			text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
			style : { background :'#BCF5A9',borderRadius: '0px'},
			minWidth: 80,
			handler:function(){
				frmPersonal.guardarDatos();
			} 
		});		
		
		var btnLimpiar_p = new Ext.Button({
		    id: 'btnLimpiarp',
			x: 210,
			y: 225,
			// icon: '../img/delete.png',
			// iconCls: 'x-btn-text-icon',
			text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
			style : { background :'#F6CECE',borderRadius: '0px'},
			minWidth: 80,
			handler:function(){
				IniCompPersonal();
				winPersonal.hide();
			} 
		});		
		
		var frmPersonal = new Ext.FormPanel({ 
			frame:true, 	
			autoScroll:false,	
			layout:'absolute',			
			items:[	lblNombre,lblapp,lblapm,lblnit,lblfn,lblcargo, lblcomision, lblhorario, lblsueldo, lblcodsystem,
					txtNombrePersonal,txtapp,txtapm,txtnit,txtFechaIngreso,cboCargo,PAmenuC, cboComision, txthorario, txtsueldo, txtCodSystem
			],
			guardarDatos: function(){				
				if (this.getForm().isValid()) {
					this.getForm().submit({
						url: '../servicesAjax/DSabmPersonalAJAX.php',						
						params :{codigo: codigo, opcion: opcion},	
						method: 'POST',
						waitTitle: 'Conectando',
						waitMsg: 'Enviando datos...',
						success: function(form, action){
								var frm = frmPersonal.getForm();
								frm.reset();
								frm.clearInvalid();
								winPersonal.hide();
								Ext.dsdata.storePersonal.load({params:{start:0,limit:100}});
						},
						failure: function(form, action){
							if (action.failureType == 'server') {
								var data = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('No se pudo conectar', data.errors.reason, function(){
									txtNombrePersonal.focus(true, 1000);
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
		function IniCompPersonal()
		{
			var frm = frmPersonal.getForm();
			frm.reset();
			frm.clearInvalid();
		}
		function CargCompPersonal(indice)
		{
			codigo = Ext.dsdata.storePersonal.getAt(indice).get('codigo');		
			txtNombrePersonal.setValue(Ext.dsdata.storePersonal.getAt(indice).get('nombre'));					
			txtapp.setValue(Ext.dsdata.storePersonal.getAt(indice).get('app'));			
			txtapm.setValue(Ext.dsdata.storePersonal.getAt(indice).get('apm'));			
			txtnit.setValue(Ext.dsdata.storePersonal.getAt(indice).get('nit'));			
			txtFechaIngreso.setValue(Ext.dsdata.storePersonal.getAt(indice).get('fecha_ingreso'));			
			cboCargo.setValue(Ext.dsdata.storePersonal.getAt(indice).get('cod_cargo'));			
			cboComision.setValue(Ext.dsdata.storePersonal.getAt(indice).get('codtb'));			
			txtCodSystem.setValue(Ext.dsdata.storePersonal.getAt(indice).get('codsistema'));	
			txthorario.setValue(Ext.dsdata.storePersonal.getAt(indice).get('horario'));			
			txtsueldo.setValue(Ext.dsdata.storePersonal.getAt(indice).get('sueldo'));			
		}
        function NuevoPersonal(){		
			if (!winPersonal) {
				winPersonal = new Ext.Window({
					layout: 'fit',
					width: 420,
					height: 360,		
					title: 'Personal',			
					resizable: false,
					closeAction: 'hide',
					closable: true,
					draggable: false,
					plain: true,
					border: false,		
					modal: true,
					items: [frmPersonal],
					buttonAlign:'center',
					buttons:[btnAceptar_p,'-','-','-','-','-', btnLimpiar_p],
					listeners: {				
						show: function(){
							IniCompPersonal();
							txtNombrePersonal.focus(true, 300);
						}
					}
				});
			}		
			opcion = 0;
			winPersonal.show();
		}
		
		function ModificarPersonal(indice){		
			if (!winPersonal) {
				winPersonal = new Ext.Window({
					layout: 'fit',
					width: 420,
					height: 360,			
					title: 'Personal',			
					resizable: false,
					closeAction: 'hide',
					closable: true,					
					draggable: false,
					plain: true,
					border: false,				
					modal: true,					
					items: [frmPersonal],
					buttonAlign:'center',
					buttons:[btnAceptar_p,'-','-','-','-','-', btnLimpiar_p],
					listeners: {				
						show: function(){
							IniCompPersonal();
							txtNombrePersonal.focus(true, 300);
						}
					}
				});
			}		
			opcion = 1;			
			winPersonal.show();
			CargCompPersonal(indice);
		}
