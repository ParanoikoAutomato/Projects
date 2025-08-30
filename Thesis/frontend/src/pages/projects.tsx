import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/data-table";

import { useProjects } from "@/features/projects/projects.queries";
import { createProjectTableColumns } from "@/components/datatable/columns/projects/projects-columns-utils";
import ProjectModal from "@/components/modals/project-modal";
import { FolderDot } from "lucide-react";
import ProjectViewModal from "@/components/modals/project-view-modal";

const Projects = () => {
  const navigate = useNavigate();

  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();

  const createProject = () => {
    navigate({ search: "?mode=create" });
  };

  return (
    <div className="flex h-full flex-col px-4 py-2">
      <ProjectTabHeader createProject={createProject} />
      <DataTable
        data={projects}
        columns={createProjectTableColumns([
          "title",
          "progress",
          "createdAt",
          "updatedAt",
        ])}
        isLoading={isLoadingProjects}
        className="flex h-full flex-col overflow-y-auto py-4"
      />
      <ProjectModal />
      <ProjectViewModal />
    </div>
  );
};

function ProjectTabHeader({ createProject }: { createProject: () => void }) {
  return (
    <div className="flex flex-row justify-between py-4">
      <div className="flex flex-col">
        <span className="text-xl font-bold ">Projects list</span>
        <span className="text-base font-light text-neutral-500">
          See information about all projects
        </span>
      </div>
      <div className="flex flex-row space-x-4">
        <Button
          className="flex items-center gap-3"
          onClick={createProject}
          size="sm"
        >
          <FolderDot strokeWidth={2} className="h-4 w-4" /> Create Project
        </Button>
      </div>
    </div>
  );
}

export default Projects;
