/*!
 * DS jr
 * Copyright(c) 2023
 */
var winModificarUsuario;
var registrosGridM = [];
var txtCodigo = new Ext.form.TextField({
	name: 'codigo',
	hideLabel: true,
	x: 110,
	y: 10
});
Ext.namespace('Ext.dsdata');
// problemas con la data 
// Ext.dsdata.storePersonal = new Ext.data.JsonStore({
// 	url: '../servicesAjax/DSListaPersonalCBAJAX.php?servicio=1',
// 	root: 'data',
// 	totalProperty: 'total',
// 	fields: ['codpersonal', 'nombpersonal']
// });
// Ext.dsdata.storePersonal.load();
var cboPersonalM = new Ext.form.ComboBox({
	x: 110,
	y: 10,
	width: 200,
	store: Ext.dsdata.storePersonal,
	mode: 'local',
	autocomplete: true,
	allowBlank: false,
	editable: false,
	style: { textTransform: "uppercase" },
	emptyText: 'Seleccione Personal...',
	triggerAction: 'all',
	displayField: 'nombpersonal',
	typeAhead: true,
	valueField: 'codpersonal',
	hiddenName: 'Personal',
	selectOnFocus: true,
	listeners: {
		'select': function (cmb, record, index) {
			txtcorreoM.focus();
		}
	}
});

function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

var txtcorreoM = new Ext.form.TextField({
	name: 'correo',
	hideLabel: true,
	width: 250,
	x: 110,
	y: 40,
	maxLength: 100,
	style: { textTransform: "uppercase" },
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtUsuario.focus();
			}
		}
	}
});
var txtUsuarioM = new Ext.form.TextField({
	name: 'usuario',
	hideLabel: true,
	width: 150,
	x: 110,
	y: 70,
	allowBlank: false,
	maxLength: 50,
	style: { textTransform: "uppercase" },
	blankText: 'Usuario requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtContrasenia.focus();
			}
		}
	}
});

var txtContraseniaM = new Ext.form.TextField({
	name: 'contrasenia',
	hideLabel: true,
	width: 150,
	x: 110,
	y: 100,
	allowBlank: false,
	inputType: 'password',
	blankText: 'Contraseña requerido',
	maxLength: 50,
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				cboTipoUsuarioM.focus();
			}
		}
	}
});

// var storeCbTipoUsuarioM = new Ext.data.JsonStore({
// 	url: '../servicesAjax/DSListaTipoUCBAJAX.php',
// 	root: 'data',
// 	totalProperty: 'total',
// 	fields: ['codtu', 'nombtu']
// });
// storeCbTipoUsuarioM.load();
var cboTipoUsuarioM = new Ext.form.ComboBox({
	x: 110,
	y: 130,
	width: 220,
	mode: 'local',
	hiddenName: 'tipo_usuario',
	store: storeCbTipoUsuario,
	autocomplete: true,
	style: { textTransform: "uppercase" },
	allowBlank: false,
	emptyText: 'Seleccione..',
	triggerAction: 'all',
	displayField: 'nombtu',
	typeAhead: true,
	valueField: 'codtu',
	selectOnFocus: true,
	listeners: {
		'select': function (cmb, record, index) {
			btnAceptar_mu.focus(true, 300);
		}
	}
});
// var storeSucursalM = new Ext.data.JsonStore({
// 	url: '../servicesAjax/DSListaSucursalCBAJAX.php',
// 	root: 'data',
// 	totalProperty: 'total',
// 	fields: ['codsuc', 'nombsuc']
// });
// storeSucursalM.load();
var cboSucursalM = new Ext.form.ComboBox({
	x: 150,
	y: 160,
	width: 210,
	mode: 'local',
	hiddenName: 'tsucursal',
	store: storeSucursal,
	autocomplete: true,
	style: { textTransform: "uppercase" },
	allowBlank: false,
	emptyText: 'Seleccione..',
	triggerAction: 'all',
	displayField: 'nombsuc',
	typeAhead: true,
	valueField: 'codsuc',
	selectOnFocus: true,
	listeners: {
		'select': function (cmb, record, index) {
			btnAceptar_mu.focus(true, 300);
		}
	}
});
var storeSucursalUsuarioM = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaSucursalUsuarioAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codsucursal', 'nombre_sucursal', 'ticket'],
	listeners: {
		load: function (thisStore, record, ids) {
			var pos = 0;
			var miArray = new Array();
			for (i = 0; i < this.getCount(); i++) {
				if (parseInt(record[i].data.ticket) == 1) {
					miArray[pos] = i;
					pos++;
				}
			}
			gridSucursalM.getSelectionModel().selectRows(miArray, true);
		}
	}
});
// storeSucursalM.load();
var smM = new Ext.grid.CheckboxSelectionModel(
);
var Columnas1M = new Ext.grid.ColumnModel(
	[
		{
			header: 'Codigo',
			dataIndex: 'codsucursal',
			width: 100,
			hidden: true
		}, {
			header: 'SELECCIONAR SUCURSALES DISPONIBLES',
			dataIndex: 'nombre_sucursal',
			width: 300
		}, smM
	]
);
//Combo para cuando se establescan varias sucursales
// var gridSucursalM = new Ext.grid.EditorGridPanel({
// 	id: 'gridSucursalM',
// 	height: 120,
// 	width: 350,
// 	x: 10,
// 	y: 190,
// 	store: storeSucursalUsuarioM,
// 	cm: Columnas1M,
// 	border: false,
// 	enableColLock: false,
// 	stripeRows: true,
// 	deferRowRender: false,
// 	sm: smM,
// 	destroy: function () {
// 		if (this.store) {
// 			this.store.destroyStore();
// 		}
// 		this.callParent();
// 	},
// });

// Labels		
var lblNombre = new Ext.form.Label({
	text: 'Personal :',
	x: 10,
	y: 15,
	height: 20,
	cls: 'x-label'
});
var lblCorreo = new Ext.form.Label({
	text: 'Correo :',
	x: 10,
	y: 45,
	height: 20,
	cls: 'x-label'
});
var lblUsuario = new Ext.form.Label({
	text: 'Usuario :',
	x: 10,
	y: 75,
	height: 20,
	cls: 'x-label'
});
var lblContrasenia = new Ext.form.Label({
	text: 'Contraseña :',
	x: 10,
	y: 105,
	height: 20,
	cls: 'x-label'
});
var lblTipoUsuario = new Ext.form.Label({
	text: 'Tipo Usuario :',
	x: 10,
	y: 135,
	height: 20,
	cls: 'x-label'
});
var lblsucursal = new Ext.form.Label({
	text: 'Sucursal Por Defecto :',
	x: 10,
	y: 165,
	height: 20,
	cls: 'x-label'
});

// botones
var btnAceptar_mu = new Ext.Button({
	id: 'btnAceptar_mu',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		var email = txtcorreoM.getValue(); // Asegúrate de que "txtcorreoM" sea el ID o referencia correcta del campo
        if (!isValidEmail(email)) {
            Ext.Msg.alert('Error', 'Ingrese un correo electrónico válido.');
            return;
        }
		GuardarArrayM();
		frmModificarUsuario.validarAcceso();
	}
});
var btnLimpiar_mu = new Ext.Button({
	id: 'btnLimpiar_mu',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		var frm = frmModificarUsuario.getForm();
		frm.reset();
		frm.clearInvalid();
		winModificarUsuario.hide();
	}
});
function GuardarArrayM() {
	//var keys = gridSucursal.selModel.selections.keys;
	var datosGrid = [];
	smM.each(function (rec) {
		datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
	});
	//this.gridSucursal.stopEditing();
	registrosGridM = Ext.encode(datosGrid);
};

var frmModificarUsuario = new Ext.FormPanel({
	frame: true,
	layout: 'absolute',
	items: [
		lblNombre, lblUsuario, lblContrasenia, lblTipoUsuario, lblCorreo, lblsucursal, cboPersonalM,
		txtcorreoM, txtUsuarioM, txtContraseniaM, cboTipoUsuarioM, cboSucursalM, 
		//gridSucursalM,
		 txtCodigo
	],
	validarAcceso: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSModificarUsuarioAJAX.php',
				method: 'POST',
				waitTitle: 'Conectando',
				params: { registros: registrosGridM },
				waitMsg: 'Enviando Datos...',
				success: function (form, action) {
					winModificarUsuario.hide();
					Ext.namespace.storeUsuario.load({ params: { start: 0, limit: 25 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('ARG', data.errors.reason, function () {
							txtNombreM.focus(true, 100);
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

function ModificarUsuario(indice) {
	if (!winModificarUsuario) {
		winModificarUsuario = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 390,
			title: 'Modificar Usuario',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmModificarUsuario],
			buttonAlign: 'center',
			buttons: [btnAceptar_mu, '-', '-', btnLimpiar_mu]
		});
	}
	storeSucursalUsuarioM.load({ params: { codigo: Ext.namespace.storeUsuario.getAt(indice).get('codigo') } });
	txtCodigo.setValue(Ext.namespace.storeUsuario.getAt(indice).get('codigo'));
	txtCodigo.setVisible(false);
	txtcorreoM.setValue(Ext.namespace.storeUsuario.getAt(indice).get('correo'));
	cboPersonalM.setValue(Ext.namespace.storeUsuario.getAt(indice).get('codpersonal'));
	cboPersonalM.disable(true);
	txtUsuarioM.setValue(Ext.namespace.storeUsuario.getAt(indice).get('usuario'));
	txtContraseniaM.setValue(Ext.namespace.storeUsuario.getAt(indice).get('contrasenia'));
	cboTipoUsuarioM.setValue(Ext.namespace.storeUsuario.getAt(indice).get('cod_tu'));
	cboSucursalM.setValue(Ext.namespace.storeUsuario.getAt(indice).get('codsucursal'));
	winModificarUsuario.show();
}