var winLRP;
///////////////////////////////////////////////////////////////////spotligth de proveedor
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

// var storeDetalleLRP = new Ext.data.ArrayStore({// Ext.create('Ext.data.ArrayStore',{  
// fields: [
// {name: 'codigo'},
// {name: 'marca'},				  
// {name: 'producto'},				  
// {name: 'cod'},				  
// {name: 'precio'},				  
// {name: 'cant'},				  
// {name: 'venc', type: 'date', dateFormat: 'Y-m-d'},				  
// ],  
// id: 0
// });
var storeDetalleLRP = new Ext.data.JsonStore({
	url: '../servicesAjax/DSListaDetalleRecepcionProductoAjax.php',
	root: 'data',
	totalProperty: 'total',
	fields: [
		{ name: 'codigo' },
		{ name: 'marca' },
		{ name: 'producto' },
		{ name: 'cod' },
		{ name: 'precio' },
		{ name: 'cant' },
		{ name: 'venc', type: 'date', dateFormat: 'Y-m-d' },
	],
});

function formatDate(value) {
	return value ? value.dateFormat('Y-m-d') : '';
}
var Columnas_LRP = new Ext.grid.ColumnModel(
	[

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
var gridRecepcion_LRP = new Ext.grid.EditorGridPanel({
	id: 'gridPermiso2',
	anchor: '100%',
	height: 400,
	// sm : sm,		
	store: storeDetalleLRP,
	cm: Columnas_LRP,
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
				// EliminarFilaRecepcion();
			}
		}
	}
});
var btnLimpiar_LRP = new Ext.Button({
	id: 'btnLimpiar_LRP',
	x: 245,
	y: 265,
	text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
	style: { background: '#F6CECE', borderRadius: '0px', border: '1px solid #cccccc' },
	minWidth: 80,
	handler: function () {
		winLRP.hide();
	}
});

var frmRP_LRP = new Ext.FormPanel({
	id: 'fpRP_LRP',
	frame: true,
	//selectOnFocus: true,
	autoScroll: true,
	labelAlign: 'top',
	layout: 'column',
	items: [
		{
			columnWidth: 1,
			layout: 'form',
			vertical: true,
			border: false,
			items: [gridRecepcion_LRP]
		}

	],

});

function DetalleRecepcion(cod) {
	if (!winLRP) {
		winLRP = new Ext.Window(			{
				layout: 'fit',
				width: 700,
				height: 500,
				title: 'Detalle Recepcion Producto',
				resizable: false,
				closeAction: 'hide',
				closable: true,
				draggable: false,
				plain: true,
				border: false,
				modal: false,
				items: [frmRP_LRP],
				buttonAlign: 'center',
				buttons: [btnLimpiar_LRP],
				listeners: {
					show: function () {
					},
					hide: function () {
						updateSpot(false);
					}
				}
			});
	}
	// txtCodPerfil.setValue(Codigov);			
	winLRP.show();
	storeDetalleLRP.load({ params: { codigo: cod } });
	updateSpot('fpRP_LRP');
}