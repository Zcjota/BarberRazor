var winIngresoInterno_AI;
var codsistemp = 0;
var pcII = 6.90;//precio compra del dolar
var spot = new Ext.ux.Spotlight({
	easing: 'easeOut',
	duration: .8
});
var updateSpot = function (id) {
	if (typeof id == 'string') {
		spot.show(id);
	} else if (!id && spot.active) {
		spot.hide();
	}
};
storePersonal_AI = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPersonalCSAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'codsistema', 'codcargo'],
});
storePersonal_AI.load();
function verificacionPersonal_AI(btn, text) {
	if (btn == 'ok') {
		if (text == "") {
			Ext.MessageBox.alert("MSG", "Debe Introducir Un Código.");
			Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionPersonal_AI);
		} else {
			var posicion = storePersonal.find('codsistema', text);
			if (posicion >= 0) {
				// codpersonalVal =  storePersonal.getAt(posicion).get('codpersonal');
				var cargo = storePersonal.getAt(posicion).get('codcargo');
				if (cargo == 1 || cargo == 2 || cargo == 5) {
					frmIngresoInterno_AI.guardarDatos();
				} else {
					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Código Invalido, desea introducir el código nuevamente?',
						width: 400,
						height: 200,
						buttons: Ext.MessageBox.YESNO,
						icon: Ext.MessageBox.WARNING,
						multiline: false,
						fn: function (btn) {
							if (btn == 'yes') {
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionPersonal_AI);
							} else { }
						}
					});
				}
			} else {
				Ext.MessageBox.show({
					title: 'Error',
					msg: 'Código Incorrecto, desea introducir el código nuevamente?',
					width: 400,
					height: 200,
					buttons: Ext.MessageBox.YESNO,
					icon: Ext.MessageBox.ERROR,
					multiline: false,
					fn: function (btn) {
						if (btn == 'yes') {
							Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionPersonal_AI);
						} else { }
					}
				});
			}
		}
	}
}

var btnAceptarII_AI = new Ext.Button({
	id: 'btnAceptarII_AI',
	x: 150,
	y: 265,
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionPersonal_AI);
	}
});

var btnLimpiarII_AI = new Ext.Button({
	id: 'btnLimpiarII_AI',
	x: 245,
	y: 265,
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompPermisoIE();
		winIngresoInterno_AI.hide();
	}
});



var frmIngresoInterno_AI = new Ext.FormPanel({
	id: 'fpII_AI',
	frame: true,
	//selectOnFocus: true,
	autoScroll: true,
	labelAlign: 'top',
	layout: 'column',
	items: [
		{
			columnWidth: .1,
			layout: 'form',
			defaultType: 'numberfield',
			items: [
				{
					name: 'montoB_AI',
					id: 'montoB_AI',
					fieldLabel: 'BS',
					anchor: '95%',
					maxLength: 20,
					allowBlank: true,
					style: { textTransform: "uppercase" },
					blankText: 'Campo requerido',
					enableKeyEvents: true,
					selectOnFocus: true,
					listeners: {
						'render': function (c) {
							c.getEl().on('keyup', function (sm, row, rec) {
								sumatoriaII();
							}, c);
						}
					}
				}
			]
		}, {
			columnWidth: 1,
			layout: 'form',
			defaultType: 'textarea',
			// labelAlign: 'right',
			items: [
				{
					name: 'comentarioII',
					fieldLabel: 'Comentario',
					allowBlank: false,
					style: { textTransform: "uppercase" },
					anchor: '100%',
					height: 40
				}
			]
		}
	],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSaltaIngresoAjusteAJAX.php',
				// params :{personal: Ext.getCmp('perso').getRawValue()},  
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando Datos...',
				success: function (form, action) {
					winIngresoInterno_AI.hide();
					Ext.dsdata.storeIEA.load();
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
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
function IniCompPermisoIE() {
	var frm = frmIngresoInterno_AI.getForm();
	frm.reset();
	frm.clearInvalid();
}
function altaIngresoAjuste_AI() {
	if (!winIngresoInterno_AI) {
		winIngresoInterno_AI = new Ext.Window({
			layout: 'fit',
			width: 500,
			height: 200,
			title: 'Ajuste de Ingreso',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: false,
			items: [frmIngresoInterno_AI],
			buttonAlign: 'center',
			buttons: [btnAceptarII_AI, '-', '-', btnLimpiarII_AI],
			listeners: {
				show: function () {
					IniCompPermisoIE();
				},
				hide: function () {
					updateSpot(false);
				}
			}
		});
	}
	winIngresoInterno_AI.show();
	updateSpot('fpII_AI');
}