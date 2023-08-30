/*!
 * RAZOR - ZCJOTA
 * Copyright(c) 2023
 */

var winTipoPublicidad;
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
var btnAceptar = new Ext.Button({
	id: 'btnAceptar',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmTipoPublicidad.guardarDatos();
	}
});
var btnLimpiar = new Ext.Button({
	id: 'btnLimpiar',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		var frm = frmTipoPublicidad.getForm();
		frm.reset();
		frm.clearInvalid();
		winTipoPublicidad.hide();
	}
});

var frmTipoPublicidad = new Ext.FormPanel({
	frame: true,
	layout: 'absolute',
	items: [ lblNombre, lblDescripcion,	txtNombre, txtDescripcion ],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmTipoPublicidadAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmTipoPublicidad.getForm();
					frm.reset();
					frm.clearInvalid();
					winTipoPublicidad.hide();
					Ext.data.recargarTP();
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombre.focus(true, 100);
						});
					} else {
						Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
					}
				}
			});
		}
	}
});
function IniCompTipoPublicidad() {
	var frm = frmTipoPublicidad.getForm();
	frm.reset();
	frm.clearInvalid();
}
function CargCompTipoPublicidad(indice) {
	codigo = Ext.dsdata.storeTipoPublicidad.getAt(indice).get('codigo');
	txtNombre.setValue(Ext.dsdata.storeTipoPublicidad.getAt(indice).get('nombre'));
	txtDescripcion.setValue(Ext.dsdata.storeTipoPublicidad.getAt(indice).get('descripcion'));
}
function NuevoTipoPublicidad() {
	if (!winTipoPublicidad) {
		winTipoPublicidad = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 200,
			title: 'Tipo Publicidad',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmTipoPublicidad],
			buttonAlign:'center',
			buttons:[btnAceptar,'-','-', btnLimpiar],
			listeners: {
				show: function () {
					IniCompTipoPublicidad();
					txtNombre.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	winTipoPublicidad.show();
}
function ModificarTipoPublicidad(indice) {
	if (!winTipoPublicidad) {
		winTipoPublicidad = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 200,
			title: 'Tipo Publicidad',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmTipoPublicidad],
			buttonAlign:'center',
			buttons:[btnAceptar,'-','-', btnLimpiar],
			listeners: {
				show: function () {
					IniCompTipoPublicidad();
					txtNombre.focus(true, 300);
				}
			}
		});
	}
	opcion = 1;
	winTipoPublicidad.show();
	CargCompTipoPublicidad(indice);
}
