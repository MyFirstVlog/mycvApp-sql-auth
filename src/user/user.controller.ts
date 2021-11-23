import { Body, Controller, Get, Post, Patch, Param, Query, Delete, NotFoundException, UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('auth')
export class UserController {
    constructor(private userService : UserService){}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto ){
        const {email, password } = body
        try {
            this.userService.create(email, password)
            return {
                ok: true,
                msg: {email}
            }      
        } catch (error) {
            console.log(error)
        }
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async findOneUser(@Param('id') id: string ){
        try {
            const user = await this.userService.findOne(parseInt(id))
            if(user){
                return{
                    ok : true,
                    user
                }
            }
            throw new NotFoundException('user Not Found')
        } catch (error) {
            throw new NotFoundException('user Not Found')
            
        }
    }
    @Get()
    findAllUsers(@Query('email') email : string){
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.userService.remove(Number(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() Body : UpdateUserDto){
        return this.userService.update(Number(id), Body)
    }

}
