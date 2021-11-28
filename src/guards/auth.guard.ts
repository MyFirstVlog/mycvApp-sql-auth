import {
    CanActivate,
    ExecutionContext
} from '@nestjs/common'

export class AuthGuard implements CanActivate {
    //* es una inteface el canavtivate function
    canActivate(context: ExecutionContext){
        //Reject the request in case the user is not sign in
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}