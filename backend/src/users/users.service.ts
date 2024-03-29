import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/users.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    // Kullanıcıyı ID'ye göre bulma kısmı 
    //.exec() kısmı sorguları Promise olarak döndürür.
    //eğer kullanıcı yok ise 'null' değeri döndürmektedir.
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
    async updateUserField(userId: string, field: 'name' | 'password' | 'email', value: string): Promise<User> {
        // Kullanıcıyı bul
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }
    
        // Belirtilen alanın doğru olup olmadığını kontrol et
        let hashedValue: string | undefined;
        if (field === 'password') {
            hashedValue = await bcrypt.hash(value, 10);
        }
    
        // Alanları güncelle
        switch (field) {
            case 'name':
                user.name = value;
                break;
            case 'password':
                user.password = hashedValue || user.password; // Hashlenmiş şifreyi kullan veya mevcut şifreyi koru
                break;
            case 'email':
                user.email = value;
                break;
            default:
                throw new BadRequestException('Geçersiz alan');
        }
    
        // Kullanıcıyı kaydet
        await user.save();
    
        return user;
    }
    
}