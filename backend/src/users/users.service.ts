import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './dtos/users.dto';
import {IdService} from '../id/id_component'
@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,private readonly idService: IdService) { }

    // Kullanıcıyı ID'ye göre bulma kısmı 
    //.exec() kısmı sorguları Promise olarak döndürür.
    //eğer kullanıcı yok ise 'null' değeri döndürmektedir.
     
    async createUser(createUserDto: User): Promise<any> {
        const createdUser = new this.userModel({
          ...createUserDto,
          _id: this.idService.generateId(),
        });
        await createdUser.save();
    
        // Return a user DTO without password for security
        return { id: createdUser._id, name: createdUser.name, email: createdUser.email,password:createdUser.password };
      }
    async find(): Promise<User[]> {
        return this.userModel.find().exec();
      }
      
    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    /*async updateUsername(userId: string, newUsername: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }
        user.username = newUsername;

        return user.save();
    }
    async updatePassword(userId: string, newPassword: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('Lütfen mevcut şifrenizi doğru giriniz.');
        }
        user.password = newPassword;

        return user.save();
    }*/
    async updateUserField(userId: string, field: 'username' | 'password' | 'email', value: string): Promise<User> {
        // Kullanıcıyı bul
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }
        // Alanlar ve karşılık gelen özelliklerin bir dizisi
        const fields = {
            'name': 'name',
            'password': 'password',
            'email': 'email'
        };
        // Belirtilen alanın doğru olup olmadığını kontrol et
        const propertyName = fields[field];
        if (!propertyName) {
            throw new BadRequestException('Geçersiz alan');
        }
        // Belirtilen alana göre güncelleme yap
        user[propertyName] = value;
        
        return user.save();
    }
}