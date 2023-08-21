/*!
 * RAZOR - JR
 * RAZOR - SOTO
 * RAZOR - MORON
 * Copyright(c) 2023
 */

Ext.onReady(function () {
	Ext.namespace('Ext.dsdata');
	var indice = 'e';
	var confP = '';
	Ext.dsdata.storeCargo = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaCargoAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codigo', 'nombre', 'descripcion']
	});

	var pagingCargoBar = new Ext.PagingToolbar({
		pageSize: 100,
		store: Ext.dsdata.storeCargo,
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

	var CargoColumnMode = new Ext.grid.ColumnModel(
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
				width: 200,
				sortable: true
			}, {
				header: 'descripcion',
				dataIndex: 'descripcion',
				width: 700,
				sortable: true
			}
		]
	);

	var CargoGrid = new Ext.grid.GridPanel({
		id: 'CargoGrid',
		store: Ext.dsdata.storeCargo,
		region: 'center',
		cm: CargoColumnMode,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingCargoBar,
		listeners: {
			render: function () {
				Ext.dsdata.storeCargo.load({ params: { start: 0, limit: 100 } });
			},
			'celldblclick': function () {
				ModificarCargo(indice);
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
				var o = { start: 0, limit: 25 };
				Ext.dsdata.storeCargo.baseParams['buscar'] = filterVal;
				Ext.dsdata.storeCargo.reload({ params: o });
			} else {
				Ext.dsdata.storeCargo.clearFilter();
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
					NuevoCargo();
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					if(indice != 'e'){
						ModificarCargo(indice);
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
										url: '../servicesAjax/DSBajaCargoAJAX.php',
										params: { codigo: Ext.dsdata.storeCargo.getAt(indice).get('codigo') },
										method: 'POST',
										success: function (result, request) {
											Ext.MessageBox.alert('MSG', 'Registro Desactivado.');
											Ext.dsdata.storeCargo.load({ params: { start: 0, limit: 100 } });
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
		items: [PAmenu, CargoGrid]
	});
});