# wz-client

### Version deployada en Netlify

```
https://wz-client-dionisio.netlify.app/

```

## Como Levantar el proyecto local

### Instalación

```
git clone https://github.com/dio19/wz-client
cd wz-client
npm install

```
Levantar la app:

```
npm run start

```

Automaticamente abrira el navegador en http://localhost:3000/ desde donde podemos visualizar el FrontEnd. 
El BackEnd esta implementado en Python, Flask y con una DB en MongoDB.
El Fronten esta consultando directamente la version deployada del servidor en Heroku.

### Home

<img width="1440" alt="Captura de Pantalla 2022-06-13 a las 15 39 53" src="https://user-images.githubusercontent.com/55143009/173422263-f9b345cd-4eb7-4071-bce1-d4030c199b57.png">
La Home asi como la ruta /users, renderizan la tabla de usuarios, en la cual se pueden vizualizar todos los usuarios con la informacion mas importante, paginacion y un boton que te redirige al detalle del usuario.

### Detalle del Usuario

<img width="1440" alt="Captura de Pantalla 2022-06-13 a las 15 44 21" src="https://user-images.githubusercontent.com/55143009/173423036-d7641a37-2bd2-4d1b-bef9-6cc60409521a.png">

El detalle del usuario se renderiza al dirigirnos a la siguiente ruta ``` http://localhost:3000/users/iddelusuario ``` es un popup que muestra el detalle de la informacion del usuario que no estamos viendo en un primer pantallazo en la tabla.

### Tablas de las Tasks

<img width="1440" alt="Captura de Pantalla 2022-06-13 a las 15 46 32" src="https://user-images.githubusercontent.com/55143009/173423393-a1ca9e2a-995e-4322-8abb-d5d1e468c292.png">
En la ruta  ``` http://localhost:3000/tasks ``` se renderiza una tabla completa de todas las tasks que aloje previamente en la DB con la posibilidad de ordenar de mayor a menor y menor a mayor, como asi tambien paginar los resultados por diferente
cantidad de items a mostrar, comprimir las filas cuando son muchos datos y un buscador por titulo.

### Para correr los tests

```
npm run test

```
