/*!
 * RAZOR -DEV
 * Copyright(c) 2023
 */
var winProveedor;
var codigo;
var opcion;
var opreload; //esta variable define si se hace un reload en el store o no; true= si false=no
///////////////////////////////////////////////////////////////////spotligth de proveedor
var spot_p = new Ext.ux.Spotlight({
	easing: 'easeOut',
	duration: .8
});
var updateSpot_p = function (id) {
	if (typeof id == 'string') {
		spot_p.show(id);
	} else if (!id && spot_p.active) {
		spot_p.hide();
	}
};

// botones
var btnAceptar_pv = new Ext.Button({
	id: 'btnAceptar_pv',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		frmProveedor.guardarDatos();
	}
});
var btnLimpiar_pv = new Ext.Button({
	id: 'btnLimpiar_pv',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompProveedor();
		winProveedor.hide();
	}
});

var frmProveedor = new Ext.FormPanel({
	frame: true,
	id: 'panelproveedor',
	autoScroll: true,
	labelAlign: 'top',
	layout: 'column',
	items: [
		{
			columnWidth: .5,
			layout: 'form',
			defaultType: 'textfield',
			items: [
				{
					name: 'nomb',
					id: 'nomb',
					fieldLabel: 'Nombre',
					allowBlank: false,
					style: { textTransform: "uppercase" },
					anchor: '95%',
				}
			]
		}, {
			columnWidth: .5,
			layout: 'form',
			defaultType: 'textfield',
			items: [
				{
					name: 'telf',
					id: 'telf',
					fieldLabel: 'Telefono/Celular',
					style: { textTransform: "uppercase" },
					anchor: '100%',
				}
			]
		}, {
			columnWidth: 1,
			layout: 'form',
			defaultType: 'textarea',
			items: [
				{
					name: 'dir',
					id: 'dir',
					fieldLabel: 'Direccion',
					style: { textTransform: "uppercase" },
					height: 40,
					anchor: '100%',
				}
			]
		}, {
			columnWidth: 1,
			layout: 'form',
			defaultType: 'textarea',
			items: [
				{
					name: 'des',
					id: 'des',
					fieldLabel: 'Comentario',
					style: { textTransform: "uppercase" },
					height: 40,
					anchor: '100%',
				}
			]
		}
	],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSabmProveedorAJAX.php',
				params: { codigo: codigo, opcion: opcion },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando datos...',
				success: function (form, action) {
					IniCompProveedor();
					winProveedor.hide();
					if (opreload) {
						Ext.dsdata.storeProveedor.load({ params: { start: 0, limit: 1000 } });
					} else {
						storeProveedor.load();
						var data = Ext.util.JSON.decode(action.response.responseText);
						setTimeout(function () {
							cboProveedor.setValue(data.id.id);
						}, 800);
					}
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
							txtDescripcion.focus(true, 100);
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
function IniCompProveedor() {
	var frm = frmProveedor.getForm();
	frm.reset();
	frm.clearInvalid();
}

function NuevoProveedor(opr) {
	if (!winProveedor) {
		winProveedor = new Ext.Window({
			layout: 'fit',
			width: 700,
			height: 265,
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmProveedor],
			buttonAlign: 'center',
			buttons: [btnAceptar_pv,'-', '-', btnLimpiar_pv],
			listeners: {
				show: function () {
					IniCompProveedor()
					Ext.getCmp('nomb').focus(true, 300);
				},
				hide: function () {
					updateSpot_p(false);
				}
			}
		});
	}
	opcion = 0;
	opreload = opr;
	winProveedor.show();
	winProveedor.setTitle('Registro de Proveedor');
	updateSpot_p('panelproveedor');
}
function CargCompProveedor(indice) {
	codigo = Ext.dsdata.storeProveedor.getAt(indice).get('codigo');
	Ext.getCmp('nomb').setValue(Ext.dsdata.storeProveedor.getAt(indice).get('nombre'));
	Ext.getCmp('des').setValue(Ext.dsdata.storeProveedor.getAt(indice).get('descripcion'));
	Ext.getCmp('dir').setValue(Ext.dsdata.storeProveedor.getAt(indice).get('direccion'));
	Ext.getCmp('telf').setValue(Ext.dsdata.storeProveedor.getAt(indice).get('telefono'));
	opreload = true;
}
function modProveedor(indice) {
	if (!winProveedor) {
		winProveedor = new Ext.Window({
			layout: 'fit',
			width: 700,
			height: 265,
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: true,
			items: [frmProveedor],
			buttons: [btnAceptar_pv,'-', '-', btnLimpiar_pv],
			listeners: {
				show: function () {
					IniCompProveedor();
				},
				hide: function () {
					updateSpot_p(false);
				}
			}
		});
	}
	opcion = 1;
	winProveedor.show();
	CargCompProveedor(indice);
	winProveedor.setTitle('Modificar Proveedor');
	updateSpot_p('panelproveedor');
}
