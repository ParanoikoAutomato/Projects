import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./category";
import { IUser } from "./user";
import { TaskStatus } from "../enums/TaskStatus";
import { TaskHistoryActions } from "../enums/TaskHistoryActions";
import { ITask } from "./task";

export interface ITaskHistory extends Document {
  task: ITask | mongoose.Schema.Types.ObjectId | null;
  action: TaskHistoryActions;
  user: IUser | mongoose.Schema.Types.ObjectId | null;
  property: string;
  oldValue: string;
  newValue: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskHistorySchema: Schema = new Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    action: {
      type: String,
      enum: Object.values(TaskHistoryActions),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    property: { type: String },
    oldValue: { type: String },
    newValue: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITaskHistory>("TaskHistory", taskHistorySchema);
