/* Import Mongoose */
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";

/* Define note interface  */
export interface INote extends Document {
  user: IUser["_id"];
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/* Define note schema */
const NoteSchema = new Schema<INote>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/* Method to save note */
NoteSchema.pre<INote>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<INote>("Note", NoteSchema);
