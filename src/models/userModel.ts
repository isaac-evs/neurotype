/* Import Mongoose */
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

/* Define the user interface */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "lite" | "plus" | "pro";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/* Define user schema  */
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["lite", "plus", "pro"], default: "lite" },
});

/* Method to hash password */
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* Method to compare password */
UserSchema.methods.comparePassword = async function (
  enterPassword: string,
): Promise<boolean> {
  return bcrypt.compare(enterPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
