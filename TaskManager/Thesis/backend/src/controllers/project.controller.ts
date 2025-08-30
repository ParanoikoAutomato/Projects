import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.service";
import logger from "../log/logger";

const createUpdateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await projectService.createUpdateProject(req.body);
    res.status(200).json(project);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ data: projects, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await projectService.deleteProject(id);

    if (!category) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProject(id);
    res.status(200).json({ data: project, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectTasks(id);
    res.status(200).json({ data: project, message: "success" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const projectController = {
  createUpdateProject,
  getAllProjects,
  deleteProject,
  getProject,
  getProjectTasks,
};
