import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    // Kullanıcıyı ID'ye göre bulma kısmı 
    //.exec() kısmı sorguları Promise olarak döndürür.
    //eğer kullanıcı yok ise 'null' değeri döndürmektedir.
    async findById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }
    async updateUsername(userId: string, newUsername: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
          throw new NotFoundException('Kullanıcı bulunamadı');
        }
        user.username = newUsername;

        return user.save();
      }
}