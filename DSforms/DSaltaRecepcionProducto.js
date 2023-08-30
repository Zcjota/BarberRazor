var winRP;
var registros = new Array();
var registrosMOD;
var fecha = new Date();
var codpersonalRP;

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
storeProveedor = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaProveedorCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codproveedor', 'nombproveedor'],
});
storeProveedor.load();
var cboProveedor = new Ext.form.ComboBox({
	hiddenName: 'cbproveedor',
	fieldLabel: 'Proveedor',
	anchor: '98%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: false,
	store: storeProveedor,
	emptyText: 'Seleccionar Proveedor.',
	mode: 'local',
	forceSelection: true,
	style: { textTransform: "uppercase" },
	triggerAction: 'all',
	selectOnFocus: true,
	// editable: false,		
	valueField: 'codproveedor',
	displayField: 'nombproveedor',
	listeners: {
		'select': function (cmb, record, index) {
			// storetipoP.load({params:{codcateg:record.data.codcategoriap}});
		}
	}
});
var btnAgregarProveedor = new Ext.Button({
	id: 'btnAgregarProveedor',
	fieldLabel: ' ',
	text: 'Proveedor',
	anchor: '95%',
	icon: '../img/Nuevo.png',
	iconCls: 'x-btn-text-icon',
	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Proveedor</a>',
	style: { background: '#8e959c', borderRadius: '0px', border: '1px solid #cccccc' },
	handler: function () {
		NuevoProveedor(false);
		updateSpot('panelproveedor');
	}
});
var tfcodigoBarra = new Ext.form.TextField({
	name: 'codigobarra',
	fieldLabel: 'Codigo Barra',
	anchor: '100%',
	maxLength: 20,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	blankText: 'Campo requerido',
	enableKeyEvents: true,
	selectOnFocus: true,
	listeners: {
		keypress: function (t, e) {
			if (e.getKey() == 13) {
				var posicion = storeproducto.find('codbarra', this.getValue());
				if (posicion >= 0) {
					cboProducto.setValue(storeproducto.getAt(posicion).get('codproducto'));
					Ext.getCmp('cant').focus(true, 300);
				} else {
					alert('Codigo de Barra inexistente.');
				}
			}
		}
	}
});
storemarca = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaMarcaCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codmarcap', 'nombmarcap'],
	listeners: {
		load: function (thisStore, record, ids) {
			// cboMarcaP.reset();
			// cboMarcaP.focus(true,300);
		}
	}
});
storemarca.load();
var cboMarca = new Ext.form.ComboBox({
	hiddenName: 'cbmarca',
	fieldLabel: 'Marca',
	anchor: '98%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	store: storemarca,
	emptyText: 'Seleccionar Marca.',
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	// editable: false,		
	valueField: 'codmarcap',
	displayField: 'nombmarcap',
	listeners: {
		'select': function (cmb, record, index) {
			storeproducto.load({ params: { busqueda: this.getValue() } });
		}
	}
});
storeproducto = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaProducto2CBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codproducto', 'nombproducto', 'tipo', 'codbarra', 'precio'],
	listeners: {
		load: function (thisStore, record, ids) {
			// cboMarcaP.reset();
			// cboMarcaP.focus(true,300);
		}
	}
});
storeproducto.load();
var resultTpl = new Ext.XTemplate(
	'<tpl for="."><div class="search-item">',
	'<h3>{nombproducto}</h3><span>cod: {codbarra} | {tipo} | precio: {precio} Bs.</span>',
	'</div></tpl>'
);
var cboProducto = new Ext.form.ComboBox({
	hiddenName: 'cbproducto',
	fieldLabel: 'Producto',
	anchor: '98%',
	typeAhead: true,
	forceSelection: true,
	allowBlank: true,
	style: { textTransform: "uppercase" },
	store: storeproducto,
	emptyText: 'Seleccionar Producto.',
	mode: 'local',
	forceSelection: true,
	triggerAction: 'all',
	selectOnFocus: true,
	editable: true,
	valueField: 'codproducto',
	displayField: 'nombproducto',
	tpl: resultTpl,
	itemSelector: 'div.search-item',
	listeners: {
		'select': function (cmb, record, index) {
			// consol
			// txtNombreProducto.focus(true,300);
		}
	}
});
storeproductoTA = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaProductoTomaAbiertaAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codproducto', 'descripcion', 'fecha'],
	listeners: {
		load: function (thisStore, record, ids) {
			// cboMarcaP.reset();
			// cboMarcaP.focus(true,300);
		}
	}
});

function validarProducto(codp, fechap) {
	// console.log(codp+" - "+fechap);
	var valor = true;
	var posicion = storeproductoTA.find('codproducto', codp);
	// alert(posicion);
	if (posicion >= 0) {
		// console.log(posicion);
		// console.log(storeproductoTA.getAt(posicion).get('fecha'));
		// console.log(storeproductoTA.getAt(posicion).get('descripcion'));
		// if(storeproductoTA.getAt(posicion).get('fecha') > fechap){
		if (storeproductoTA.getAt(posicion).get('fecha') < fechap) {
			valor = false;
		}
	}
	return valor;
}
var btnAgregar = new Ext.Button({
	id: 'btnAgregar',
	fieldLabel: ' ',
	anchor: '95%',
	icon: '../img/check.png',
	iconCls: 'x-btn-text-icon',
	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Agregar</a>',
	style: { background: '#93c363', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		if (cboProducto.getRawValue() != "" && Ext.getCmp('cant').getValue() != "") {
			if (validarProducto(cboProducto.getValue(), Ext.getCmp('fechaR').getValue().format("Y-m-d"))) {
				ActualizarGridRP();
			} else {
				Ext.MessageBox.alert('MSG', "El producto seleccionado Esta en una toma de inventario abierta.");
			}
		} else {
			Ext.MessageBox.alert('MSG', "Falta seleccionar un producto o poner cantidad.");
		}
	}
});
var btnAgregarpRODUCTO = new Ext.Button({
	id: 'btnpm',
	fieldLabel: ' ',
	text: 'Producto',
	anchor: '100%',
	icon: '../img/Nuevo.png',
	iconCls: 'x-btn-text-icon',
	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Producto</a>',
	style: { background: '#8e959c', borderRadius: '0px', border: '1px solid #cccccc' },
	// style: { color: "#ffffff", background: '#8E959C', borderRadius: '0px' },
	minWidth: 80,
	handler: function () {
		AltaProducto(2);
	}
});
var storeDetalle = new Ext.data.ArrayStore({// Ext.create('Ext.data.ArrayStore',{  
	fields: [
		{ name: 'codigo' },
		{ name: 'marca' },
		{ name: 'producto' },
		{ name: 'cod' },
		{ name: 'precio' },
		{ name: 'cant' },
		{ name: 'venc', type: 'date', dateFormat: 'Y-m-d' },
	],
	id: 0
});

var sm = new Ext.grid.CheckboxSelectionModel({
	listeners: {
		rowselect: function (sm, row, rec) {
			indicePR = row;
		}
	}
});
function formatDate(value) {
	return value ? value.dateFormat('Y-m-d') : '';
}
var Columnas = new Ext.grid.ColumnModel(
	[
		{
			header: '<a style ="color:#15428B; font: bold 11px tahoma,arial,verdana,sans-serif;"></a>',
			dataIndex: '',
			width: 3,
			renderer: function (value, cell) {

				str = "<div style='text-align:center;'> <div class='zoom'></div> <img class='zoom' src='../img/Eliminar.png' WIDTH='13' HEIGHT='13'></div>";
				return str;

			}
		},
		{
			header: 'codigo',
			dataIndex: 'codigo',
			hidden: true
		},
		// {  
		// header: 'Marca',  
		// dataIndex: 'marca',  
		// width: 29,
		// sortable: true            
		// },
		{
			header: 'Producto',
			dataIndex: 'producto',
			width: 40,
		}, {
			header: 'Cod.',
			dataIndex: 'cod',
			width: 17,
			sortable: true
		}, {
			header: 'Precio',
			dataIndex: 'precio',
			width: 7,
			sortable: true
		}, {
			header: 'Cant.',
			dataIndex: 'cant',
			width: 7,
			sortable: true
		}, {
			header: 'Vencimiento',
			dataIndex: 'venc',
			renderer: formatDate,
			width: 14,
			sortable: true
		}
	]
);
var gridRecepcion = new Ext.grid.EditorGridPanel({
	id: 'gridPermiso',
	anchor: '100%',
	height: 200,
	// sm : sm,		
	store: storeDetalle,
	cm: Columnas,
	selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
	border: false,
	viewConfig: {
		forceFit: true
	},
	enableColLock: false,
	stripeRows: false,
	clicksToEdit: 1,
	deferRowRender: false,
	sm: new Ext.grid.RowSelectionModel({
		singleSelect: true,
		listeners: {
			rowselect: function (sm, row, rec) {
				indicePR = row;
			}
		}
	}),
	listeners: {
		'cellclick': function (grid, rowIndex, cellIndex, e) {
			if (cellIndex == 0) {
				EliminarFilaRecepcion();
			}
		}
	}
});
function EliminarFilaRecepcion() {
	var store = Ext.getCmp("gridPermiso").getStore();
	store.removeAt(indicePR);
	this.gridRecepcion.getView().refresh();
	//http://docs.sencha.com/ext-js/3-4/#!/api/Ext.data.Store-method-remove
	var registrosPb = null;
	registrosPb = new Array();
	for (var i = indicePR; i < registros.length - 1; i++) {
		registros[i] = registros[i + 1];
	}
	for (var i = 0; i < registros.length - 1; i++) {
		registrosPb[i] = registros[i];
	}
	registros = null;
	registros = new Array();
	registros = registrosPb;
	gridRecepcion.removeAll();
	storeDetalle.removeAll();
	storeDetalle.loadData(registros);
	cboProducto.focus(true, 300);
}
function GuardarArrayRP() {
	var datosGrid = [];
	storeDetalle.each(function (rec) {
		datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
	});
	this.gridRecepcion.stopEditing();
	registrosMOD = Ext.encode(datosGrid);
	console.log(registrosMOD);
	// return registrosMOD;
};
function ActualizarGridRP() {
	//debugger;
	var posicion = storeproducto.find('codproducto', cboProducto.getValue());
	var cod = storeproducto.getAt(posicion).get('codbarra');
	var precio = storeproducto.getAt(posicion).get('precio');
	// storeproducto 
	// fields: ['codproducto', 'nombproducto','codbarra','precio'],
	dimension = registros.length;
	var registro = new Array(7);
	registro[0] = cboProducto.getValue();
	registro[1] = cboMarca.getRawValue();
	registro[2] = cboProducto.getRawValue();
	registro[3] = cod;
	registro[4] = precio;
	registro[5] = Ext.getCmp('cant').getValue();
	registro[6] = Ext.getCmp('fechavenc').getValue();
	Ext.getCmp('cant').setValue('');
	Ext.getCmp('fechavenc').setValue('');
	cboProducto.setValue('');
	registros[dimension] = registro;
	storeDetalle.loadData(registros);
	tfcodigoBarra.setValue("");
	cboProducto.focus(true, 300);
}
var btnAceptarRP = new Ext.Button({
	id: 'btnAceptarRP',
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">Aceptar</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		 //GuardarArrayRP();
		 //frmRP.guardarDatos();
		Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
	}
});

var btnLimpiarRP = new Ext.Button({
	id: 'btnLimpiarRP',
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">Salir</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompPermisoU();
		winRP.hide();
	}
});
var btnMasivoP = new Ext.Button({
	id: 'btnMasivoP',
	x: 245,
	y: 265,
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">PRODUCTO MASIVO</a>',
	style: { background: '#BCF5A9', borderRadius: '0px' },
	minWidth: 80,
	handler: function () {
		AltaProducto();
	}
});

var frmRP = new Ext.FormPanel({
	id: 'fpRP',
	frame: true,
	//selectOnFocus: true,
	autoScroll: true,
	labelAlign: 'top',
	layout: 'column',
	items: [
		{
			columnWidth: .6,
			layout: 'form',
			vertical: true,
			border: false,
			items: [cboProveedor]
		}, {
			columnWidth: .15,
			layout: 'form',
			vertical: true,
			border: false,
			items: [btnAgregarProveedor]
		}, {
			columnWidth: .15,
			layout: 'form',
			defaultType: 'datefield',
			items: [
				{
					name: 'fechaR',
					id: 'fechaR',
					fieldLabel: 'Fecha Recepcion',
					format: 'Y-m-d',
					style: { textTransform: "uppercase" },
					anchor: '95%',
					value: fecha
				}
			]
		}, {
			columnWidth: .1,
			layout: 'form',
			defaultType: 'textfield',
			items: [
				{
					name: 'hora',
					id: 'hora',
					fieldLabel: 'Hora',
					style: { textTransform: "uppercase" },
					anchor: '100%',
					value: fecha.getHours() + ':' + fecha.getMinutes() + ' ' + ((fecha.getHours() >= 12) ? 'PM' : 'AM')
				}
			]
		}, {
			columnWidth: .7,
			layout: 'form',
			vertical: true,
			border: false,
			items: [cboMarca]
		}, {
			columnWidth: .3,
			layout: 'form',
			vertical: true,
			border: false,
			items: [tfcodigoBarra]
		}, {
			columnWidth: .500,
			layout: 'form',
			vertical: true,
			border: false,
			items: [cboProducto]
		}, {
			columnWidth: .1,
			layout: 'form',
			defaultType: 'numberfield',
			items: [
				{
					name: 'cant',
					id: 'cant',
					fieldLabel: 'Cantidad',
					style: { textTransform: "uppercase" },
					anchor: '90%',
				}
			]
		}, {
			columnWidth: .150,
			layout: 'form',
			defaultType: 'datefield',
			items: [
				{
					name: 'fechavenc',
					id: 'fechavenc',
					fieldLabel: 'Vencimiento',
					format: 'Y-m-d',
					style: { textTransform: "uppercase" },
					anchor: '95%',
				}
			]
		}, {
			columnWidth: .125,
			layout: 'form',
			vertical: true,
			border: false,
			items: [btnAgregar]
		}, {
			columnWidth: .125,
			layout: 'form',
			vertical: true,
			border: false,
			items: [btnAgregarpRODUCTO]
		}, {
			columnWidth: 1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [gridRecepcion]
		}, {
			columnWidth: 1,
			layout: 'form',
			defaultType: 'textarea',
			items: [
				{
					name: 'comentario',
					fieldLabel: 'Comentario',
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
				url: '../servicesAjax/DSaltaRecepcionProductoAJAX.php',
				params: { registros: registrosMOD, codpersonal: codpersonalRP, gestion: Ext.getCmp('fechaR').getValue().format('Y') },
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando Datos...',
				success: function (form, action) {
					winRP.hide();
					Ext.namespace.storeRP.load();
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
	var frm = frmRP.getForm();
	frm.reset();
	frm.clearInvalid();
	gridRecepcion.removeAll();
	gridRecepcion.getStore().removeAll();
	registros = [];
	registrosMOD = [];
}
function AltaRecepcion() {
	if (!winRP) {
		winRP = new Ext.Window({
			layout: 'fit',
			width: 700,
			height: 500,
			title: 'Recepcionar Producto',
			resizable: false,
			closeAction: 'hide',
			closable: true,
			draggable: false,
			plain: true,
			border: false,
			modal: false,
			items: [frmRP],
			buttonAlign: 'center',
			buttons: [btnAceptarRP, '-', '-', btnLimpiarRP],
			listeners: {
				show: function () {
					IniCompPermisoU();
				},
				hide: function () {
					updateSpot(false);
				}
			}
		});
	}
	// txtCodPerfil.setValue(Codigov);	
	storeproductoTA.load();
	winRP.show();
	updateSpot('fpRP');
	cboProveedor.focus(true, 300);
	// storePermisos.load({ params:{codperfil: Codigov,roles:'Modulo'} });			
}
storePersonalCS = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPersonalCSAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'codsistema', 'codcargo'],
});
storePersonalCS.load();
function verificacion(btn, text) {
	if (btn == 'ok') {
		if (text == "") {
			Ext.MessageBox.alert("MSG", "Debe Introducir Un Código.");
			Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
		} else {
			var posicion = storePersonalCS.find('codsistema', text);
			if (posicion >= 0) {
				codpersonalRP = storePersonalCS.getAt(posicion).get('codpersonal');
				var cargo = storePersonalCS.getAt(posicion).get('codcargo');
				if (cargo == 1 || cargo == 2 || cargo == 5) {
					GuardarArrayRP();
					frmRP.guardarDatos();
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
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
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
							Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacion);
						} else { }
					}
				});
			}
		}
	}
}