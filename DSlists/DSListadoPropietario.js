/*!
 * RAZOR -DEV
 * Copyright(c) 2015
 */


Ext.onReady(function () {
	Ext.namespace('Ext.dsdata');
	var indice = 'e';
	var datosGrid_cc = [];
	var registros_cc = [];
	Ext.dsdata.storePropietario = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaPropietarioAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: [
			"codigo", "nombfactura", "nit", "nombre", "app", "apm", "nombre_completo", "telefono",
			"celular", "direccion", "mail", "ref_corte", "b_principal", "b_principal_n", "b_auxiliar", "corte", 
			"cod_tp", "adulto", "edad", "cod_vinculacion","nacimiento"
		]
	});

	var pagingPropietarioBar = new Ext.PagingToolbar({
		pageSize: 1000,
		store: Ext.dsdata.storePropietario,
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
	function tooltipGrilla(value, metadata, record, rowIndex, colIndex, store) {
		metadata.attr = String.format('{0}title="{1}"', metadata.attr, value);
		return value;
	}
	function tooltipNombre(value, metadata, record, rowIndex, colIndex, store) {
		metadata.attr = String.format('{0}title="{1}"', metadata.attr, record.data.nombre_completo);
		return value;
	}

	var sm_ac = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false,
		listeners: {
			rowselect: function (sm, row, rec) {
				indice = row;
			},
		}
	});
	var PropietarioColumnMode = new Ext.grid.ColumnModel(
		[
			{
				header: 'ID',
				dataIndex: 'codigo',
				width: 50,
				sortable: true,
				hidden: true
			}, {
				header: 'Cortes',
				dataIndex: 'corte',
				width: 60,
				sortable: true,
				renderer: tooltipNombre
			}, {
				header: 'Nombre',
				dataIndex: 'nombre',
				width: 100,
				sortable: true,
				renderer: tooltipNombre
			}, {
				header: 'Ap. Paterno',
				dataIndex: 'app',
				width: 100,
				sortable: true,
				renderer: tooltipNombre
			}, {
				header: 'Celular',
				dataIndex: 'celular',
				width: 65,
				sortable: true,
			}, {
				header: 'Nombre Factura',
				dataIndex: 'nombfactura',
				width: 150,
				sortable: true,
				renderer: tooltipGrilla
			}, {
				header: 'NIT',
				dataIndex: 'nit',
				width: 150,
				sortable: true,
				renderer: tooltipGrilla
			}, {
				header: 'Barbero Principal',
				dataIndex: 'b_principal_n',
				width: 150,
				sortable: true,
				renderer: tooltipGrilla
			}, {
				header: 'Ref. Corte',
				dataIndex: 'ref_corte',
				width: 200,
				sortable: true,
				renderer: tooltipGrilla
			}
		]
	);

	var PropietarioGrid = new Ext.grid.GridPanel({
		id: 'PropietarioGrid',
		store: Ext.dsdata.storePropietario,
		region: 'center',
		cm: PropietarioColumnMode,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingPropietarioBar,
		listeners: {
			render: function () {
				Ext.dsdata.storePropietario.load({ params: { start: 0, limit: 1000 } });
			},
			'celldblclick': function () {
				ModificarCliente(indice);
			}
		},
		sm: sm_ac,
		clicksToEdit: 2,
	});

	var filter = new Ext.form.TextField({
		name: 'filterValue', enableKeyEvents: true, listeners: {
			keypress: function (t, e) {
				if (e.getKey() == 13) {
					busqueda_p();
				}
			}
		}
	});
	function busqueda_p() {
		var filterVal = filter.getValue();
		var o = { start: 0, limit: 1000 };
		Ext.dsdata.storePropietario.baseParams['buscar'] = filterVal;
		Ext.dsdata.storePropietario.reload({ params: o });
	}
	var bfilter = new Ext.Toolbar.Button({
		text: 'Buscar',
		tooltip: "Utilizar '*' para busquedas ",
		icon: '../img/view.png',
		handler: function (btn, e) {
			busqueda_p();
		}
	});
	function succesfunction(resp) {
		var msj = Ext.util.JSON.decode(resp.responseText);
		if (msj.message.id == '99') {
			Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
				window.open("../");
			});
		} else if (msj.message.id == '2') {
			Ext.MessageBox.alert('Mensaje', msj.message.reason);
			Ext.dsdata.storePropietario.load({ params: { start: 0, limit: 1000 } });
		} else { Ext.MessageBox.alert('Error', msj.message.reason); }
	}

	var PAmenu = new Ext.Panel({
		renderTo: Ext.getBody(),
		region: 'north',
		id: 'PAcabecera1',
		height: 29,
		tbar: [
			{
				id: 'nuev',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Nuevo</a>',
				icon: '../img/Nuevo.png',
				handler: function (t) {
					altaCliente();
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					var cont_ac = 0;
					var pos_ac = 0;
					sm_ac.each(function (record) {
						cont_ac++;
						pos_ac = Ext.dsdata.storePropietario.find('codigo', record.data.codigo);
					});
					if (cont_ac == 1) {
						ModificarCliente(pos_ac);
					} else {
						Ext.MessageBox.alert('Alerta de Mensaje.', 'Debe Seleccionar un Registro.');
					}
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'elim',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Eliminar</a>',
				icon: '../img/Eliminar.png',
				handler: function (t) {
					var cont_ac = 0;
					var pos_ac = 0;
					sm_ac.each(function (record) {
						cont_ac++;
						pos_ac = Ext.dsdata.storePropietario.find('codigo', record.data.codigo);
					});
					if (cont_ac == 1) {
						Ext.MessageBox.show({
							title: 'Advertencia.',
							msg: 'Está seguro que desea eliminar el registro seleccionado..?',
							width: 400,
							height: 200,
							buttons: Ext.MessageBox.YESNO,
							icon: Ext.MessageBox.WARNING,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../servicesAjax/DSBajaPropietarioAJAX.php',
										params: { codigo: Ext.dsdata.storePropietario.getAt(pos_ac).get('codigo') },
										method: 'POST',
										success: succesfunction
									});
								}
							}
						});
					} else {
						Ext.MessageBox.alert('Alerta de Mensaje.', 'Debe Seleccionar un Registro.');
					}
				}
			 }, '-'
			 //, {
			// 	id: 'modfPin',
			// 	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Resetear Codigo de Seguridad</a>',
			// 	icon: '../img/password.png',
			// 	handler: function (t) {
			// 		if (indice != 'e') {
			// 			cambiarPin(indice)
			// 		}
			// 		else {
			// 			Ext.MessageBox.alert('Alerta de Mensaje.', 'Debe Seleccionar un Registro.');
			// 		}
			// 	}
			// }
			, '->', filter, bfilter
		]
	});

	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [PAmenu, PropietarioGrid]
	});
/**
     * formulario de reset PIN
     */
 var winResetPin, codpropietariopin;
 var btnAceptar_pines = new Ext.Button({
	 id: 'btnAceptar_pines',
	 x: 150,
	 y: 265,
	 text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
	 style: { background: '#BCF5A9', borderRadius: '0px' },
	 minWidth: 80,
	 handler: function () {
		 if(Ext.getCmp('txtpinreset').getValue() != ''){
			 // Ext.MessageBox.alert('Alerta de Mensaje.','Pendiente.');
			 frmResetPin.guardarDatos();
		 } else {
			 Ext.MessageBox.alert('Alerta de Mensaje.','Dato Ingresado Invalido.');
		 }
	 }
 });
 var btnLimpiar_pin = new Ext.Button({
	 id: 'btnLimpiar_pin',
	 text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
	 style: { background: '#F6CECE', borderRadius: '0px' },
	 minWidth: 80,
	 handler: function () {
		 IniComponente_pin();
		 winResetPin.hide();
	 }
 });
 var frmResetPin = new Ext.FormPanel({
	 id: 'fm_pin',
	 frame: true,
	 autoScroll: true,
	 // labelAlign: 'left',
	 // layout: 'column',
	 items: [
		 {
			 xtype: 'fieldset',
			 layout: 'column',
			 title: '<font color= black> Máximo 4 Digitos.</font>',
			 width: 425,
			 height: 60,
			 items: [
				 {
					 columnWidth: 1,
					 layout: 'form',
					 defaultType: 'textfield',
					 items: [
						 {
							 name: 'txtpinreset',
							 id: 'txtpinreset',
							 hideLabel: true,
							 anchor: '100%',
							 maxLength: 4,
							 allowBlank: false,
							 inputType: 'password',
							 blankText: 'Maximo 4 Digitos',
							 enableKeyEvents: true,
							 selectOnFocus: true,
							 listeners: {
								 keypress: function (t, e) {
									 if (e.getKey() == 13) {
										 btnAceptar_pines.focus();
									 }
								 }
							 }
						 }
					 ]
				 }
			 ]
		 }
	 ],
	 guardarDatos: function () {
		 if (this.getForm().isValid()) {
			 this.getForm().submit({
				 url: '../servicesAjax/DSmodificarPinPropietarioAjax.php',
				 params: { codigo: codpropietariopin },
				 method: 'POST',
				 waitTitle: 'Conectando',
				 waitMsg: 'Enviando Datos...',
				 success: function (form, action) {
					 winResetPin.hide();
					 Ext.MessageBox.alert('Alerta de Mensaje.', 'Se Guardó Correctamente.');
					 Ext.dsdata.storePropietario.load({ params: { start: 0, limit: 100 } });	
				 },
				 failure: function (form, action) {
					 if (action.failureType == 'server') {
						 var data = Ext.util.JSON.decode(action.response.responseText);
						 if (data.errors.id == '99') {
							 Ext.Msg.alert('Error', data.errors.reason, function () {
								 window.open("../../");
								 // abrirLogin();
							 });
						 } else {
							 Ext.Msg.alert('Error', data.errors.reason, function () {
								 // txtClave.focus(true, 100);
							 });
						 }
					 }
					 else {
						 Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
					 }
				 }
			 });
		 }
	 }
 });
 function IniComponente_pin() {
	 var frm = frmResetPin.getForm();
	 frm.reset();
	 frm.clearInvalid();
 }
 var codPersonal;
 function cambiarPin(indice) {
	 if (!winResetPin) {
		 winResetPin = new Ext.Window({
			 layout: 'fit',
			 width: 450,
			 height: 145,
			 resizable: false,
			 closeAction: 'hide',
			 closable: true,
			 draggable: false,
			 plain: true,
			 border: false,
			 modal: false,
			 items: [frmResetPin],
			 buttonAlign: 'center',
			 buttons: [btnAceptar_pines, '-', '-', btnLimpiar_pin],
			 listeners: {
				 show: function () {
					 IniComponente_pin();
					 Ext.getCmp('txtpinreset').focus(true, 300);
				 },
				 hide: function () {
					 updateSpot(false);
				 }
			 }
		 });
	 }
	 codpropietariopin = Ext.dsdata.storePropietario.getAt(indice).get('codigo');
	 propietario = Ext.dsdata.storePropietario.getAt(indice).get('nombre_completo');
	 winResetPin.setTitle(`Resetear Codigo de Seguridad de: ${propietario}`);
	 winResetPin.show();
	 updateSpot('fm_pin');
 }
 var spot = new Ext.ux.Spotlight({
	 easing: 'easeOut',
	 duration: 1.5
 });
 var updateSpot = function (id) {
	 if (typeof id == 'string') {
		 spot.show(id);
	 } else if (!id && spot.active) {
		 spot.hide();
	 }
 };
});

