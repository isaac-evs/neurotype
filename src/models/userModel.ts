/* Import Mongoose and Bycript */
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

/* Define the user interface */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "lite" | "plus" | "pro";
}
