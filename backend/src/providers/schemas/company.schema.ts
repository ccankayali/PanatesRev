import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Service } from "src/services/schemas/services.schema";

@Schema()
export class Company extends Document {
    @Prop({ type: String, required: true })
    _id: string;

    @Prop()
    name: string;

    @Prop({ unique: [true, 'Email already exists'] })
    email: string;

    @Prop()
    password: string;

    @Prop({ type: "string", ref: "Comment" })
    comment: string

    @Prop({ type: [String], ref: "Service" })
    services: string[]
    @Prop({ required: true, enum: ['user', 'company'] }) // Burada userType'ın alabileceği değerleri belirtin
    userType?: string;
    

}
export const CompanySchema = SchemaFactory.createForClass(Company);