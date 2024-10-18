/* Import Neccesary modules */
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import { AuthRequest } from "../middlewares/auth";

/* Generate Token */
const generateToken = (user: IUser): string => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
};

/* Creates a new user and generates a new token */
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = generateToken(user);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

/* Handles User login by searching user by email in database, if is valid generates token */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    const token = generateToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

/* Fetchs the user profile */
export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send({ error: "Not authenticated" });
  }
};

/* Fetches all users */
export const getUsers = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};


/* Update user details */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

/* Delete a user */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user", error });
  }
};

