import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, 
                AuthService, 
                { //* SETUP GLOBALLY SCOPED INTERCEPTOR
                    provide: APP_INTERCEPTOR,
                    useClass: CurrentUserInterceptor
                }],
})
export class UserModule {}
