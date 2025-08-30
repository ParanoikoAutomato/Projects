// @ts-nocheck
import { Request, Response } from "express";
import { taskService } from "../services/task.service";
import { UserDTO } from "../DTO/userDTO";
import logger from "../log/logger";

// Controller to create a new user
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    const data = await taskService.getAllTasks(userDTO);
    res.status(200).send({ data: data, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const createUpdate = async (req: Request, res: Response) => {
  try {
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    await taskService.createUpdate(req.body, userDTO);
    res.status(201).send({ message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const acceptTask = async (req: Request, res: Response) => {
  try {
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    await taskService.acceptTask(req.body._id, userDTO);
    res.status(200).send({ message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const completeTask = async (req: Request, res: Response) => {
  try {
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    await taskService.completeTask(req.body._id, userDTO);
    res.status(200).send({ message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const approveTask = async (req: Request, res: Response) => {
  try {
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    await taskService.approveTask(req.body._id, userDTO);
    res.status(200).send({ message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const rejectTask = async (req: Request, res: Response) => {
  try {
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    await taskService.rejectTask(req.body._id, userDTO);
    res.status(200).send({ message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTask(id);
    res.status(200).json({ data: task, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await taskService.deleteTask(id);

    if (!category) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTaskHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskHistory(id);
    res.status(200).json({ data: task, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addTaskComment = async (req: Request, res: Response) => {
  try {
    const { task, comment } = req.body;
    const userDTO = new UserDTO(
      req.user.userId,
      req.user.username,
      req.user.role
    );
    await taskService.addTaskComment(task, comment, userDTO);
    res.status(200).json({ data: [], message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const taskController = {
  getAllTasks,
  getTask,
  createUpdate,
  acceptTask,
  completeTask,
  approveTask,
  rejectTask,
  deleteTask,
  getTaskHistory,
  addTaskComment,
};
