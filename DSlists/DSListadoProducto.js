/*!
 * RAZOR- DEV
 * Copyright(c) 2015
 */

Ext.onReady(function () {
	Ext.namespace('Ext.dsdata');
	var indice = 'e';
	var confP = '';
	Ext.dsdata.storeProducto = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaProductoAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: [
			'codigo', 'codcategoria', 'codtipo', 'codmarca', 'categoria', 'tipo', 'marca', 'descripcion', 'pc',
			'pv', 'codbarra', 'ubicacion', 'estado'
		],
		listeners: {
			load: function (thisStore, record, ids) {
				//alert(Ext.dsdata.storeProducto.getAt(0).get('configuracion'))															
				// configuracionRoles(record[0].data.configuracion)
			}
		}
	});


	
	var pagingProductoBar = new Ext.PagingToolbar({
		pageSize: 1000,
		store: Ext.dsdata.storeProducto,
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
	var sm = new Ext.grid.CheckboxSelectionModel({
		// singleSelect: true,
		listeners: {
			rowselect: function (sm, row, rec) {
				indice = row;
			}
		}
	});
	var ProductoColumnMode = new Ext.grid.ColumnModel(
		[
			sm, {
				header: 'ID',
				dataIndex: 'codigo',
				width: 50,
				sortable: true,
				hidden: true
			}, {
				header: 'Categoria',
				dataIndex: 'categoria',
				width: 150,
				// hidden :true,
				sortable: true
			}, {
				header: 'SubCategoria',
				dataIndex: 'tipo',
				width: 150,
				// hidden :true,
				sortable: true
			}, {
				header: 'Marca',
				dataIndex: 'marca',
				width: 150,
				// hidden :true,
				sortable: true
			}, {
				header: 'Descripcion',
				dataIndex: 'descripcion',
				width: 300,
				// hidden :true,
				sortable: true
			}, {
				header: 'Codigo Barra',
				dataIndex: 'codbarra',
				width: 110,
				// hidden :true,
				sortable: true
			}, {
				xtype: 'numbercolumn',
				format: '0,0.00',
				header: 'P.C.',
				dataIndex: 'pc',
				width: 70,
				align: 'right',
				// hidden :true,
				sortable: true
			}, {
				xtype: 'numbercolumn',
				format: '0,0.00',
				header: 'P.V.',
				dataIndex: 'pv',
				width: 70,
				align: 'right',
				// hidden :true,
				sortable: true
			}, {
				header: 'Estado',
				dataIndex: 'estado',
				width: 100,
				align: 'right',
				// hidden :true,
				sortable: true
			}
		]
	);

	var ProductoGrid = new Ext.grid.GridPanel({
		id: 'ProductoGrid',
		store: Ext.dsdata.storeProducto,
		region: 'center',
		cm: ProductoColumnMode,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingProductoBar,
		listeners: {
			render: function () {
				Ext.dsdata.storeProducto.load({ params: { start: 0, limit: 1000 } });
			},
			'celldblclick': function () {
				// ModificarProducto(indice);																			
			}
		},
		sm: sm,
	});

	var filter = new Ext.form.TextField({
		name: 'filterValue',
		enableKeyEvents: true,
		selectOnFocus: true,
		listeners: {
			keypress: function (t, e) {
				if (e.getKey() == 13) {
					var o = { start: 0, limit: 1000 };
					Ext.dsdata.storeProducto.baseParams['buscar'] = "*" + this.getValue() + "*";
					Ext.dsdata.storeProducto.reload({ params: o });
				}
			}
		}
	});

	var bfilter = new Ext.Toolbar.Button({
		text: 'Buscar',
		tooltip: "Utilizar '*' para busquedas ",
		icon: '../img/view.png',
		handler: function (btn, e) {
			var o = { start: 0, limit: 1000 };
			Ext.dsdata.storeProducto.baseParams['buscar'] = "*" + filter.getValue() + "*";
			Ext.dsdata.storeProducto.reload({ params: o });
		}
	});
	// AltaProducto();							
	var opc = 0;
	var PAmenu = new Ext.Panel({
		region: 'north',
		id: 'PAcabecera1',
		height: 29,
		tbar: [
			{
				id: 'nuev',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Nuevo</a>',
				icon: '../img/Nuevo.png',
				handler: function (t) {
					//opc = 1;
					NuevoProducto();
					//Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'nuevm',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Masivamente</a>',
				icon: '../img/Nuevo.png',
				handler: function (t) {
					//opc = 2;
					AltaProducto(1);
					//Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					ModificarProducto(indice);
					// //opc = 3;
					// if (indice != 'e') {
					// 	Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
					// } else {
					// 	Ext.MessageBox.alert('MSG','Seleccione un registro por favor..!');
					// }
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'elim',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Eliminar</a>',
				icon: '../img/Eliminar.png',
				handler: function (t) {
					
					var cont = 0;
					var datosGrid = [];
					var registros = [];
					sm.each(function (rec) {
						cont++;
						datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
					});
					registros = Ext.encode(datosGrid);
					if (cont == 1) {
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
										url: '../servicesAjax/DSBajaProductoAJAX.php',
										params: { registros: registros },
										method: 'POST',
										success: function (result, request) {
											Ext.MessageBox.alert('MSG', 'Registro Desactivado');
											Ext.dsdata.storeProducto.load({ params: { start: 0, limit: 1000 } });
										},
										failure: function (result, request) {
											Ext.MessageBox.alert('ERROR', result.responseText);
										}
									});
								}
							}
						});
					} else if(cont > 1){
						Ext.MessageBox.show({
							title: 'Advertencia.',
							msg: 'Está seguro que desea eliminar masivamente los registros seleccionado..?',
							width: 400,
							height: 200,
							buttons: Ext.MessageBox.YESNO,
							icon: Ext.MessageBox.WARNING,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../servicesAjax/DSBajaProductoAJAX.php',
										params: { registros: registros },
										method: 'POST',
										success: function (result, request) {
											Ext.MessageBox.alert('MSG', 'Registro Desactivado');
											Ext.dsdata.storeProducto.load({ params: { start: 0, limit: 1000 } });
										},
										failure: function (result, request) {
											Ext.MessageBox.alert('ERROR', result.responseText);
										}
									});
								}
							}
						});
					} else { 
						Ext.MessageBox.alert('MSG','Seleccione mínimo un registro por favor..!');
					}
					// opc = 4;
					// if (indice != 'e') {
					// 	Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
					// } else {
					// 	Ext.MessageBox.alert('MSG','Seleccione mínimo un registro por favor..!');
					// }

				}
			}, '-', {
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Excel</a>',
				icon: '../img/excel.png',
				handler: function (t) {
					var filterVal = filter.getValue();
					var pagina = "../servicesAjax/DSExcelProducto.php?buscar=" + filterVal;
					var opciones = "toolbar=yes, location=no, directories=yes, status=no, menubar=yes, scrollbars=yes, resizable=no, fullscreen=yes";
					window.open(pagina, "", opciones);
				}
			}, '->', filter, bfilter
		]
	});

	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [PAmenu, ProductoGrid]
	});
	storePersonal = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaPersonalCSAJAX.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codpersonal', 'codsistema', 'codcargo'],
	});
	storePersonal.load();

	function verificacion(btn, text) {
		if (btn == 'ok') {
			if (text == "") {
				Ext.MessageBox.alert("MSG", "Debe Introducir Un Código.");
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
			} else {
				var posicion = storePersonal.find('codsistema', text);
				if (posicion >= 0) {
					codpersonalVal = storePersonal.getAt(posicion).get('codpersonal');
					var cargo = storePersonal.getAt(posicion).get('codcargo');
					if (cargo == 1 || cargo == 2 || cargo == 5) {
						if (opc == 1) {
							NuevoProducto();
						}
						if (opc == 2) {
							AltaProducto(1);
						}
						if (opc == 3) {
							ModificarProducto(indice);
						}
						if (opc == 4) {
							var cont = 0;
							var datosGrid = [];
							var registros = [];
							sm.each(function (rec) {
								cont++;
								datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
							});
							registros = Ext.encode(datosGrid);
							if (cont == 1) {
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
												url: '../servicesAjax/DSBajaProductoAJAX.php',
												params: { registros: registros },
												method: 'POST',
												success: function (result, request) {
													Ext.MessageBox.alert('MSG', 'Registro Desactivado');
													Ext.dsdata.storeProducto.load({ params: { start: 0, limit: 1000 } });
												},
												failure: function (result, request) {
													Ext.MessageBox.alert('ERROR', result.responseText);
												}
											});
										}
									}
								});
							} else if(cont > 1){
								Ext.MessageBox.show({
									title: 'Advertencia.',
									msg: 'Está seguro que desea eliminar masivamente los registros seleccionado..?',
									width: 400,
									height: 200,
									buttons: Ext.MessageBox.YESNO,
									icon: Ext.MessageBox.WARNING,
									fn: function (btn) {
										if (btn == 'yes') {
											Ext.Ajax.request({
												url: '../servicesAjax/DSBajaProductoAJAX.php',
												params: { registros: registros },
												method: 'POST',
												success: function (result, request) {
													Ext.MessageBox.alert('MSG', 'Registro Desactivado');
													Ext.dsdata.storeProducto.load({ params: { start: 0, limit: 1000 } });
												},
												failure: function (result, request) {
													Ext.MessageBox.alert('ERROR', result.responseText);
												}
											});
										}
									}
								});
							} else { 
								Ext.MessageBox.alert('MSG','Seleccione mínimo un registro por favor..!');
							}
						}
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
									Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
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
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
							} else { }
						}
					});
				}
			}
		}
	}
});