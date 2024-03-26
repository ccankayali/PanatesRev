import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({  
    timestamps: true  
})
export class User {
    //@Prop({ type: String, required: true })
    //_id: string;
    @Prop()
    name: string;

    @Prop({ unique: [true, 'Email already exists']})
    email: string;

    @Prop()
    password: string;

    //@Prop()
    //isCompany: boolean;

}
export const UserSchema = SchemaFactory.createForClass(User);