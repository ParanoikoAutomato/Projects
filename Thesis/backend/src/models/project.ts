import mongoose, { Document, Schema } from "mongoose";
import { ITask } from "./task";

export interface IProject extends Document {
  title: string;
  tasks: (ITask | mongoose.Schema.Types.ObjectId)[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    tasks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    ], // Array of task references
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Project", projectSchema);
