import { Body, Controller, Get, Post, Patch, Param, Query, Delete, 
            NotFoundException, UseInterceptors,ClassSerializerInterceptor, Session,
                UseGuards
        } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto) //Verifica que sea una clase obligaotriamente
// @UseInterceptors(CurrentUserInterceptor) //* Se ejecuta antes que la entrada a todos los ahndlers
export class UserController {
    constructor(
            private userService : UserService,
            private authService: AuthService
    ){}
    // @Get('/colors/:color')
    // setColor(@Param() color:string, @Session() session: any){
    //     session.color = color
    // }

    // @Get('/colors')
    // getColor(@Session() session: any){
    //     const {color} = session.color
    //     console.log(color)
    //     return color;
    // }

    //* @Get('/whoami')
    //* whoAmI(@Session() session: any){
    //*     const {userId} = session
    //*     console.log(userId)
    //*     return this.userService.findOne(userId)
    //* }

    //Crearemos un custom decorator
    @UseGuards(AuthGuard)
    @Get('/whoami')
    whoAmI(@CurrentUser() user: User){
        return user;
    }
    @Post('/signout')
    signOut(@Session() session: any){
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body : CreateUserDto, @Session() session: any ){
          const user : any = await this.authService.signup(body.email, body.password);
          const {id} = user
          session.userId = id
          return user
    }
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any){
        const user: any = await this.authService.signin(body.email, body.password);
        session.userId = user.id
        return user
        
    }
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:id')
    async findOneUser(@Param('id') id: string ){
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
          }
          return user;
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
