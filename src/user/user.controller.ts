import { Body, Controller, Get, Post} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UserController {
    @Post('/signup')
    createUser(@Body() body : CreateUserDto ){
        return {
                msg:true,
                body
            }
    }

}
