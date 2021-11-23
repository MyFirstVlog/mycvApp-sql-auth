import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { plainToClass } from 'class-transformer';

  interface ClassConstructor {
     new (...args : any[]) : {}
  }
  //As long as you give the class, but only class, no string,number, bool, i'm happy

  export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
  }

  export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto :any){}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
      return handler.handle().pipe(
        map((data: any) => {
          return plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    }
  }
  







// //* take object eventually into a json
// import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
// import { nextTick } from 'process';
// import { Observable } from 'rxjs';
// import {map} from 'rxjs/operators'
// import { UserDto } from '../user/dto/user.dto';

// export class SerializeInterceptor implements NestInterceptor{
//     intercept(context : ExecutionContext, handler: CallHandler) : Observable<any>{
//         //* Run something beforea requesty is handled by thenrequest handler
//         // console.log('Im running before the handler', context)
//         return handler.handle().pipe(
//             map((data : any)=> {
//                     //Run something before the response is sent out
//                     // console.log('Im running before response is sent out',data)
//                     //* Hace mostar las etiquetas mostradasque tenga el exculde
//                     return plainToClass(UserDto, data,{
//                         excludeExtraneousValues: true, 
//                     })
//             })
//         )
//     }
// }