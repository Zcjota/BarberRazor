
var winCargo;
var codigo;
var opcion;

var txtNombre = new Ext.form.TextField({
	name: 'nom',
	hideLabel: true,
	maxLength: 150,
	width: 265,
	x: 100,
	y: 15,
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtDescripcion.focus();
			}
		}
	}
});
var txtDescripcion = new Ext.form.TextArea({
	name: 'descrip',
	hideLabel: true,
	maxLength: 150,
	width: 265,
	x: 100,
	y: 45,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAceptar_ca.focus();
			}
		}
	}
});

// Labels
var lblNombre = new Ext.form.Label({
	text: 'Nombre:',
	x: 10,
	y: 20,
	height: 70,
	cls: 'x-label'
});
var lblDescripcion = new Ext.form.Label({
	text: 'Descripcion:',
	x: 10,
	y: 70,
	height: 70,
	cls: 'x-label'
});

// botones
var btnAceptar_ca = new Ext.Button({
	id: 'btnAceptar_ca',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmCargo.guardarDatos();
	}
});
var btnLimpiar_ca = new Ext.Button({
	id: 'btnLimpiar_ca',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		var frm = frmCargo.getForm();
		frm.reset();
		frm.clearInvalid();
		winCargo.hide();
	}
});

var frmCargo = new Ext.FormPanel({
	frame: true,
	layout: 'absolute',
	items: [ lblNombre, lblDescripcion,	txtNombre, txtDescripcion ],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmCargoAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmCargo.getForm();
					frm.reset();
					frm.clearInvalid();
					winCargo.hide();
					Ext.dsdata.storeCargo.load({ params: { start: 0, limit: 100 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombre.focus(true, 100);
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
function IniCompCargo() {
	var frm = frmCargo.getForm();
	frm.reset();
	frm.clearInvalid();
}
function CargCompCargo(indice) {
	codigo = Ext.dsdata.storeCargo.getAt(indice).get('codigo');
	txtNombre.setValue(Ext.dsdata.storeCargo.getAt(indice).get('nombre'));
	txtDescripcion.setValue(Ext.dsdata.storeCargo.getAt(indice).get('descripcion'));
}
function NuevoCargo() {
	if (!winCargo) {
		winCargo = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 200,
			title: 'Cargo',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmCargo],
			buttonAlign:'center',
			buttons:[btnAceptar_ca,'-','-', btnLimpiar_ca],
			listeners: {
				show: function () {
					IniCompCargo();
					txtNombre.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	winCargo.show();
}
function ModificarCargo(indice) {
	if (!winCargo) {
		winCargo = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 200,
			title: 'Cargo',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmCargo],
			buttonAlign:'center',
			buttons:[btnAceptar_ca,'-','-', btnLimpiar_ca],
			listeners: {
				show: function () {
					IniCompCargo();
					txtNombre.focus(true, 300);
				}
			}
		});
	}
	opcion = 1;
	winCargo.show();
	CargCompCargo(indice);
}
