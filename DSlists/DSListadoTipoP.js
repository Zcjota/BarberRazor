/*!
 * RAZORR- JR
 * Copyright(c) 2023
 */

Ext.onReady(function () {
	Ext.namespace('Ext.dsdata');
	var indice = 'e';
	var confP = '';
	Ext.dsdata.storeTipoP = new Ext.data.JsonStore({
		url: '../servicesAjax/DSListaTipoPAjax.php',
		root: 'data',
		totalProperty: 'total',
		fields: ['codigo', 'codcategoria', 'descripcion', 'categoria']
	});

	var pagingTipoPBar = new Ext.PagingToolbar({
		pageSize: 100,
		store: Ext.dsdata.storeTipoP,
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
		singleSelect: false,
		listeners: {
			rowselect: function (sm, row, rec) {
				indice = row;
			},
		},
		handleMouseDown: function (g, rowIndex, e) {
			if (e.button !== 0 || this.isLocked()) {
				return;
			}
			var view = this.grid.getView();
			if (e.shiftKey && !this.singleSelect && this.last !== false) {
				var last = this.last;
				this.selectRange(last, rowIndex, e.ctrlKey);
				this.last = last;
				view.focusRow(rowIndex);
			} else {
				var isSelected = this.isSelected(rowIndex);
				if (isSelected) {
					this.deselectRow(rowIndex);
				} else if (!isSelected || this.getCount() > 1) {
					this.selectRow(rowIndex, true);
					view.focusRow(rowIndex);
				}
			}
		},
		isLocked: Ext.emptyFn,
		initEvents: function () {
			Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this);
			this.grid.on('render', function () {
				var view = this.grid.getView();
				view.mainBody.on('mousedown', this.onMouseDown, this);
				// Ext.fly(view.lockedInnerHd).on('mousedown', this.onHdMouseDown, this);
			}, this);
		}
	});
	var TipoPColumnMode = new Ext.grid.ColumnModel(
		[
			{
				header: 'ID',
				dataIndex: 'codigo',
				width: 50,
				sortable: true,
				hidden: true
			}, sm, {
				header: 'Categoria',
				dataIndex: 'categoria',
				width: 200,
				// hidden :true,
				sortable: true
			}, {
				header: 'Subcategoria',
				dataIndex: 'descripcion',
				width: 250,
				// hidden :true,
				sortable: true
			}
		]
	);

	var TipoPGrid = new Ext.grid.GridPanel({
		id: 'TipoPGrid',
		store: Ext.dsdata.storeTipoP,
		region: 'center',
		cm: TipoPColumnMode,
		enableColLock: false,
		stripeRows: true,
		selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
		bbar: pagingTipoPBar,
		listeners: {
			render: function () {
				Ext.dsdata.storeTipoP.load({ params: { start: 0, limit: 100 } });
			},
			'celldblclick': function () {
				ModificarTipoP(indice);
			}
		},
		sm: sm,
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
				Ext.dsdata.storeTipoP.baseParams['buscar'] = filterVal;
				Ext.dsdata.storeTipoP.reload({ params: o });
			} else {
				Ext.dsdata.storeTipoP.clearFilter();
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
					NuevoTipoP();
				}
			}, {
				xtype: 'tbseparator'
			}, {
				id: 'modf',
				text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
				icon: '../img/Editar.png',
				handler: function (t) {
					if (indice != 'e') {
						ModificarTipoP(indice);
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
						var cont=0;
						sm.each(function (record) {
							cont++;
						});
						if(cont == 1){
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
											url: '../servicesAjax/DSBajaTipoPAJAX.php',
											params: { codigo: Ext.dsdata.storeTipoP.getAt(indice).get('codigo') },
											method: 'POST',
											success: function (result, request) {
												Ext.MessageBox.alert('MSG', 'Registro Desactivado');
												Ext.dsdata.storeTipoP.load({ params: { start: 0, limit: 100 } });
											},
											failure: function (result, request) {
												Ext.MessageBox.alert('ERROR', result.responseText);
											}
										});
									}
								}
							});
						} else {
							Ext.MessageBox.alert('MSG','Seleccione solo un registro por favor..!');
						}
					} else {
						Ext.MessageBox.alert('MSG','Seleccione un registro por favor..!');
					}
				}
			}, '-', '->', filter, bfilter
		]
	});
	function succesfunction(resp) {
		var msj = Ext.util.JSON.decode(resp.responseText);
		if (msj.message.id == '99') {
			Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
				window.open("../");
			});
		} else if (msj.message.id == '2') {
			Ext.MessageBox.alert('Mensaje', msj.message.reason);
			Ext.dsdata.storeTipoP.load({ params: { start: 0, limit: 100 } });
		} else { Ext.MessageBox.alert('Error', msj.message.reason); }
	}
	// function configuracionRoles(conf)
	// {
	// if(conf.substring(0,1) == 0)
	// {					
	// var items = PAmenu.topToolbar.items;
	// items.get('nuev').disable(true);
	// }						  
	// if(conf.substring(1,2) == 0)
	// {						
	// var items = PAmenu.topToolbar.items;
	// items.get('elim').disable(true);			 
	// }						  
	// if(conf.substring(2,3) == 0)
	// {						
	// var items = PAmenu.topToolbar.items;
	// items.get('modf').disable(true);
	// }						  
	// }	

	var viewport1 = new Ext.Viewport({
		layout: 'border',
		items: [PAmenu, TipoPGrid]
	});
});