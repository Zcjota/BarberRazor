var winIngreso;
var indiceS = 'e';
var indiceT = 'e';
var registrosST = new Array();
var registrosT = new Array();
var registrosTb = new Array();
var fecha = new Date();
var codpersonalRP;
var pc = 6.90;//precio compra del dolar
var control_descuento = false;// para controlar si hubo un descuento manualmente.
var control_descuento_fide_conve = false;// para controlar si hubo un descuento manualmente.
var pinGlobal_cliente;//pin del cliente
var desc_acuenta;
var registrosT_acuenta = new Array();
var subtotal_acuenta = 0;
var total_acuenta = 0;
var control_descuento_tienda = false;
var cod_personal_ds = 0;
Ext.namespace('Ext.data');
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

storePropietario = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPropietarioCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codigob', 'codigop', 'nombrep', 'nit', 'razonsocial','nacimiento', 'codconvenio',"codfide", "cant_corte_fide","pin_cliente","ultimo_corte"],
	listeners: {
		load: function (thisStore, record, ids) {
			// if (Ext.getCmp("codigocliente").getValue() != "") {
			// 	var posicion = storePropietario.find('codigob', Ext.getCmp("codigocliente").getValue());
			// 	console.log(posicion);
			// 	if (posicion >= 0) {
			// 		Ext.getCmp('prop').setValue(storePropietario.getAt(posicion).get('codigop'));
			// 		Ext.getCmp('nit').setValue(storePropietario.getAt(posicion).get('nit'));
			// 		Ext.getCmp('razonsocial').setValue(storePropietario.getAt(posicion).get('razonsocial'));
			// 		storeDetalleS.load({ params: { cod: storePropietario.getAt(posicion).get('codigop') } });
			// 		// Ext.getCmp('cant').focus(true, 300);
			// 	} else {
			// 		alert('El nro de celular no esta vinculado a ningun cliente, porfavor registrar al cliente.');
			// 	}
			// }
		}
	}

});
storePropietario.load();

storeDescuentoClienteServicios = new Ext.data.JsonStore({
	url: '../servicesAjax/funcionClienteDescuentoServicios.php',
	root: 'data',
	totalProperty: 'total',
	fields: ["corte", "tipocliente", "estado", "servicio", "desc", "codfs"],
	listeners: {
		load: function (thisStore, record, ids) {
			winIngreso.setTitle("Ingreso : Historico = " + record[0].data.corte + " | Fide = " + record[0].data.tipocliente);
			console.log(thisStore.totalLength);
			for (var i = 0; i < thisStore.totalLength; i++) {
				var posicion = storeDetalleS.findExact('codigo', record[i].data.servicio);
				if (posicion >= 0) {
					storeDetalleS.getAt(posicion).set('descuento', record[i].data.desc);
					var subT = storeDetalleS.getAt(posicion).get('precio') * storeDetalleS.getAt(posicion).get('cant');
					var descT = ((subT * storeDetalleS.getAt(posicion).get('descuento')) / 100);
					storeDetalleS.getAt(indiceS).set('descuentobs', (descT));
					storeDetalleS.getAt(posicion).set('total', (subT - descT));
					storeDetalleS.getAt(posicion).set('codfidelizacionservicio', record[i].data.codfs);
					sumatoria();

				} else {
					storeDetalleS.load({ params: { cod: 0 } });
				}
			}
		}
	}
});	

tipocliente = "";
storePropietarioValores = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPropietarioValoresIngresoAjax.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codigo', 'corte', 'fecha_primero', 'fecha_ultimo', 'frecuencia', 'proximo'],
	listeners: {
		load: function (thisStore, record, ids) {
			if (record.length != 0) {
				winIngreso.setTitle(`Total Serv: ${record[0].data.corte} | Fide: ${tipocliente} | Desde: ${record[0].data.fecha_primero} | Reciente: ${record[0].data.fecha_ultimo} | frecuencia días: ${record[0].data.frecuencia} | Proximo: ${record[0].data.proximo}`);
			} else {
				winIngreso.setTitle("Ingreso : Total Servicios = 0");
			}
		}
	}
});

storeDescuento = new Ext.data.JsonStore({
	url: '../servicesAjax/funcionClienteDescuento.php',
	root: 'data',
	totalProperty: 'total',
	fields: ["servicio", "desc", "codfs"],
	listeners: {
		load: function (thisStore, record, ids) {
			for (var i = 0; i < thisStore.totalLength; i++) {
				var posicion = storeDetalleS.findExact('codigo', record[i].data.servicio);
				if (posicion >= 0) {
					storeDetalleS.getAt(posicion).set('descuento', record[i].data.desc);
					var subT = storeDetalleS.getAt(posicion).get('precio') * storeDetalleS.getAt(posicion).get('cant');
					var descT = ((subT * storeDetalleS.getAt(posicion).get('descuento')) / 100);
					storeDetalleS.getAt(posicion).set('descuentobs', (descT));
					storeDetalleS.getAt(posicion).set('total', (subT - descT));
					storeDetalleS.getAt(posicion).set('codfidelizacionservicio', record[i].data.codfs);
					sumatoria();
				} else {
					storeDetalleS.load({ params: { cod: 0 } });
				}
			}
		}
	}
});	
storeConvenio = new Ext.data.JsonStore({
	url: '../servicesAjax/funcionClienteConvenio.php',
	root: 'data',
	totalProperty: 'total',
	fields: ["codconvenio","servicio", "desc", "codfs"],
	listeners: {
		load: function (thisStore, record, ids) {
			for (var i = 0; i < thisStore.totalLength; i++) {
				var posicion = storeDetalleS.findExact('codigo', record[i].data.servicio);
				if (posicion >= 0) {
					control_descuento_fide_conve = true;
					storeDetalleS.getAt(posicion).set('descuento', record[i].data.desc);
					var subT = storeDetalleS.getAt(posicion).get('precio') * storeDetalleS.getAt(posicion).get('cant');
					var descT = ((subT * storeDetalleS.getAt(posicion).get('descuento')) / 100);
					storeDetalleS.getAt(posicion).set('descuentobs', (descT));
					storeDetalleS.getAt(posicion).set('total', (subT - descT));
					storeDetalleS.getAt(posicion).set('codfidelizacionservicio', record[i].data.codfs);
					sumatoria();
				} else {
					storeDetalleS.load({ params: { cod: 0 } });
				}
			}
		}
	}
});	
storeFidelizacion = new Ext.data.JsonStore({
	url: '../servicesAjax/funcionClienteFidelizacion.php',
	root: 'data',
	totalProperty: 'total',
	fields: ["corte", "tipocliente", "estado", "servicio", "desc", "codfs"],
	listeners: {
		load: function (thisStore, record, ids) {
			if (record.length != 0) {
				tipocliente = record[0].data.tipocliente;
			} else {
				tipocliente ="Ning.";
			}
			for (var i = 0; i < thisStore.totalLength; i++) {
				var posicion = storeDetalleS.findExact('codigo', record[i].data.servicio);
				if (posicion >= 0) {
					storeDetalleS.getAt(posicion).set('descuento', record[i].data.desc);
					var subT = storeDetalleS.getAt(posicion).get('precio') * storeDetalleS.getAt(posicion).get('cant');
					var descT = ((subT * storeDetalleS.getAt(posicion).get('descuento')) / 100);
					storeDetalleS.getAt(posicion).set('descuentobs', (descT));
					storeDetalleS.getAt(posicion).set('total', (subT - descT));
					storeDetalleS.getAt(posicion).set('codfidelizacionservicio', record[i].data.codfs);
					sumatoria();
				} else {
					storeDetalleS.load({ params: { cod: 0 } });
				}
			}
		}
	}
});

storetipoP_m = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaTipoP_TIENDACBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codtipop', 'nombtipop']
});
storetipoP_m.load();

storeproducto = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaProductoCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: [
		'codproducto', 'codcategoria', 'nombproducto', 'codbarra', 
		'tipo', 'marca', 'descuento', 'precio', 'tipoingreso'
	],
});
storeproducto.load();

var resultTpl = new Ext.XTemplate(
	'<tpl for="."><div class="search-item">',
	'<h3>{nombproducto}</h3><span>{codbarra} | {marca} | {precio} Bs.</span>',
	'</div></tpl>'
);

storesPersonal_i = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaBarberoCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'nombpersonal']
});
storesPersonal_i.load();

var storeDetalleS = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaServiciosCajaAjax.php',
	root: 'data',
	totalProperty: 'total',
	fields: [
		{ name: 'codigo' },
		{ name: 'tipoingreso' },
		{ name: 'tiposervicio' },
		{ name: 'servicio' },
		{ name: 'personal' },
		{ name: 'precio' },
		{ name: 'preciobk' },
		{ name: 'cant' },
		// {name: 'subtotal'},				  
		{ name: 'descuento' },
		{ name: 'total' },
		{ name: 'descuentobs' },
		{ name: 'codfidelizacionservicio' },
	],
	listeners: {
		load: function (thisStore, record, ids) {
			//sumatoria();
		}
	}
});

var sm = new Ext.grid.CheckboxSelectionModel();
function formatDate(value) {
	return value ? value.dateFormat('Y-m-d') : '';
}
function pctChange(val) {
	if (val > 0) {
		return '<span style="color:green;">' + val + '%</span>';
	} else if (val <= 0) {
		return '<span style="color:red;">' + val + '%</span>';
	}
	return val;
}
function tooltipSubTotal(value, metadata, record, rowIndex, colIndex, store) {
	// value = value - ((value * parseFloat(record.data.descuento))/100);
	if (record.data.tiposervicio == 4) {
		value = record.data.total;
	}
	return value;
}
function tooltipPersonal(value, metadata, record, rowIndex, colIndex, store) {
	var valor = value;
	if (valor != "") {
		//console.log('hola');
		var posicion = storesPersonal_i.findExact('codpersonal', value);
		//console.log(posicion);
		var valor = storesPersonal_i.getAt(posicion).get('nombpersonal');
		//console.log(valor);
	}
	return valor;
}
function tooltipDetalleServicios(value, metadata, record, rowIndex, colIndex, store) {	//celdas del personal
	metadata.attr = String.format('{0}title="{1}"', metadata.attr, record.data.memo_servicios.toString().replace('NORMAL', 'BA�O'));
	return '<b>' + value + '</b></br>';
}
var ColumnasS = new Ext.grid.ColumnModel(
	[
		{
			header: 'codigo',
			dataIndex: 'codigo',
			hidden: true
		}, {
			header: 'Servicio',
			dataIndex: 'servicio',
			//renderer: tooltipDetalleServicios,
			width: 4,
			sortable: true
		}, {
			header: 'Tipo Servicio',
			dataIndex: 'tiposervicio',
			//renderer: tooltipDetalleServicios,
			width: 9,
			sortable: true
		}, {
			header: 'Atendido Por',
			dataIndex: 'personal',
			renderer: tooltipPersonal,
			width: 7,
			sortable: true,
			editor: {
				xtype: 'combo',
				hiddenName: 'cbpersonal',
				//fieldLabel: 'Barbero Principal',
				//anchor: '95%',
				typeAhead: true,
				forceSelection: true,
				allowBlank: false,
				store: storesPersonal_i,
				mode: 'local',
				forceSelection: true,
				triggerAction: 'all',
				selectOnFocus: true,
				editable: false,
				valueField: 'codpersonal',
				displayField: 'nombpersonal',
			}
		}, {
			xtype: 'numbercolumn',
			header: 'Precio',
			dataIndex: 'precio',
			width: 3,
			align: 'right',
			sortable: true,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				// maxLength : 4, 
				listeners: {
					'render': function (c) {
						c.getEl().on('keyup', function (sm, row, rec) {
							if (storeDetalleS.getAt(indiceS).get('codigo') != '8') {
								this.setValue(storeDetalleS.getAt(indiceS).get('preciobk'))
							} else {
								var subT = this.getValue() * storeDetalleS.getAt(indiceS).get('cant');
								var descT = ((subT * storeDetalleS.getAt(indiceS).get('descuento')) / 100);
								storeDetalleS.getAt(indiceS).set('descuentobs', (descT));
								storeDetalleS.getAt(indiceS).set('total', (subT - descT));
							}
							sumatoria();
						}, c);
					},
					blur: function (field) {
						sumatoria();
					}
				}
			}
		}, {
			xtype: 'numbercolumn',
			header: 'Cant',
			dataIndex: 'cant',
			width: 3,
			align: 'right',
			sortable: true,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				// maxLength : 4, 
				listeners: {
					'render': function (c) {
						c.getEl().on('keyup', function (sm, row, rec) {
							var subT = this.getValue() * storeDetalleS.getAt(indiceS).get('precio');
							//console.log(subT);
							//storeDetalleS.getAt(indiceS).set('subtotal',subT)
							var descT = ((subT * storeDetalleS.getAt(indiceS).get('descuento')) / 100);
							storeDetalleS.getAt(indiceS).set('descuentobs', (descT));
							storeDetalleS.getAt(indiceS).set('total', (subT - descT));
							sumatoria();
						}, c);
					},
					blur: function (field) {
						sumatoria();
					}
				}
			}
		}, {
			// xtype: 'numbercolumn',
			header: 'Desc(%)',
			dataIndex: 'descuento',
			width: 3,
			align: 'center',
			renderer: pctChange,
			sortable: true,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				maxLength: 6,
				listeners: {
					'render': function (c) {
						c.getEl().on('keyup', function (sm, row, rec) {
							console.log(this.getValue());
							if (this.getValue() > 0) {
								var subT = storeDetalleS.getAt(indiceS).get('precio') * storeDetalleS.getAt(indiceS).get('cant');
								var descT = ((subT * this.getValue()) / 100);
								storeDetalleS.getAt(indiceS).set('total', (subT - descT));
								storeDetalleS.getAt(indiceS).set('descuentobs', (descT));
								sumatoria();
								control_descuento = true;
							} else {
								control_descuento = false;
							}
							console.log(control_descuento);
						}, c);
					},
					blur: function (field) {
						sumatoria();
					}
				}
			}
		}, {
			xtype: 'numbercolumn',
			header: 'Desc(Bs)',
			align: 'right',
			dataIndex: 'descuentobs',
			width: 4,
			sortable: true
		}, {
			xtype: 'numbercolumn',
			header: 'Total',
			align: 'right',
			dataIndex: 'total',
			width: 4,
			sortable: true
		}
	]
);

storeDescuentoCliente = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaDescuentosClienteCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codd', 'nombd'],
	listeners: {
		load: function (thisStore, record, ids) {
			Ext.getCmp('fidelizacionAI').setValue(0);
			Ext.getCmp('descuentoAI').setValue(0);
		}
	}
});
storeDescuentoCliente.load();

storeConvenioCliente = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaConvenioClienteCBAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codd', 'nombd'],
	listeners: {
		load: function (thisStore, record, ids) {
			Ext.getCmp('convenioAI').setValue(0);
		}
	}
});
storeConvenioCliente.load();

var gridServicio = new Ext.grid.EditorGridPanel({
	id: 'gridservicio',
	anchor: '100%',
	height: 200,
	// title: 'SERVICIOS',
	store: storeDetalleS,
	cm: ColumnasS,
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
				indiceS = row;
			}
		}
	}),
	tbar: [
		{
			xtype: 'label',
			html: 'SERVICIOS',
			style: { textTransform: "uppercase", color: 'black', font: 'bold 11px tahoma,arial,verdana,sans-serif' },
		}, '->',
		//  {
		// 	xtype: 'label',
		// 	id: 'label_fidelizacion',
		// 	html: 'Fidelización: &nbsp;			',
		// 	style: {  color: 'black', font: 'bold 11px tahoma,arial,verdana,sans-serif' },
		// }, {
		// 	xtype: 'combo',
		// 	id: 'fidelizacionAI',
		// 	hiddenName: 'cdfidelizacion',
		// 	//fieldLabel: 'SubCategoría',
		// 	width: 150,
		// 	typeAhead: true,
		// 	forceSelection: true,
		// 	allowBlank: true,
		// 	store: storeDescuentoCliente,
		// 	// disabled: true,
		// 	readOnly: true,
		// 	//emptyText: 'Descuentos.',
		// 	style: { textTransform: "uppercase" },
		// 	mode: 'local',
		// 	forceSelection: true,
		// 	triggerAction: 'all',
		// 	selectOnFocus: true,
		// 	editable: false,
		// 	valueField: 'codd',
		// 	displayField: 'nombd',
		// 	listeners: {
		// 		'select': function (cmb, record, index) {
		// 			storeDescuento.load({ params: { cod: this.getValue() } });
		// 			if(this.getValue()>0){
		// 				control_descuento = true;
		// 				control_descuento_fide_conve = false;
		// 			} else{
		// 				control_descuento = false;
		// 			}
		// 		}
		// 	}
		// },
		 '-', 
		//  {
		// 	xtype: 'label',
		// 	id: 'label_convenio',
		// 	html: 'Convenio: &nbsp;			',
		// 	style: {  color: 'black', font: 'bold 11px tahoma,arial,verdana,sans-serif' },
		// }, {
		// 	xtype: 'combo',
		// 	id: 'convenioAI',
		// 	hiddenName: 'cdconvenio',
		// 	//fieldLabel: 'SubCategoría',
		// 	width: 150,
		// 	typeAhead: true,
		// 	forceSelection: true,
		// 	allowBlank: true,
		// 	store: storeConvenioCliente,
		// 	// disabled: true,
		// 	readOnly: true,
		// 	//emptyText: 'Descuentos.',
		// 	style: { textTransform: "uppercase" },
		// 	mode: 'local',
		// 	forceSelection: true,
		// 	triggerAction: 'all',
		// 	selectOnFocus: true,
		// 	editable: false,
		// 	valueField: 'codd',
		// 	displayField: 'nombd',
		// 	listeners: {
		// 		'select': function (cmb, record, index) {
		// 			storeDescuento.load({ params: { cod: this.getValue() } });
		// 			if(this.getValue()>0){
		// 				control_descuento = true;
		// 			} else{
		// 				control_descuento = false;
		// 			}
		// 		}
		// 	}
		// },
		 '-',{
			xtype: 'label',
			html: 'Descuento Especial: &nbsp;			',
			style: {  color: 'black', font: 'bold 11px tahoma,arial,verdana,sans-serif' },
		}, {
			xtype: 'combo',
			id: 'descuentoAI',
			hiddenName: 'cddescuento',
			//fieldLabel: 'SubCategoría',
			width: 150,
			typeAhead: true,
			forceSelection: true,
			allowBlank: true,
			store: storeDescuentoCliente,
			//emptyText: 'Descuentos.',
			style: { textTransform: "uppercase" },
			mode: 'local',
			forceSelection: true,
			triggerAction: 'all',
			selectOnFocus: true,
			editable: false,
			valueField: 'codd',
			displayField: 'nombd',
			listeners: {
				'select': function (cmb, record, index) {
					removeClases_Combo();
					Ext.getCmp('descuentoAI').addClass('comboDescuentos');
					storeDescuento.load({ params: { cod: this.getValue() } });
					if(this.getValue()>0){
						control_descuento = true;
					} else{
						control_descuento = false;
					}
				}
			}
		}, '-',{
			name: 'subtotalS',
			id: 'subtotalS',
			xtype: 'numberfield',
			allowBlank: false,
			style: { textTransform: "uppercase", background: '#CDCDCD', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
			readOnly: true,
			format: '0.00',
			width: 55
		}, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	]
});
gridServicio.on('afteredit', sumatoria);

var storeDetalle = new Ext.data.ArrayStore({// Ext.create('Ext.data.ArrayStore',{  
	fields: [
		{ name: 'codigo' },
		{ name: 'tipo' },
		{ name: 'marca' },
		{ name: 'detalle' },
		{ name: 'pv' },
		{ name: 'cantidad' },
		{ name: 'descuento' },
		{ name: 'total' },
		{ name: 'tipoingreso' },
		{ name: 'codbarra' },
		{ name: 'codcategoria' },
	],
	id: 0
});

function EliminarFila() {
	var store = Ext.getCmp("gridtienda").getStore();
	store.removeAt(indiceT);
	this.gridTienda.getView().refresh();
	var total1;
	//http://docs.sencha.com/ext-js/3-4/#!/api/Ext.data.Store-method-remove
	registrosTb = null;
	registrosTb = new Array();
	for (var i = indiceT; i < registrosT.length - 1; i++) {
		registrosT[i] = registrosT[i + 1];
	}
	total1 = 0;
	for (var i = 0; i < registrosT.length - 1; i++) {
		total1 = total1 + registrosT[i][5];
		registrosTb[i] = registrosT[i];
	}
	registrosT = null;
	registrosT = new Array();
	registrosT = registrosTb;

	gridTienda.removeAll();
	storeDetalle.removeAll();
	storeDetalle.loadData(registrosT);
	Ext.getCmp('codigobarra').setValue('');
	Ext.getCmp('codigobarra').focus(true, 300);
	sumatoria();
};

function ActualizarGrid() {
	dimension = registrosT.length;
	var codt = Ext.getCmp('product').getValue();
	var posiciont = storeproducto.findExact('codproducto', codt);
	//var codprop = Ext.getCmp('prop').getValue();
	//var posicionprop = storePropietario.find('codigop', codprop);
	var codcateg = storeproducto.getAt(posiciont).get('codcategoria');
	// console.log(codprop + ' | ' + posicionprop);
	var desct;
	//if(posicionprop >= 0 && codcateg != 3){
	//	desct = storePropietario.getAt(posicionprop).get('d_ali');
	//}else{
	desct = storeproducto.getAt(posiciont).get('descuento')
	//}
	var tipot = storeproducto.getAt(posiciont).get('tipo')
	var marcat = storeproducto.getAt(posiciont).get('marca')
	var detallet = Ext.getCmp('product').getRawValue();
	var preciot = storeproducto.getAt(posiciont).get('precio')
	var cantt = Ext.getCmp('cant').getValue();
	var totalt = (parseFloat(preciot) * parseFloat(cantt));
	totalt = parseFloat(totalt) - ((totalt * parseFloat(desct)) / 100);
	var tipoingresot = storeproducto.getAt(posiciont).get('tipoingreso');
	var codbarrat = storeproducto.getAt(posiciont).get('codbarra');
	var registro = new Array(11);
	registro[0] = codt;
	registro[1] = tipot;
	registro[2] = marcat;
	registro[3] = detallet;
	registro[4] = preciot;
	registro[5] = cantt;
	registro[6] = desct;
	registro[7] = totalt;
	registro[8] = tipoingresot;
	registro[9] = codbarrat;
	registro[10] = codcateg;
	Ext.getCmp('cant').setValue('');
	Ext.getCmp('subcat').setValue('');
	Ext.getCmp('product').setValue('');
	registrosT[dimension] = registro;
	storeDetalle.loadData(registrosT);
	Ext.getCmp('codigobarra').setValue('');
	Ext.getCmp('codigobarra').focus(true, 300);
	sumatoria();
	storeproducto.load();
}
var ColumnasT = new Ext.grid.ColumnModel(
	[
		{
			header: 'codigo',
			dataIndex: 'codigo',
			hidden: true
		}, {
			header: '<a style ="color:#15428B; font: bold 11px tahoma,arial,verdana,sans-serif;"></a>',
			dataIndex: '',
			width: 3,
			renderer: function (value, cell) {
				str = "<div style='text-align:center;'> <div class='zoom'></div> <img class='zoom' src='../img/Eliminar.png' WIDTH='13' HEIGHT='13'></div>";
				return str;
			}
		}, {
			header: 'Subcategoria',
			dataIndex: 'tipo',
			width: 15,
		}, {
			header: 'Marca',
			dataIndex: 'marca',
			width: 15,
		}, {
			header: 'Detalle',
			dataIndex: 'detalle',
			width: 33,
		}, {
			xtype: 'numbercolumn',
			header: 'Precio',
			dataIndex: 'pv',
			width: 9,
		}, {
			xtype: 'numbercolumn',
			header: 'Cantidad',
			dataIndex: 'cantidad',
			width: 7,
			sortable: true
		}, {
			// xtype: 'numbercolumn',
			header: 'Descuento',
			dataIndex: 'descuento',
			width: 9,
			sortable: true,
			renderer: pctChange,
			// editor: {
			// 	xtype: 'numberfield',
			// 	allowBlank: false,
			// 	maxLength: 6,
			// 	listeners: {
			// 		'render': function (c) {
			// 			c.getEl().on('keyup', function (sm, row, rec) {
			// 				var montt = parseFloat(storeDetalle.getAt(indiceT).get('pv')) * parseFloat(storeDetalle.getAt(indiceT).get('cantidad'));
			// 				var descut = (montt * parseFloat(this.getValue())) / 100;
			// 				console.log(montt + ' | ' + descut + ' | ' + indiceT);
			// 				storeDetalle.getAt(indiceT).set('total', (montt - descut));
			// 				control_descuento = true;
			// 				control_descuento_tienda = true;
			// 				// console.log('entro por aqui|tienda');
			// 			}, c);
			// 		},
			// 	}
			// }
		}, {
			xtype: 'numbercolumn',
			header: 'Total',
			dataIndex: 'total',
			width: 9,
			sortable: true
		}
	]
);

var gridTienda = new Ext.grid.EditorGridPanel({
	id: 'gridtienda',
	anchor: '100%',
	height: 120,
	store: storeDetalle,
	// title:'TIENDA',
	cm: ColumnasT,
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
				indiceT = row;
			}
		}
	}),
	listeners: {
		'cellclick': function (grid, rowIndex, cellIndex, e) {
			if (cellIndex == 1) {
				EliminarFila();
			}
		}
	},
	tbar: [
		{
			xtype: 'label',
			html: 'TIENDA',
			style: { textTransform: "uppercase", color: 'black', font: 'bold 11px tahoma,arial,verdana,sans-serif' },
		}, '-', '-', '-', '->', {
			xtype: 'textfield',
			name: 'codigobarra',
			id: 'codigobarra',
			fieldLabel: 'Codigo Barra',
			emptyText: 'Cod. Barra',
			// anchor:'20%',
			width: 80,
			maxLength: 20,
			allowBlank: true,
			style: { textTransform: "uppercase" },
			blankText: 'Campo requerido',
			enableKeyEvents: true,
			selectOnFocus: true,
			listeners: {
				keypress: function (t, e) {
					if (e.getKey() == 13) {
						var posicion = storeproducto.findExact('codbarra', this.getValue());
						if (posicion >= 0) {
							Ext.getCmp('product').setValue(storeproducto.getAt(posicion).get('codproducto'));
							Ext.getCmp('cant').focus(true, 300);
						} else {
							Ext.MessageBox.alert('Alerta de Mensaje.','Código de Barra Inexistente.');
						}
					}
				}
			}

		}, '-', {
			xtype: 'combo',
			id: 'subcat',
			hiddenName: 'cbtipop',
			fieldLabel: 'SubCategoría',
			width: 220,
			typeAhead: true,
			forceSelection: true,
			allowBlank: true,
			store: storetipoP_m,
			emptyText: 'SubCategoria.',
			style: { textTransform: "uppercase" },
			mode: 'local',
			forceSelection: true,
			triggerAction: 'all',
			selectOnFocus: true,
			editable: false,
			valueField: 'codtipop',
			displayField: 'nombtipop',
			listeners: {
				'select': function (cmb, record, index) {
					storeproducto.load({ params: { busqueda: this.getValue() } });
				}
			}
		}, '-', {
			xtype: 'combo',
			id: 'product',
			hiddenName: 'cbproducto',
			fieldLabel: 'Producto',
			width: 270,
			typeAhead: true,
			forceSelection: true,
			allowBlank: true,
			style: { textTransform: "uppercase" },
			store: storeproducto,
			emptyText: 'Producto.',
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
		}, '-', {
			xtype: 'numberfield',
			name: 'cant',
			id: 'cant',
			emptyText: 'Cant.',
			style: { textTransform: "uppercase" },
			width: 40,
			enableKeyEvents: true,
			selectOnFocus: true,
			listeners: {
				keypress: function (t, e) {
					if (e.getKey() == 13) {
						if (this.getValue() != '' && Ext.getCmp('product').getValue() != '') {
							ActualizarGrid();
							registroD_dV3=[];
						} else {
							Ext.MessageBox.alert('Alerta de Mensaje.','Faltan Datos por Ingresar.');
						}
					}
				}
			}
		}, '-', 
		// {
		// 	xtype: 'button', 
		// 	text: '<a style ="color:BLUE; font: bold 11px tahoma,arial,verdana,sans-serif;">DESCUENTO</a>',
		// 	style : { background :'#C1D4F3',borderRadius: '0px'},
		// 	minWidth: 60,
		// 	handler:function(){
		// 		if(Ext.getCmp('prop').getValue() != ''){
		// 			if(Ext.getCmp('subtotalT').getValue() != 0){
		// 				op_ING = 0;
		// 					cod_up_ING_global = 4;
		// 					Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_ING);
		// 			} else {
		// 				Ext.MessageBox.alert('Alerta de Mensaje.','No Existen Registros en la Grilla.')
		// 			}
		// 		} else {
		// 			Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Cliente.')
		// 		}
		// 	} 
		// },
		 '-', '-', '-', {
			name: 'subtotalT',
			id: 'subtotalT',
			xtype: 'numberfield',
			allowBlank: false,
			style: { textTransform: "uppercase", background: '#CDCDCD', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
			readOnly: true,
			format: '0.00',
			width: 68
		}, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
	]
});
gridTienda.on('afteredit', sumatoria);
function llenarPagoS() {
	var conts = 0;
	storeDetalleS.each(function (rec) {
		storeDetalleS.getAt(conts).set('pago', (parseFloat(rec.data.saldo) + parseFloat(rec.data.pago == '' ? 0 : rec.data.pago)))
		storeDetalleS.getAt(conts).set('saldo', 0)
		conts++;
	});
}

var btnAceptarRP = new Ext.Button({
	id: 'btnAceptarRP',
	x: 150,
	y: 265,
	text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">PAGO</a>',
	style: { background: '#BCF5A9', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		if (Ext.getCmp('prop').getValue() != '' || Ext.getCmp('razonsocial').getValue() != '') {
			if (ValidarGridServicio()) {
				if (GuardarArray()) {
					if (Ext.getCmp('cambioST').getValue() >= 0) {
						if (control_descuento && Ext.getCmp('subtotalS').getValue() > 0) {
							op_ING = 0;
							cod_up_ING_global = 5;
							Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación del Personal:`, verificacionNivelPin_ING);
						} else {
							if (control_descuento_fide_conve && Ext.getCmp('subtotalS').getValue() > 0) {
								op_ING = 0;
								cod_up_ING_global = 5;
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación del Cliente:`, verificacionNivelPinCliente_ING);
							} else {
								frmIngreso.guardarDatos();
							}
						}
					} else {
						Ext.MessageBox.alert('Alerta de Mensaje.', 'El Pago no Corresponde con el Total de la Deuda.');
					}
				} else {
					Ext.MessageBox.alert('Alerta de Mensaje.', 'No Agregó Valores Correcto en la Grilla.');
				}
			} else {
				Ext.MessageBox.alert('Alerta de Mensaje.', 'Estimado Usuario debe Asignar un Personal, de los Servicios que Tenga Cantidad Mayor a 0.');
			}
		} else {
			Ext.MessageBox.alert('Alerta de Mensaje.', 'Debe seleccionar un Cliente o Intruducir una Razon Social.');
		}
	}
});

var btnLimpiarRP = new Ext.Button({
	id: 'btnLimpiarRP',
	x: 245,
	y: 265,
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		IniCompPermisoU();
		winIngreso.hide();
	}
});

var btnAgregar_cliente = new Ext.Button({
	id: 'btnAgregar2',
	icon: '../img/Nuevo.png',
	iconCls: 'x-btn-text-icon',
	fieldLabel: ' ',
	anchor: '95%',
	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Agregar</a>',
	style: { background: '#BCF5A9', borderRadius: '5px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		altaClienteIngreso(Ext.getCmp("codigocliente").getValue());
	}
});
var btnPin_cliente = new Ext.Button({
	id: 'btnpincliente',
	icon: '../img/password.png',
	iconCls: 'x-btn-text-icon',
	fieldLabel: ' ',
	anchor: '95%',
	text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Resetear Pin</a>',
	style: { background: '#B2C4CD', borderRadius: '5px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		
		if (Ext.getCmp("prop").getRawValue() != '') {
			cambiarPin(Ext.getCmp("prop").getValue(), Ext.getCmp("prop").getRawValue())
		}
		else {
			Ext.MessageBox.alert('Alerta de Mensaje.', 'Debe Seleccionar un Cliente.');
		}
	}
});

var frmIngreso = new Ext.FormPanel({
	id: 'fpRP',
	frame: true,
	//selectOnFocus: true,
	autoScroll: true,
	labelAlign: 'top',
	layout: 'column',
	items: [
		{
			columnWidth: .1,
			layout: 'form',
			defaultType: 'textfield',
			items: [
				{
					name: 'codigobarra',
					id: 'codigocliente',
					fieldLabel: 'Celular',
					anchor: '95%',
					maxLength: 20,
					allowBlank: true,
					style: { textTransform: "uppercase" },
					blankText: 'Campo requerido',
					enableKeyEvents: true,
					selectOnFocus: true,
					listeners: {
						keypress: function (t, e) {
							if (e.getKey() == 13) {
								var posicion = storePropietario.findExact('codigob', this.getValue());
								if (posicion >= 0) {
									console.log(storePropietario.getAt(posicion).get('pin_cliente'));
									Ext.getCmp('prop').setValue(storePropietario.getAt(posicion).get('codigop'));
									Ext.getCmp('nit').setValue(storePropietario.getAt(posicion).get('nit'));
									Ext.getCmp('razonsocial').setValue(storePropietario.getAt(posicion).get('razonsocial'));
									Ext.getCmp('nacimiento').setValue(storePropietario.getAt(posicion).get('nacimiento'));
									storeDetalleS.load({ params: { cod: storePropietario.getAt(posicion).get('codigop') } });
									storeFidelizacion.load({ params: { codigo: storePropietario.getAt(posicion).get('codigop') } });
									storePropietarioValores.load({ params: { buscar: storePropietario.getAt(posicion).get('codigop') } });
									pinGlobal_cliente = storePropietario.getAt(posicion).get('pin_cliente');
									registroD_dV3=[];
									
									// Ext.getCmp('cant').focus(true, 300);
								} else {
									alert('El nro de celular no esta vinculado a ningun cliente, porfavor registrar al cliente.');
								}
							}
						}
					}
				}
			]
		}, {
			columnWidth: .3,
			layout: 'form',
			defaultType: 'combo',
			items: [
				{
					hiddenName: 'cbpropietario',
					id: 'prop',
					fieldLabel: 'Cliente',
					anchor: '98%',
					typeAhead: true,
					forceSelection: true,
					allowBlank: true,
					store: storePropietario,
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
							var id_conv = storePropietario.getAt(index).get('codconvenio');
							if(id_conv > 0){
								storeConvenio.load({ params: { cod : id_conv } });
								// debugger;
								var posicion = storeConvenioCliente.findExact('codd',id_conv);
								if (posicion >= 0) {
									removeClases_Combo();									
									// Ext.getCmp('fidelizacionAI').addClass('comboDescuentos');
									Ext.getCmp('convenioAI').addClass('comboDescuentos');
									// Ext.getCmp('descuentoAI').addClass('comboDescuentos');
									Ext.getCmp('convenioAI').setValue(storeConvenioCliente.getAt(posicion).get('codd'));
								}
							}
							// storeFidelizacion.load({ params: { codigo: this.getValue() } });
							storePropietarioValores.load({ params: { buscar: this.getValue() } });
							Ext.getCmp('nit').setValue(storePropietario.getAt(index).get('nit'));
							Ext.getCmp('razonsocial').setValue(storePropietario.getAt(index).get('razonsocial'));
							Ext.getCmp('nacimiento').setValue(storePropietario.getAt(index).get('nacimiento'));
							Ext.getCmp('codigocliente').setValue(storePropietario.getAt(index).get('codigob'));
							Ext.getCmp('descuentoAI').setValue(0);		/**  cambio realizado 2021-02-09 */
							pinGlobal_cliente = storePropietario.getAt(index).get('pin_cliente');
							control_descuento = false;		/**  cambio realizado 2021-02-09 */
							registroD_dV3=[];
						}
					}
				}
			]
		}, {
			columnWidth: .1,
			layout: 'form',
			vertical: true,
			border: false,
			//defaultType: 'numberfield',
			items: [
				btnAgregar_cliente
			]
		}, {
			columnWidth: .1,
			layout: 'form',
			vertical: true,
			border: false,
			//defaultType: 'numberfield',
			items: [
				btnPin_cliente
			]
		}, {
			columnWidth: .14,
			layout: 'form',
			defaultType: 'numberfield',
			items: [
				{
					name: 'nit',
					id: 'nit',
					fieldLabel: 'Nit',
					anchor: '95%',
					maxLength: 20,
					allowBlank: true,
					style: { textTransform: "uppercase" },
					blankText: 'Campo requerido',
					enableKeyEvents: true,
					selectOnFocus: true,
					listeners: {
						keypress: function (t, e) {
							if (e.getKey() == 13) {
								Ext.getCmp('razonsocial').focus();
							}
						}
					}
				}
			]
		}, {
			columnWidth: .15,
			layout: 'form',
			defaultType: 'textfield',
			items: [
				{
					name: 'razonsocial',
					id: 'razonsocial',
					fieldLabel: 'Razon Social',
					anchor: '100%',
					maxLength: 20,
					allowBlank: true,
					style: { textTransform: "uppercase" },
					blankText: 'Campo requerido',
					enableKeyEvents: true,
					selectOnFocus: true
				}
			]
		},
		{
			columnWidth: .10,
			layout: 'form',
			defaultType: 'datefield',
			items: [
				{
					name: 'nacimiento',
					id: 'nacimiento',
					fieldLabel: 'Nacimiento',
					anchor: '100%',
					maxLength: 20,
					allowBlank: true,
					format: 'Y-m-d', // Formato de la fecha
					blankText: 'Campo requerido',
					enableKeyEvents: true,
					selectOnFocus: true
				}
			]
		},		
		{
			columnWidth: 1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [gridServicio]
		}, {
			columnWidth: 1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [gridTienda]
		}, {
			columnWidth: .31,
			layout: 'form',
			defaultType: 'radiogroup',
			// labelAlign: 'right',
			items: [
				{
					columns: 2,
					fieldLabel: '<B>TIPO PAGO',
					vertical: true,
					id: 'tipopago',
					anchor: '100%',
					items: [
						{ boxLabel: 'EFECTIVO', name: 'idtp', inputValue: 1 },
						{ boxLabel: 'TRANSFERENCIA', name: 'idtp', inputValue: 2 },
						{ boxLabel: 'TARJETA', name: 'idtp', inputValue: 3 },
						// { boxLabel: 'CHEQUE', name: 'idtp', inputValue: 4 },
					],
					listeners: {
						change: function (field, newValue, oldValue) {
							if (newValue.inputValue == 2) {
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionACH);
							} else {
								IniCompACH();
							}
						}
					}
				}
			]
		}, {
			columnWidth: .4465,
			layout: 'form',
			vertical: true,
			defaultType: 'label',
			border: false,
			items: [
				{
					html: '.',
					style: { textTransform: "uppercase", fontSize: '0.1em', textAlign: 'right' },
				}
			]
		}, {
			columnWidth: .22,
			layout: 'form',
			defaultType: 'numberfield',
			labelAlign: 'right',
			items: [
				{
					name: 'totalST',
					id: 'totalST',
					fieldLabel: '<b>TOTAL',
					anchor: '100%',
					maxLength: 20,
					readOnly: true,
					allowBlank: true,
					enableKeyEvents: true,
					selectOnFocus: true,
					style: { textTransform: "uppercase", background: '#CDCDCD', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
				}
			]
		}, {
			columnWidth: .223,
			layout: 'form',
			defaultType: 'numberfield',
			labelAlign: 'right',
			items: [
				{
					name: 'montoSTD',
					id: 'montoSTD',
					fieldLabel: '<b>MONTO USD',
					// hideLabel: true,
					anchor: '100%',
					maxLength: 20,
					allowBlank: true,
					enableKeyEvents: true,
					selectOnFocus: true,
					style: { textTransform: "uppercase", background: '#FFFFFF', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
					listeners: {
						'render': function (c) {
							c.getEl().on('keyup', function (sm, row, rec) {
								calculoPago();
							}, c);
						}
					}
				}
			]
		}, {
			columnWidth: .223,
			layout: 'form',
			defaultType: 'numberfield',
			labelAlign: 'right',
			items: [
				{
					name: 'montoSTB',
					id: 'montoSTB',
					fieldLabel: '<b>MONTO BS',
					// hideLabel: true,
					anchor: '100%',
					maxLength: 20,
					allowBlank: true,
					enableKeyEvents: true,
					selectOnFocus: true,
					style: { textTransform: "uppercase", background: '#FFFFFF', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
					listeners: {
						'render': function (c) {
							c.getEl().on('keyup', function (sm, row, rec) {
								calculoPago();
							}, c);
						}
					}
				}
			]
		}, {
			columnWidth: .234,
			layout: 'form',
			defaultType: 'numberfield',
			labelAlign: 'right',
			items: [
				{
					name: 'pagoST',
					id: 'pagoST',
					fieldLabel: '<b>PAGO',
					anchor: '95%',
					maxLength: 20,
					readOnly: true,
					allowBlank: true,
					enableKeyEvents: true,
					selectOnFocus: true,
					style: { textTransform: "uppercase", background: '#CDCDCD', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
				}
			]
		},
		{
			columnWidth: .04,
			layout: 'form',
			vertical: true,
			defaultType: 'label',
			border: false,
			items: [
				{
					html: '.',
					style: { textTransform: "uppercase", fontSize: '0.1em', textAlign: 'right' },
				}
			]
		}, {
			columnWidth: .406,
			layout: 'form',
			defaultType: 'textfield',
			labelAlign: 'left',
			items: [
				{
					name: 'comentario',
					fieldLabel: '<B>COMENTARIO',
					style: { textTransform: "uppercase" },
					anchor: '100%',
					// height: 30 
				}
			]
		}, {
			columnWidth: .234,
			layout: 'form',
			defaultType: 'numberfield',
			labelAlign: 'right',
			items: [
				{
					name: 'cambioST',
					id: 'cambioST',
					fieldLabel: '<b>CAMBIO',
					anchor: '95%',
					maxLength: 20,
					readOnly: true,
					allowBlank: true,
					enableKeyEvents: true,
					selectOnFocus: true,
					style: { textTransform: "uppercase", background: '#CDCDCD', color: 'black', fontSize: '1.6em', borderRadius: '4px', textAlign: 'right' },
				}
			]
		}
	],
	guardarDatos: function () {
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: '../servicesAjax/DSaltaIngresoAJAX.php',
				params: {
					registrosST: registrosST, pc: pc, ingresoIE: 1, cliente: Ext.getCmp("prop").getRawValue(),
					cod_cach: codACH_G, coment_ach: comentACH_G, registrosDT: registroD_dV3, tipo_descuento: op_rb,
					cod_personal_ds: cod_personal_ds
				},
				method: 'POST',
				waitTitle: 'Conectando',
				waitMsg: 'Enviando Datos...',
				success: function (form, action) {
					Ext.Msg.alert('Mensaje de Confirmación.', 'El Proceso Finalizó Correctamente.');
					winIngreso.hide();
					Ext.dsdata.storeIEA.load();
				},
				failure: function (form, action) {
					if (action.failureType == 'server') {
						var data = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('No se pudo conectar', data.errors.reason, function () {
						});
					} else {
						Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
					}
				}
			});
		}
	}
});

function IniCompPermisoU() {
	var frm = frmIngreso.getForm();
	frm.reset();
	frm.clearInvalid();
	gridServicio.removeAll();
	gridServicio.getStore().removeAll();
	gridTienda.removeAll();
	gridTienda.getStore().removeAll();
	registrosST = [];
	registrosT = [];
	removeClases_Combo();
};
function removeClases_Combo(){
	//Ext.getCmp('fidelizacionAI').removeClass('comboDescuentos');
	//Ext.getCmp('convenioAI').removeClass('comboDescuentos');
	Ext.getCmp('descuentoAI').removeClass('comboDescuentos');

	// Ext.getCmp('fidelizacionAI').removeClass('comboFormato1');
	// Ext.getCmp('convenioAI').removeClass('comboFormato1');
	// Ext.getCmp('descuentoAI').removeClass('comboFormato1');
}
function AltaIngreso() {
	if (!winIngreso) {
		winIngreso = new Ext.Window({
			layout: 'fit',
			width: 1050,
			height: 550,
			title: 'Ingreso',
			resizable: true,
			closeAction: 'hide',
			closable: false,
			draggable: true,
			plain: true,
			border: false,
			modal: true,
			// maximized: true,
			items: [frmIngreso],
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
	winIngreso.show();
	updateSpot('fpRP');
	Ext.getCmp('subtotalS').setValue(0);
	Ext.getCmp('subtotalT').setValue(0);
	Ext.getCmp('totalST').setValue(0);
	Ext.getCmp('tipopago').setValue(1);
	// Ext.getCmp('montoSTD').setValue(0);
	// Ext.getCmp('montoSTB').setValue(0);
	Ext.getCmp('pagoST').setValue(0);
	Ext.getCmp('cambioST').setValue(0);
	Ext.getCmp('codigocliente').focus(true, 300);
	control_descuento = false;
	control_descuento_tienda = false;
	storeDetalleS.load({ params: { cod: 0 } });
	winIngreso.setTitle('Ingreso');	
	//Ext.getCmp('fidelizacionAI').setValue(0);
	//Ext.getCmp('convenioAI').setValue(0);
	Ext.getCmp('descuentoAI').setValue(0);
	// storePermisos.load({ params:{codperfil: Codigov,roles:'Modulo'} });			
};

function sumatoria() {
	var sumS = 0;
	var sumP = 0; //sumatoria del Pago del servico
	var sumT = 0; //sumatoria del total de la tienda tienda
	storeDetalleS.each(function (rec) {
		sumS = sumS + parseFloat(rec.data.total);
		sumP = sumP + parseFloat(rec.data.total);
	});
	storeDetalle.each(function (rec) {
		sumT = sumT + parseFloat(rec.data.total);
	});
	//Ext.getCmp('saldototalS').setValue(sumS);
	Ext.getCmp('subtotalS').setValue(Math.floor(sumP));
	Ext.getCmp('subtotalT').setValue(Math.floor(sumT));
	Ext.getCmp('totalST').setValue(Math.floor(parseFloat(sumP) + parseFloat(sumT)));
	calculoPago();
};

function calculoPago() {
	var montoD = Ext.getCmp('montoSTD').getValue();
	var montoB = Ext.getCmp('montoSTB').getValue();
	var tpago = (parseFloat(montoD == '' ? 0 : montoD) * pc) + parseFloat(montoB == '' ? 0 : montoB);
	var tcambio = tpago - parseFloat(Ext.getCmp('totalST').getValue());
	Ext.getCmp('pagoST').setValue(Ext.util.Format.number(tpago, '0.00'));
	Ext.getCmp('cambioST').setValue(Ext.util.Format.number(tcambio, '0.00'));
};

function ValidarGridServicio() {
	var noseq = true;
	storeDetalleS.each(function (rec) {
		if (rec.data.cant > 0) {
			if (rec.data.personal == "") {
				noseq = false
			}
		}
	});
	return noseq;
};
function GuardarArray() {
	var datosGrid = [];
	storeDetalleS.each(function (rec) {
		if (rec.data.cant > 0) {
			datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
		}
	});
	storeDetalle.each(function (rec) {
		datosGrid.push(Ext.apply({ id: rec.id }, rec.data));
	});
	this.gridServicio.stopEditing();
	registrosST = Ext.encode(datosGrid);
	// console.log(registrosST);
	return registrosST == '[]' ? false : true;
};

/**
 * Código para la Autorizacion de PIN #FF0000.
 * Funciónes para verificar el nivel de PIN del usuario para una ubicacion_pin.
 */
var cod_up_ING_global; 		// Código global para filtar a que ubicacion de pin pertenece la funcion a compilar.
var op_ING; 					// Código global para filtar la opcion de busqueda.
function validarUbicacionPin_ING(cod_up_ING, pin_ING) {
	Ext.Ajax.request({
		url: '../servicesAjax/DSvalidacionNivelPinAJAX.php',
		method: 'POST',
		params: { codigo: cod_up_ING, pin: pin_ING, op: op_ING },
		success: function (resp) {
			var msj = Ext.util.JSON.decode(resp.responseText);
			if (msj.message.id == '99') {		//significa que murio la session, se loguea de nuevo
				Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
					window.open("../");
				});
			} else if (msj.message.id == '2') { 		// se encontro resultado
				codpersonalAdmin = msj.message.reason;
				switch (cod_up_ING) {
					case 4:
						altaDescuento_dV3();
					break;
					case 5:
						cod_personal_ds = codpersonalAdmin;
						frmIngreso.guardarDatos();
					break;
				}
			} else { 		//no se encontro resultado, se valida segun corresponda el formulario o requerimiento
				siguienteIntentoPin_ING(msj.message.reason);
			}
		}
	});
}
function verificacionNivelPin_ING(btn, text) {
	if (btn == 'ok') {
		if (text == "") {
			Ext.MessageBox.alert('Alerta de Mensaje.', "Debe Introducir un Código.");
			Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación del Personal:`, verificacionNivelPin_ING);
		}
		else {
			validarUbicacionPin_ING(cod_up_ING_global, text)
		}
	}
}
function siguienteIntentoPin_ING(encabezado_ING) {
	Ext.MessageBox.show({
		title: 'Alerta de Advertencia.',
		msg: encabezado_ING,
		width: 400,
		height: 200,
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.WARNING,
		multiline: false,
		fn: function (btn) {
			if (btn == 'yes') {
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación del Personal:`, verificacionNivelPin_ING);
			}
			else { }
		}
	});
}
function validarUbicacionPinCliente_ING(cod_up_ING, pin_ING) {

	if(pinGlobal_cliente == pin_ING){
		frmIngreso.guardarDatos();

	}else{
		siguienteIntentoPinCliente_ING('Estimado Usuario el PIN Introducido no Coinciden con los Permitidos por Sistema, Desea Volver a Intentarlo?');
	}	
}
function verificacionNivelPinCliente_ING(btn, text) {
	if (btn == 'ok') {
		if (text == "") {
			Ext.MessageBox.alert('Alerta de Mensaje.', "Debe Introducir un Código.");
			Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación del Cliente:`, verificacionNivelPinCliente_ING);
		}
		else {
			validarUbicacionPinCliente_ING(cod_up_ING_global, text)
		}
	}
}
function siguienteIntentoPinCliente_ING(encabezado_ING) {
	Ext.MessageBox.show({
		title: 'Alerta de Advertencia.',
		msg: encabezado_ING,
		width: 400,
		height: 200,
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.WARNING,
		multiline: false,
		fn: function (btn) {
			if (btn == 'yes') {
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación del Cliente:`, verificacionNivelPin_ING);
			}
			else { }
		}
	});
}


storePersonal = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaPersonalCSAJAX.php',
	root: 'data',
	totalProperty: 'total',
	fields: ['codpersonal', 'codsistema', 'codcargo'],
});
storePersonal.load();

function verificacionACH(btn, text) {
	if (btn == 'ok') {
		if (text == "") {
			Ext.MessageBox.alert("Alerta de Mensaje.", "Debe Introducir Un Código.");
			Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionACH);
		} else {
			var posicion = storePersonal.findExact('codsistema', text);
			if (posicion >= 0) {
				var cargo = storePersonal.getAt(posicion).get('codcargo');
				if (cargo == 1 || cargo == 2 || cargo == 5) {
					SelectACH(codACH_G);
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
								Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionACH);
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
							Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', 'Introducir PIN de Acreditación:', verificacionACH);
						}
					}
				});
			}
		}
	}
}
function succesfunction(resp) {
	var msj = Ext.util.JSON.decode(resp.responseText);
	if (msj.message.id == '99') {
		Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
			window.open("../");
		});
	} else if (msj.message.id == '2') {
		Ext.MessageBox.alert('Mensaje', msj.message.reason);
		gridTienda.removeAll();
		gridTienda.getStore().removeAll();
		registrosT = [];
		storeDetalleS.load({ params: { cod: Ext.getCmp('prop').getValue() } });
	} else {
		Ext.MessageBox.alert('Error', msj.message.reason);
	}
}
/**
     * formulario de reset PIN
     */
 var winResetPin, codpropietariopin;
 var btnAceptar_pines = new Ext.Button({
	 id: 'btnAceptar_pines',
	 x: 150,
	 y: 265,
	 text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
	 style: { background: '#BCF5A9', borderRadius: '0px' },
	 minWidth: 80,
	 handler: function () {
		 if(Ext.getCmp('txtpinreset').getValue() != ''){
			 // Ext.MessageBox.alert('Alerta de Mensaje.','Pendiente.');
			 frmResetPin.guardarDatos();
		 } else {
			 Ext.MessageBox.alert('Alerta de Mensaje.','Dato Ingresado Invalido.');
		 }
	 }
 });
 var btnLimpiar_pin = new Ext.Button({
	 id: 'btnLimpiar_pin',
	 text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
	 style: { background: '#F6CECE', borderRadius: '0px' },
	 minWidth: 80,
	 handler: function () {
		 IniComponente_pin();
		 winResetPin.hide();
	 }
 });
 var frmResetPin = new Ext.FormPanel({
	 id: 'fm_pin',
	 frame: true,
	 autoScroll: true,
	 // labelAlign: 'left',
	 // layout: 'column',
	 items: [
		 {
			 xtype: 'fieldset',
			 layout: 'column',
			 title: '<font color= black> Máximo 4 Digitos.</font>',
			 width: 425,
			 height: 60,
			 items: [
				 {
					 columnWidth: 1,
					 layout: 'form',
					 defaultType: 'textfield',
					 items: [
						 {
							 name: 'txtpinreset',
							 id: 'txtpinreset',
							 hideLabel: true,
							 anchor: '100%',
							 maxLength: 4,
							 allowBlank: false,
							 inputType: 'password',
							 blankText: 'Maximo 4 Digitos',
							 enableKeyEvents: true,
							 selectOnFocus: true,
							 listeners: {
								 keypress: function (t, e) {
									 if (e.getKey() == 13) {
										 btnAceptar_pines.focus();
									 }
								 }
							 }
						 }
					 ]
				 }
			 ]
		 }
	 ],
	 guardarDatos: function () {
		 if (this.getForm().isValid()) {
			 this.getForm().submit({
				 url: '../servicesAjax/DSmodificarPinPropietarioAjax.php',
				 params: { codigo: codpropietariopin },
				 method: 'POST',
				 waitTitle: 'Conectando',
				 waitMsg: 'Enviando Datos...',
				 success: function (form, action) {
					pinGlobal_cliente = Ext.getCmp('txtpinreset').getValue();
					 winResetPin.hide();
					 Ext.MessageBox.alert('Alerta de Mensaje.', 'Se Guardó Correctamente.');
					 storePropietario.load();
					 Ext.getCmp('prop').setValue(codpropietariopin);	
				 },
				 failure: function (form, action) {
					 if (action.failureType == 'server') {
						 var data = Ext.util.JSON.decode(action.response.responseText);
						 if (data.errors.id == '99') {
							 Ext.Msg.alert('Error', data.errors.reason, function () {
								 window.open("../../");
								 // abrirLogin();
							 });
						 } else {
							 Ext.Msg.alert('Error', data.errors.reason, function () {
								 // txtClave.focus(true, 100);
							 });
						 }
					 }
					 else {
						 Ext.Msg.alert('Error!', 'Imposible conectar con servidor : ' + action.response.responseText);
					 }
				 }
			 });
		 }
	 }
 });
 function IniComponente_pin() {
	 var frm = frmResetPin.getForm();
	 frm.reset();
	 frm.clearInvalid();
 }
 var codPersonal;
 function cambiarPin(codcli, nombcli) {
	 if (!winResetPin) {
		 winResetPin = new Ext.Window({
			 layout: 'fit',
			 width: 450,
			 height: 165,
			 resizable: false,
			 closeAction: 'hide',
			 closable: true,
			 draggable: false,
			 plain: true,
			 border: false,
			 modal: false,
			 items: [frmResetPin],
			 buttonAlign: 'center',
			 buttons: [btnAceptar_pines, '-', '-', btnLimpiar_pin],
			 listeners: {
				 show: function () {
					 IniComponente_pin();
					 Ext.getCmp('txtpinreset').focus(true, 300);
				 },
				 hide: function () {
					 updateSpot(false);
				 }
			 }
		 });
	 }
	 codpropietariopin = codcli;
	 propietario = nombcli;
	 winResetPin.setTitle(`Resetear Codigo de Seguridad de: ${propietario}`);
	 winResetPin.show();
	 updateSpot('fm_pin');
 }
 var spot = new Ext.ux.Spotlight({
	 easing: 'easeOut',
	 duration: 1.5
 });
 var updateSpot = function (id) {
	 if (typeof id == 'string') {
		 spot.show(id);
	 } else if (!id && spot.active) {
		 spot.hide();
	 }
 };
