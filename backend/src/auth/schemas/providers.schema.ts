import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




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


}
export const CompanySchema = SchemaFactory.createForClass(Company);