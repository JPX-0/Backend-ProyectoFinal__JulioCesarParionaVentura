# Inicialización:

_Ejecutar este comando para poder comenzar a utilizar el código sin problemas._

```
  npm i
```


# Comandos para ejecutar la aplicación:

_Al ejecutar los comandos de la siguiente manera se estará usando el modo FORK que seria por defecto._

* [PRODUCTION - FORK] - usando node || pm2.
```
npm start -- -p <número del puerto> -m fork
```
```
set NODE_ENV=production && pm2 start src/index.js --name "fork-server" -- -p <número del puerto>
```
* [PRODUCTION - CLUSTER] - usando node || pm2.
```
npm start -- -p <número del puerto> -m cluster
```
```
set NODE_ENV=production && pm2 start src/index.js -i max --name "cluster-server" -- -p <número del puerto>
```
* [DEVELOPMENT] - usando nodemon || pm2.
```
npm run dev -- -p <número del puerto>
```
```
pm2 start src/index.js -- -p <número del puerto>
```
_El siguiente comando es para compilar los archivos css._
```
npm run watch-css
```

# Data usada durante el desarrollo de la app:
* [PRODUCTS]:
  ```
    {
      "title": "torta de chocolate",
      "price": 75,
      "thumbnail": "https://i.pinimg.com/236x/09/a4/d7/09a4d711320bcd7c0c8730a14c8799c4.jpg",
      "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi ex iste quae quam minima reiciendis atque nostrum magni sit autem laudantium sunt odio ad culpa facere, mollitia architecto aperiam at!",
      "category": "fiestas"
    },
    {
      "title": "torta unicornio",
      "price": 50,
      "thumbnail": "https://static4.todobonito.com/m/2019/04/torta-fiesta-helados-11.jpg",
      "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi ex iste quae quam minima reiciendis atque nostrum magni sit autem laudantium sunt odio ad culpa facere, mollitia architecto aperiam at!",
      "category": "aperitivo"
    },
    {
      "title": "torta de caramelos",
      "price": 45,
      "thumbnail": "https://truffle-assets.imgix.net/cd8e77c0-torta-sorpresa_s_thumb.jpg?auto=compress,format&fm=pjpg&w=360",
      "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi ex iste quae quam minima reiciendis atque nostrum magni sit autem laudantium sunt odio ad culpa facere, mollitia architecto aperiam at!",
      "category": "infantil"
    }
  ```
* [USERS]:
  ```
    {
      "firstname": "Julio",
      "lastname": "Pariona",
      "birth": <Date>,
      "email": <env.ADMIN_EMAIL>,
      "password": <env.ADMIN_PASS>,
      "avatar": <not required>,
      "phone": 999999999,
      "card": 111111111
    },
    {
      "firstname": "test",
      "lastname": "account",
      "birth": "01/01/2000",
      "email": "test@gmail.com",
      "password": "test",
      "avatar": "",
      "phone": 999999999,
      "card": 111111111
    }
  ```


## **🚨 Tener en cuenta 🚨 📢** (Estas configuraciones evitarán ciertos errores durante el testeo)
_- Modificar el archivo .env de la siguiente manera:_
  - Ubicarse en "./.env.example"
  - Cambiar el nombre a ".env"
  - Modificar los datos sensibles y guardar.


## **Recomendaciones 💬** 
  * _Leer el archivo "md/env.md" para ver mas detalles a considerar._


# Entrega de desafío:
_La respuesta a las consignas la encontrará en la siguiente ruta:_
> Ubicación: "./md/proyectoFinal_ParionaVenturaJulioCesar.md"