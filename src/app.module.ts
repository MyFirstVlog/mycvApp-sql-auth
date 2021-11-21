import { Module } from '@nestjs/common';
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


@Module({
  imports: [TypeOrmModule.forRoot({
      //*CONNECTION WITH SQL LITE 3, sync ayuda a la migracion denuvas columnas a la db
      type:'sqlite',
      database: 'db.sqlite',
      entities: [User, Reports],
      synchronize: true,
  }),
      UserModule, 
      ReportsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
