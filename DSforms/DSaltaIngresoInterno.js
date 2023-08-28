var winIngresoInterno;
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
storePersonal = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPersonalCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'nombpersonal', 'codsistema']
});
storePersonal.load();
var storeCuentaIngreso = new Ext.data.SimpleStore({
	fields: ['codc', 'nombc'],
	data: [
		['AJUSTE', 'AJUSTE'],
		['CAMBIO', 'CAMBIO'],
		['FRACCIONAMIENTO', 'FRACCIONAMIENTO'],
		['REPOSICION', 'REPOSICION'],
	],
	autoLoad: false
});
function verificacionPersonal(btn, text) {
	if (btn == 'ok') {
		if (text == "") {
			Ext.MessageBox.alert("MSG", "Debe Introducir Un Código.");
			Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionPersonal);
		} else {
			if (codsistemp == text) {
				frmIngresoInterno.guardarDatos();
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
							Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionPersonal);
						} else { }
					}
				});
			}
		}
	}
}
var btnAceptarII = new Ext.Button({
	id: 'btnAceptarII',
	x: 150,
	y: 265,
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionPersonal);
	}
});

var btnLimpiarII = new Ext.Button({
	id: 'btnLimpiarII',
	x: 245,
	y: 265,
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompPermisoIE();
		winIngresoInterno.hide();
	}
});

var frmIngresoInterno = new Ext.FormPanel({
	id: 'fpII',
	frame: true,
	//selectOnFocus: true,
	autoScroll: true,
	labelAlign: 'top',
	layout: 'column',
	items: [
		{
			columnWidth: .39,
			layout: 'form',
			defaultType: 'combo',
			items: [
				{
					hiddenName: 'cbpersonal',
					id: 'perso',
					fieldLabel: 'Personal',
					anchor: '98%',
					typeAhead: true,
					forceSelection: true,
					allowBlank: false,
					store: storePersonal,
					emptyText: 'Seleccionar.',
					mode: 'local',
					forceSelection: true,
					style: { textTransform: "uppercase" },
					triggerAction: 'all',
					selectOnFocus: true,
					editable: true,
					valueField: 'codpersonal',
					displayField: 'nombpersonal',
					listeners: {
						'select': function (cmb, record, index) {
							codsistemp = record.data.codsistema;
							Ext.getCmp('montoB').focus(true, 300);
						}
					}
				}
			]
		}, {
			columnWidth: .29,
			layout: 'form',
			defaultType: 'combo',
			items: [
				{
					hiddenName: 'cbcuenta',
					id: 'cuent',
					fieldLabel: 'Cuenta',
					anchor: '98%',
					typeAhead: true,
					forceSelection: true,
					allowBlank: false,
					store: storeCuentaIngreso,
					emptyText: 'Seleccionar.',
					mode: 'local',
					forceSelection: true,
					style: { textTransform: "uppercase" },
					triggerAction: 'all',
					selectOnFocus: true,
					editable: true,
					valueField: 'codc',
					displayField: 'nombc',
					listeners: {
						'select': function (cmb, record, index) {
							Ext.getCmp('montoB').focus(true, 300);
						}
					}
				}
			]
		}, {
			columnWidth: .1,
			layout: 'form',
			defaultType: 'numberfield',
			items: [
				{
					name: 'montoB',
					id: 'montoB',
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
			columnWidth: .1,
			layout: 'form',
			defaultType: 'numberfield',
			items: [
				{
					name: 'montoD',
					id: 'montoD',
					fieldLabel: 'U$',
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
		},
		{
			columnWidth: .12,
			layout: 'form',
			defaultType: 'numberfield',
			// labelAlign: 'right',
			items: [
				{
					name: 'totalII',
					id: 'totalII',
					fieldLabel: 'TOTAL',
					anchor: '100%',
					maxLength: 20,
					readOnly: true,
					allowBlank: false,
					enableKeyEvents: true,
					selectOnFocus: true,
					style: { textTransform: "uppercase", background: '#CDCDCD', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
					listeners: {
						keypress: function (t, e) {
							if (e.getKey() == 13) {

							}
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
				url: '../servicesAjax/DSaltaIngresoInternoAJAX.php',
				params: { personal: Ext.getCmp('perso').getRawValue() },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando Datos...',
				success: function (form, action) {
					winIngresoInterno.hide();
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
	var frm = frmIngresoInterno.getForm();
	frm.reset();
	frm.clearInvalid();
}
function AltaIngresoExterno() {
	if (!winIngresoInterno) {
		winIngresoInterno = new Ext.Window({
			layout: 'fit',
			width: 500,
			height: 200,
			title: 'Ingreso Interno',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: false,
			items: [frmIngresoInterno],
			buttonAlign: 'center',
			buttons: [btnAceptarII, '-', '-', btnLimpiarII],
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
	// txtCodPerfil.setValue(Codigov);			
	winIngresoInterno.show();
	updateSpot('fpII');
}
/////////////////////////////////////FUNCIONES
function sumatoriaII() {
	var bs = Ext.getCmp('montoB').getValue();
	bs = bs == '' ? 0 : bs;
	var us = Ext.getCmp('montoD').getValue();
	us = us == '' ? 0 : us;
	Ext.getCmp('totalII').setValue(Ext.util.Format.number(parseFloat(bs) + (parseFloat(us) * pcII), '0.00'));
}