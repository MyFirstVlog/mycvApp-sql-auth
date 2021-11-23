# Installing dependencies

- npm install @nestjs/typeorm typeorm sqlite3

- npm i class-validator class-transformer@0.4.0  * (Custom Validators or locally known as Dtos)

## Interceptors
 
 * intercept(context: ExecutionContext, next: CallHanlder)
 - intercept : method automatically called
 - info on the incoming request
 - kind of a reference to the request handler in our controller