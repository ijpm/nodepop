# nodepop
App de anuncios con nodejs, express y mongodb.

# Desplegada en:

http://ec2-34-200-11-69.compute-1.amazonaws.com/

## Puesta en marcha
Clonar el repo y a continuación seguir los pasos:

1) Instalamos las dependencias del proyecto
```
$ npm install
```

2) Nos metemos en la carpeta del proyecto
```
$ cd nodepop
```

3) Cargamos en la base de datos unos artículos y usarios de prueba con el script siguiente:
```
$ coffee ./scripts/fixturesLoad.coffee
```

4) Ya tenemos nuestro sistema listo.
```
$ npm nodemon
```
## API de usuarios

### Creación de usuarios (registro)

Método POST
http://localhost:3000/apiv1/usuarios

Parámetros:
```
{
    nombre: String,
    clave: String,
    email: String
}
```

### Autenticación de usuarios (login)

Método POST
http://localhost:3000/apiv1/usuarios/authenticate

Parámetros:
```
{
    clave: String,
    email: String
}
```

## API de anuncios

### Obtención de anuncios (con filtros)

Método GET
http://localhost:3000/apiv1/anuncios

Parámetros:
```
* nombre: el nombre del artículo empieza por los caracteres que indica este parámetro http://localhost:3000/apiv1/anuncios?nombre=ip
* precio: filtro precio
* ---> Igual a un valor: http://localhost:3000/apiv1/anuncios?precio=50
* ---> Menor o igual a un valor: http://localhost:3000/apiv1/anuncios?precio=-50
* ---> Mayor o igual a un valor: http://localhost:3000/apiv1/anuncios?precio=10-
* ---> Entre dos valores: http://localhost:3000/apiv1/anuncios?precio=10-50
* venta: filtro venta o busqueda http://localhost:3000/apiv1/anuncios?venta=false
* tag: filtro por categoria http://localhost:3000/apiv1/anuncios?tag=mobile
* sort: ordena los anuncios
* ---> Orden ascendente: http://localhost:3000/apiv1/anuncios?sort=precio
* ---> Orden descendente: http://localhost:3000/apiv1/anuncios?sort=-precio
* skip: Se salta el número de anuncios que se indique.
* ---> http://localhost:3000/apiv1/adverts?skip=2
* limit: Devuelve como máximo el número de registros que se indican en este parámetro
* ---> http://localhost:3000/apiv1/anuncios?limit=2
```
