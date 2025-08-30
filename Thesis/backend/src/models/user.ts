import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "../enums/UserRole";

// Define the User interface
export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRole),
      default: UserRole.ADMIN,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
