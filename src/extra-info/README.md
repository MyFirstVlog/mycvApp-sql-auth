# Installing dependencies

- npm install @nestjs/typeorm typeorm sqlite3

- npm i class-validator class-transformer@0.4.0  * (Custom Validators or locally known as Dtos)

## Interceptors
 
 * intercept(context: ExecutionContext, next: CallHanlder)
 - intercept : method automatically called
 - info on the incoming request
 - kind of a reference to the request handler in our controller

 ### Injectable 

Una clase que use inhectable() hara pensar a nest js que esta injected en otro lugares, por ejemplo en el controlador puede ser inyectado el servicio para que ahi se pueda usar el servicio

Los controladores no tienen injectable

#### Hashing Process
En un hash proceso no me puedo devolver teniedo el hash, pues si lo pongo como entrada me dara otro totalmente diferente, es decir, no hace el proceso inverso

La misma funcion hash siempre devolvera la misma huella digital de la data de entrada

Salt = Random series of number snd letter  

password --> salt --> hashing function --> database --> hashed and salted password

#### Manage Cookies

``` npm i cookie-session @types/cookie-session ```

##### No se puede usar un injectable con un custom decorator

No es capaz de entrar al DI, para ellos quedamos un interceptor, ahi hacemos uso del user service para luegfo enviarlo al custom decorator

##### Testing

- Unit Testing

Asegurarse de que los metodos de una clase estan funcionando de manera correcta

Vamos hacer fake user services

- Integration Testing

Chequea el flujo completo de la aplicacion o de una caracteristica.

* Providers:

Lista de cosas que queremos registart en nuestro contenedor DI de testeo


###### Hacer que el testing sea mas rapido, remplazamos ebn el packgae.json

``` "test:watch": "jest --watch", por --> "test:watch": "jest --watch --maxWorkers=1",```

###### Integration Testing

- A complete instance of the app, making requests