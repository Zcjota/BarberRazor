/*!
 * RAZOR-JR
 * Copyright(c) 2023
 */

Ext.onReady(function () {
	Ext.namespace('Ext.dsdata');
	var indice = 'e';
	Ext.dsdata.storePersonal = new Ext.data.JsonStore(
		{
			url: '../servicesAjax/DSlistaPersonalAjax.php',
			root: 'data',
			totalProperty: 'total',
			fields: [
				'codigo', 'fecha_ingreso', 'nombre', 'app', 'apm', 'nombreC',
				'cod_cargo', 'cargo', 'nit', 'codsistema', 'horario', 'sueldo',
				'codtb', 'comision', 'cod_ns', 'seguridad'],
			listeners: {
				load: function (thisStore, record, ids) {
					//alert(Ext.dsdata.storeRubro.getAt(0).get('configuracion'))															
					// configuracionRoles(record[0].data.configuracion)
				}
			}
		});

	var pagingPersonalBar = new Ext.PagingToolbar(
		{
			pageSize: 100,
			store: Ext.dsdata.storePersonal,
			displayInfo: true,
			afterPageText: 'de {0}',
			beforePageText: 'Pag.',
			firstText: 'Primera Pag.',
			lastText: 'Ultima Pag.',
			nextText: 'Siguiente Pag.',
			prevText: 'Pag. Previa',
			refreshText: 'Refrescar',
			displayMsg: 'Desplegando del {0} - {1} de {2}',
			emptyMsg: "No hay elementos para desplegar.",

		});

	var PersonalColumnMode = new Ext.grid.ColumnModel(
		[
			{
				header: 'ID',
				dataIndex: 'codigo',
				width: 50,
				sortable: true,
				hidden: true
			}, {
				header: 'Personal',
				dataIndex: 'nombreC',
				width: 200,
				sortable: true
			}, {
				header: 'C.I',
				dataIndex: 'nit',
				width: 80,
				sortable: true
			}, {
				header: 'Cargo',
				dataIndex: 'cargo',
				width: 100,
				sortable: true
			}, {
				header: 'Comision',
				dataIndex: 'comision',
				width: 100,
				sortable: true
			}, {
				header: 'Horario',
				dataIndex: 'horario',
				width: 200,
				sortable: true
			}, {
				xtype: 'numbercolumn',
				header: 'Sueldo',
				dataIndex: 'sueldo',
				width: 100,
				sortable: true
			}, {
				header: 'Fecha Ingreso',
				dataIndex: 'fecha_ingreso',
				width: 100,
				sortable: true
			}, {
				header: 'Seguridad',
				dataIndex: 'seguridad',
				width: 150,
				align: 'center',
				sortable: true
			},
		]
	);

	var PersonalGrid = new Ext.grid.GridPanel(
		{
			id: 'PersonalGrid',
			store: Ext.dsdata.storePersonal,
			region: 'center',
			cm: PersonalColumnMode,
			enableColLock: false,
			stripeRows: true,
			selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
			bbar: pagingPersonalBar,
			listeners: {
				render: function () {
					Ext.dsdata.storePersonal.load({ params: { start: 0, limit: 100 } });
				}
			},
			sm: new Ext.grid.RowSelectionModel({
				singleSelect: true,
				listeners: {
					rowselect: function (sm, row, rec) {
						indice = row;
					}
				}
			})
		});

	var filter = new Ext.form.TextField({ name: 'filterValue',emptyText: "BUSQUEDAS *", style: { textTransform: "uppercase", background: '#FFFFFF' } });

	var bfilter = new Ext.Toolbar.Button({
		text: 'Buscar',
		tooltip: "Utilizar '*' para busquedas ",
		icon: '../img/view.png',
		handler: function (btn, e) {
			var filterVal = filter.getValue();
			if (filterVal.length > 0) {
				var o = { start: 0, limit: 100 };
				Ext.dsdata.storePersonal.baseParams['buscar'] = filterVal;
				Ext.dsdata.storePersonal.reload({ params: o });
			} else {
				Ext.dsdata.storePersonal.clearFilter();
			}
		}
	});

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
					// opp = 1;
                    // op_NS = 0;
                    // cod_up_NS_global = 1;
                    // Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
					NuevoPersonal();

				}
			},
			{
				xtype: 'tbseparator'
			},
			{
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					// if(indice != 'e'){
                    //     opp = 2;
                    //     op_NS = 0;
                    //     cod_up_NS_global = 1;
                    //     Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
                    // }
                    // else{
                    //     Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Registro.');
                    // }
					console.log(Ext.dsdata.storePersonal.getAt(indice).get('codsistema'));
					console.log(Ext.dsdata.storePersonal.getAt(indice).get('nit'));
					ModificarPersonal(indice);

				}
			},
			{
				xtype: 'tbseparator'
			},
			{
				id: 'elim',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Eliminar</a>',
				icon: '../img/Eliminar.png',
				handler: function (t) {
					if (indice != 'e') {
						// opp = 3;
                        // op_NS = 0;
                        // cod_up_NS_global = 1;
                        // Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
						Ext.MessageBox.show({
							title: 'Adbertencia',
							msg: 'Esta seguro que desea eliminar el registro seleccionado..?',
							buttons: Ext.MessageBox.YESNO,
							icon: Ext.MessageBox.WARNING,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request(
										{
											url: '../servicesAjax/DSBajaPersonalAJAX.php',
											params: { codigo: Ext.dsdata.storePersonal.getAt(indice).get('codigo') },
											method: 'POST',
											success: function (result, request) {
												Ext.MessageBox.alert('MSG', 'Registro Desactivado');
												Ext.dsdata.storePersonal.load({ params: { start: 0, limit: 100 } });
											},
											failure: function (result, request) {
												Ext.MessageBox.alert('ERROR', result.responseText);
											}
										});
								}
							}
						});
					} else { alert('Seleccione un registro por favor.....!'); }
				}
			}, '-', {
				id: 'asignarseguridad',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Asignar Nivel Seguridad</a>',
				icon: '../img/check.png',
				handler: function (t) {
					if (indice != 'e') {
						Ext.MessageBox.show({
							title: 'Alerta de Advertencia.',
							msg: `Está Seguro en Asiganarle un Nivel de Seguridad al Personal: ${Ext.dsdata.storePersonal.getAt(indice).get('nombre')} ?`,
							width: 400,
							height: 200,
							buttons: Ext.MessageBox.YESNO,
							icon: Ext.MessageBox.WARNING,
							fn: function (btn) {
								if (btn == 'yes') {
									op_p = 0;
									cod_up_p_global = 3;
									Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_p);
								}
							}
						})
					} else {
						Ext.MessageBox.alert('Alerta de Mensaje.', `Debe Seleccionar Mínimo un Registro.`);
					}
				}
			}, '->', filter, bfilter
		]
	});
	/**
	 * Código para la Autorizacion de PIN #FF0000.
	 * Funciónes para verificar el nivel de PIN del usuario para una ubicacion_pin.
	 */
	var cod_up_p_global; 		// Código global para filtar a que ubicacion de pin pertenece la funcion a compilar.
	var op_p; 					// Código global para filtar la opcion de busqueda.
	function validarUbicacionPin_p(cod_up_p, pin_p) {
		Ext.Ajax.request({
			url: '../servicesAjax/DSvalidacionNivelPinAJAX.php',
			method: 'POST',
			params: { codigo: cod_up_p, pin: pin_p, op: op_p },
			success: function (resp) {
				var msj = Ext.util.JSON.decode(resp.responseText);
				if (msj.message.id == '99') {		//significa que murio la session, se loguea de nuevo
					Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
						window.open("../");
					});
				} else if (msj.message.id == '2') { 		// se encontro resultado
					codpersonalAdmin = msj.message.reason;
					switch (cod_up_p) {
						case 3:
							AsignarNSeguridad(indice);
							break;
					}
				} else { 		//no se encontro resultado, se valida segun corresponda el formulario o requerimiento
					siguienteIntentoPin_p(msj.message.reason);
				}
			}
		});
	}
	function verificacionNivelPin_p(btn, text) {
		if (btn == 'ok') {
			if (text == "") {
				Ext.MessageBox.alert('Alerta de Mensaje.', "Debe Introducir un Código.");
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_p);
			}
			else {
				validarUbicacionPin_p(cod_up_p_global, text)
			}
		}
	}

	var cod_up_NS_global; 		// Código global para filtar a que ubicacion de pin pertenece la funcion a compilar.
	var op_NS; 					// Código global para filtar la opcion de busqueda.
	function validarUbicacionPin_NS(cod_up_NS, pin_NS) {
		Ext.Ajax.request({
			url: '../servicesAjax/DSvalidacionNivelPinAJAX.php',
			method: 'POST',
			params: { codigo: cod_up_NS, pin: pin_NS, op: op_NS },
			success: function (resp) {
				var msj = Ext.util.JSON.decode(resp.responseText);
				if (msj.message.id == '99') {		//significa que murio la session, se loguea de nuevo
					Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
						window.open("../");
					});
                } else if (msj.message.id == '2') { 		// se encontro resultado
                    codpersonalAdmin = msj.message.reason;
                    switch (cod_up_NS) {
                        case 1:
							switch(opp){
								case 1:
									NuevoPersonal();
								break;
								case 2:
									ModificarPersonal(indice);
								break;
								case 3:

								Ext.MessageBox.show({
									title: 'Adbertencia',
									msg: 'Esta seguro que desea eliminar el registro seleccionado..?',
									buttons: Ext.MessageBox.YESNO,
									icon: Ext.MessageBox.WARNING,
									fn: function (btn) {
										if (btn == 'yes') {
											Ext.Ajax.request(
												{
													url: '../servicesAjax/DSBajaPersonalAJAX.php',
													params: { codigo: Ext.dsdata.storePersonal.getAt(indice).get('codigo') },
													method: 'POST',
													success: function (result, request) {
														Ext.MessageBox.alert('MSG', 'Registro Desactivado');
														Ext.dsdata.storePersonal.load({ params: { start: 0, limit: 100 } });
													},
													failure: function (result, request) {
														Ext.MessageBox.alert('ERROR', result.responseText);
													}
												});
										}
									}
								});

									//Eliminar(indice);
								break;
							}
						// break;
                        // case 2:
                        //     asiganrPrivilegio(Ext.dsdata.storeNivelSeguridad.getAt(indice).get('codigo'))
                        // break;
                    }
				} else { 		//no se encontro resultado, se valida segun corresponda el formulario o requerimiento
					siguienteIntentoPin_NS(msj.message.reason);
				}
			}
		});
	}

	function verificacionNivelPin_NS(btn, text) {
		if (btn == 'ok') {
			if (text == "") {
				Ext.MessageBox.alert('Alerta de Mensaje.', "Debe Introducir un Código.");
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
			}
			else {
				validarUbicacionPin_NS(cod_up_NS_global, text)
			}
		}
	}
	function siguienteIntentoPin_p(encabezado_p) {
		Ext.MessageBox.show({
			title: 'Alerta de Advertencia.',
			msg: encabezado_p,
			width: 400,
			height: 200,
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.WARNING,
			multiline: false,
			fn: function (btn) {
				if (btn == 'yes') {
					Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_p);
				}
				else { }
			}
		});
	}

	//////////////////////////////////////////////////////////////////////////////////////////////ASIGNAR CATEGORIA CLIENTE
	var codigoP;
	var winNSeguridad;
	storeNSeguridad = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaNivelSeguridadCBAJAX.php',
		root: 'data',
		fields: ['codtp', 'nombtp']
	});
	storeNSeguridad.load();
	var btnAceptar_ns = new Ext.Button({
		id: 'btnAceptar_ns',
		x: 150,
		y: 265,
		text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
		style: { background: '#BCF5A9', borderRadius: '0px' },
		minWidth: 80,
		handler: function () {
			frmNSeguridad.guardarDatos();
		}
	});

	var btnLimpiar_ns = new Ext.Button({
		id: 'btnLimpiar_ns',
		x: 245,
		y: 265,
		text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
		style: { background: '#F6CECE', borderRadius: '0px' },
		minWidth: 80,
		handler: function () {
			IniComponente_ns();
			winNSeguridad.hide();
		}
	});

	var frmNSeguridad = new Ext.FormPanel({
		id: 'fp_e',
		frame: true,
		//selectOnFocus: true,
		autoScroll: true,
		labelAlign: 'top',
		// layout: 'column',
		items: [
			{
				xtype: 'fieldset',
				layout: 'column',
				title: '<font color= black>Nivel de Seguridad</font>',
				// collapsible : true,
				// collapsed: true,
				width: 460,
				height: 75,
				x: 0,
				y: 0,
				items: [
					{
						columnWidth: 1,
						layout: 'form',
						defaultType: 'combo',
						items: [
							{
								hiddenName: 'cbnseguridad',
								fieldLabel: 'Nivel de Seguridad',
								hideLabel: true,
								anchor: '100%',
								typeAhead: true,
								forceSelection: true,
								allowBlank: false,
								store: storeNSeguridad,
								emptyText: 'Seleccionar.',
								mode: 'local',
								forceSelection: true,
								style: { textTransform: "uppercase" },
								selectOnFocus: true,
								editable: false,
								valueField: 'codtp',
								displayField: 'nombtp'
							}
						]
					}
				]
			}
		],
		guardarDatos: function () {
			if (this.getForm().isValid()) {
				this.getForm().submit({
					url: '../servicesAjax/DSasignacionNivelSeguridadAJAX.php',
					params: { codigo: codigoP, cod_personal: codpersonalAdmin },
					method: 'POST',
					waitTitle: 'Conectando',
					waitMsg: 'Enviando Datos...',
					success: function (form, action) {
						winNSeguridad.hide();
						Ext.MessageBox.alert('Alerta de Mensaje.', 'Se Guardó Correctamente.');
						Ext.dsdata.storePersonal.load({ params: { start: 0, limit: 100 } });
					},
					failure: function (form, action) {
						if (action.failureType == 'server') {
							var data = Ext.util.JSON.decode(action.response.responseText);
							if (data.errors.id == '99') {
								Ext.Msg.alert('Error', data.errors.reason, function () {
									window.open("../");
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
	function IniComponente_ns() {
		var frm = frmNSeguridad.getForm();
		frm.reset();
		frm.clearInvalid();
	}
	function AsignarNSeguridad(indice) {
		if (!winNSeguridad) {
			winNSeguridad = new Ext.Window({
				layout: 'fit',
				width: 485,
				height: 180,
				title: 'Asignación De Nivel de Seguridad.',
				resizable: false,
				closeAction: 'hide',
				closable: true,
				draggable: false,
				plain: true,
				border: false,
				modal: false,
				items: [frmNSeguridad],
				buttonAlign: 'center',
				buttons: [btnAceptar_ns, '-', '-', btnLimpiar_ns],
				listeners: {
					show: function () {
						IniComponente_ns();
					},
					hide: function () {
						updateSpot(false);
					}
				}
			});
		}
		// txtCodPerfil.setValue(Codigov);			
		winNSeguridad.show();
		updateSpot('fp_e');
		codigoP = Ext.dsdata.storePersonal.getAt(indice).get('codigo');
		storeNSeguridad.load();
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

	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [PAmenu, PersonalGrid]
	});
	
	function siguienteIntentoPin_NS(encabezado_NS) {
		Ext.MessageBox.show({
			title: 'Alerta de Advertencia.',
			msg: encabezado_NS,
			width: 400,
			height: 200,
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.WARNING,
			multiline: false,
			fn: function (btn) {
				if (btn == 'yes') {
					Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
				}
				else { }
			}
		});
	}

});
