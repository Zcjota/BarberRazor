var winProducto_m;
var codigo_m;
var opcion_m;
var op_bandera;
var indiceP = 'e';
var registrosST = new Array();
var registrosP = new Array();
var registrosPb = new Array();
Ext.namespace('Ext.dsdata');

Ext.dsdata.storeCategoriaP_m = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaCategoriaPCBAJAX.php',
	root: 'data',
	fields: ['codcategoriap', 'nombcategoriap'],
});
Ext.dsdata.storeCategoriaP_m.load();
var cboCategoriaP_m = new Ext.form.ComboBox({
	hiddenName: 'cbcategoriap',
	fieldLabel: 'Categoría',
	anchor: '95%',
	// x: 100,
	// y: 10,
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	store: Ext.dsdata.storeCategoriaP_m,
	emptyText: 'Seleccionar Categoria.',
	mode: 'local',
	forceSelection: true,
	style: { textTransform: "uppercase" },
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codcategoriap',
	displayField: 'nombcategoriap',
	listeners: {
		'select': function (cmb, record, index) {
			storetipoP_m.load({ params: { codcateg: record.data.codcategoriap } });
		}
	}
});
storetipoP_m = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaTipoPCBAJAX.php',
	root: 'data',
	fields: ['codtipop', 'nombtipop'],
	listeners: {
		load: function (thisStore, record, ids) {
			cboTipoP_m.reset();
			cboTipoP_m.focus(true, 300);
		}
	}
});
var cboTipoP_m = new Ext.form.ComboBox({
	hiddenName: 'cbtipop',
	fieldLabel: 'SubCategoría',
	anchor: '95%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	store: storetipoP_m,
	emptyText: 'Seleccionar SubCategoria.',
	style: { textTransform: "uppercase" },
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codtipop',
	displayField: 'nombtipop'
});
storemarcaP_m = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaMarcaPCBAJAX.php',
	root: 'data',
	fields: ['codmarcap', 'nombmarcap'],
	listeners: {
		load: function (thisStore, record, ids) {
			cboMarcaP_m.reset();
			cboMarcaP_m.focus(true, 300);
		}
	}
});
storemarcaP_m.load();
var cboMarcaP_m = new Ext.form.ComboBox({
	hiddenName: 'cbmarcap',
	fieldLabel: 'Marca',
	anchor: '100%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	store: storemarcaP_m,
	emptyText: 'Seleccionar Marca.',
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codmarcap',
	displayField: 'nombmarcap',
	listeners: {
		'select': function (cmb, record, index) {
			txtNombreProducto_m.focus(true, 300);
		}
	}
});
var txtNombreProducto_m = new Ext.form.TextField({
	name: 'txtnombre',
	fieldLabel: 'Descripción',
	// hideLabel: true,	
	maxLength: 250,
	anchor: '99%',
	height: 22,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'Maximo 250 caracteres.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtPC_m.focus(true, 300);
			}
		}
	}
});
var txtPC_m = new Ext.form.NumberField({
	name: 'txtpc',
	fieldLabel: 'P.C.',
	// hideLabel: true,	
	maxLength: 10,
	anchor: '90%',
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido.',
	// emptyText: 'Precio.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtPV_m.focus(true, 300);
			}
		}
	}
});
var txtPV_m = new Ext.form.NumberField({
	name: 'txtpv',
	fieldLabel: 'P.V.',
	// hideLabel: true,	
	maxLength: 10,
	anchor: '90%',
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	// emptyText: 'Precio.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtUbicacion_m.focus(true, 300);
			}
		}
	}
});
var txtUbicacion_m = new Ext.form.TextField({
	name: 'txtubicacion',
	fieldLabel: 'Ubicación',
	// hideLabel: true,	
	maxLength: 20,
	anchor: '95%',
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	// emptyText: 'ubicacion.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtCodBarra_m.focus(true, 300);
			}
		}
	}
});
var txtCodBarra_m = new Ext.form.TextField({
	name: 'txtcodbarra',
	fieldLabel: 'Cod. de Barra',
	// hideLabel: true,	
	maxLength: 20,
	anchor: '95%',
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	// emptyText: 'codigo_m de barra.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAgregar_m.focus(true, 300);
			}
		}
	}
});
storeDetalleP = new Ext.data.ArrayStore({
	fields: [
		{ name: 'codsubcategoria' },
		{ name: 'codmarca' },
		{ name: 'categoria' },
		{ name: 'subcategoria' },
		{ name: 'marca' },
		{ name: 'descripcion' },
		{ name: 'pc' },
		{ name: 'pv' },
		{ name: 'ubicacion' },
		{ name: 'codbarra' },
		{ name: 'codnada' },
	],
	id: 10
});
var ColumnasP = new Ext.grid.ColumnModel(
	[

		{
			header: '<a style ="color:#15428B; font: bold 11px tahoma,arial,verdana,sans-serif;"></a>',
			dataIndex: '',
			width: 3,
			renderer: function (value, cell) {
				str = "<div style='text-align:center;'> <div class='zoom'></div> <img class='zoom' src='../img/Eliminar.png' WIDTH='13' HEIGHT='13'></div>";
				return str;
			}
		}, {
			header: 'Categoria',
			dataIndex: 'categoria',
			width: 15,
		}, {
			header: 'Subcategoria',
			dataIndex: 'subcategoria',
			width: 15,
			sortable: true
		}, {
			header: 'Marca',
			dataIndex: 'marca',
			width: 15,
			sortable: true
		}, {
			header: 'Descripción',
			dataIndex: 'descripcion',
			width: 15,
			sortable: true,
			editor: {
				xtype: 'textfield',
				allowBlank: false,
				// maxLength : 4, 
			}
		}, {
			xtype: 'numbercolumn',
			header: 'P.C.',
			dataIndex: 'pc',
			width: 8.33,
			align: 'right',
			sortable: true,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				// maxLength : 4, 
			}
		}, {
			xtype: 'numbercolumn',
			header: 'P.V.',
			dataIndex: 'pv',
			width: 8.33,
			align: 'right',
			sortable: true,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				// maxLength : 4, 
			}
		}, {
			header: 'Ubicación',
			dataIndex: 'ubicacion',
			width: 13,
			sortable: true,
			editor: {
				xtype: 'textfield',
				allowBlank: true,
				// maxLength : 4, 
			}
		}, {
			header: 'Cod.Barra',
			dataIndex: 'codbarra',
			width: 10.33,
			sortable: true,
			editor: {
				xtype: 'textfield',
				allowBlank: true,
				// maxLength : 4, 
			}
		}
	]
);
function EliminarFila() {
	var store = Ext.getCmp("gridproducto").getStore();
	store.removeAt(indiceP);
	this.gridProducto.getView().refresh();
	//http://docs.sencha.com/ext-js/3-4/#!/api/Ext.data.Store-method-remove
	registrosPb = null;
	registrosPb = new Array();
	for (var i = indiceP; i < registrosP.length - 1; i++) {
		registrosP[i] = registrosP[i + 1];
	}
	for (var i = 0; i < registrosP.length - 1; i++) {
		registrosPb[i] = registrosP[i];
	}
	registrosP = null;
	registrosP = new Array();
	registrosP = registrosPb;
	gridProducto.removeAll();
	storeDetalleP.removeAll();
	storeDetalleP.loadData(registrosP);
	txtNombreProducto_m.setValue('');
	txtPC_m.setValue('');
	txtPV_m.setValue('');
	txtUbicacion_m.setValue('');
	txtCodBarra_m.setValue('');
	txtNombreProducto_m.focus(true, 300);
}
function ActualizarGrid() {
	var dimension = registrosP.length;
	var codsubcategoria_p = cboTipoP_m.getValue();
	var codmarca_p = cboMarcaP_m.getValue();
	var categoria_p = cboCategoriaP_m.getRawValue();
	var subcategoria_p = cboTipoP_m.getRawValue();
	var marca_p = cboMarcaP_m.getRawValue();
	var descripcion_p = txtNombreProducto_m.getValue();
	var pc_p = txtPC_m.getValue();
	var pv_p = txtPV_m.getValue();
	var ubicacion_p = txtUbicacion_m.getValue();
	var codbarra_p = txtCodBarra_m.getValue();
	var registro = new Array(10);
	registro[0] = codsubcategoria_p;
	registro[1] = codmarca_p;
	registro[2] = categoria_p;
	registro[3] = subcategoria_p;
	registro[4] = marca_p;
	registro[5] = descripcion_p;
	registro[6] = pc_p;
	registro[7] = pv_p;
	registro[8] = ubicacion_p
	registro[9] = codbarra_p;
	registro[10] = null;
	registrosP[dimension] = registro;
	storeDetalleP.loadData(registrosP);
	txtNombreProducto_m.setValue('');
	txtPC_m.setValue('');
	txtPV_m.setValue('');
	txtUbicacion_m.setValue('');
	txtCodBarra_m.setValue('');
	txtNombreProducto_m.focus(true, 300);
}
var gridProducto = new Ext.grid.EditorGridPanel({
	id: 'gridproducto',
	anchor: '100%',
	height: 200,
	store: storeDetalleP,
	title: 'PRODUCTO',
	cm: ColumnasP,
	selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
	border: false,
	viewConfig: {
		forceFit: true
	},
	enableColLock: false,
	stripeRows: false,
	clicksToEdit: 1,
	deferRowRender: false,
	sm: new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {
			rowselect: function (sm, row, rec) {
				indiceP = row;
			}
		}
	}),
	listeners: {
		'cellclick': function (grid, rowIndex, cellIndex, e) {
			if (cellIndex == 0) {
				EliminarFila();
			}
		}
	},

});
function GuardarArray() {
	var datosGrid = [];
	storeDetalleP.each(function (rec) {
		datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
	});
	this.gridProducto.stopEditing();
	registrosST = Ext.encode(datosGrid);
	return registrosST;
};
var btnAceptar_m_pro = new Ext.Button({
	id: 'btnAceptar_m_pro',
	// icon: '../img/save.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style : { background :'#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler: function () {
		if (registrosP.length > 0) {
			GuardarArray();
			frmProducto_m.guardarDatos();
		} else {
			Ext.MessageBox.alert('MSG','Ingresar mínimo un registro en la grilla.')
		}
	}
});

var btnLimpiar_m_pro = new Ext.Button({
	id: 'btnLimpiar_m_pro',
	// icon: '../img/delete.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style : { background :'#F6CECE', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler: function () {
		IniCompProducto_m();
		winProducto_m.hide();
	}
});
var btnAgregar_m = new Ext.Button({
	id: 'btnAgregar_m',
	fieldLabel: ' ',
	icon: '../img/check.png',
	iconCls: 'x-btn-text-icon',
	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Agregar</a>',
	style: { background: '#93c363', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		if (validacionP()) {
			ActualizarGrid();
		} else {
			Ext.MessageBox.alert('MSG','Faltan Datos por ingresar.');
		}
	}
});
function validacionP() {
	var vf = true;
	if (cboCategoriaP_m.getValue() == '') { vf = false }
	if (cboTipoP_m.getValue() == '') { vf = false }
	if (cboMarcaP_m.getValue() == '') { vf = false }
	if (txtNombreProducto_m.getValue() == '') { vf = false }
	if (txtPC_m.getValue().toString() == '') { vf = false }
	if (txtPV_m.getValue().toString() == '') { vf = false }
	return vf;
}
var frmProducto_m = new Ext.FormPanel({
	// frame:true, 	
	// autoScroll:false,	
	// layout:'absolute',			
	frame: true,
	//selectOnFocus: true,
	autoScroll: true,
	labelAlign: 'top',
	layout: 'column',
	items: [	//lblNombre_m,lblcategoriap_m,lbltipop_m,lblmarca_m, lblpc_m, lblpv_m, lblubicacion_m,lblcodbarra_m,
		// , ,, ,,,txtUbicacion_m,txtCodBarra_m,
		// 
		{
			columnWidth: .33,
			layout: 'form',
			vertical: true,
			border: false,
			items: [cboCategoriaP_m]
		}, {
			columnWidth: .33,
			layout: 'form',
			vertical: true,
			border: false,
			items: [cboTipoP_m]
		}, {
			columnWidth: .33,
			layout: 'form',
			vertical: true,
			border: false,
			items: [cboMarcaP_m]
		}, {
			columnWidth: .6,
			layout: 'form',
			vertical: true,
			border: false,
			items: [txtNombreProducto_m]
		}, {
			columnWidth: .05,
			layout: 'form',
			vertical: true,
			border: false,
			items: [txtPC_m]
		}, {
			columnWidth: .05,
			layout: 'form',
			vertical: true,
			border: false,
			items: [txtPV_m]
		}, {
			columnWidth: .1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [txtUbicacion_m]
		}, {
			columnWidth: .1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [txtCodBarra_m]
		}, {
			columnWidth: .1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [btnAgregar_m]
		}, {
			columnWidth: 1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [gridProducto]
		}

	],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSaltaProductoMasivoAJAX.php',
				params: { registros: registrosST },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmProducto_m.getForm();
					frm.reset();
					frm.clearInvalid();
					winProducto_m.hide();
					if(op_bandera == 1){
						Ext.dsdata.storeProducto.load({ params: { start: 0, limit: 1000 } });
					} else {
						storeproducto.load();
					}
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombreProducto_m.focus(true, 1000);
						});
					}
					else {
						Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
					}
				}
			});
		}
	}
});
function IniCompProducto_m() {
	var frm = frmProducto_m.getForm();
	frm.reset();
	frm.clearInvalid();
	gridProducto.removeAll();
	gridProducto.getStore().removeAll();
	registrosST = [];
	registrosP = [];
}
function AltaProducto(bandera) {
	if (!winProducto_m) {
		winProducto_m = new Ext.Window({
			layout: 'fit',
			width: 840,
			height: 400,
			title: 'Registrar Producto Masivamente',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmProducto_m],
			buttonAlign: 'center',
			buttons: [btnAceptar_m_pro, '-', '-', btnLimpiar_m_pro],
			listeners: {
				show: function () {
					IniCompProducto_m();
					// cboCategoriaP_m.focus(true, 300);
				}
			}
		});
	}
	opcion_m = 0;
	winProducto_m.show();
	op_bandera = bandera;
}
