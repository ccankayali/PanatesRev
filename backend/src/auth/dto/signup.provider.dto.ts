import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,MinLength, ValidateNested
  } from 'class-validator';
import { RoleIds } from 'src/role/enums/role.enum';
//import { AssignRoleDto } from '../../role/dtos/role.dto';

 
  
  export class signUpProviderDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsEmail({},{message: 'Please enter correct email.'})
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
    
  
    @IsNotEmpty()
    @ValidateNested() // Gömülü DTO'nun doğrulanması için bu dekoratörü kullanın
    @Type() // Gömülü DTO'nun türünü belirtmek için class-transformer kütüphanesini kullanın
    readonly roles: RoleIds[];
  }
