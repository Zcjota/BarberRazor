/*!
 * DSoft-TPMV
 * Copyright(c) 2012
 */
Ext.onReady(function () {
	var indice = 'e';
	Ext.namespace('Ext.dsdata');
	Ext.dsdata.storeProveedor = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListadoProveedorAJAX.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codigo', 'nombre', 'descripcion', 'direccion', 'telefono']
	});
	var Paginas = new Ext.PagingToolbar({
		pageSize: 1000,
		store: Ext.dsdata.storeProveedor,
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
	function tooltipGral(value, metadata) {
		metadata.attr = String.format('{0}title="{1}"', metadata.attr, value);
		return value;
	}
	var Columnas = new Ext.grid.ColumnModel(
		[{
			header: 'codigo',
			dataIndex: 'codigo',
			align: 'right',
			hidden: true
		}, {
			header: 'Proveedor',
			dataIndex: 'nombre',
			width: 180,
			align: 'left',
			sortable: true,
			renderer: tooltipGral
		}, {
			header: 'Telefono',
			dataIndex: 'telefono',
			width: 150,
			align: 'left',
			sortable: true,
			renderer: tooltipGral
		}, {
			header: 'Direccion',
			dataIndex: 'direccion',
			width: 250,
			align: 'left',
			sortable: true,
			renderer: tooltipGral
		}, {
			header: 'Descripcion',
			dataIndex: 'descripcion',
			width: 350,
			align: 'left',
			sortable: true,
			renderer: tooltipGral
		}
		]
	);
	var grid = new Ext.grid.GridPanel({
		id: 'gridItems',
		store: Ext.dsdata.storeProveedor,
		region: 'center',
		cm: Columnas,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: Paginas,
		listeners: {
			render: function () {
				Ext.dsdata.storeProveedor.load({ params: { start: 0, limit: 1000 } });
			},
			'celldblclick': function () {
				modProveedor(indice);
			}
		},
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true,
			listeners: {
				rowselect: function (sm, row, rec) {
					indice = row;
					//var RegistoMod = Ext.namespace.storeTramite.getAt(Indicev).get('numerotramite'); ASI SE LO LLAMA
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
				var o = { start: 0, limit: 1000 };
				Ext.dsdata.storeProveedor.baseParams['buscar'] = filterVal;
				Ext.dsdata.storeProveedor.reload({ params: o });
			}
			else {
				Ext.dsdata.storeProveedor.clearFilter();
			}
		}
	});

	function eliminarProveedor(indice) {
		cod = Ext.dsdata.storeProveedor.getAt(indice).get('codigo');
		Ext.Ajax.request({
			url: '../servicesAjax/DSdesactivarProveedorAJAX.php',
			method: 'POST',
			params: { id: cod },
			success: desactivo,
			failure: no_desactivo
		});
		function desactivo(resp) {
			Ext.MessageBox.alert('MSG', 'Registro Desactivado.');
			Ext.dsdata.storeProveedor.load({ params: { start: 0, limit: 1000 } });
		}
		function no_desactivo(resp) {
			Ext.MessageBox.alert('MSG', resp.mensaje);
		}
	}

	var PAmenu = new Ext.Panel({
		region: 'north',
		id: 'PAmenuPr',
		height: 29,
		tbar: [
			{
				id: 'nuev',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Nuevo</a>',
				icon: '../img/Nuevo.png',
				handler: function (t) {
					NuevoProveedor(true);
				}
			},'-',{
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					if(indice != 'e'){
						modProveedor(indice);
					} else {
						Ext.MessageBox.alert('MSG','Seleccione un registro por favor..!');
					}
				}
			},'-',{
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
									eliminarProveedor(indice);
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
		items: [PAmenu, grid]
	});
});