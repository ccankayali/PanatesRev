import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/role/enums/role.enum";


// User sınıfı, User sınıfı, Mongoose için SchemaFactory sınıfını extend eden sınıf.


@Schema({  
    timestamps: true  
})
export class User {
    @Prop({ type: String, required: true })
    _id: string;
    @Prop()
    name: string;

    @Prop({ unique: [true, 'Email already exists']})
    email: string;

    @Prop()
    password: string;

    //@Prop()
    //isCompany: boolean;
    @Prop()
    roles: Role[];
    

}
export const UserSchema = SchemaFactory.createForClass(User);