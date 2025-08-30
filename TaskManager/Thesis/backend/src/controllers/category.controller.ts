// @ts-nocheck
import { Request, Response } from "express";

import { categoryService } from "../services/category.service";
import { UserDTO } from "../DTO/userDTO";
import logger from "../log/logger";

// Controller to create a new user
const getAll = async (req: Request, res: Response) => {
  try {
    const data = await categoryService.getAll();
    res.status(200).send({ data: data, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const createUpdate = async (req: Request, res: Response) => {
  try {
    const task = await categoryService.createUpdate(req.body);
    res.status(201).send({ message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    const category = await categoryService.deleteCategory(id, userDTO);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategory(id);
    res.status(200).json({ data: category, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const categoryController = {
  getAll,
  createUpdate,
  deleteCategory,
  getCategory,
};
