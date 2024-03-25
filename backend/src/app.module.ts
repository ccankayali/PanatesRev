import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user-login-signup/users.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/PanaRev'),AuthModule,],
  controllers: [AppController],
  providers: [AppService,UserService],
})
export class AppModule {}
