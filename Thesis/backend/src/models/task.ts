import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./category";
import { IUser } from "./user";
import { TaskStatus } from "../enums/TaskStatus";
import { TaskCriticality } from "../enums/TaskCriticality";

export interface ITask extends Document {
  title: string;
  description: string;
  category_id: ICategory | mongoose.Schema.Types.ObjectId;
  date: Date;
  status: TaskStatus;
  criticality: TaskCriticality;
  acceptedBy: IUser | mongoose.Schema.Types.ObjectId | null;
  users: (IUser | mongoose.Schema.Types.ObjectId)[];
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.OPEN,
    },
    criticality: {
      type: String,
      enum: Object.values(TaskCriticality),
      default: TaskCriticality.LOW,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", taskSchema);
