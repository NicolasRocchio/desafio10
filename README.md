
# Comunicacion entre el front y el back

![alt text](_ref/front-back.png)

## Peticiones Asincronicas 

![alt text](_ref/asincronia.png)

## XML

![alt text](_ref/xml.png)

## JSON

<https://es.wikipedia.org/wiki/JSON>


## XML vs JSON

![alt text](_ref/xmlvsjson.png)

# Instalando un servidor API Rest local de pruebas

<https://www.npmjs.com/package/json-server/v/0.17.4>

1. Instalo la librería como librería de desarrollo

```sh
npm i json-server@0.17.4 -D
```

2. Creo la carpeta y el archivo. 

```sh
mkdir data
touch db.json
```

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

3. Agrego en el package.json lo siguiente:

```json
"scripts": {
    "preview": "vite preview",
    "server": "json-server --watch data/db.json --port 8080"
},
```

4. Arrancando el servidor

```sh
npm run server
```

5. Detener el servidor

Ctrl + C











