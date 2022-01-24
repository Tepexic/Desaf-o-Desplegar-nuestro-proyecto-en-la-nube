# IMPLEMENTAR NUESTRO PROYECTO EN HEROKU

## Consigna

Crear un proyecto en Heroku.com para subir el servidor que venimos realizando, reformando todo lo necesario para su correcto funcionamiento en la nube.

Subir el código a Heroku.com, sin olvidar incluir el archivo .gitignore para evitar subir los node_modules. Comprobar que el proyecto inicie de manera correcta en la nube. Verificar que en su ruta raíz se encuentre la página pública del servidor.

El servidor debe seguir funcionando en forma local.

Realizar un cambio a elección en alguna vista, probar en forma local y subir nuevamente el proyecto a Heroku, verificando que la nueva reforma esté disponible online.

Revisar a través de una consola local, los mensajes enviados por nuestro servidor en Heroku a su propia consola.

## Proyecto en heroku

El proyecto desplegado se encuentra [aqui](https://ecommerce-coderhouse-jesus.herokuapp.com/login).
Para ingresar, se puede registrar un usuario nuevo, o utilizar las siguientes credenciales:

- Usuario: usuario@nuevo.com
- Contraseña: Welcome6C!

A continuación, una vista de la consola de heroku desde la consola local:
![Consola de heroku](/images/consola.png)

## Instalación

Correr `npm install`

Para ejecutar localmente el proyecto, es necesario crear un archivo .env con el siguiente contenido:

```
MONGO_DB_USER=jesus
MONGO_DB_PASSWORD=8dQg6XUWTuRWZV
USERS_DB=users
SESSION_DB=sesiones
```

y luego correr `npm run start`, o bien, si se tiene instalado nodemon, `npm run dev`
