var winMarcaP;
var codigo;
var opcion;

var txtNombreMarcaP = new Ext.form.TextArea({
	name: 'txtnombre',
	hideLabel: true,
	maxLength: 250,
	width: 265,
	x: 100,
	y: 10,
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	emptyText: 'Máximo 255 caracteres.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAceptar_mp.focus();
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
var lbltipop = new Ext.form.Label({
	text: 'SubCategoria:',
	x: 10,
	y: 45,
	height: 70,
	cls: 'x-label'
});
var lblNombre = new Ext.form.Label({
	text: 'Descripcion:',
	x: 10,
	y: 15,
	height: 70,
	cls: 'x-label'
});


// botones
var btnAceptar_mp = new Ext.Button({
	id: 'btnAceptar_mp',
	// icon: '../img/save.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmMarcaP.guardarDatos();
	}
});

var btnLimpiar_mp = new Ext.Button({
	id: 'btnLimpiar_mp',
	// icon: '../img/delete.png',
	// iconCls: 'x-btn-text-icon',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompMarcaP();
		winMarcaP.hide();
	}
});

var frmMarcaP = new Ext.FormPanel({
	frame: true,
	autoScroll: false,
	layout: 'absolute',
	items: [lblNombre, txtNombreMarcaP],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmMarcaPAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					var frm = frmMarcaP.getForm();
					frm.reset();
					frm.clearInvalid();
					winMarcaP.hide();
					Ext.dsdata.storeMarcaP.load({ params: { start: 0, limit: 100 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombreMarcaP.focus(true, 300);
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
function IniCompMarcaP() {
	var frm = frmMarcaP.getForm();
	frm.reset();
	frm.clearInvalid();
}
function CargCompMarcaP(indice) {
	codigo = Ext.dsdata.storeMarcaP.getAt(indice).get('codigo');
	txtNombreMarcaP.setValue(Ext.dsdata.storeMarcaP.getAt(indice).get('descripcion'));
}
function NuevoMarcaP() {
	if (!winMarcaP) {
		winMarcaP = new Ext.Window({
			layout: 'fit',
			width: 420,
			height: 160,
			title: 'Marca Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: true,
			plain: true,
			border: false,
			modal: true,
			items: [frmMarcaP],
			buttonAlign: 'center',
			buttons: [btnAceptar_mp,'-', '-', btnLimpiar_mp],
			listeners: {
				show: function () {
					IniCompMarcaP();
					txtNombreMarcaP.focus(true, 300);
				}
			}
		});
	}
	opcion = 0;
	winMarcaP.show();
}

function ModificarMarcaP(indice) {
	if (!winMarcaP) {
		winMarcaP = new Ext.Window({
			layout: 'fit',
			width: 420,
			height: 160,
			title: 'Marca Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmMarcaP],
			buttonAlign: 'center',
			buttons: [btnAceptar_mp,'-', '-', btnLimpiar_mp],
			listeners: {
				show: function () {
					IniCompMarcaP();
				}
			}
		});
	}
	opcion = 1;
	winMarcaP.show();
	CargCompMarcaP(indice);
}
