import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
//import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM modülünü ekleyin
import { MongooseModule } from '@nestjs/mongoose';




//deneme

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    //UserModule,
    BookmarkModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
})
export class AppModule {
  constructor() {}
}


