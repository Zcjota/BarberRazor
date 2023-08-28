
var winCategoriaP;
var codigo;
var opcion;

var txtDescripcionCP = new Ext.form.TextArea({
	name: 'descrip',
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
				btnAceptar_cp.focus();
			}
		}
	}
});

// Labels
var lblDescripcionCP = new Ext.form.Label({
	text: 'Descripcion:',
	x: 10,
	y: 20,
	height: 70,
	cls: 'x-label'
});

// botones
var btnAceptar_cp = new Ext.Button({
	id: 'btnAceptar_cp',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmCategoriaP.guardarDatos();
	}
});
var btnLimpiar_cp = new Ext.Button({
	id: 'btnLimpiar_cp',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompCategoriaP();
		winCategoriaP.hide();
	}
});

var frmCategoriaP = new Ext.FormPanel({
	frame: true,
	layout: 'absolute',
	items: [lblDescripcionCP, txtDescripcionCP],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmCategoriaPAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmCategoriaP.getForm();
					frm.reset();
					frm.clearInvalid();
					winCategoriaP.hide();
					Ext.dsdata.storeCategoriaP.load({ params: { start: 0, limit: 25 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombreR.focus(true, 100);
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
function IniCompCategoriaP() {
	var frm = frmCategoriaP.getForm();
	frm.reset();
	frm.clearInvalid();
}
function CargarComponenteCP(indice) {
	codigo = Ext.dsdata.storeCategoriaP.getAt(indice).get('codigo');
	txtDescripcionCP.setValue(Ext.dsdata.storeCategoriaP.getAt(indice).get('descripcion'));
}
function NuevoCategoriaP() {
	if (!winCategoriaP) {
		winCategoriaP = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 170,
			title: 'Categoria Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmCategoriaP],
			buttonAlign:'center',
			buttons:[btnAceptar_cp,'-','-', btnLimpiar_cp],
			listeners: {
				show: function () {
					IniCompCategoriaP();
					txtDescripcionCP.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	winCategoriaP.show();
}

function ModificarCategoriaP(indice) {
	if (!winCategoriaP) {
		winCategoriaP = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 170,
			title: 'Categoria Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmCategoriaP],
			buttonAlign:'center',
			buttons:[btnAceptar_cp,'-','-', btnLimpiar_cp],
			listeners: {
				show: function () {
					txtDescripcionCP.focus(true, 300);
					IniCompCategoriaP();
				}
			}
		});
	}
	opcion = 1;
	winCategoriaP.show();
	CargarComponenteCP(indice);
}
