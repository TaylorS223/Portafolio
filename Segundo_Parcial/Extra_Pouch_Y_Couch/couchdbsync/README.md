# Couchdbsync

* Errores
Debido a que se uso librerias con versiones anteriores se tuvo de eliminar las actuales y descargar
las acordes a la practica que fueron pouchDB y pouchdb-find.

Se intercambio el uso de pouchDB normal por su version Browser ya que presentaba errores, entre otros el principal:

- Uncaught ReferenceError: global is not defined mutation

Se dio permisos de acceso debido a error de CORS:

- user:1 Access to fetch at 'http://127.0.0.1:5984/customer/' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Se aplicaron los siguientes comandos:

curl -X PUT http://127.0.0.1:5984/_node/_local/_config/httpd/enable_cors -d "\"true\"" -u admin:admin

curl -X PUT http://127.0.0.1:5984/_node/_local/_config/cors/origins -d "\"*\"" -u admin:admin

curl -X PUT http://127.0.0.1:5984/_node/_local/_config/cors/credentials -d "\"true\"" -u admin:admin

curl -X PUT http://127.0.0.1:5984/_node/_local/_config/cors/methods -d "\"GET, PUT, POST, HEAD, DELETE\"" -u admin:admin

curl -X PUT http://127.0.0.1:5984/_node/_local/_config/cors/headers -d "\"accept, authorization, content-type, origin, referer\"" -u admin:admin