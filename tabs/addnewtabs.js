/**
 * Ejemplo agregar nuevos tabs a un tabpanel
 * @autor adolfo
 * adolfolopez@extjs.mx
 *
 * @fecha 23 de Abril del 2013
 *
 * Mexico DF
 */

Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    var rootTreePanel = {
        text: 'Root',
        expanded: true,
        children: [{
            id:'child1',
            iconCls:'users',
            text: 'Corte de Caja',
            leaf: true
        }, {
            id:'child2',
            iconCls:'gastos',
            text: 'Gastos Diversos',
            leaf: true
        }, {
            id:'child3',
            text: 'Configurar',
            expanded: true,
            children: [{
                id:'child4',
                iconCls:'users',
                text: 'Usuarios',
                leaf: true
            },{
                id:'child5',
                text: 'Productos',
                leaf: true
            },{
                id:'child9',
                iconCls:'cart',
                text: 'Promociones',
                leaf: true
            },{
                id:'child6',
                iconCls:'categorias',
                text: 'Categorias',
                leaf: true
            },{
                id:'child7',
                iconCls:'medidas',
                text: 'Medidas',
                leaf: true
            },{
                id:'child8',
                iconCls:'mesas',
                text: 'Mesas',
                leaf: true
            }]
        }]
    };
    Ext.create("Ext.container.Viewport",{
        renderTo: Ext.getBody(),
        layout:'border',
        scope:this,
        items:[{
            region: 'west',
            title: 'Navigaci&oacute;n',
            width: 150,
            items:[{
                xtype:'treepanel',
                rootVisible: false,
                border:false,
                root: rootTreePanel,
                listeners:{
                    itemclick: function(t,record,item,index){
                        var vport = t.up('viewport'),
                            tabpanel = vport.down('tabpanel');

                        if(!tabpanel.getChildByElement('tab'+index)){
                            tabpanel.add({
                                title: 'Tab ' + record.get('text'),
                                html:'Opcion seleccionada: ' + record.get('text'),
                                id:'tab'+index,
                                closable:true
                            });
                        }
                        tabpanel.setActiveTab('tab'+index);
                    }
                }
            }]
        },{
            region: 'center',
            xtype: 'tabpanel',
            activeTab: 0,
            items: {
                title: 'Default Tab',
                html:'Selecciona una opcion del menu'
            }
        }]
    });
});
