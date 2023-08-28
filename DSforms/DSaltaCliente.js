var winPropietario_ac;
var codigo;
var opcion;
var estadoSM;// estado de servicio mensual 
Ext.namespace('Ext.dsdata');

//////////////////////////////////////////////////////////////////////PROPIETARIO
storeTipoPublicidad_ac = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaTipoPublicidadAjax.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codigo', 'nombre']
});
storeTipoPublicidad_ac.load();
var cboTipoPublicidad_ac = new Ext.form.ComboBox({
	hiddenName: 'cbtipopublicidad',
	fieldLabel: 'Nuevo Por:',
	anchor: '98%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: storeTipoPublicidad_ac,
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codigo',
	displayField: 'nombre',
	listeners: {
		'select': function (cmb, record, index) {
			txtNombrePropietario_ac.focus();
		}
	}
});
var txtNombrePropietario_ac = new Ext.form.TextField({
	fieldLabel: 'Nombre Completo',
	name: 'txtnombre_ac',
	maxLength: 150,
	anchor: '95%',
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				// alert('codigo de barra:' + txtNombrePropietario_ac.getValue());
				txtapp_ac.focus();
			}
		}
	}
});
var txtapp_ac = new Ext.form.TextField({
	name: 'txtapp_ac',
	fieldLabel: 'Apellido Paterno',
	// hideLabel: true,	
	maxLength: 150,
	anchor: '95%',
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtapm_ac.focus();
			}
		}
	}
});
var txtapm_ac = new Ext.form.TextField({
	name: 'txtapm_ac',
	fieldLabel: 'Apellido Materno',
	maxLength: 150,
	anchor: '99%',
	// allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtnit_ac.focus();
			}
		}
	}
});
var txttelefono_ac = new Ext.form.NumberField({
	name: 'txttelefono_ac',
	fieldLabel: 'Telefono',
	maxLength: 8,
	anchor: '95%',
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtcelular_ac.focus();
			}
		}
	}
});
var txtcelular_ac = new Ext.form.NumberField({
	name: 'txtcelular_ac',
	fieldLabel: 'Celular',
	maxLength: 8,
	anchor: '95%',
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	// emptyText: 'num. Celu.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				cboTipoPublicidad_ac.focus();
			}
		}
	}
});
var txtcorreo_ac = new Ext.form.TextField({
	name: 'txtcorreo_ac',
	fieldLabel: 'Correo',
	maxLength: 150,
	anchor: '99%',
	vtype: 'email',
	// allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	// emptyText: 'Correo Electr�nico.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtdetalle_ac.focus();
			}
		}
	}
});

var txtdetalle_ac = new Ext.form.TextField({
	name: 'txtdetalledir_ac',
	fieldLabel: 'Detalle Direccion',
	maxLength: 250,
	anchor: '99%',
	// allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	// emptyText: 'max. 250 caracteres.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtNombreFactura_ac.focus();
			}
		}
	}
});var txtFechaNacimiento = new Ext.form.DateField({
    name: 'txtFechaNacimiento',
    fieldLabel: 'Nacimiento',
    format: 'd/m/Y',  // Formato de fecha dd/mm/yyyy
    allowBlank: true,
    anchor: '95%',
    blankText: 'Campo requerido',
    enableKeyEvents: true,
    selectOnFocus: true,
    listeners: {
        keypress: function (t, e) {
            if (e.getKey() == 13) {
                txtNombreFactura_ac.focus();
            }
        }
    }
});

var txtnit_ac = new Ext.form.NumberField({
    name: 'txtnit_ac',
    fieldLabel: 'Nit',
    maxLength: 150,
    anchor: '95%',
    allowBlank: true,
    style: { textTransform: "uppercase" },
    blankText: 'Campo requerido',
    enableKeyEvents: true,
    selectOnFocus: true,
    listeners: {
        keypress: function (t, e) {
            if (e.getKey() == 13) {
                txtFechaNacimiento.focus();
            }
        }
    }
});

var txtNombreFactura_ac = new Ext.form.TextField({
    fieldLabel: 'Nombre Factura',
    name: 'txtnombrefactura_ac',
    maxLength: 150,
    anchor: '100%',
    allowBlank: true,
    style: { textTransform: "uppercase" },
    blankText: 'Campo requerido',
    enableKeyEvents: true,
    selectOnFocus: true,
    listeners: {
        keypress: function (t, e) {
            if (e.getKey() == 13) {
                cboBarbero1_ac.focus();
            }
        }
    }
});

storeBarbero_ac = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaBarberoCBClienteAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'nombpersonal']
});
storeBarbero_ac.load();
var cboBarbero1_ac = new Ext.form.ComboBox({
	hiddenName: 'cbbarbero1',
	fieldLabel: 'Barbero Principal',
	anchor: '95%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: storeBarbero_ac,
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codpersonal',
	displayField: 'nombpersonal',
	listeners: {
		'select': function (cmb, record, index) {
			txtreferenciacorte_ac.focus();
		}
	}
});
var cboBarbero2_ac = new Ext.form.ComboBox({
	hiddenName: 'cbbarbero2',
	fieldLabel: 'Barbero Auxiliar',
	anchor: '100%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	store: storeBarbero_ac,
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codpersonal',
	displayField: 'nombpersonal',
	listeners: {
		'select': function (cmb, record, index) {
			txtreferenciacorte_ac.focus();
		}
	}
});
var txtreferenciacorte_ac = new Ext.form.TextField({
	name: 'txtrefcorte_ac',
	fieldLabel: 'Referencia Corte',
	maxLength: 250,
	anchor: '100%',
	// allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	// emptyText: 'max. 250 caracteres.',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAceptar_ac.focus();
			}
		}
	}
});

// botones
var btnAceptar_ac = new Ext.Button({
	id: 'btnAceptar_ac',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmPropietario_ac.guardarDatos();
	}
});
var btnLimpiar_ac = new Ext.Button({
	id: 'btnLimpiar_ac',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniComp_ac();
		winPropietario_ac.hide();
	}
});
var btnAgregarTP = new Ext.Button({
	id: 'btnAgregarTP',
	icon: '../img/Nuevo.png',
	iconCls: 'x-btn-text-icon',
	fieldLabel: ' ',
	anchor: '100%',
	text: '<a style ="color:#000000; font: bold 10px tahoma,arial,verdana,sans-serif;">Agregar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		NuevoTipoPublicidad();
		//Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionTP);
	}
});

var frmPropietario_ac = new Ext.FormPanel({
	frame: true,
	autoScroll: true,
	layout:'column',
	labelAlign: 'top',
	items: [
		{ columnWidth: .20, layout: 'form', items: [txtcelular_ac] },
		{
			columnWidth: .30,
			layout: 'form',
			defaultType: 'radiogroup',
			items: [
				{
					columns: 2,
					vertical: false,
					id: 'tipo_ac',
					anchor: '100%',
					items: [
						{ boxLabel: 'Adulto', name: 'idtp', inputValue: 1, checked: true },
						{ boxLabel: 'Niño', name: 'idtp', inputValue: 2 },
					],
					listeners: {
						change: function (field, newValue, oldValue) {
							if(newValue.inputValue == 2){
								altaCliente_pque();
							} else{
								// IniCompACH();
							}
						}
					}
				}
			]
		},
		{ columnWidth: .35, layout: 'form', items: [cboTipoPublicidad_ac] },
		//{ columnWidth: .15, layout: 'form', vertical: true, border: false, items: [btnAgregarTP] },
		{ columnWidth: 1, layout: 'form'},
		{ columnWidth: .33, layout: 'form', items: [txtNombrePropietario_ac] },
		{ columnWidth: .33, layout: 'form', items: [txtapp_ac] },
		{ columnWidth: .34, layout: 'form', items: [txtapm_ac] },
		// { columnWidth: .25, layout: 'form', items: [txttelefono_ac] },
		// { columnWidth: .50, layout: 'form', items: [txtcorreo_ac] },
		// { columnWidth: 100, layout: 'form', items: [txtdetalle_ac] },
		{ columnWidth: .25, layout: 'form', items: [txtnit_ac] },
		{ columnWidth: .20, layout: 'form', items: [txtFechaNacimiento] },  // Agregar aquí el campo de fecha de nacimiento
		{ columnWidth: .55, layout: 'form', items: [txtNombreFactura_ac] },
		{ columnWidth: .35, layout: 'form', items: [cboBarbero1_ac] },
		// { columnWidth: .50, layout: 'form', items: [cboBarbero2_ac] },
		{ columnWidth: .65, layout: 'form', items: [txtreferenciacorte_ac] },
	],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSaltaClienteAJAX.php',
				params :{edad: edad_G},	
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					IniComp_ac();
					winPropietario_ac.hide();
					Ext.Msg.alert('Mensaje de Confirmación.', "El Proceso Finalizó Correctamente.");
					Ext.dsdata.storePropietario.load({ params: { start: 0, limit: 1000 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombrePropietario_ac.focus(true, 1000);
						});
					} else {
						Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
					}
				}
			});
		}
	}
});
function IniComp_ac() {
	var frm = frmPropietario_ac.getForm();
	frm.reset();
	frm.clearInvalid();
}
function altaCliente() {
	if (!winPropietario_ac) {
		winPropietario_ac = new Ext.Window({
			layout: 'fit',
			width: 550,
			height: 300,
			title: 'Registrar Cliente',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmPropietario_ac],
			buttonAlign: 'center',
			buttons: [btnAceptar_ac,'-', '-', btnLimpiar_ac],
			listeners: {
				show: function () {
					IniComp_ac();
					txtNombrePropietario_ac.focus(true, 300);
				}
			}
		});
	}
	opcion = 1;
	winPropietario_ac.show();

}
function scrollBottom_ac() {
	setTimeout(function () {
		frmPropietario_ac.body.scroll("b", Infinity, true); //va hasta el final
	}, 100);
}
Ext.data.recargarTP = function () {
	storeTipoPublicidad_ac.load();
}
/**
 * Pin para el abm de publicidad.
 */
storePersonal = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPersonalCSAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'codsistema', 'codcargo'],
});
storePersonal.load();
function verificacionTP(btn, text) {
	if (btn == 'ok') {
		if (text == "") {
			Ext.MessageBox.alert("Alerta de Mensaje.", "Debe Introducir Un Código.");
			Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionTP);
		} else {
			var posicion = storePersonal.find('codsistema', text);
			if (posicion >= 0) {
				var cargo = storePersonal.getAt(posicion).get('codcargo');
				if (cargo == 1 || cargo == 2 || cargo == 5) {
					NuevoTipoPublicidad();
				} else {
					Ext.MessageBox.show({
						title: 'Alerta de Advertencia.',
						msg: 'Código Invalido, Desea Introducir el Código Nuevamente?',
						width: 400,
						height: 200,
						buttons: Ext.MessageBox.YESNO,
						icon: Ext.MessageBox.WARNING,
						multiline: false,
						fn: function (btn) {
							if (btn == 'yes') {
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionTP);
							}
						}
					});
				}
			} else {
				Ext.MessageBox.show({
					title: 'Alerta de Error.',
					msg: 'Código Incorrecto, Desea Introducir el Código Nuevamente?',
					width: 400,
					height: 200,
					buttons: Ext.MessageBox.YESNO,
					icon: Ext.MessageBox.ERROR,
					multiline: false,
					fn: function (btn) {
						if (btn == 'yes') {
							Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionTP);
						}
					}
				});
			}
		}
	}
}

/**
 * PEQUEÑO ABM DE LOS NIÑOS COMO CLIENTE
 */
var winCliente_peque;
var edad_G = 0;
var txtcelular_ac_peque = new Ext.form.TextField({
	id: 'codigocliente_peque',
	fieldLabel: 'Celular',
	name: 'txtcelular_ac_peque',
	maxLength: 8,
	anchor: '95%',
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				var posicion = storePropietario_ac_peque.findExact('codigob', this.getValue());
				if (posicion >= 0) {
					Ext.getCmp('prop_ac_peque').setValue(storePropietario_ac_peque.getAt(posicion).get('codigop'));
				} else {
					Ext.MessageBox.alert('Alerta de Mensaje.','El Nro de Celular no Está Vinculado a Ningun Cliente, Por Favor Registrar al Cliente.');
				}
			}
		}
	}
});
storePropietario_ac_peque = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPropietarioCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codigob', 'codigop', 'nombrep', 'nit', 'razonsocial']
});
storePropietario_ac_peque.load();
var cboPropietario_ac_peque = new Ext.form.ComboBox({
	id: 'prop_ac_peque',
	fieldLabel: 'Cliente',
	anchor: '100%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	store: storePropietario_ac_peque,
	emptyText: 'Seleccionar Cliente.',
	mode: 'local',
	forceSelection: true,
	style: { textTransform: "uppercase" },
	triggerAction: 'all',
	selectOnFocus: true,
	editable: true,
	valueField: 'codigop',
	displayField: 'nombrep',
	listeners: {
		'select': function (cmb, record, index) {
			Ext.getCmp('codigocliente_peque').setValue(storePropietario_ac_peque.getAt(index).get('codigob'))
		}
	}
});
var txtnombre_ac_peque = new Ext.form.TextField({
	fieldLabel: 'Nombre Completo',
	name: 'txtnombre_ac_peque',
	maxLength: 150,
	anchor: '95%',
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtapp_ac_peque.focus();
			}
		}
	}
});
var txtapp_ac_peque = new Ext.form.TextField({
	name: 'txtapp_ac_peque',
	fieldLabel: 'Apellido Paterno',
	// hideLabel: true,	
	maxLength: 150,
	anchor: '95%',
	allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtapm_ac_peque.focus();
			}
		}
	}
});
var txtapm_ac_peque = new Ext.form.TextField({
	name: 'txtapm_ac_peque',
	fieldLabel: 'Apellido Materno',
	maxLength: 150,
	anchor: '95%',
	// allowBlank: false,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtEdad_ac_peque.focus();
			}
		}
	}
});
var txtEdad_ac_peque = new Ext.form.NumberField({
	name: 'txtEdad_ac_peque',
	fieldLabel: 'Edad',
	maxLength: 150,
	anchor: '99%',
	allowBlank: false,
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				btnAceptar_ac_peque.focus();
			}
		}
	}
});

/**
 * Botones
 */
var btnAceptar_ac_peque = new Ext.Button({
	id: 'btnAceptar_ac_peque',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		if(txtnombre_ac_peque.getValue()!='' && txtEdad_ac_peque.getValue()!='' && txtcelular_ac_peque.getValue() != ''){
			seleccionar();
			winCliente_peque.hide();
		} else {
			Ext.MessageBox.alert('Alerta de Mensaje.','Campos Invalidos por Registrar');
		}
	}
});
var btnLimpiar_ac_peque = new Ext.Button({
	id: 'btnLimpiar_ac_peque',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniComp_ac_peque();
		winCliente_peque.hide();
	}
});
var frmPropietario_ac_peque = new Ext.FormPanel({
	frame: true,
	autoScroll: true,
	layout:'column',
	labelAlign: 'top',
	items: [
		{ columnWidth: .35, layout: 'form', items: [txtcelular_ac_peque] },
		{ columnWidth: .65, layout: 'form', items: [cboPropietario_ac_peque] },
		{ columnWidth: .35, layout: 'form', items: [txtnombre_ac_peque] },
		{ columnWidth: .25, layout: 'form', items: [txtapp_ac_peque] },
		{ columnWidth: .25, layout: 'form', items: [txtapm_ac_peque] },
		{ columnWidth: .15, layout: 'form', items: [txtEdad_ac_peque] },
	]
});
function seleccionar(){
	txtcelular_ac.setValue(txtcelular_ac_peque.getValue());
	txtNombrePropietario_ac.setValue(txtnombre_ac_peque.getValue());
	txtapp_ac.setValue(txtapp_ac_peque.getValue());
	txtapm_ac.setValue(txtapm_ac_peque.getValue());
	edad_G = txtEdad_ac_peque.getValue();
}
function IniComp_ac_peque() {
	var frm = frmPropietario_ac_peque.getForm();
	frm.reset();
	frm.clearInvalid();
}
function altaCliente_pque() {
	if (!winCliente_peque) {
		winCliente_peque = new Ext.Window({
			layout: 'fit',
			width: 550,
			height: 210,
			title: 'Registrar Cliente Niño',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmPropietario_ac_peque],
			buttonAlign: 'center',
			buttons: [btnAceptar_ac_peque,'-', '-', btnLimpiar_ac_peque],
			listeners: {
				show: function () {
					IniComp_ac_peque();
					txtnombre_ac_peque.focus(true, 300);
				}
			}
		});
	}
	opcion = 1;
	winCliente_peque.show();
}