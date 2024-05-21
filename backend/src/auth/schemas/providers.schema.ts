import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Service } from "src/services/schemas/services.schema";
import { Role } from "src/role/enums/role.enum";

@Schema({  
    timestamps: true  
})
export class Company {
    @Prop({ type: String, required: true })
    _id: string;
    @Prop({ required: true })
    name: string;
    @Prop({ unique: [true, 'Email already exists']})
    email: string;
    @Prop()
    password: string;
    @Prop({type:[String],default: []})
    comment:string[]
    @Prop({type:[String],default: []})
    shopCart:string[]
    @Prop({ type: [String], ref: "Service" })
    services: string[]
    @Prop({ required: false, enum: ['individual', 'company'] }) // Burada userType'ın alabileceği değerleri belirtin
    userType: string;
    @Prop()
    companyName: string;
    @Prop()
    roles: Role[];
}
export const CompanySchema = SchemaFactory.createForClass(Company);