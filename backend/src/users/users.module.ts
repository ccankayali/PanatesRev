import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { User, UserSchema } from './dtos/users.dto';
import { IdService } from 'src/id/id_component';
import { Commit, CommitSchema } from 'src/commit/commit.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          
        ]),
      ],
    controllers: [UserController],
    providers: [UserService,IdService],
})
export class UsersModule { }
