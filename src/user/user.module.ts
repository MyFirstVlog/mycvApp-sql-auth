import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, AuthService, CurrentUserInterceptor ],
})
export class UserModule {}
