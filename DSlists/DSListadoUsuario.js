/*!
 * DSoft-TPMV
 * Copyright(c) 2023
 */

Ext.onReady(function () {
	var indice = 'e';
	Ext.namespace.storeUsuario = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaUsuariosGridAJAX.php',
		root: 'data',
		totalProperty: 'total',
		fields: [
			'codigo', 'nombre', 'apellidopaterno', 'apellidomaterno', 'ci', 'usuario',
			'contrasenia', 'correo', 'cod_tu', 'tipo_usuario', 'codpersonal', 'codsucursal', 'sucursal'
		],
		listeners: {
			load: function (thisStore, record, ids) {
				// configuracionRoles(record[0].data.configuracion);
			}
		}
	});
	var pagingAduaneroBar = new Ext.PagingToolbar({
		pageSize: 100,
		store: Ext.namespace.storeUsuario,
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
				header: 'Nombre',
				dataIndex: 'nombre',
				width: 100,
				sortable: true
			}, {
				header: 'Apellido Paterno',
				dataIndex: 'apellidopaterno',
				width: 150,
				sortable: true
			}, {
				header: 'Apellido Materno',
				dataIndex: 'apellidomaterno',
				width: 150,
				sortable: true
			}, {
				header: 'Usuario',
				dataIndex: 'usuario',
				width: 100,
				sortable: true
			}, {
				header: 'Correo Elct.',
				dataIndex: 'correo',
				width: 200,
				sortable: true
			}, {
				header: 'IDTU',
				dataIndex: 'cod_tu',
				width: 50,
				sortable: true,
				hidden: true
			}, {
				header: 'Tipo Usuario',
				dataIndex: 'tipo_usuario',
				width: 150,
				sortable: true
			}, {
				header: 'Sucursal Por Defecto',
				dataIndex: 'sucursal',
				width: 150,
				sortable: true
			}
		]
	);

	UsuarioGrid = new Ext.grid.GridPanel({
		id: 'usergrid',
		store: Ext.namespace.storeUsuario,
		region: 'center',
		cm: aduaneroColumnMode,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingAduaneroBar,
		listeners: {
			render: function () {
				Ext.namespace.storeUsuario.load({ params: { start: 0, limit: 100 } });
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
				Ext.namespace.storeUsuario.baseParams = Ext.namespace.storeUsuario.baseParams || {};
				Ext.namespace.storeUsuario.baseParams['buscar'] = filterVal;
				Ext.namespace.storeUsuario.reload({ params: o });
			} else {
				Ext.namespace.storeUsuario.clearFilter();
			}
		}
	});

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
					AltaUsuario();
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					if(indice != 'e'){
						ModificarUsuario(indice);
					} else {
						Ext.MessageBox.alert('MSG','Seleccione un registro por favor..!');
					}
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'elim',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Eliminar</a>',
				icon: '../img/Eliminar.png',
				handler: function (t) {
					if (indice != 'e') {
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
										url: '../servicesAjax/DSBajaUsuarioAJAX.php',
										params: { codigo: Ext.namespace.storeUsuario.getAt(indice).get('codigo') },
										method: 'POST',
										success: function (result, request) {
											Ext.MessageBox.alert('MSG','Registro Desactivado..!');
											Ext.namespace.storeUsuario.load({ params: { start: 0, limit: 100 } });
										},
										failure: function (result, request) {
											Ext.MessageBox.alert('ERROR', result.responseText);
										}
									});
								}
							}
						});
					} else { 
						Ext.MessageBox.alert('MSG','Seleccione un registro por favor..!');
					}
				}
			}, '->', filter, bfilter
		]
	});

	
	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [PAmenu, UsuarioGrid]
	});
})	