/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import Modal from "./modal";

import { ScrollArea } from "../ui/scroll-area";

import { useProjectTasks } from "@/features/projects/projects.queries";
import { TaskStatusColumn } from "../datatable/columns/tasks/tasks-columns";
import { TaskStatus } from "@/enums/enums";

const ProjectViewModal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");
  const projectId = searchParams.get("id")
    ? String(searchParams.get("id"))
    : null;
  const isProjectViewModalOpen = mode === "view" && projectId != null;

  const { data: projectTasks = [], isLoading: isProjectTasksLoading } =
    useProjectTasks({
      id: projectId,
      enabled: isProjectViewModalOpen && projectId != null,
    });

  const closeModal = () => {
    navigate("/projects");
  };

  if (isProjectTasksLoading) {
    return <div>Loading</div>;
  }

  if (mode === null) return;

  return (
    <Modal
      modalTitle="View Project"
      isOpen={isProjectViewModalOpen}
      onClose={closeModal}
    >
      <ScrollArea className="w-full pl-4">
        <table className=" border border-black">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 border border-black">
                Task Title
              </th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {projectTasks.map((task) => (
              <tr key={task._id} className="border border-black">
                <TaskRow
                  key={task._id}
                  title={task.title}
                  status={task.status}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </Modal>
  );
};

export default ProjectViewModal;

function TaskRow({ title, status }: { title: string; status: string }) {
  return (
    <>
      <td className="px-4 py-2 border border-black">{title}</td>
      <td className="px-4 py-2 border border-black">
        <TaskStatusColumn status={status as TaskStatus} />
      </td>
    </>
  );
}
