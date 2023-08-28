/*!
* RAZOR- JR
* Copyright(c) 2023
*/

Ext.onReady(function () {
    Ext.namespace('Ext.dsdata');
    var indice = 'e';
    var opp;
    Ext.dsdata.storeNivelSeguridad = new Ext.data.JsonStore({
        url: '../servicesAjax/DSListaNivelSeguridadAjax.php',
        root: 'data',
        totalProperty: 'total',
        fields: ['codigo', 'nombre', 'descripcion', 'niveles', 'activo']
    });

    var pagingStore = new Ext.PagingToolbar({
        pageSize: 100,
        store: Ext.dsdata.storeNivelSeguridad,
        displayInfo: true,
        afterPageText: 'de {0}',
        beforePageText: 'Pag.',
        firstText: 'Primera Pag.',
        lastText: 'Ultima Pag.',
        nextText: 'Siguiente Pag.',
        prevText: 'Pag. Previa',
        refreshText: 'Refrescar',
        displayMsg: 'Desplegando del {0} - {1} de {2}',
        emptyMsg: "No hay elementos para desplegar."
    });
    function tooltipComentario(value, metadata, record, rowIndex, colIndex, store) {
        metadata.attr = String.format('{0}title="{1}"', metadata.attr, value);
		return value;
	};

    var columnsStore = new Ext.grid.ColumnModel(
        [
            {
                header: 'ID',
                dataIndex: 'codigo',
                width: 50,
                sortable: true,
                hidden: true
            },{
                header: 'Autorizaciones',
                dataIndex: 'niveles',
                width: 120,
                align: 'center',
                sortable: true
            }, {
                header: 'Categoria',
                dataIndex: 'nombre',
                width: 150,
                align: 'center',
                sortable: true
            },{
                header: 'Descripción',
                dataIndex: 'descripcion',
                width: 450,
                sortable: true,
                renderer: tooltipComentario
            }
        ]
    );

    var nivelSeguridadGrid = new Ext.grid.GridPanel({
        id: 'nivelSeguridadGrid',
        store: Ext.dsdata.storeNivelSeguridad,
        region: 'center',
        cm: columnsStore,
        enableColLock: false,
        stripeRows: true,
        selModel: new Ext.grid.RowSelectionModel({ singleSelect: false }),
        bbar: pagingStore,
        viewConfig:{
			getRowClass : function (row, index) {
				var cls = '';
				if(row.get('activo')== 0){
					cls = 'estadoRojo';
				}
				return cls; 
			}	
		},
        listeners: {
            render: function () {
                Ext.dsdata.storeNivelSeguridad.load();
            },
            'celldblclick': function () {
                opp = 2;
                op_NS = 0;
                cod_up_NS_global = 1;
                Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
            }
        },
        sm: new Ext.grid.RowSelectionModel({
            singleSelect: true,
            listeners: {
                rowselect: function (sm, row, rec) {
                    indice = row;
                }
            }
        })

    });

    var filter = new Ext.form.TextField({ name: 'filterValue' });
    var bfilter = new Ext.Toolbar.Button({
        text: 'Buscar',
        tooltip: "Utilizar '*' para busquedas ",
        icon: '../img/view.png',
        handler: function (btn, e) {
            var filterVal = filter.getValue();
            if (filterVal.length > 0) {
                var o = { start: 0, limit: 100 };
                Ext.dsdata.storeNivelSeguridad.baseParams['buscar'] = filterVal;
                Ext.dsdata.storeNivelSeguridad.reload({ params: o });
            } else {
                Ext.dsdata.storeNivelSeguridad.clearFilter();
            }
        }
    });
    var PAmenu = new Ext.Panel({
        region: 'north',
        id: 'PAcabecera1',
        height: 29,
        tbar: [
            {
                id: 'nuev',
                text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Nuevo</a>',
                icon: '../img/Nuevo.png',
                handler: function (t) {
                    opp = 1;
                    op_NS = 0;
                    cod_up_NS_global = 1;
                    Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
                }
            },'-', {
                id: 'modf',
                text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Modificar</a>',
                icon: '../img/Editar.png',
                handler: function (t) {
                    if(indice != 'e'){
                        opp = 2;
                        op_NS = 0;
                        cod_up_NS_global = 1;
                        Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
                    }
                    else{
                        Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Registro.');
                    }
                }
            },'-', {
                id: 'elim',
                text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Eliminar</a>',
                icon: '../img/Eliminar.png',
                handler: function (t) {
                    if (indice != 'e') {
                        Ext.MessageBox.show({
                            title: 'Alerta de Advertencia.',
                            msg: 'Está Seguro que Desea Eliminar el Registro Seleccionado?',
                            width: 400,
                            height: 200,
                            buttons: Ext.MessageBox.YESNO,
                            icon: Ext.MessageBox.WARNING,
                            fn: function (btn) {
                                if (btn == 'yes') {
                                    opp = 3;
                                    op_NS = 0;
                                    cod_up_NS_global = 1;
                                    Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
                                }
                            }
                        });
                    } else { 
                        Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Registro.');
                    }
                }
            }, '-', {
                id: 'selec',
                text: '<a style ="color:#000000; font: bold 11px tahoma,arial,verdana,sans-serif;">Administrar Autorizaciones</a>',
                icon: '../img/check.png',
                handler: function (t) {
                    if (indice != 'e') {
                        op_NS = 0;
                        cod_up_NS_global = 2;
                        Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
                    }
                    else { 
                        Ext.MessageBox.alert('Alerta de Mensaje.','Seleccione un Registro.');
                    }
                }
            }, '->', filter, bfilter
        ]
    });
    var viewport1 = new Ext.Viewport({
        layout: 'border',
        items: [PAmenu, nivelSeguridadGrid]
    });
    function Eliminar(indice){
        Ext.Ajax.request({
            url: '../servicesAjax/DSBajaNivelSeguridadAJAX.php',
            params: { codigo: Ext.dsdata.storeNivelSeguridad.getAt(indice).get('codigo')},
            method: 'POST',
            success: function (result, request) {
                Ext.MessageBox.alert('Alerta de Mensaje.', 'Registro Desactivado Correctamente.');
                Ext.dsdata.storeNivelSeguridad.load({ params: { start: 0, limit: 100 } });
            },
            failure: function (result, request) {
                Ext.MessageBox.alert('ERROR', result.responseText);
            }
        });
    }
    /**
	 * Código para la Autorizacion de PIN #FF0000.
	 * Funciónes para verificar el nivel de PIN del usuario para una ubicacion_pin.
	 */
	var cod_up_NS_global; 		// Código global para filtar a que ubicacion de pin pertenece la funcion a compilar.
	var op_NS; 					// Código global para filtar la opcion de busqueda.
	function validarUbicacionPin_NS(cod_up_NS, pin_NS) {
		Ext.Ajax.request({
			url: '../servicesAjax/DSvalidacionNivelPinAJAX.php',
			method: 'POST',
			params: { codigo: cod_up_NS, pin: pin_NS, op: op_NS },
			success: function (resp) {
				var msj = Ext.util.JSON.decode(resp.responseText);
				if (msj.message.id == '99') {		//significa que murio la session, se loguea de nuevo
					Ext.MessageBox.alert('Session Finalizada', msj.message.reason, function () {
						window.open("../");
					});
                } else if (msj.message.id == '2') { 		// se encontro resultado
                    codpersonalAdmin = msj.message.reason;
                    switch (cod_up_NS) {
                        case 1:
							switch(opp){
								case 1:
									nuevoNivelSeguridad();
								break;
								case 2:
									modificarNivelSeguridad(indice);
								break;
								case 3:
									Eliminar(indice);
								break;
							}
						break;
                        case 2:
                            asiganrPrivilegio(Ext.dsdata.storeNivelSeguridad.getAt(indice).get('codigo'))
                        break;
                    }
				} else { 		//no se encontro resultado, se valida segun corresponda el formulario o requerimiento
					siguienteIntentoPin_NS(msj.message.reason);
				}
			}
		});
	}
	function verificacionNivelPin_NS(btn, text) {
		if (btn == 'ok') {
			if (text == "") {
				Ext.MessageBox.alert('Alerta de Mensaje.', "Debe Introducir un Código.");
				Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
			}
			else {
				validarUbicacionPin_NS(cod_up_NS_global, text)
			}
		}
	}
	function siguienteIntentoPin_NS(encabezado_NS) {
		Ext.MessageBox.show({
			title: 'Alerta de Advertencia.',
			msg: encabezado_NS,
			width: 400,
			height: 200,
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.WARNING,
			multiline: false,
			fn: function (btn) {
				if (btn == 'yes') {
					Ext.MessageBox.passwordPrompt('Alerta de Seguridad.', `Introducir PIN de Acreditación:`, verificacionNivelPin_NS);
				}
				else { }
			}
		});
	}
});