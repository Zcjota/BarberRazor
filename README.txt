
*Proyecto de Barbería – Instalación para el uso Local*
Este documento proporciona los pasos necesarios para instalar el proyecto de la barbería en tu entorno local utilizando XAMPP y Git. El proyecto está desarrollado en Ext JS 3.4 y HTML, con servicios AJAX para la comunicación.
Requisitos previos
Video guia : https://youtu.be/CCJM1zUBAYo
Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:
•	XAMPP: para el servidor web y PHP.
•	Git: para clonar el repositorio.
Pasos de instalación

1. Clonar el repositorio
Abre una terminal y navega hasta la carpeta htdocs de tu instalación de XAMPP:
cd /ruta/a/tu/instalacion/xampp/htdocs 
Clona el repositorio usando el siguiente comando:
git clone https://github.com/Zcjota/BarberRazor.git

2. Configurar la base de datos
•	Abre PHPMyAdmin en tu navegador: http://localhost/phpmyadmin/
•	Crea una nueva base de datos llamada barberia o el nombre que hayas usado en el proyecto.
•	Importa el archivo SQL que contiene la estructura y los datos de la base de datos desde la carpeta database en el repositorio.

3. Configurar la conexión a la base de datos
En el repositorio, encuentra el archivo de configuración de la base de datos en la carpeta (lib/conex.php) y asegúrate de que los detalles de la conexión coincidan con tu entorno local (nombre de host, usuario, contraseña y nombre de la base de datos).

4. Acceder al proyecto
Abre tu navegador y accede al proyecto a través de la URL:
http://localhost/nombre_de_la_carpeta_del_proyecto 

5. Explora el proyecto
Navega por las diferentes secciones de la aplicación de la barbería y realiza pruebas para asegurarte de que todo funciona como se espera.
Notas adicionales
•	Si experimentas problemas con los estilos o la funcionalidad, asegúrate de que estás usando un navegador compatible con HTML y Ext JS 3.4.
¡Esto debería ayudarte a instalar y ejecutar el proyecto de barbería localmente utilizando XAMPP y Git! Recuerda reemplazar las partes en mayúsculas (como nombre_de_la_carpeta_del_proyecto) con los valores reales correspondientes a tu proyecto.



*Proyecto de Barbería - Instalación en Hosting*
Este documento proporciona los pasos necesarios para instalar el proyecto de la barbería en un servidor de hosting. El proyecto está desarrollado en Ext JS 3.4 y HTML, con servicios AJAX para la comunicación.

Requisitos previos
Antes de comenzar, asegúrate de tener lo siguiente:
•	Acceso a un servidor de hosting con soporte para PHP y bases de datos MySQL.
•	Información de acceso al servidor (FTP, cPanel, etc.).
•	Una copia del repositorio del proyecto.

 Clonar el Repositorio en el Servidor
1.	Accede a tu servidor de hosting a través de SSH o el método que el proveedor de hosting te ofrezca para acceder a la línea de comandos del servidor.
2.	Navega a la ubicación en la que deseas clonar el repositorio. Puedes usar el comando cd para cambiar de directorio. Por ejemplo:
cd public_html 
3.	Ahora, clona el repositorio utilizando el comando git clone seguido de la URL del repositorio.
git clone https://github.com/Zcjota/BarberRazor.git
4.	Una vez que el repositorio se haya clonado exitosamente, habrás obtenido una copia de los archivos en el servidor de hosting.

Pasos de instalación
1. Subir archivos al servidor
Si hiciste los pasos donde clonabas directamente al hosting ya no necesitas usar el ftp para subirlo desde tu local.
Usa tu método preferido (FTP, cPanel, etc.) para subir los archivos del proyecto al directorio raíz de tu servidor de hosting desde donde lo tengas el proyecto.

2. Crear una base de datos
•	Accede al panel de control del hosting y crea una nueva base de datos MySQL.
•	Crea un nuevo usuario para la base de datos y asigna los permisos necesarios.

3. Importar la base de datos
Usa el panel de control del hosting o PHPMyAdmin para importar el archivo SQL que contiene la estructura y los datos de la base de datos. Asegúrate de que se importe correctamente en la base de datos que creaste en el paso anterior.
El archivo de la base datos está en el mismo repositorio en la carpeta data base.

4. Configurar la conexión a la base de datos
En el servidor, encuentra el archivo de configuración de la base de datos (por ejemplo, lib/conex.php) y actualiza los detalles de la conexión con la información de la base de datos que creaste en el paso 2.

5. Acceder al proyecto
Usa tu navegador y accede al proyecto a través de la URL:
http://www.tudominio.com/ruta_del_proyecto 

6. Explora el proyecto
Navega por las diferentes secciones de la aplicación de la barbería y realiza pruebas para asegurarte de que todo funciona como se espera.
Notas adicionales
•	Si experimentas problemas con los estilos o la funcionalidad, asegúrate de que estás usando un navegador compatible con HTML y Ext JS 3.4.
•	Si el hosting tiene restricciones de seguridad u otras configuraciones específicas, es posible que necesites ajustar la configuración del proyecto en consecuencia.
________________________________________
¡Con estos pasos, deberías ser capaz de instalar el proyecto de barbería en tu servidor de hosting y ejecutarlo en línea! Asegúrate de reemplazar las partes en mayúsculas (como www.tudominio.com y ruta_del_proyecto) con los valores correspondientes a tu hosting y proyecto.


