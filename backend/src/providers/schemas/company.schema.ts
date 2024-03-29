import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';



@Schema()
export class Company extends Document{
    @Prop({ type: String, required: true })
    _id: string;
    @Prop()
    name: string;

    @Prop({ unique: [true, 'Email already exists']})
    email: string;

    @Prop()
    password: string;

    @Prop({type:"string",ref:"Comment"})
    comment:string


}
export const CompanySchema = SchemaFactory.createForClass(Company);