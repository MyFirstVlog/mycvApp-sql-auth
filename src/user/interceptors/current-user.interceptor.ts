import { 
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';

import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService){}

    async intercept(context: ExecutionContext, handler: CallHandler){
        const request = context.switchToHttp().getRequest()
        const {userId} = request.session || {};
        if(userId){
            const user = await this.userService.findOne(userId);
            //* luego al usuario lo enviamos en el intercept para ser luego usado retirado en el decorator
            request.currentUser = user
        }
        return handler.handle();
    }
}