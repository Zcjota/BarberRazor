/*!
 * RAZOR- DEV
 * Copyright(c) 2015
 */

Ext.onReady(function () {
	Ext.namespace('Ext.dsdata');
	var indice = 'e';
	var confP = '';
	Ext.dsdata.storeMarcaP = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaMarcaPAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codigo', 'descripcion'],
		listeners: {
			load: function (thisStore, record, ids) {
				//alert(Ext.dsdata.storeMarcaP.getAt(0).get('configuracion'))
				// configuracionRoles(record[0].data.configuracion)
			}
		}
	});

	var pagingMarcaPBar = new Ext.PagingToolbar({
		pageSize: 100,
		store: Ext.dsdata.storeMarcaP,
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

	var MarcaPColumnMode = new Ext.grid.ColumnModel(
		[
			{
				header: 'ID',
				dataIndex: 'codigo',
				width: 50,
				sortable: true,
				hidden: true
			}, {
				header: 'Descripcion',
				dataIndex: 'descripcion',
				width: 300,
				sortable: true
			}
		]
	);

	var MarcaPGrid = new Ext.grid.GridPanel({
		id: 'MarcaPGrid',
		store: Ext.dsdata.storeMarcaP,
		region: 'center',
		cm: MarcaPColumnMode,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingMarcaPBar,
		listeners: {
			render: function () {
				Ext.dsdata.storeMarcaP.load({ params: { start: 0, limit: 100 } });
			},
			'celldblclick': function () {
				ModificarMarcaP(indice);
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
				Ext.dsdata.storeMarcaP.baseParams['buscar'] = filterVal;
				Ext.dsdata.storeMarcaP.reload({ params: o });
			} else {
				Ext.dsdata.storeMarcaP.clearFilter();
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
					NuevoMarcaP();
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					if (indice != 'e') {
						ModificarMarcaP(indice);
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
										url: '../servicesAjax/DSBajaMarcaPAJAX.php',
										params: { codigo: Ext.dsdata.storeMarcaP.getAt(indice).get('codigo') },
										method: 'POST',
										success: function (result, request) {
											Ext.MessageBox.alert('MSG', 'Registro Desactivado.');
											Ext.dsdata.storeMarcaP.load({ params: { start: 0, limit: 100 } });
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
		items: [PAmenu, MarcaPGrid]
	});
});