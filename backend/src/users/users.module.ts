import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './users.schema';

@Module({
    imports: [

    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }