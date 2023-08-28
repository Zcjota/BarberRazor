/*!
 * RAZOR-JR
 * Copyright(c) 2023
 */
	var winLogin;
		var fecha_actual = new Date().format('d/m/Y');
		
		var argLogo = new Ext.Panel({
		    id: 'argLogoPanel',
			x: 0,
			y: 0,
			width: 500,
			height:500,
			html: '<img src="img/inicio.jpg" style="height: 100%; width: 100x%; object-fit: contain" align="center"/>' 
		});
		
		var txtUsuario = new Ext.form.TextField({
				name: 'usuario',
				hideLabel: true,		
				width: 220,
				x: 200,
				y: 290,
				allowBlank: false,
				blankText: 'Usuario requerido',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							txtClave.focus();
						}
					}
				}
		});
		
		var txtClave = new Ext.form.TextField({
				name: 'password',
				hideLabel: true,
				inputType:'password', 
				width: 220,
				x: 200,
				y: 330,
				allowBlank: false,
				blankText: 'Password requerido.',
				enableKeyEvents: true,
				selectOnFocus: true,
				listeners: {
					keypress: function(t,e){
						if(e.getKey()==13){
							frmLogin.validarAcceso();
						}
					}
				}
		});
		
		// Labels
		var lblUsuario = new Ext.form.Label({
			text: 'Usuario :',
			x: 100,
			y: 295,
			height: 20,
			cls: 'x-label',
			html: '<font color="white" style="  font: icon; ">USUARIO :</font>',
		});
		
		var lblClave = new Ext.form.Label({
			text: 'Password :',
			x: 100,
			y: 335,
			height: 20,
			cls: 'x-label',
			html: '<font color="white" style="  font: icon; " >PASSWORD :</font>',
		});

		// botones
		var btnAceptar = new Ext.Button({
		    id: 'btnAceptar',
			x: 150,
			y: 370,
			text: 'Iniciar',
			// icon: 'img/key1.png',
			// iconCls: 'x-btn-text-icon',
			minWidth: 80,
			handler:function(){
				frmLogin.validarAcceso();
			} 
		});
		
		var btnLimpiar = new Ext.Button({
		    id: 'btnLimpiar',
			x: 280,
			y: 370,
			text: 'Limpiar',
			// icon: 'img/garbage.png',
			// iconCls: 'x-btn-text-icon',
			minWidth: 80,
			handler:function(){
				var frm = frmLogin.getForm();
				frm.reset();
				frm.clearInvalid();
				txtUsuario.focus(true, 100);
			} 
		});
		
		
		
		var frmLogin = new Ext.FormPanel({ 
			frame:true, 		
			layout: 'absolute',
			items:[argLogo, lblUsuario, lblClave, txtUsuario, txtClave, btnAceptar, btnLimpiar],
			validarAcceso: function(){
				if (this.getForm().isValid()) {
					this.getForm().submit({
						url: 'servicesAjax/DSiniciosesionAJAX.php',
						params :{fechaa: fecha_actual},	
						method: 'POST',
						waitTitle: 'Conectando',
						waitMsg: 'Validando usuario...',
						success: function(form, action){
							  winLogin.hide();             							  
							  window.location = "DSinicioapp.php";
							  // Ext.Msg.alert('Inicio', 'Bienvenido');
							  				
						},
						failure: function(form, action){
							if (action.failureType == 'server') {
								var data = Ext.util.JSON.decode(action.response.responseText);
								if (data.errors.id == '3') {
									Ext.Msg.alert('Error', data.errors.reason, function(){
										txtClave.focus(true, 100);
									});
								} else {
									Ext.Msg.alert('Error', data.errors.reason, function(){
										txtUsuario.focus(true, 100);
										frmLogin.getForm().reset();
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
		
		
		
	function abrirLogin(){		
			if (!winLogin) {
				winLogin = new Ext.Window({
					layout: 'fit',
					width: 528,
					height: 528,	
					// title: 'Inicio Sesión',			
					resizable: false,
					closeAction: 'hide',
					closable: false,
					draggable: false,
					plain: true,
					border: false,
					//modal: true,					
					items: [frmLogin],
					listeners: {						
						show: function(){
							txtUsuario.focus(true, 300);
						}
					}
				});				
			}
			
			winLogin.show();
		}
		
		Ext.onReady(function(){
			
			Ext.BLANK_IMAGE_URL = 'ext/docs/resources/s.gif';
			Ext.QuickTips.init();
			abrirLogin();
		});
