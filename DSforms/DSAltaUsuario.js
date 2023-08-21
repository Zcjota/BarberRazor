/*!
 * DS jr
 * Copyright(c) 2023
 */
var winAltaUsuario;
var registrosGrid = [];
Ext.namespace('Ext.dsdata');
Ext.dsdata.storePersonal = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPersonalCBAJAX.php',
	root: 'data',
	fields: ['codpersonal', 'nombpersonal']
});
Ext.dsdata.storePersonal.load();

var cboPersonal = new Ext.form.ComboBox({
	x: 110,
	y: 10,
	width: 200,
	store: Ext.dsdata.storePersonal,
	mode: 'local',
	autocomplete: true,
	allowBlank: false,
	editable: true,
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
			txtcorreo.focus();
		},
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				txtUsuario.focus();
			}
		}
	}
});
var PAmenuP = new Ext.Panel({
	id: 'PAcabecera1P',
	border: 9,
	minWidth: 45,
	x: 314,
	y: 5,
	tbar: [
		{
			text: '<a style ="color:#15428B; font: bold 11px tahoma,arial,verdana,sans-serif;">Pers..</a>',
			icon: '../img/Nuevo.png',
			handler: function (t) {
				NuevoPersonal();
			}
		}
	]
});

function isValidEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}
var txtcorreo = new Ext.form.TextField({
	name: 'correou',
	hideLabel: true,
	width: 250,
	x: 110,
	y: 40,
	allowBlank: false,
	maxLength: 100,
	style: { textTransform: "uppercase" },
	blankText: 'Usuario requerido',
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
var txtUsuario = new Ext.form.TextField({
	name: 'usuariou',
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

var txtContrasenia = new Ext.form.TextField({
	name: 'contraseniau',
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
				cboTipoUsuario.focus();
			}
		}
	}
});

var storeCbTipoUsuario = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaTipoUCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codtu', 'nombtu']
});
storeCbTipoUsuario.load();
var cboTipoUsuario = new Ext.form.ComboBox({
	x: 110,
	y: 130,
	width: 220,
	mode: 'local',
	hiddenName: 'tusuariou',
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
			btnAceptar_au.focus(true, 300);
		}
	}
});
var storeSucursal = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaSucursalCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codsuc', 'nombsuc']
});
storeSucursal.load();
var cboSucursal = new Ext.form.ComboBox({
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
			btnAceptar_au.focus(true, 300);
		}
	}
});
var storeSucursalUsuario = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaSucursalUsuarioAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codsucursal', 'nombre_sucursal']
});
// storeSucursal.load();
var sm = new Ext.grid.CheckboxSelectionModel(
);
var Columnas1 = new Ext.grid.ColumnModel(
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
		}, sm
	]
);
//Combo para cuando se establescan varias sucursales
// var gridSucursal = new Ext.grid.EditorGridPanel({
// 	id: 'gridSucursal',
// 	height: 120,
// 	width: 350,
// 	x: 10,
// 	y: 190,
// 	store: storeSucursalUsuario,
// 	cm: Columnas1,
// 	border: false,
// 	enableColLock: false,
// 	stripeRows: true,
// 	deferRowRender: false,
// 	sm: sm,
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
var btnAceptar_au = new Ext.Button({
	id: 'btnAceptar_au',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		var email = txtcorreo.getValue(); // Asegúrate de que "txtcorreo" sea el ID o referencia correcta del campo
        if (!isValidEmail(email)) {
            Ext.Msg.alert('Error', 'Ingrese un correo electrónico válido.');
            return;
        }
		GuardarArray();
		frmAltaUsuario.Insertar();
	}
});
var btnLimpiar_au = new Ext.Button({
	id: 'btnLimpiar_au',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		var frm = frmAltaUsuario.getForm();
		frm.reset();
		frm.clearInvalid();
		winAltaUsuario.hide();
	}
});

function GuardarArray() {
	//var keys = gridSucursal.selModel.selections.keys;
	var datosGrid = [];
	sm.each(function (rec) {
		datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
	});
	//this.gridSucursal.stopEditing();
	registrosGrid = Ext.encode(datosGrid);
};

var frmAltaUsuario = new Ext.FormPanel({
	frame: true,
	layout: 'absolute',
	items: [
		lblNombre, lblUsuario, lblContrasenia, lblTipoUsuario, lblCorreo, lblsucursal,
		cboPersonal, txtcorreo, txtUsuario, txtContrasenia, cboTipoUsuario, cboSucursal,
		// gridSucursal
	],
	Insertar: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSAltaUsuarioAJAX.php',
				method: 'POST',
				waitTitle: 'Conectando',
				params: { registros: registrosGrid },
				waitMsg: 'Enviando Datos...',
				success: function (form, action) {
					winAltaUsuario.hide();
					Ext.Msg.alert('MSG', "Finalizo Correctamente el Proceso");
					Ext.namespace.storeUsuario.load({ params: { start: 0, limit: 100 } });
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('ARG', data.errors.reason, function () {
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


function AltaUsuario() {
	if (!winAltaUsuario) {
		winAltaUsuario = new Ext.Window({
			layout: 'fit',
			width: 400,
			height: 390,
			title: 'Nuevo Usuario',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmAltaUsuario],
			buttonAlign: 'center',
			buttons: [btnAceptar_au,'-', '-', btnLimpiar_au],
			listeners: {
				hide: function () {
					var frm = frmAltaUsuario.getForm();
					frm.reset();
					frm.clearInvalid();
				},
				show: function () {
					txtNombre.focus(true, 100);
				}
			}
		});
	}
	storeCbTipoUsuario.load();
	storeSucursalUsuario.load({ params: { codigo: 0 } });
	winAltaUsuario.show();
}
