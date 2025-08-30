import { Request, Response } from "express";
import User from "../models/user";
import { UserRole } from "../enums/UserRole";
import { comparePassword, hashPassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { HTTPStatusCode } from "../enums/HTTPStatusCode";
import { userService } from "../services/user.service";
import logger from "../log/logger";

// Controller to create a new user
const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(HTTPStatusCode.BadRequest)
        .send({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(HTTPStatusCode.BadRequest)
        .send({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET || "your_jwt_secret" // Replace with your actual secret
    );

    // Respond with the token
    res.status(HTTPStatusCode.Ok).send({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      access_token: token,
    });
  } catch (error) {
    res.status(HTTPStatusCode.BadRequest).send(error);
  }
};

// Controller to get all users
const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(HTTPStatusCode.BadRequest)
        .send({ error: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: UserRole.SIMPLE,
      firstName,
      lastName,
    });
    await newUser.save();
    res
      .status(HTTPStatusCode.Created)
      .send({ username, password, firstName, lastName });
  } catch (error) {
    logger.error(error);
    res.status(HTTPStatusCode.BadRequest).send(error);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const data = await userService.getAll();
    res.status(200).send({ data: data, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await userService.deleteUser(id);

    if (!category) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const changeUserRole = async (req: Request, res: Response) => {
  try {
    await userService.changeUserRole(req.body.user, req.body.role);
    res.status(200).send({ data: [], message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

export const userController = {
  getAll,
  loginUser,
  registerUser,
  deleteUser,
  changeUserRole,
};
