/*!
 * RAZOR- DEV
 * 2023
 */


Ext.onReady(function () {
	Ext.namespace('Ext.dsdata');
	var indice = 'e';
	var confP = '';
	var op_pin = 0;
	Ext.dsdata.storeIEA = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaIngresoAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: [
			'codigo', 'color', 'codingreso', 'tipoingreso', 'fa', 'fechaservicio', 'fecha', 'ficha',
			'propietario', '2nivel', '3nivel', 'codigo', 'cantidad', 'precio', 'descuento',
			'total', 'pago', 'saldo', 'tipopago', 'comentario', 'personalanu', 'anulacion','personalcre'
		]
	});
	var pagingProductoBar = new Ext.PagingToolbar({
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
		if ((record.data.fechaservicio != record.data.fa) && (record.data.tipoingreso == 1)) {
			metadata.attr = 'style="white-space:normal; background-color: yellow; font-size:17px"';
			metadata.attr = String.format('{0}title="{1}"', metadata.attr, record.data.fechaservicio);
		}
		return value;
	}
	function tooltipComentario(value, metadata, record, rowIndex, colIndex, store) {
		metadata.attr = String.format('{0}title="{1}"', metadata.attr, 'Comentario:\n' + record.data.comentario);
		return value;
	}
	function tooltipanulacion(value, metadata, record, rowIndex, colIndex, store) {
		if (record.data.color == 'r') {
			metadata.attr = String.format('{0}title="{1}"', metadata.attr, 'Anulado por: ' + record.data.personalanu + '\nComentario: ' + record.data.anulacion);
		}
		return value;
	}
	function diferenciaT(value, metadata, record, rowIndex, colIndex, store) {
		var desc = record.data.descuento;
		var prec = record.data.precio;
		var cant = record.data.cantidad;
		prec = parseFloat(prec * cant) - parseFloat(((prec * cant) * desc) / 100);
		return parseFloat(prec).toFixed(2);
	}
	function tooltipSubtotal(value, metadata, record, rowIndex, colIndex, store) {
		return parseFloat(record.data.precio * record.data.cantidad).toFixed(2);
	}
	var storetp = new Ext.data.SimpleStore({
		fields: ['codigotp', 'nombretp'],
		data: [
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
				hidden: true
			}, {
				header: '<a style ="color:#15428B; font: bold 11px tahoma,arial,verdana,sans-serif;"></a>',
				dataIndex: '',
				width: 25,
				renderer: function (value, cell) {
					str = "<div style='text-align:center;'> <div class='zoom'></div> <img class='zoom' src='../img/Eliminar.png' WIDTH='13' HEIGHT='13'></div>";
					return str;
				}
			}, {
				header: 'Fecha',
				dataIndex: 'fecha',
				width: 120,
				sortable: true,
				renderer: tooltipanulacion
			}, {
				header: 'Ficha',
				dataIndex: 'ficha',
				width: 40,
				sortable: true,
				renderer: tooltipNroFicha
			}, {
				header: 'Cliente',
				dataIndex: 'propietario',
				width: 120,
				sortable: true
			}, {
				header: 'Concepto',
				dataIndex: '2nivel',
				width: 150,
				sortable: true,
				renderer: tooltipComentario
			}, {
				header: 'Detalle',
				dataIndex: '3nivel',
				width: 150,
				sortable: true,
				renderer: tooltipComentario
			}, {
				header: 'Codigo',
				dataIndex: 'codigo',
				width: 50,
				sortable: true
			}, {
				header: 'Cant',
				dataIndex: 'cantidad',
				width: 50,
				align: 'center',
				editor: {
					xtype: 'numberfield',
					hiddenName: 'cantt',
					anchor: '95%',
					allowBlank: false,
					style: { textTransform: "uppercase" },
				},
				sortable: true
			}, {
				xtype: 'numbercolumn',
				header: 'Precio',
				dataIndex: 'precio',
				align: 'right',
				width: 80,
				sortable: true
			}, {
				// xtype: 'numbercolumn',
				header: 'Subtotal',
				// dataIndex: 'precio',  
				align: 'right',
				width: 80,
				renderer: tooltipSubtotal,
				sortable: true
			}, {
				xtype: 'numbercolumn',
				header: 'desc %',
				dataIndex: 'descuento',
				align: 'right',
				width: 80,
				sortable: true
			}, {
				// xtype: 'numbercolumn',
				header: 'Total',
				// dataIndex: 'precio',  
				align: 'right',
				width: 70,
				renderer: diferenciaT,
				sortable: true
			},
			/*{  
				xtype: 'numbercolumn',
				header: 'Pendiente',  
				dataIndex: 'total',  
				align: 'right',
				width: 80,
				sortable: true
			},{  
				xtype: 'numbercolumn',
				header: 'Pago',  
				dataIndex: 'pago',  
				align: 'right',
				width: 80,
				sortable: true
			},{  
				xtype: 'numbercolumn',
				header: 'Saldo',  
				dataIndex: 'saldo',  
				align: 'right',
				width: 80,
				sortable: true
			},*/
			{
				header: 'Tipo de Pago',
				dataIndex: 'tipopago',
				width: 100,
				editor: {
					xtype: 'combo',
					hiddenName: 'tipopago',
					anchor: '95%',
					typeAhead: true,
					forceSelection: true,
					allowBlank: false,
					store: storetp,
					mode: 'local',
					style: { textTransform: "uppercase" },
					// emptyText:'oblig.',
					forceSelection: true,
					triggerAction: 'all',
					selectOnFocus: true,
					editable: false,
					valueField: 'codigotp',
					displayField: 'nombretp',
					listeners: {
						'select': function (cmb, record, index) {
						}
					}
				},
				sortable: true
			}, {
				header: 'P. Desc.',
				dataIndex: 'personalcre',
				width: 120,
				sortable: true
			}
		]
	);

	function eliminar_i(cod, coduser, memo, fechai) {
		function succesfunction(resp) {
			var msj = Ext.util.JSON.decode(resp.responseText);
			if (msj.message.id == '99') {
				Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
					window.open("../");
				});
			} else if (msj.message.id == '2') {
				Ext.MessageBox.alert('Mensaje', msj.message.reason);
				Ext.dsdata.storeIEA.load({ params: { start: 0, limit: 50 } });
			} else { Ext.MessageBox.alert('Error', msj.message.reason); }
		}
		Ext.Ajax.request({
			url: '../servicesAjax/DSdesactivarIngresoAJAX.php',
			method: 'POST',
			params: { id: cod, usuario: coduser, memo: memo, fecha: fechai },
			success: succesfunction,
		});
	}
	function actualizarServicio(cod, tp, codpers) {
		Ext.Ajax.request({
			url: '../servicesAjax/DSactualizarTipoPagoAJAX.php',
			params: { codigo: cod, tp: tp, codpers: codpers, cant: cant_a, total: total_a, pago: pago_a },
			method: 'POST',
			success: function (result, request) {
				Ext.MessageBox.alert('MSG', 'Operacion Exitosa');
				Ext.dsdata.storeIEA.load({ params: { start: 0, limit: 1000 } });
			},
			failure: function (result, request) {
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
				fn: function (rowEditor, obj, data, rowIndex) {
					// 'cantidad','precio','descuento', 
					//'total','pago',
					codtp = Ext.dsdata.storeIEA.getAt(rowIndex).get('tipopago');
					codigoi = Ext.dsdata.storeIEA.getAt(rowIndex).get('codingreso');
					cant_a = Ext.dsdata.storeIEA.getAt(rowIndex).get('cantidad');
					var pp = Ext.dsdata.storeIEA.getAt(rowIndex).get('precio');
					var dd = Ext.dsdata.storeIEA.getAt(rowIndex).get('descuento');
					total_a = (cant_a * pp);
					total_a = total_a - (total_a * dd / 100);
					pago_a = total_a;
					op_pin = 1;
					Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionAdmin_i);
				}
			}
		}
	});
	storePersonal = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaPersonalCSAJAX.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codpersonal', 'codsistema', 'codcargo'],
	});
	function verificacionAdmin_i(btn, text) {
		if (btn == 'ok') {
			if (text == "") {
				Ext.MessageBox.alert("MSG", "Debe Introducir Un Código.");
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionAdmin_i);
			} else {
				var posicion = storePersonal.find('codsistema', text);
				if (posicion >= 0) {
					codpersonalAdmin = storePersonal.getAt(posicion).get('codpersonal');
					var cargo = storePersonal.getAt(posicion).get('codcargo');
					if (cargo == 1 || cargo == 2 || cargo == 5) {
						if (op_pin == 1) {
							actualizarServicio(codigoi, codtp, codpersonalAdmin);
						} else if(op_pin == 2){
							Ext.MessageBox.show({
								title: 'Memo de Anulación.',
								msg: 'Máximo 255 caracteres:',
								width: 450,
								height: 300,
								buttons: Ext.MessageBox.OKCANCEL,
								icon: Ext.MessageBox.QUESTION,
								multiline: true,
								fn: function (btn, text) {
									if (btn == 'ok') {
										if (text.length > 0 && text.length <= 255) {
											memoanular = text;
											eliminar_i(Ext.dsdata.storeIEA.getAt(indice).get('codingreso'), codpersonalAdmin, memoanular, Ext.dsdata.storeIEA.getAt(indice).get('fecha'));
										} else { 
											Ext.MessageBox.alert('MSG','Lo sentimos pero solo puede introducir de 1 a 255 caracteres.'); 
										}
									}
								}
							});
						} else {
							Ext.MessageBox.alert('MSG','Ninguna Acción por realizar..!')
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
									Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionAdmin_i);
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
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionAdmin_i);
							} else { }
						}
					});
				}
			}
		}
	}
	var ProductoGrid = new Ext.grid.GridPanel({
		id: 'ProductoGrid',
		store: Ext.dsdata.storeIEA,
		region: 'center',
		plugins: [editor],
		cm: ProductoColumnMode,
		viewConfig: {
			getRowClass: function (row, index) {
				var cls = '';
				if (row.get('color') == 'r') {
					console.log('rojo');
					cls = 'estadoRojo';
				}
				return cls;
			}
		},
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingProductoBar,
		listeners: {
			render: function () {
				Ext.dsdata.storeIEA.load({ params: { start: 0, limit: 1000 } });
				storePersonal.load();
			}, 'cellclick': function (grid, rowIndex, cellIndex, e) {
				if (cellIndex == 1) {
					if (indice != 'e') {
						op_pin = 2;
						Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionAdmin_i);
					}
					else {
						Ext.MessageBox.alert('Mensaje', ' Seleccione uno de la Lista.');
					}
				}
			},
			// 'celldblclick' :function()
			// {
			// // ModificarProducto(indice);
			// }
		},
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true,
			listeners: {
				rowselect: function (sm, row, rec) {
					indice = row;
				}
			}
		}),
		clicksToEdit: 1
	});

	var filter = new Ext.form.TextField({ name: 'filterValue' });

	var bfilter = new Ext.Toolbar.Button({
		text: 'Buscar',
		tooltip: "Utilizar '*' para busquedas ",
		icon: '../img/view.png',
		handler: function (btn, e) {
			var filterVal = filter.getValue();
			var filterFecha = Ext.getCmp('fecha').getRawValue();
			var o = { start: 0, limit: 1000 };
			var ciea = 0;
			if (filterVal.length > 0) {
				ciea++;
				Ext.dsdata.storeIEA.baseParams['buscar'] = filterVal;
			}
			if (filterFecha.toString().length > 0) {
				ciea++;
				Ext.dsdata.storeIEA.baseParams['fecha'] = filterFecha;
			}
			if (ciea > 0) {
				Ext.dsdata.storeIEA.reload({ params: o });
			} else {
				Ext.dsdata.storeIEA.clearFilter();
			}
		}
	});
	AltaIngreso();
	var PAmenu = new Ext.Panel({
		region: 'north',
		id: 'PAcabecera1',
		height: 29,
		tbar: [
			{
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Ingreso</a>',
				icon: '../img/Nuevo.png',
				handler: function (t) {
					AltaIngreso();
				}
			}, '-',
			//  {
			// 	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Ingreso Interno</a>',
			// 	icon: '../img/Nuevo.png',
			// 	handler: function (t) {
			// 		AltaIngresoExterno();
			// 	}
			// }, 
			'-', 
			// {
			// 	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Ajuste</a>',
			// 	icon: '../img/Nuevo.png',
			// 	handler: function (t) {
			// 		altaIngresoAjuste_AI();
			// 	}
			// },
			 '->', {
				xtype: 'datefield',
				id: 'fecha',
				allowBlank: true,
				format: 'Y-m-d',
				value: new Date()
			}, '-', filter, bfilter
		]
	});
	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [PAmenu, ProductoGrid]
	});
});