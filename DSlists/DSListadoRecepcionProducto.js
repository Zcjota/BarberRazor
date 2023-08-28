/*!
 * DSoft-TPMV
 * Copyright(c) 2011
 */

Ext.onReady(function () {
	var indice = 'e';
	Ext.namespace.storeRP = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaRecepcionProductoAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: [
			'codigo', 'codproveedor', 'estado', 'proveedor', 
			//'codpersonal',
			 'personal', 'fecha', 'comentario', 'nrog', 'nrop'
		],
	});
	var pagingAduaneroBar = new Ext.PagingToolbar({
		pageSize: 100,
		store: Ext.namespace.storeRP,
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

	var aduaneroColumnMode = new Ext.grid.ColumnModel(
		[
			{
				header: 'ID',
				dataIndex: 'codigo',
				width: 50,
				sortable: true,
				hidden: true
			}, {
				header: 'Nro. G.',
				dataIndex: 'nrog',
				width: 50,
				sortable: true,
				align: 'center'
			}, {
				header: 'Nro. P.',
				dataIndex: 'nrop',
				width: 50,
				sortable: true,
				align: 'center'
			}, {
				header: 'Estado',
				dataIndex: 'estado',
				width: 50,
				sortable: true,
				align: 'center'
			}, {
				header: 'Fecha',
				dataIndex: 'fecha',
				width: 120,
				sortable: true
			}, {
				header: 'Recepciono',
				dataIndex: 'personal',
				width: 150,
				sortable: true
			}, {
				header: 'Proveedor',
				dataIndex: 'proveedor',
				width: 150,
				sortable: true
			}, {
				header: 'Comentario',
				dataIndex: 'comentario',
				width: 350,
				sortable: true
			},
		]
	);

	UsuarioGrid = new Ext.grid.GridPanel({
		id: 'usergrid',
		store: Ext.namespace.storeRP,
		region: 'center',
		cm: aduaneroColumnMode,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingAduaneroBar,
		listeners: {
			render: function () {
				Ext.namespace.storeRP.load({ params: { start: 0, limit: 100 } });
			},
			'celldblclick': function () {
				DetalleRecepcion(Ext.namespace.storeRP.getAt(indice).get('codigo'));
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

	var filter = new Ext.form.TextField({ name: 'filterValue' });
	var bfilter = new Ext.Toolbar.Button({
		text: 'Buscar',
		tooltip: "Utilizar '*' para busquedas ",
		icon: '../img/view.png',
		handler: function (btn, e) {
			var filterVal = filter.getValue();
			if (filterVal.length > 0) {
				var o = { start: 0, limit: 100 };
				Ext.namespace.storeRP.baseParams = Ext.namespace.storeRP.baseParams || {};
				Ext.namespace.storeRP.baseParams['buscar'] = filterVal;
				Ext.namespace.storeRP.reload({ params: o });
			} else {
				Ext.namespace.storeRP.clearFilter();
			}
		}
	});
	// AltaRecepcion();
	var PAmenu = new Ext.Panel({
		region: 'north',
		id: 'PAcabecera1',
		height: 29,
		tbar: [
			{
				id: 'nuev',
				text: 'Nuevo',
				icon: '../img/Nuevo.png',
				handler: function (t) {
					AltaRecepcion();

				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'elim',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Anular</a>',
				icon: '../img/Eliminar.png',
				handler: function (t) {
					if (indice != 'e') {
						if (Ext.namespace.storeRP.getAt(indice).get('estado') == "APRAB.") {
							Ext.MessageBox.show({
								title: 'Advertencia.',
								msg: 'Está seguro que desea eliminar el registro seleccionado..?',
								width: 400,
								height: 200,
								buttons: Ext.MessageBox.YESNO,
								icon: Ext.MessageBox.WARNING,
								fn: function (btn) {
									if (btn == 'yes') {
										Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion_RP);
									}
								}
							});
						} else {
							alert('No se puede anular un registro que ya esta anulado.');
						}
					} else { 
						Ext.MessageBox.alert('MSG','Seleccione un registro por favor..!');
					}
				}
			},
			'->', filter, bfilter
		]
	});
	storePersonalCS = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaPersonalCSAJAX.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codpersonal', 'codsistema', 'codcargo'],
	});
	storePersonalCS.load();
	function succesfunction(resp) {
		var msj = Ext.util.JSON.decode(resp.responseText);
		if (msj.message.id == '99') {
			Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
				window.open("../");
			});
		} else if (msj.message.id == '2') {
			Ext.MessageBox.alert('Mensaje', msj.message.reason);
			Ext.namespace.storeRP.load({ params: { start: 0, limit: 1000 } });
		} else { Ext.MessageBox.alert('Error', msj.message.reason); }
	}
	function verificacion_RP(btn, text) {
		if (btn == 'ok') {
			if (text == "") {
				Ext.MessageBox.alert("MSG", "Debe Introducir Un Código.");
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion_RP);
			} else {
				var posicion = storePersonalCS.find('codsistema', text);
				if (posicion >= 0) {
					codpersonalRP = storePersonalCS.getAt(posicion).get('codpersonal');
					var cargo = storePersonalCS.getAt(posicion).get('codcargo');
					if (cargo == 1 || cargo == 2 || cargo == 5) {
						Ext.Ajax.request({
							url: '../servicesAjax/DSanularRecepcionProductoAJAX.php',
							params: { codigo: Ext.namespace.storeRP.getAt(indice).get('codigo'), codpersonal: codpersonalRP },
							method: 'POST',
							success: succesfunction,
						});
					} else {
						Ext.MessageBox.show({
							title: 'Advertencia',
							msg: 'Código Invalido, desea introducir el código nuevamente?',
							width: 400,
							height: 200,
							buttons: Ext.MessageBox.YESNO,
							icon: Ext.MessageBox.WARNING,
							multiline: false,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion_RP);
								} else { }
							}
						});
					}
				} else {
					Ext.MessageBox.show({
						title: 'Error',
						msg: 'Código Incorrecto, desea introducir el código nuevamente?',
						width: 400,
						height: 200,
						buttons: Ext.MessageBox.YESNO,
						icon: Ext.MessageBox.ERROR,
						multiline: false,
						fn: function (btn) {
							if (btn == 'yes') {
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion_RP);
							} else { }
						}
					});
				}
			}
		}
	}
	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [PAmenu, UsuarioGrid]
	});
})	