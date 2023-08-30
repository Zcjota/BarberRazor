var winProducto;
var codigo;
var opcion;

Ext.namespace('Ext.dsdata');
Ext.dsdata.storeCategoriaP = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaCategoriaPCBAJAX.php',
	root: 'data',
	fields: ['codcategoriap', 'nombcategoriap'],
});
Ext.dsdata.storeCategoriaP.load();
var cboCategoriaP = new Ext.form.ComboBox({
	hiddenName: 'cbcategoriap',
	width: 265,
	x: 100,
	y: 10,
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: Ext.dsdata.storeCategoriaP,
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
			storetipoP.load({ params: { codcateg: record.data.codcategoriap } });
		}
	}
});
storetipoP = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaTipoPCBAJAX.php',
	root: 'data',
	fields: ['codtipop', 'nombtipop'],
	listeners: {
		load: function (thisStore, record, ids) {
			cboTipoP.reset();
			cboTipoP.focus(true, 300);
		}
	}
});
var cboTipoP = new Ext.form.ComboBox({
	hiddenName: 'cbtipop',
	width: 265,
	x: 100,
	y: 40,
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: storetipoP,
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
storemarcaP = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaMarcaPCBAJAX.php',
	root: 'data',
	fields: ['codmarcap', 'nombmarcap'],
	listeners: {
		load: function (thisStore, record, ids) {
			cboMarcaP.reset();
			cboMarcaP.focus(true, 300);
		}
	}
});
storemarcaP.load();
var cboMarcaP = new Ext.form.ComboBox({
	hiddenName: 'cbmarcap',
	width: 265,
	x: 100,
	y: 70,
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	style: { textTransform: "uppercase" },
	store: storemarcaP,
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
			txtNombreProducto.focus(true, 300);
		}
	}
});
var txtNombreProducto = new Ext.form.TextArea({
	name: 'txtnombre',
	hideLabel: true,
	maxLength: 250,
	width: 265,
	x: 100,
	y: 100,
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'Máximo 255 caracteres.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtPC.focus(true, 300);
			}
		}
	}
});
var txtPC = new Ext.form.NumberField({
	name: 'txtpc',
	hideLabel: true,
	maxLength: 10,
	width: 80,
	x: 100,
	y: 175,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido.',
	emptyText: 'Precio.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtPV.focus(true, 300);
			}
		}
	}
});
var txtPV = new Ext.form.NumberField({
	name: 'txtpv',
	hideLabel: true,
	maxLength: 10,
	width: 80,
	x: 285,
	y: 175,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'Precio.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtUbicacion.focus(true, 300);
			}
		}
	}
});
var txtUbicacion = new Ext.form.TextField({
	name: 'txtubicacion',
	hideLabel: true,
	maxLength: 20,
	width: 265,
	x: 100,
	y: 205,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'ubicacion.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtCodBarra.focus(true, 300);
			}
		}
	}
});
var txtCodBarra = new Ext.form.TextField({
	name: 'txtcodbarra',
	hideLabel: true,
	maxLength: 20,
	width: 265,
	x: 100,
	y: 235,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'codigo de barra.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAceptar_pro.focus(true, 300);
			}
		}
	}
});
// Labels
var lblcategoriap = new Ext.form.Label({
	text: 'Categoroa:',
	x: 10,
	y: 15,
	height: 70,
	cls: 'x-label'
});
var lbltipop = new Ext.form.Label({
	text: 'SubCategoria:',
	x: 10,
	y: 45,
	height: 70,
	cls: 'x-label'
});
var lblmarca = new Ext.form.Label({
	text: 'Marca:',
	x: 10,
	y: 75,
	height: 70,
	cls: 'x-label'
});
var lblNombre = new Ext.form.Label({
	text: 'Descripción:',
	x: 10,
	y: 105,
	height: 70,
	cls: 'x-label'
});
var lblpc = new Ext.form.Label({
	text: 'P. Compra:',
	x: 10,
	y: 180,
	height: 70,
	cls: 'x-label'
});
var lblpv = new Ext.form.Label({
	text: 'P. Venta:',
	x: 205,
	y: 180,
	height: 70,
	cls: 'x-label'
});
var lblubicacion = new Ext.form.Label({
	text: 'Ubicacion:',
	x: 10,
	y: 210,
	height: 70,
	cls: 'x-label'
});
var lblcodbarra = new Ext.form.Label({
	text: 'Cod. de Barra:',
	x: 10,
	y: 240,
	height: 70,
	cls: 'x-label'
});


// botones

var btnAceptar_pro = new Ext.Button({
	id: 'btnAceptar_pro',
	// icon: '../img/save.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style : { background :'#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler: function () {
		frmProducto.guardarDatos();
	}
});

var btnLimpiar_pro = new Ext.Button({
	id: 'btnLimpiar_pro',
	// icon: '../img/delete.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style : { background :'#F6CECE', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler: function () {
		IniCompProducto();
		winProducto.hide();
	}
});

var frmProducto = new Ext.FormPanel({
	frame: true,
	autoScroll: false,
	layout: 'absolute',
	items: [
		lblNombre, lblcategoriap, lbltipop, lblmarca, lblpc, lblpv, lblubicacion, lblcodbarra,
		cboCategoriaP, cboTipoP, cboMarcaP, txtNombreProducto, txtPC, txtPV, txtUbicacion, txtCodBarra,
	],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmProductoAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmProducto.getForm();
					frm.reset();
					frm.clearInvalid();
					winProducto.hide();
					Ext.dsdata.storeProducto.load({ params: { start: 0, limit: 1000 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombreProducto.focus(true, 1000);
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
function IniCompProducto() {
	var frm = frmProducto.getForm();
	frm.reset();
	frm.clearInvalid();
}
function CargCompProducto(indice) {
	codigo = Ext.dsdata.storeProducto.getAt(indice).get('codigo');
	txtPC.setValue(Ext.dsdata.storeProducto.getAt(indice).get('pc'));
	txtPV.setValue(Ext.dsdata.storeProducto.getAt(indice).get('pv'));
	txtUbicacion.setValue(Ext.dsdata.storeProducto.getAt(indice).get('ubicacion'));
	txtCodBarra.setValue(Ext.dsdata.storeProducto.getAt(indice).get('codbarra'));
	cboCategoriaP.setValue(Ext.dsdata.storeProducto.getAt(indice).get('codcategoria'));
	storetipoP.load({ params: { codcateg: Ext.dsdata.storeProducto.getAt(indice).get('codcategoria') } });
	setTimeout(function () {
		cboTipoP.setValue(Ext.dsdata.storeProducto.getAt(indice).get('codtipo'));
		cboMarcaP.setValue(Ext.dsdata.storeProducto.getAt(indice).get('codmarca'));
		txtNombreProducto.setValue(Ext.dsdata.storeProducto.getAt(indice).get('descripcion'));
		txtNombreProducto.focus(true, 100);
	}, 1000);
}
function NuevoProducto() {
	if (!winProducto) {
		winProducto = new Ext.Window({
			layout: 'fit',
			width: 420,
			height: 350,
			title: 'Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmProducto],
			buttonAlign:'center',
			buttons:[btnAceptar_pro,'-','-', btnLimpiar_pro],
			listeners: {
				show: function () {
					IniCompProducto();
					cboCategoriaP.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	winProducto.show();
}

function ModificarProducto(indice) {
	if (!winProducto) {
		winProducto = new Ext.Window({
			layout: 'fit',
			width: 420,
			height: 350,
			title: 'Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmProducto],
			buttonAlign:'center',
			buttons:[btnAceptar_pro,'-','-', btnLimpiar_pro],
			listeners: {
				show: function () {
					IniCompProducto();
				}
			}
		});
	}
	opcion = 1;
	winProducto.show();
	CargCompProducto(indice);
}
