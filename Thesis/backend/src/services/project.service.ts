import Project, { IProject } from "../models/project";

interface TaskReference {
  value: string;
  label: string;
}

const createUpdateProject = async (projectData: any): Promise<IProject> => {
  const projectPayload = {
    ...projectData,
    tasks: projectData.tasks.map(
      (task: { value: string; label: string }) => task.value
    ),
  };

  if (projectPayload._id) {
    const updatedProject = await Project.findByIdAndUpdate(
      projectPayload._id,
      projectPayload,
      { new: true }
    ).populate("tasks");
    if (!updatedProject) {
      throw new Error("Project not found");
    }
    return updatedProject;
  } else {
    const newProject = new Project(projectPayload);
    return await newProject.save();
  }
};

const getAllProjects = async (): Promise<IProject[]> => {
  return await Project.find().populate({
    path: "tasks",
    select: "status", // Select only the 'status' field from tasks
  });
};

const deleteProject = async (id: string) => {
  return await Project.findByIdAndDelete(id);
};

export const getProject = async (id: string) => {
  return await Project.findOne({
    _id: id,
  }).populate({
    path: "tasks",
    select: "id title",
  });
};

export const getProjectTasks = async (id: string) => {
  return await Project.findOne({
    _id: id,
  }).populate({
    path: "tasks",
    select: "id title status",
  });
};

export const projectService = {
  createUpdateProject,
  getAllProjects,
  deleteProject,
  getProject,
  getProjectTasks,
};
