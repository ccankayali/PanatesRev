import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { RoleIds } from 'src/role/enums/role.enum';

export class SignUpProviderDto {
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
  @IsEnum(['individual', 'company']) // userType'ın alabileceği değerleri belirtin
  userType?: string;
  @IsOptional() // companyName alanını isteğe bağlı yapar
  @IsString()
  companyName?: string;
  @IsNotEmpty()
  @ValidateNested() // Gömülü DTO'nun doğrulanması için bu dekoratörü kullanın
  @Type() // Gömülü DTO'nun türünü belirtmek için class-transformer kütüphanesini kullanın
  readonly roles: RoleIds[];
}
