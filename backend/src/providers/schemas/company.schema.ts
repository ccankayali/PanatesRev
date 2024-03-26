import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type CompanyDocument = ServiceCompany & Document;
@Schema()
export class ServiceCompany {
  @Prop({ required: true }) //bu kullanım bu alanın boş geçilmemesi gerektiğini belirtir.
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    select: false, // Şifrenin sorgularda varsayılan olarak seçilmemesini sağlar
    // set: (password: string) => bcrypt.hashSync(password, 10), // Şifreyi hashleyerek kaydeder
    validate: {
      validator: (password: string) => password.length >= 6, // Şifrenin minimum 6 karakter uzunluğunda olmasını sağlar
      message: 'Şifre en az 6 karakter olmalıdır', // Şifre uzunluğu geçerliliği ile ilgili hata mesajı
    },
  })
  password: string;

  @Prop({ required: true, unique: true, message: 'Geçersiz e-posta adresi' }) //unique: true kullanımı veritabanında benzer email olmamasını sağlar.
  //Email formatı için : validate: { validator: value => mongoose.Types.Email.validate(value) Email hata veriyor.
  email: string;

  @Prop({ required: true })
  year_founded: string;

  @Prop({ required: true })
  description: string;
}

export const Company = SchemaFactory.createForClass(ServiceCompany);
