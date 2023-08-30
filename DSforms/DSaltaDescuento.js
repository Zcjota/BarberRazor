// var storeDetalle = new Ext.data.ArrayStore({
//     fields: [
//         { name: 'codigo_' },
//         { name: 'tipo_' },
//         { name: 'marca_' },
//         { name: 'detalle_' },
//         { name: 'pv_' },
//         { name: 'cantidad_' },
//         { name: 'descuento_' },
//         { name: 'total_' },
//         { name: 'tipoingreso_' },
//         { name: 'codbarra_' },
//         { name: 'codcategoria_' },
//     ],
//     id: 0
// });
var Columnas_dV3 = new Ext.grid.ColumnModel(
    [
        {
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
            width: 20,
        }, {
            xtype: 'numbercolumn',
            header: 'Precio',
            dataIndex: 'pv',
            width: 9,
            align: 'right'
        }, {
            xtype: 'numbercolumn',
            header: 'Cantidad',
            dataIndex: 'cantidad',
            width: 7,
            sortable: true,
            align: 'center'
        }, {
            // xtype: 'numbercolumn',
            header: 'Descuento',
            dataIndex: 'descuento',
            width: 9,
            sortable: true,
            align: 'center',
            renderer: pctChange_dV3,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                maxLength: 6,
                listeners: {
                    'render': function (c) {
                        c.getEl().on('keyup', function (sm, row, rec) {
                            var montt = parseFloat(storeDetalle.getAt(indice_dV3).get('pv')) * parseFloat(storeDetalle.getAt(indice_dV3).get('cantidad'));
                            if (Ext.getCmp('tipodescuento').getValue().inputValue == 1) {
                                var descut = (montt * parseFloat(this.getValue())) / 100;
                                storeDetalle.getAt(indice_dV3).set('total', (montt - descut));
                            } else {
                                var descut = parseFloat(this.getValue());
                                storeDetalle.getAt(indice_dV3).set('total', (montt - descut));
                            }
                        }, c);
                    },
                }
            }
        }, {
            xtype: 'numbercolumn',
            header: 'Total',
            dataIndex: 'total',
            width: 9,
            align: 'right',
            sortable: true
        }
    ]
);
var gridTienda_dV3 = new Ext.grid.EditorGridPanel({
    id: 'gridtiendav3',
    anchor: '100%',
    height: 130,
    store: storeDetalle,
    // title:'TIENDA',
    cm: Columnas_dV3,
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
                indice_dV3 = row;
            }
        }
    })
});
gridTienda_dV3.on('afteredit', sumatoria);
gridTienda_dV3.on('afteredit', sumatoria_dV3);
/*********************************           Formulario         ********************/
var frmD_dV3 = new Ext.FormPanel({
    id: 'fdft',
    frame: true,
    autoScroll: true,
    labelAlign: 'right',
    layout: 'column',
    items: [
        {
            columnWidth: .5,
            layout: 'form',
            defaultType: 'textfield',
            items: [
                {
                    name: 'otorgado_a',
                    id: 'otorgado_a',
                    fieldLabel: 'Otorgado a',
                    anchor: '99%',
                    readOnly: true,
                    maxLength: 20,
                    allowBlank: true,
                    style: {
                        textTransform: "uppercase",
                        background: '#CDCDCD',
                        color: 'black'
                    },
                    blankText: 'Campo requerido',
                    enableKeyEvents: true,
                    selectOnFocus: true
                }
            ]
        }, {
            columnWidth: .5,
            layout: 'form',
            defaultType: 'textfield',
            items: [
                {
                    name: 'acreditado_por',
                    id: 'acreditado_por',
                    fieldLabel: 'Acreditado por',
                    anchor: '100%',
                    readOnly: true,
                    maxLength: 20,
                    allowBlank: true,
                    style: {
                        textTransform: "uppercase",
                        background: '#CDCDCD',
                        color: 'black'
                    },
                    blankText: 'Campo requerido',
                    enableKeyEvents: true,
                    selectOnFocus: true
                }
            ]
        }, {
            columnWidth: .50,
            layout: 'form',
            defaultType: 'radiogroup',
            labelAlign: 'center',
            items: [
                {
                    columns: 2,
                    fieldLabel: '<b>DESCUENTO</b>',
                    vertical: true,
                    id: 'tipodescuento',
                    anchor: '90%',
                    items: [
                        { boxLabel: '%', name: 'idtd', inputValue: 1 },
                        { boxLabel: 'Bs', name: 'idtd', inputValue: 2 },
                    ],
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            if (newValue.inputValue == 1) {
                                calculoDescuentoPorCiento_dV3();
                            } else {
                                // console.log('entro' + n1);
                                calculoDescuentoBS_dV3();
                            }
                        }
                    }
                }
            ]
        }, {
            columnWidth: .50,
            layout: 'form',
            vertical: true,
            border: false,
            items: [
                {
                    id: 'fecha_dV3',
                    fieldLabel: 'Fecha',
                    xtype: 'datefield',
                    anchor: '100%',
                    readOnly: true,
                    allowBlank: false,
                    style: {
                        background: '#CDCDCD',
                        color: 'black'
                    },
                    editable: false,
                    format: 'Y-m-d',
                    value: new Date()
                }
            ]
        }, {
            columnWidth: 1,
            layout: 'form',
            vertical: true,
            border: false,
            items: [gridTienda_dV3]
        }, {
            columnWidth: .7,
            layout: 'form',
            defaultType: 'textarea',
            labelAlign: 'top',
            items: [
                {
                    name: 'comentario_dV3',
                    id: 'comentario_dV3',
                    fieldLabel: 'Motivo del Descuento',
                    emptyText: 'Máximo 255 caracteres.',
                    style: { textTransform: "uppercase" },
                    anchor: '99%',
                    allowBlank: false,
                    blankText: 'Campo requerido',
                    maxLength: 255,
                }
            ]
        }, {
            columnWidth: .3,
            layout: 'column',
            vertical: true,
            items: [
                {
                    columnWidth: 1,
                    layout: 'form',
                    defaultType: 'numberfield',
                    labelAlign: 'right',
                    items: [
                        {
                            name: 'total_dV3',
                            id: 'total_dV3',
                            fieldLabel: '<b>TOTAL</b>',
                            anchor: '100%',
                            maxLength: 20,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            selectOnFocus: true,
                            style: {
                                textTransform: "uppercase",
                                background: '#CDCDCD',
                                color: 'black',
                                fontSize: '1.6em',
                                borderRadius: '4px',
                                textAlign: 'right'
                            }
                        }
                    ]
                }, {
                    columnWidth: .9,
                    layout: 'form',
                    defaultType: 'numberfield',
                    labelAlign: 'right',
                    items: [
                        {
                            name: 'descuento_dV3',
                            id: 'descuento_dV3',
                            fieldLabel: '<font color=#f00000><b>DESCUENTO</b></font>',
                            anchor: '100%',
                            maxLength: 20,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            selectOnFocus: true,
                            style: {
                                textTransform: "uppercase",
                                background: '#CDCDCD',
                                color: 'black',
                                fontSize: '1.6em',
                                borderRadius: '4px',
                                textAlign: 'right'
                            },
                            listeners: {
                                'render': function (c) {
                                    c.getEl().on('keyup', function (sm, row, rec) {
                                        if (Ext.getCmp('tipodescuento').getValue().inputValue == 1) {
                                            calculoDescuentoPorCiento_dV3();
                                        } else {
                                            calculoDescuentoBS_dV3();
                                        }
                                    }, c);
                                }
                            }
                        }
                    ]
                }, {
                    columnWidth: .10,
                    layout: 'form',
                    vertical: true,
                    defaultType: 'label',
                    border: false,
                    items: [
                        {
                            id: 'es1_dV3',
                            text: '%',
                            style: {
                                fontSize: '1.4em',
                                textAlign: 'center',
                                color: '#f00000',
                                font: 'bold 12px'
                            },
                        }
                    ]
                }, {
                    columnWidth: 1,
                    layout: 'form',
                    defaultType: 'numberfield',
                    labelAlign: 'right',
                    items: [
                        {
                            name: 'saldo_dV3',
                            id: 'saldo_dV3',
                            fieldLabel: '<b>SALDO PAGAR</b>',
                            anchor: '100%',
                            maxLength: 20,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            selectOnFocus: true,
                            style: {
                                textTransform: "uppercase",
                                background: '#CDCDCD',
                                color: 'black',
                                fontSize: '1.6em',
                                borderRadius: '4px',
                                textAlign: 'right'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

var btnAceptar_dV3 = new Ext.Button({
    id: 'btnAceptar_dV3',
    text: '<a style ="color:GREEN; font: bold 11px tahoma,arial,verdana,sans-serif;">ACEPTAR</a>',
    style: { background: '#BCF5A9', borderRadius: '0px' },
    minWidth: 80,
    handler: function () {
        // Ext.MessageBox.alert('MSG', 'se trabaja en las validaciones.');
        if (Ext.getCmp('descuento_dV3').getValue() > 0) {
            if (Ext.getCmp('comentario_dV3').getValue() != '') {
                guardarArrayDescuento_dV3();
                // console.log(registroD_dV3);
                winDescuento_dV3.hide();
                actualizarDatos();
            } else {
                Ext.MessageBox.alert('MSG', 'Introdusca un Motivo al descuento.');
            }
        } else {
            Ext.MessageBox.alert('MSG', 'No puede guardar el descuento con monto 0');
        }
    }
});
var btnLimpiar_dV3 = new Ext.Button({
    id: 'btnLimpiar_dV3',
    text: '<a style ="color:RED; font: bold 11px tahoma,arial,verdana,sans-serif;">SALIR</a>',
    style: { background: '#F6CECE', borderRadius: '0px' },
    minWidth: 80,
    handler: function () {
        if(registroD_dV3 == []){
            initComponent_dV3();
            winDescuento_dV3.hide();
        } else {
            Ext.MessageBox.show({
                title: 'Advertencia.',
                msg: 'salir sin guardar?',
                width: 400,
                height: 200,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.WARNING,
                fn: function (btn) {
                    if (btn == 'yes') {
                        initComponent_dV3();
                        winDescuento_dV3.hide();
                    }
                }
            });
        }
    }
});

var winDescuento_dV3;
var op_rb = 1;
function altaDescuento_dV3() {
    if (!winDescuento_dV3) {
        winDescuento_dV3 = new Ext.Window({
            layout: 'fit',
            width: 700,
            height: 350,
            title: 'Descuento',
            resizable: false,
            closeAction: 'hide',
            closable: true,
            draggable: false,
            plain: true,
            border: false,
            modal: true,
            items: [frmD_dV3],
            buttonAlign: 'center',
            buttons: [btnAceptar_dV3, '-', '-', btnLimpiar_dV3],
            listeners: {
                show: function () {
                }
            }
        });
    }
    winDescuento_dV3.show();
    Ext.getCmp('tipodescuento').setValue(op_rb);
    setTimeout(function () {
        llenarFormulario_dV3();
    }, 1000);
}
storePP_e = new Ext.data.JsonStore({
    url: '../servicesAjax/DSListaProvPersCBAJAX.php',
    root: 'data',
    fields: ['cod', 'nomb', 'codsistema'],
});
storePP_e.load({ params: { op: 1 } });
var otorgadoA;
var acreditadoPor;

/****************************************           FUNCIONES     ************************************/
function initiComponent_dV3_1(){
    var frm = frmD_dV3.getForm();
    frm.reset();
    frm.clearInvalid();
    gridTienda_dV3.removeAll();
}
function initComponent_dV3(){
    var frm = frmD_dV3.getForm();
    frm.reset();
    frm.clearInvalid();
    gridTienda_dV3.removeAll();
    var pos = 0;
    storeDetalle.each(function (rec) {
        var montt = parseFloat(storeDetalle.getAt(pos).get('pv')) * parseFloat(storeDetalle.getAt(pos).get('cantidad'));
        var descut = 0;
        storeDetalle.getAt(pos).set('descuento', 0);
        storeDetalle.getAt(pos).set('total', (montt - descut));
        pos++;
    });
    sumatoria();
    registroD_dV3 = [];
    op_rb = 1;
}
function llenarFormulario_dV3() {
    otorgadoA = Ext.getCmp('prop').getValue();
    acreditadoPor = codpersonalAdmin;
    /********************************************************** */
    var posicion = storePP_e.findExact('cod', codpersonalAdmin);
    var nombreAcr = storePP_e.getAt(posicion).get('nomb');
    Ext.getCmp('otorgado_a').setValue(Ext.getCmp('prop').getRawValue());
    Ext.getCmp('acreditado_por').setValue(nombreAcr);
    Ext.getCmp('total_dV3').setValue(Ext.getCmp('subtotalT').getValue());
    if (op_rb == 2) {
        var pos = 0;
        storeDetalle.each(function (rec) {
            var descuento = storeD_dV3.getAt(pos).get('descuento');
            storeDetalle.getAt(pos).set('descuento', descuento);
            pos++;
        });
    }
    sumatoria_dV3();
}
function calculoDescuentoBS_dV3() {
    var pos = 0;
    // debugger;
    storeDetalle.each(function (rec) {
        console.log(pos);
        var montt = parseFloat(storeDetalle.getAt(pos).get('pv')) * parseFloat(storeDetalle.getAt(pos).get('cantidad'));
        var descut = parseFloat(storeDetalle.getAt(pos).get('descuento'));
        storeDetalle.getAt(pos).set('total', (montt - descut));
        pos++;
    });
    Ext.getCmp('es1_dV3').setText('Bs');
    sumatoria_dV3();
    sumatoria();
    // var montt = parseFloat(storeDetalle.getAt(indice_dV3).get('pv')) * parseFloat(storeDetalle.getAt(indice_dV3).get('cantidad'));
    // var descut = parseFloat(storeDetalle.getAt(indice_dV3).get('descuento'));
    // storeDetalle.getAt(indice_dV3).set('total',(montt - descut));
    // // sumatoria_dV3();
    // // sumatoria();
}
function calculoDescuentoPorCiento_dV3() {
    var pos = 0;
    storeDetalle.each(function (rec) {
        var montt = parseFloat(storeDetalle.getAt(pos).get('pv')) * parseFloat(storeDetalle.getAt(pos).get('cantidad'));
        var descut = (montt * parseFloat(storeDetalle.getAt(pos).get('descuento'))) / 100;
        storeDetalle.getAt(pos).set('total', (montt - descut));
        pos++;
    });
    Ext.getCmp('es1_dV3').setText('%');
    sumatoria_dV3();
    sumatoria();
}
function pctChange_dV3(val) {
    if (val > 0) {
        return '<span style="color:green;">' + val + '</span>';
    } else if (val <= 0) {
        return '<span style="color:red;">' + val + '</span>';
    }
    return val;
}
function sumatoria_dV3() {
    var sumS = 0;
    var sumP = 0; //sumatoria del Pago del servico
    var sumT = 0; //sumatoria del total de la tienda tienda
    var precioT = 0;
    var descuentoT = 0;
    storeDetalleS.each(function (rec) {
        sumS = sumS + parseFloat(rec.data.saldo);
        sumP = sumP + parseFloat(rec.data.pago == '' ? 0 : rec.data.pago);
    });
    storeDetalle.each(function (rec) {
        precioT = precioT + (parseFloat(rec.data.pv) * rec.data.cantidad);
        descuentoT = descuentoT + parseFloat(rec.data.descuento)
        sumT = sumT + parseFloat(rec.data.total);
    });
    Ext.getCmp('total_dV3').setValue(precioT);
    Ext.getCmp('descuento_dV3').setValue(descuentoT);
    Ext.getCmp('saldo_dV3').setValue(sumT);
    calculoPago();
}
/*****************************************        Array         ********************************/
var registroD_dV3 = new Array();
storeD_dV3 = new Ext.data.ArrayStore({
    fields: [
        { name: 'cod_otorgado_a' },     /** [0] */
        { name: 'otorgado_a' },     /** [1] */
        { name: 'cod_acreditado_por' },     /** [2] */
        { name: 'acreditado_por' },     /** [3] */
        { name: 'total' },      /** [4] */
        { name: 'tipo_descuento' },     /** [5] */
        { name: 'descuento' },      /** [6] */
        { name: 'saldo' },      /** [7] */
        { name: 'motivo' },     /** [8] */
        { name: 'cod_producto'}, /** [9] */
    ]
});
function guardarArrayDescuento_dV3() {
    var datos = [];
    var registrosP_dV3 = [];
    var pos = 0;
    storeDetalle.each(function(rec){
        var registro = new Array(9);
        var monto = parseFloat(storeDetalle.getAt(pos).get('pv')) * parseFloat(storeDetalle.getAt(pos).get('cantidad'));
        var codigo = storeDetalle.getAt(pos).get('codigo');
        registro[0] = otorgadoA;
        registro[1] = Ext.getCmp('otorgado_a').getValue();
        registro[2] = acreditadoPor;
        registro[3] = Ext.getCmp('acreditado_por').getValue();
        registro[4] = monto;   /** subtotal */
        registro[5] = Ext.getCmp('tipodescuento').getValue().inputValue;
        registro[6] = storeDetalle.getAt(pos).get('descuento')  /** descuento */
        registro[7] = storeDetalle.getAt(pos).get('total');     /**  */
        registro[8] = Ext.getCmp('comentario_dV3').getValue();
        registro[9] = codigo;
        registrosP_dV3[pos] = registro;
        storeD_dV3.loadData(registrosP_dV3);
        pos++;
    });
    storeD_dV3.each(function (rec) {
        datos.push(Ext.apply({ id: rec.id }, rec.data));
    });
    registroD_dV3 = Ext.encode(datos);
    return registroD_dV3;
}
function convertirAporCiento() {
    var pos = 0;
    storeDetalle.each(function (rec) {
        var monto = parseFloat(storeDetalle.getAt(pos).get('pv')) * parseFloat(storeDetalle.getAt(pos).get('cantidad'));
        var descuento = parseFloat(storeDetalle.getAt(pos).get('descuento'));
        var resultado = (descuento * 100) / monto;
        storeDetalle.getAt(pos).set('descuento', (resultado.toFixed(2)));
        pos++;
    });
}
function actualizarDatos() {
    if (Ext.getCmp('tipodescuento').getValue().inputValue == 1) {
        // ActualizarGrid();
        op_rb = 1;
    } else {
        convertirAporCiento();
        op_rb = 2;
    }
}