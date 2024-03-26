import {
    IsEmail,
    IsNotEmpty,
    IsString,MinLength
  } from 'class-validator';
 
  
  export class LoginProviderDto {  
    @IsNotEmpty()
    @IsEmail({},{message: 'Please enter correct email.'})
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
  }