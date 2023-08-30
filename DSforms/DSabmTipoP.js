var winTipoP;
var codigo;
var opcion;
Ext.namespace('Ext.dsdata');

Ext.dsdata.storeCategoriaP = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaCategoriaPCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codcategoriap', 'nombcategoriap']
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
	emptyText: 'Seleccionar Categ.',
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codcategoriap',
	displayField: 'nombcategoriap',
	listeners: {
		'select': function (cmb, record, index) {
			txtNombreTipoP.focus(true, 300);
		}
	}
});
var txtNombreTipoP = new Ext.form.TextArea({
	name: 'txtnombre',
	hideLabel: true,
	maxLength: 250,
	width: 265,
	x: 100,
	y: 40,
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'Maximo 250 caracteres.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAceptar_tp.focus();
			}
		}
	}
});

// Labels
var lblcategoriap = new Ext.form.Label({
	text: 'Categoria:',
	x: 10,
	y: 15,
	height: 70,
	cls: 'x-label'
});
var lblNombre = new Ext.form.Label({
	text: 'Descripcion:',
	x: 10,
	y: 45,
	height: 70,
	cls: 'x-label'
});


// botones
var btnAceptar_tp = new Ext.Button({
	id: 'btnAceptarp',
	// icon: '../img/save.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmTipoP.guardarDatos();
	}
});
var btnLimpiar_tp = new Ext.Button({
	id: 'btnLimpiarp',
	// icon: '../img/delete.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompTipoP();
		winTipoP.hide();
	}
});

var frmTipoP = new Ext.FormPanel({
	frame: true,
	autoScroll: false,
	layout: 'absolute',
	items: [lblNombre, lblcategoriap, cboCategoriaP, txtNombreTipoP],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmTipoPAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmTipoP.getForm();
					frm.reset();
					frm.clearInvalid();
					winTipoP.hide();
					Ext.dsdata.storeTipoP.load({ params: { start: 0, limit: 100 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombreTipoP.focus(true, 1000);
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
function IniCompTipoP() {
	var frm = frmTipoP.getForm();
	frm.reset();
	frm.clearInvalid();
}
function CargCompTipoP(indice) {
	codigo = Ext.dsdata.storeTipoP.getAt(indice).get('codigo');
	txtNombreTipoP.setValue(Ext.dsdata.storeTipoP.getAt(indice).get('descripcion'));
	cboCategoriaP.setValue(Ext.dsdata.storeTipoP.getAt(indice).get('codcategoria'));
}
function NuevoTipoP() {
	if (!winTipoP) {
		winTipoP = new Ext.Window({
			layout: 'fit',
			width: 420,
			height: 200,
			title: 'SubCategoria Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmTipoP],
			buttonAlign: 'center',
			buttons: [btnAceptar_tp, '-', '-', btnLimpiar_tp],
			listeners: {
				show: function () {
					IniCompTipoP();
					cboCategoriaP.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	winTipoP.show();
}

function ModificarTipoP(indice) {
	if (!winTipoP) {
		winTipoP = new Ext.Window({
			layout: 'fit',
			width: 420,
			height: 200,
			title: 'SubCategoria Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmTipoP],
			buttonAlign: 'center',
			buttons: [btnAceptar_tp, '-', '-', btnLimpiar_tp],
			listeners: {
				show: function () {
					IniCompTipoP();
					cboCategoriaP.focus(true, 300);
				}
			}
		});
	}
	opcion = 1;
	winTipoP.show();
	CargCompTipoP(indice);
}
