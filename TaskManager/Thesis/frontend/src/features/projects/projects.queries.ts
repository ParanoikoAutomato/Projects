import { parseGetProjectForEdit } from "@/helpers/project.helper";
import ProjectService from "@/services/projects/project.service";

import { useQuery } from "@tanstack/react-query";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: ProjectService.getAll,
  });
};

export const useProject = ({
  id,
  enabled = true,
}: {
  id: string | null;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => ProjectService.getProjectById(id),
    enabled,
    select: (data) => parseGetProjectForEdit(data),
  });
};

export const useProjectTasks = ({
  id,
  enabled = true,
}: {
  id: string | null;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => ProjectService.getProjectTasks(id),
    enabled,
  });
};
