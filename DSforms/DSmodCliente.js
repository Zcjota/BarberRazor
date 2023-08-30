var winPropietario_mc;
var codigo;
var opcion;
var estadoSM;// estado de servicio mensual 
Ext.namespace('Ext.dsdata');

//////////////////////////////////////////////////////////////////////PROPIETARIO
storeTipoPublicidad_mc = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaTipoPublicidadAjax.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codigo', 'nombre']
});
storeTipoPublicidad_mc.load();
var cboTipoPublicidad_mc = new Ext.form.ComboBox({
	hiddenName: 'cbtipopublicidad',
	fieldLabel: 'Nuevo Por:',
	anchor: '98%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: storeTipoPublicidad_mc,
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codigo',
	displayField: 'nombre',
	listeners: {
		'select': function (cmb, record, index) {
			txtNombrePropietario_mc.focus();
		}
	}
});
var txtNombrePropietario_mc = new Ext.form.TextField({
	fieldLabel: 'Nombre Completo',
	name: 'txtnombre_mc',
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
				// alert('codigo de barra:' + txtNombrePropietario_mc.getValue());
				txtapp_mc.focus();
			}
		}
	}
});
var txtapp_mc = new Ext.form.TextField({
	name: 'txtapp_mc',
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
				txtapm_mc.focus();
			}
		}
	}
});
var txtapm_mc = new Ext.form.TextField({
	name: 'txtapm_mc',
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
				txtnit_mc.focus();
			}
		}
	}
});

var txttelefono_mc = new Ext.form.NumberField({
	name: 'txttelefono_mc',
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
				txtcelular_mc.focus();
			}
		}
	}
});
var txtcelular_mc = new Ext.form.NumberField({
	name: 'txtcelular_mc',
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
				cboTipoPublicidad_mc.focus();
			}
		}
	}
});
var txtcorreo_mc = new Ext.form.TextField({
	name: 'txtcorreo_mc',
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
				txtdetalle_mc.focus();
			}
		}
	}
});
var txtdetalle_mc = new Ext.form.TextField({
	name: 'txtdetalledir_mc',
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
				txtNombreFactura_mc.focus();
			}
		}
	}
});
var txtFechaNacimiento_mc = new Ext.form.DateField({
    name: 'txtFechaNacimiento_mc',
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
                txtNombreFactura_mc.focus();
            }
        }
    }
});

var txtNombreFactura_mc = new Ext.form.TextField({
	fieldLabel: 'Nombre Factura MOD ',
	name: 'txtnombrefactura_mc',
	maxLength: 150,
	anchor: '90%',
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				// alert('codigo de barra:' + txtNombrePropietario_mc.getValue());
				cboBarbero1_mc.focus();
			}
		}
	}
});
var txtFecha_mc = new Ext.form.DateField({
	name: 'txtFecha_mc',
	fieldLabel: 'Fecha Nacimiento',
	maxLength : 8,
	anchor : '95%',
	allowBlank: false,
	format : 'd/m/Y',
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',		
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function(t, e){				
			if(e.getKey() == 13){
				txtNombreFactura_mc.focus();						
			}
		}
	}				
});
var txtnit_mc = new Ext.form.NumberField({
	name: 'txtnit_mc',
	fieldLabel: 'Nit',
	// hideLabel: true,	
	maxLength: 150,
	anchor: '85%',
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtFechaNacimiento_mc.focus();
			}
		}
	}
});
storeBarbero_mc = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaBarberoCBClienteAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'nombpersonal']
});
storeBarbero_mc.load();
var cboBarbero1_mc = new Ext.form.ComboBox({
	hiddenName: 'cbbarbero1_mc',
	fieldLabel: 'Barbero Principal',
	anchor: '95%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: storeBarbero_mc,
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codpersonal',
	displayField: 'nombpersonal',
	listeners: {
		'select': function (cmb, record, index) {
			txtreferenciacorte_mc.focus();
		}
	}
});
var cboBarbero2_mc = new Ext.form.ComboBox({
	hiddenName: 'cbbarbero2',
	fieldLabel: 'Barbero Auxiliar',
	anchor: '100%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	store: storeBarbero_mc,
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: false,
	valueField: 'codpersonal',
	displayField: 'nombpersonal',
	listeners: {
		'select': function (cmb, record, index) {
			txtreferenciacorte_mc.focus();
		}
	}
});
var txtreferenciacorte_mc = new Ext.form.TextField({
	name: 'txtrefcorte_mc',
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
				btnAceptar_mc.focus();
			}
		}
	}
});

// botones
var btnAceptar_mc = new Ext.Button({
	id: 'btnAceptar_mc',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmPropietario_mc.guardarDatos();
	}
});
var btnLimpiar_mc = new Ext.Button({
	id: 'btnLimpiar_mc',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniComp_mc();
		winPropietario_mc.hide();
	}
});
var btnAgregarTP_mc = new Ext.Button({
	id: 'btnAgregarTP_mc',
	icon: '../img/Nuevo.png',
	iconCls: 'x-btn-text-icon',
	fieldLabel: ' ',
	anchor: '100%',
	text: '<a style ="color:#000000; font: bold 10px tahoma,arial,verdana,sans-serif;">Agregar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionTP);
	}
});

var frmPropietario_mc = new Ext.FormPanel({
	frame: true,
	autoScroll: true,
	layout:'column',
	labelAlign: 'top',
	items: [
		{ columnWidth: .20, layout: 'form', items: [txtcelular_mc] },
		{
			columnWidth: .30,
			layout: 'form',
			defaultType: 'radiogroup',
			items: [
				{
					columns: 2,
					vertical: false,
					id: 'tipo_mc',
					anchor: '100%',
					items: [
						{ boxLabel: 'Adulto', name: 'idtp', inputValue: 1, checked: true },
						{ boxLabel: 'Niño', name: 'idtp', inputValue: 2 },
					],
					listeners: {
						change: function (field, newValue, oldValue) {
							if(newValue.inputValue == 2){
								txtcelular_mc.disable();
								updateCliente_peque();
							} else{
								txtcelular_mc.enable();
							}
						}
					}
				}
			]
		},
		{ columnWidth: .35, layout: 'form', items: [cboTipoPublicidad_mc] },
		//{ columnWidth: .15, layout: 'form', vertical: true, border: false, items: [btnAgregarTP_mc] },
		{ columnWidth: 1, layout: 'form'},
		{ columnWidth: .33, layout: 'form', items: [txtNombrePropietario_mc] },
		{ columnWidth: .33, layout: 'form', items: [txtapp_mc] },
		{ columnWidth: .34, layout: 'form', items: [txtapm_mc] },
		// { columnWidth: .25, layout: 'form', items: [txttelefono_mc] },
		// { columnWidth: .50, layout: 'form', items: [txtcorreo_mc] },
		// { columnWidth: 100, layout: 'form', items: [txtdetalle_mc] },
		{ columnWidth: .25, layout: 'form', items: [txtnit_mc] },
		{ columnWidth: .20, layout: 'form', items: [txtFechaNacimiento_mc] },
		{ columnWidth: .55, layout: 'form', items: [txtNombreFactura_mc] },
		
		{ columnWidth: .35, layout: 'form', items: [cboBarbero1_mc] },
		// { columnWidth: .50, layout: 'form', items: [cboBarbero2_mc] },
		{ columnWidth: .65, layout: 'form', items: [txtreferenciacorte_mc] },
	],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSmodClienteAJAX.php',
				params :{edad: edad_mc_G, codigo: codigo,txtFecha_mc: txtFecha_mc, txtcelular1_mc: txtcelular_mc.getValue()},	
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					IniComp_mc();
					winPropietario_mc.hide();
					Ext.Msg.alert('Mensaje de Confirmación.', "El Proceso Finalizó Correctamente.");
					Ext.dsdata.storePropietario.load({ params: { start: 0, limit: 1000 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtNombrePropietario_mc.focus(true, 1000);
						});
					} else {
						Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
					}
				}
			});
		}
	}
});

function IniComp_mc() {
	var frm = frmPropietario_mc.getForm();
	frm.reset();
	frm.clearInvalid();
};

function CargCompPropietario(indice) {
	var adulto = Ext.dsdata.storePropietario.getAt(indice).get('adulto');
	codigo = Ext.dsdata.storePropietario.getAt(indice).get('codigo');
	txtcelular_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('celular'));
	Ext.getCmp('tipo_mc').setValue(adulto);
	cboTipoPublicidad_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('cod_tp'));
	txtNombrePropietario_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('nombre'));
	txtapp_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('app'));
	txtapm_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('apm'));
	if(adulto == 2){
		updateCliente_peque();
	}
	txtnit_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('nit'));
	txtNombreFactura_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('nombfactura'));
	cboBarbero1_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('b_principal'));
	txtreferenciacorte_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('ref_corte'));
	txtFechaNacimiento_mc.setValue(Ext.dsdata.storePropietario.getAt(indice).get('nacimiento'));
};
var indiceG;
function ModificarCliente(indice) {
	if (!winPropietario_mc) {
		winPropietario_mc = new Ext.Window({
			layout: 'fit',
			width: 550,
			height: 300,
			title: 'Actualizar Datos del Cliente',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmPropietario_mc],
			buttonAlign: 'center',
			buttons: [btnAceptar_mc,'-', '-', btnLimpiar_mc],
			listeners: {
				show: function () {
					IniComp_mc();
					txtNombrePropietario_mc.focus(true, 300);
				}
			}
		});
	}
	indiceG = indice;
	winPropietario_mc.show();
	CargCompPropietario(indiceG);
}
function scrollBottom_mc() {
	setTimeout(function () {
		frmPropietario_mc.body.scroll("b", Infinity, true); //va hasta el final
	}, 100);
}
Ext.data.recargarTP = function () {
	storeTipoPublicidad_mc.load();
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
var winCliente_mc_peque;
var edad_mc_G = 0;
var txtcelular_mc_peque = new Ext.form.TextField({
	id: 'codigocliente_peque',
	fieldLabel: 'Celular',
	name: 'txtcelular_mc_peque',
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
				var posicion = storePropietario_mc_peque.findExact('codigob', this.getValue());
				if (posicion >= 0) {
					Ext.getCmp('prop_mc_peque').setValue(storePropietario_mc_peque.getAt(posicion).get('codigop'));
				} else {
					Ext.MessageBox.alert('Alerta de Mensaje.','El Nro de Celular no Está Vinculado a Ningun Cliente, Por Favor Registrar al Cliente.');
				}
			}
		}
	}
});
storePropietario_mc_peque = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPropietarioCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codigob', 'codigop', 'nombrep', 'nit', 'razonsocial']
});
storePropietario_mc_peque.load();
var cboPropietario_mc_peque = new Ext.form.ComboBox({
	id: 'prop_mc_peque',
	fieldLabel: 'Cliente',
	anchor: '100%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	store: storePropietario_mc_peque,
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
			Ext.getCmp('codigocliente_peque').setValue(storePropietario_mc_peque.getAt(index).get('codigob'))
		}
	}
});
var txtnombre_mc_peque = new Ext.form.TextField({
	fieldLabel: 'Nombre Completo',
	name: 'txtnombre_mc_peque',
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
				txtapp_mc_peque.focus();
			}
		}
	}
});
var txtapp_mc_peque = new Ext.form.TextField({
	name: 'txtapp_mc_peque',
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
				txtapm_mc_peque.focus();
			}
		}
	}
});
var txtapm_mc_peque = new Ext.form.TextField({
	name: 'txtapm_mc_peque',
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
				txtEdad_mc_peque.focus();
			}
		}
	}
});
var txtEdad_mc_peque = new Ext.form.NumberField({
	name: 'txtEdad_mc_peque',
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
				btnAceptar_mc_peque.focus();
			}
		}
	}
});

/**
 * Botones
 */
var btnAceptar_mc_peque = new Ext.Button({
	id: 'btnAceptar_mc_peque',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		if(txtnombre_mc_peque.getValue()!='' && txtEdad_mc_peque.getValue()!='' && txtcelular_mc_peque.getValue() != ''){
			seleccionar_mc();
			winCliente_mc_peque.hide();
		} else {
			Ext.MessageBox.alert('Alerta de Mensaje.','Campos Invalidos por Registrar');
		}
	}
});
var btnLimpiar_mc_peque = new Ext.Button({
	id: 'btnLimpiar_mc_peque',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniComp_mc_peque();
		winCliente_mc_peque.hide();
	}
});
var frmPropietario_mc_peque = new Ext.FormPanel({
	frame: true,
	autoScroll: true,
	layout:'column',
	labelAlign: 'top',
	items: [
		{ columnWidth: .35, layout: 'form', items: [txtcelular_mc_peque] },
		{ columnWidth: .65, layout: 'form', items: [cboPropietario_mc_peque] },
		{ columnWidth: .35, layout: 'form', items: [txtnombre_mc_peque] },
		{ columnWidth: .25, layout: 'form', items: [txtapp_mc_peque] },
		{ columnWidth: .25, layout: 'form', items: [txtapm_mc_peque] },
		{ columnWidth: .15, layout: 'form', items: [txtEdad_mc_peque] },
	]
});
function seleccionar_mc(){
	txtcelular_mc.setValue(txtcelular_mc_peque.getValue());
	txtNombrePropietario_mc.setValue(txtnombre_mc_peque.getValue());
	txtapp_mc.setValue(txtapp_mc_peque.getValue());
	txtapm_mc.setValue(txtapm_mc_peque.getValue());
	edad_mc_G = txtEdad_mc_peque.getValue();
};
function IniComp_mc_peque() {
	var frm = frmPropietario_mc_peque.getForm();
	frm.reset();
	frm.clearInvalid();
};
function cargarCompCliente_peque(indice){
	//debugger;
	txtcelular_mc.disable();
	var cod_vc_mc = Ext.dsdata.storePropietario.getAt(indice).get('cod_vinculacion');
	var posicion = storePropietario_mc_peque.findExact('codigop', cod_vc_mc);
	if (posicion >= 0) {
		txtcelular_mc_peque.setValue(storePropietario_mc_peque.getAt(posicion).get('codigob'));
	}
	cboPropietario_mc_peque.setValue(cod_vc_mc);
	// txtcelular_mc_peque.setValue();
	txtnombre_mc_peque.setValue(Ext.dsdata.storePropietario.getAt(indice).get('nombre'));
	txtapp_mc_peque.setValue(Ext.dsdata.storePropietario.getAt(indice).get('app'));
	txtapm_mc_peque.setValue(Ext.dsdata.storePropietario.getAt(indice).get('apm'));
	txtEdad_mc_peque.setValue(Ext.dsdata.storePropietario.getAt(indice).get('edad'));
};
function updateCliente_peque() {
	if (!winCliente_mc_peque) {
		winCliente_mc_peque = new Ext.Window({
			layout: 'fit',
			width: 550,
			height: 210,
			title: 'Actualizar Datos Cliente Niño',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmPropietario_mc_peque],
			buttonAlign: 'center',
			buttons: [btnAceptar_mc_peque,'-', '-', btnLimpiar_mc_peque],
			listeners: {
				show: function () {
					IniComp_mc_peque();
					txtnombre_mc_peque.focus(true, 300);
				}
			}
		});
	}
	winCliente_mc_peque.show();
	cargarCompCliente_peque(indiceG);
}