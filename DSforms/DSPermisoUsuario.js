var winPermisoUsuario;
var registrosMOD;

var txtCodPerfil = new Ext.form.TextField({
	name: 'codperfil',
	hideLabel: true,
	hidden: true,
	maxLength: 10,
	width: 80,
	y: 45,
	x: 100
});

storePermisos = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPermisoGRAJAX.php',
	root: 'data',
	fields: ['codigosub', 'nombresub', 'codigomen', 'nombremen', 'ticket', 'rol'],
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
			Ext.getCmp('gridPermiso').getSelectionModel().selectRows(miArray, true);
		}
	}
});

var sm = new Ext.grid.CheckboxSelectionModel();
var Columnas = new Ext.grid.ColumnModel(
	[
		{
			header: 'codigo',
			dataIndex: 'codigomen',
			hidden: true
		}, {
			header: 'Menu',
			dataIndex: 'nombremen',
			width: 200,
			sortable: true
		},
		{
			header: 'codigo',
			dataIndex: 'codigosub',
			hidden: true
		}, {
			header: 'Submenu',
			dataIndex: 'nombresub',
			width: 200,

			sortable: true
		}, sm
	]
);
var gridModulo = new Ext.grid.EditorGridPanel({
	id: 'gridPermiso',
	x: 10,
	y: 10,
	width: 450,
	height: 250,
	sm: sm,
	store: storePermisos,
	cm: Columnas,
	selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
	border: false,
	enableColLock: false,
	stripeRows: false,
	clicksToEdit: 1,
	deferRowRender: false
});
// botones
var btnAceptar_pu = new Ext.Button({
	id: 'btnAceptar_pu',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style : { background :'#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler:function(){
		GuardarArray();
		frmPermiso.guardarDatos();
	} 
});		

var btnLimpiar_pu = new Ext.Button({
	id: 'btnLimpiar_pu',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style : { background :'#F6CECE', borderRadius: '0px', border: '1px solid #cccccc'},
	minWidth: 80,
	handler:function(){
		IniCompPermisoU();
		winPermisoUsuario.hide();
		window.location.reload();
		codperfil.setValue = 0;
		txtCodPerfil.setValue('');
	} 
});

function GuardarArray() {
	var keys = gridModulo.selModel.selections.keys;
	var datosGrid = [];
	sm.each(function (rec) {
		datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
	});
	this.gridModulo.stopEditing();
	registrosMOD = Ext.encode(datosGrid);

};

var frmPermiso = new Ext.FormPanel({
	frame: true,
	//selectOnFocus: true,
	autoScroll: true,
	layout: 'absolute',
	items: [txtCodPerfil, gridModulo],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSguardarPermisosAJAX.php',
				params: { modulo: registrosMOD },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando Datos...',
				success: function (form, action) {
					winPermisoUsuario.hide();
					window.location.reload();
					codperfil.setValue = 0;
					txtCodPerfil.setValue('');

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
function IniCompPermisoU() {
	var frm = frmPermiso.getForm();
	frm.reset();
	frm.clearInvalid();
}
function PermisoUsuario(Codigov) {
	if (!winPermisoUsuario) {
		winPermisoUsuario = new Ext.Window({
			layout: 'fit',
			width: 500,
			height: 340,
			title: 'Registro de Permisos.',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmPermiso],
			buttonAlign:'center',
			buttons:[btnAceptar_pu,'-','-', btnLimpiar_pu],
			listeners: {
				show: function () {
					IniCompPermisoU();
					
				},
				hide: function () {
					// Recarga la página al cerrar la ventana
					window.location.reload();
				}
			}
		});
	}
	txtCodPerfil.setValue(Codigov);
	winPermisoUsuario.show();
	storePermisos.load({ params: { codperfil: Codigov, roles: 'Modulo' } });
}