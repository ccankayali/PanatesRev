import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



// Company sınıfı, Company sınıfı, Mongoose için SchemaFactory sınıfını extend eden sınıf.
@Schema({  
    timestamps: true  
})
export class Company {
    @Prop({ type: String, required: true })
    _id: string;

    @Prop()
    name: string;

    @Prop({ unique: [true, 'Email already exists']})
    email: string;

    @Prop()
    password: string;

    /*
    @Prop()
    roles: Role[];
    */

}
export const CompanySchema = SchemaFactory.createForClass(Company);