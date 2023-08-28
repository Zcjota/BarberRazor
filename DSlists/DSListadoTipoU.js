Ext.onReady(function () {
	var indice = 'e';
	Ext.namespace('Ext.dsdata');
	Ext.dsdata.frmTipoU = new Ext.data.JsonStore({
		url: '../servicesAjax/DSlistaTipoUAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codigo', 'nombre']
	});

	var Paginas = new Ext.PagingToolbar({ //toolbar
		pageSize: 100,
		store: Ext.dsdata.frmTipoU,
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

	var Columnas = new Ext.grid.ColumnModel(
		[
			{
				header: 'Codigo',
				dataIndex: 'codigo',
				hidden: true
			}, {
				header: 'Perfil',
				dataIndex: 'nombre',
				width: 180,
				sortable: true
			}
		]
	);

	var grid = new Ext.grid.GridPanel({  //?
		id: 'gridTipoU',
		store: Ext.dsdata.frmTipoU,
		region: 'center',
		cm: Columnas,
		enableColLock: false,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		border: false,
		stripeRows: true,
		bbar: Paginas,
		listeners: {
			render: function () {
				Ext.dsdata.frmTipoU.load({ params: { start: 0, limit: 100 } });
			},
			'celldblclick': function () {
				if (indice == 'e') {
					Ext.MessageBox.alert('MSG', 'Seleccione un registro por favor..!');
				}
				else {
					modTipoU(indice);
				}
			}
		},
		sm: new Ext.grid.RowSelectionModel({//selecciona un dato en la  grilla para eliminar o actualizar
			singleSelect: true,
			listeners: {
				rowselect: function (sm, row, rec) {
					indice = row;
				}
			}
		})
	});

	function eliminar(idSel) { //para eliminar el dato seleccionado
		Ext.Ajax.request({
			url: '../servicesAjax/DSdesactivarTipoUAJAX.php',
			method: 'POST',
			params: { codigo: idSel },
			success: desactivo,
			failure: no_desactivo
		});
		function desactivo(resp) {
			Ext.dsdata.frmTipoU.load({ params: { start: 0, limit: 100 } });
		}
		function no_desactivo(resp) {
			Ext.MessageBox.alert('MSG', resp.mensaje);
		}
	}

	var filter = new Ext.form.TextField({ name: 'filterValue' });
	var bfilter = new Ext.Toolbar.Button({// para buscar un dato
		text: 'Buscar',
		tooltip: "Utilizar '*' para busquedas ",
		icon: '../img/view.png',
		handler: function (btn, e) {
			var filterVal = filter.getValue();
			if (filterVal.length > 0) {
				var o = { start: 0, limit: 100 };
				Ext.dsdata.frmTipoU.baseParams['buscar'] = filterVal;
				Ext.dsdata.frmTipoU.reload({ params: o });
			}
			else {
				Ext.dsdata.frmTipoU.clearFilter();
			}
		}
	});

	var PAmenu = new Ext.Panel({ //menu para los abm
		region: 'north',
		id: 'PAcabecera1',
		height: 29,
		tbar: [
			{
				id: 'nuev',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Nuevo</a>',
				icon: '../img/Nuevo.png',
				handler: function (t) {
					altaTipoU();
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					if (indice == 'e') {
						Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Registro.');
					}
					else { 
						modTipoU(indice); 
					}
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'elim',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Eliminar</a>',
				icon: '../img/Eliminar.png',
				handler: function confirm() {
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
									eliminar(Ext.dsdata.frmTipoU.getAt(indice).get('codigo'));
								}
							}
						});
					} else { 
						Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Registro.');
					}
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'selec',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Roles y Permisitos</a>',
				icon: '../img/check.png',
				handler: function (t) {
					if (indice == 'e') {
						Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Registro.');
					}
					else { 
						PermisoUsuario(Ext.dsdata.frmTipoU.getAt(indice).get('codigo')); 
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
