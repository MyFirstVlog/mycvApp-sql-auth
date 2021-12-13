import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Reports } from './reports/reports.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { type } from 'os';

const cookieSession = require('cookie-session')

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService)=>{
      return {
              type:  'sqlite',
              database: config.get<string>('DB_NAME'),
              synchronize: true,
              entities: [User, Reports],
             };
    }
  }),
  //? Config service through dependency injection
  // TypeOrmModule.forRoot({
  //     //*CONNECTION WITH SQL LITE 3, sync ayuda a la migracion denuvas columnas a la db
  //     type:'sqlite',
  //     database: 'db.sqlite',
  //     entities: [User, Reports],
  //     synchronize: true,
  // }),
      UserModule, 
      ReportsModule, 
  ],
  controllers: [AppController],
  providers: [
      AppService, 
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({ //* Cada request que viene sera validad por el pipe de validacion
          whitelist:true 
        })
      }
    ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys: ['cookieForEncyrption']
    })).forRoutes('*') //? Aplica middleware a todas las incoming requests
  }
}
