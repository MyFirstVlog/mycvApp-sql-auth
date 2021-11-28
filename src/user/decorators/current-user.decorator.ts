import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext)=> {
        const request = context.switchToHttp().getRequest(); //* tratando de accer a la session
        //* context envuelve la solicitud entrante
        return request.currentUser;
    }
)