import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/users.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    // Kullanıcıyı ID'ye göre bulma kısmı 
    //.exec() kısmı sorguları Promise olarak döndürür.
    //eğer kullanıcı yok ise 'null' değeri döndürmektedir.
    async getUsers(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
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
            'username': 'username',
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