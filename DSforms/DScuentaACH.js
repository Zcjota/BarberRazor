var winACH;
var codigo;
var opcion;
Ext.namespace('Ext.dsdata');
Ext.dsdata.storeACH = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaCuentaACHCBAJAX.php',
	root: 'data',
	fields: ['cod', 'nomb']
});
Ext.dsdata.storeACH.load();
var cboACH = new Ext.form.ComboBox({
	hiddenName: 'cbACH',
	width: 265,
	x: 100,
	y: 10,
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: Ext.dsdata.storeACH,
	emptyText: 'Seleccionar.',
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'cod',
	displayField: 'nomb',
	listeners: {
		'select': function (cmb, record, index) {
			txtComentario.focus(true, 300);
		}
	}
});
var txtComentario = new Ext.form.TextArea({
	name: 'coment',
	hideLabel: true,
	maxLength: 250,
	width: 265,
	x: 100,
	y: 40,
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'Máximo 512 caracteres.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAceptar_cACH.focus();
			}
		}
	}
});

// Labels
var lblcACH = new Ext.form.Label({
	text: 'Cuenta:',
	x: 10,
	y: 15,
	height: 70,
	cls: 'x-label'
});
var lblComentario = new Ext.form.Label({
	text: 'Comentario:',
	x: 10,
	y: 45,
	height: 70,
	cls: 'x-label'
});


// botones
var btnAceptar_cACH = new Ext.Button({
	id: 'btnAceptar_cACH',
	// icon: '../img/save.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Seleccionar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		if (cboACH.getRawValue() != '' || cboACH.getValue() != 0) {
			codACH_G = cboACH.getValue();
			comentACH_G = txtComentario.getValue();
			winACH.hide();
		} else {
			Ext.MessageBox.alert('Alerta de Mensaje.', 'Debe Selecionar una Cuenta.');
		}
	}
});
var btnLimpiar_c = new Ext.Button({
	id: 'btnLimpiar_c',
	// icon: '../img/delete.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompACH();
		winACH.hide();
		Ext.getCmp('tipopago').setValue(1);
	}
});

var frmACH = new Ext.FormPanel({
	frame: true,
	autoScroll: false,
	layout: 'absolute',
	items: [lblComentario, lblcACH, cboACH, txtComentario],
});
function IniCompACH() {
	var frm = frmACH.getForm();
	frm.reset();
	frm.clearInvalid();
}

var codACH_G = 0;
var comentACH_G = '';
function SelectACH(cod) {
	if (!winACH) {
		winACH = new Ext.Window({
			layout: 'fit',
			width: 420,
			height: 200,
			title: 'SELECCIONAR CUENTA',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmACH],
			buttonAlign: 'center',
			buttons: [btnAceptar_cACH, '-', '-', btnLimpiar_c],
			listeners: {
				show: function () {
					cboACH.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	codACH_G = cod;
	winACH.show();
}
