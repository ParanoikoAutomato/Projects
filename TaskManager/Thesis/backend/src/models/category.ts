import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Category", categorySchema);
