import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";// şimdilik bıraktım
import { AuthDto } from "./dto";
import *as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"; //bu burdan silinecek şimdilik bırakıyorum
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService,
      private jwt:JwtService,
      private config:ConfigService,
      ){}

    async signup(dto: AuthDto){
        // generate the new password
        const hash=await argon.hash(dto.password)
        // yeni kullanıcıyı db'de kaydet
        try{
            const user = await this.prisma.user.create({
                data:{
                    email: dto.email,
                    hash,
                },
            });
    
            
          return this.signToken(user.id,user.email);
        }catch(error){
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code==='P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
        }
        
        
    }

  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );


        return this.signToken(user.id,user.email);
    }

    async signToken(
      userId: number,
      email: string,
    ): Promise<{ access_token: string }> {
      const payload = { sub: userId, email };
      const secret = this.config.get("JWT_SECRET");
    
      // Token oluşturma işlemi asenkron olduğu için await kullanılmalıdır.
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      });
    
      // Fonksiyonun dönüş değeri, bir nesne içinde access_token özelliğini içermelidir.
      return {
        access_token: token,
      };
    }

}

