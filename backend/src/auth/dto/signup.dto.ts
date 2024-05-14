import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email.' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(['individual', 'company'])
  userType: string;

  @IsNotEmpty()
  @IsString()
  readonly roles: string[];

  @IsNumber()
  @IsNotEmpty()
  public userId: string;

  token: string;
}
