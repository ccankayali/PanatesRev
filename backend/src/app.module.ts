import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';
// import { ShopModule } from './shop/shop.module';
// import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommitModule } from './commit/comment.module';
import { ProvidersModule } from './providers/providers.module';
import { CommentService } from './commit/comment.service';
import { RoleModule } from './role/role.module';
import { IdService } from 'src/auth/id/id_components';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/PanaRev'),
    ServicesModule,
    AuthModule,
    UsersModule,
    ServicesModule,
    CommitModule,
    ProvidersModule, 
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}