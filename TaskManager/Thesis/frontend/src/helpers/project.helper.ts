/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseGetProjectForEdit = (project: any) => {
  return {
    ...project,
    tasks: project.tasks.map((task: any) => ({
      value: task._id,
      label: task.title,
    })),
  };
};
