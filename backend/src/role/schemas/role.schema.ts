import mongoose, { Schema, Document, model } from 'mongoose';
import { RoleIds, Role as RoleEnum } from '../enums/role.enum';

export interface IRole extends Document {
  id: RoleIds;
  name: RoleEnum;
  users: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    enum: Object.values(RoleIds),
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: Object.values(RoleEnum),
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const RoleModel = mongoose.model<IRole>('Role', RoleSchema);

export { RoleModel };
