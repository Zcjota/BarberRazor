
var winTipoU;
var codigo;
var opcion;

var txtNombre = new Ext.form.TextField({
	name: 'nom',
	hideLabel: true,
	maxLength: 150,
	width: 230,
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
				btnAceptar_tu.focus();
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

// botones
var btnAceptar_tu = new Ext.Button({
	id: 'btnAceptartu',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style : { background :'#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler:function(){
		frmTipoU.guardarDatos();
	} 
});		

var btnLimpiar_tu = new Ext.Button({
	id: 'btnLimpiartu',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style : { background :'#F6CECE', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler:function(){
		var frm = frmTipoU.getForm();
		frm.reset();
		frm.clearInvalid();
		winTipoU.hide();
	} 
});

var frmTipoU = new Ext.FormPanel({
	frame: true,
	layout: 'absolute',
	items: [ lblNombre, txtNombre ],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmTipoUAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmTipoU.getForm();
					frm.reset();
					frm.clearInvalid();
					winTipoU.hide();
					Ext.dsdata.frmTipoU.load({ params: { start: 0, limit: 25 } });
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
function IniCompTipoU() {
	var frm = frmTipoU.getForm();
	frm.reset();
	frm.clearInvalid();
}
function CargCompTipoU(indice) {
	codigo = Ext.dsdata.frmTipoU.getAt(indice).get('codigo');
	txtNombre.setValue(Ext.dsdata.frmTipoU.getAt(indice).get('nombre'));
}
function altaTipoU() {
	if (!winTipoU) {
		winTipoU = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 130,
			title: 'Perfil Usuario',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmTipoU],
			buttonAlign:'center',
			buttons:[btnAceptar_tu,'-','-', btnLimpiar_tu],
			listeners: {
				show: function () {
					IniCompTipoU();
					txtNombre.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	winTipoU.show();
}

function modTipoU(indice) {
	if (!winTipoU) {
		winTipoU = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 130,
			title: 'Perfil Usuario',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmTipoU],
			buttonAlign:'center',
			buttons:[btnAceptar_tu,'-','-', btnLimpiar_tu],
			listeners: {
				show: function () {
					IniCompTipoU();
					txtNombre.focus(true, 300);
				}
			}
		});
	}
	opcion = 1;
	winTipoU.show();
	CargCompTipoU(indice);
}
