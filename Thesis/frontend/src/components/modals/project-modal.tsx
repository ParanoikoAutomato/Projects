import React, { forwardRef, useRef } from "react";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Form } from "../ui/form";
import Modal from "./modal";

import FormTextInput from "../form-inputs/text-input";
import { Project } from "@/services/projects/project.types";
import { useCreateUpdateProjectMutation } from "@/features/projects/projects.mutations";
import FormSelectAsyncInput from "../form-inputs/form-select-async-input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import TaskService from "@/services/task/task.service";
import { useProject } from "@/features/projects/projects.queries";

const createProject: Project = {
  id: null,
  title: "",
  tasks: [{ value: null, label: "" }],
};

const ProjectModal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync, isPending } = useCreateUpdateProjectMutation();
  const mode = searchParams.get("mode");
  const projectId = searchParams.get("id")
    ? String(searchParams.get("id"))
    : null;
  const isProjectModalOpen =
    mode === "create" || (mode === "edit" && projectId != null);

  const { data: updateProject, isLoading: isProjectLoading } = useProject({
    id: projectId,
    enabled: isProjectModalOpen && projectId != null,
  });

  const project = mode === "create" ? createProject : updateProject;

  const closeModal = () => {
    navigate(location.pathname);
  };

  const ref = useRef<HTMLFormElement | null>(null);

  const createUpdateProject = async (project: Project) => {
    await mutateAsync(project);
    closeModal();
  };

  if (isProjectLoading) {
    return <div>Loading...</div>;
  }

  if (mode === null || mode === "view") return;

  return (
    <Modal
      modalTitle="Add Project"
      isOpen={isProjectModalOpen}
      onClose={closeModal}
      actions={[
        { title: "Cancel", variant: "secondary", onClick: closeModal },
        {
          title: project.id === null ? "Create" : "Update",
          onClick: () => ref.current?.requestSubmit(),
          isPending,
        },
      ]}
    >
      <ProjectModalContent
        onSubmit={createUpdateProject}
        project={project}
        ref={ref}
      />
    </Modal>
  );
};

type ProjectModalContentProps = {
  onSubmit: (project: Project) => void;
  project: Project;
};

const ProjectModalContent = forwardRef<
  HTMLFormElement,
  ProjectModalContentProps
>(({ onSubmit, project }, ref) => {
  const form = useForm<Project>({
    mode: "onChange",
    defaultValues: project,
  });

  const handleSubmit: SubmitHandler<Project> = (data) => {
    let hasError = false;
    const valueSet = new Set<string | number>();

    data.tasks.forEach((task, index) => {
      if (!task.value) {
        form.setError(`tasks.${index}`, {
          type: "manual",
          message: `Task ${index + 1} cannot be empty`,
        });
        hasError = true;
      }
    });

    // Check for duplicate task values
    data.tasks.forEach((task, index) => {
      if (task.value) {
        if (valueSet.has(task.value)) {
          form.setError(`tasks.${index}`, {
            type: "manual",
            message: `Task ${index + 1} has a duplicate value`,
          });
          hasError = true;
        } else {
          valueSet.add(task.value);
        }
      }
    });

    if (hasError) {
      return;
    }

    if (hasError) {
      return;
    }

    onSubmit(data);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "tasks", // unique name for your Field Array
  });

  return (
    <Form {...form}>
      <form
        ref={ref}
        className="space-y-4 overflow-y-auto p-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormTextInput
          name={"title"}
          label={"Project Title"}
          placeholder={"Project Title"}
          validation={{ required: true }}
        />
        <div className="border-black-300 space-y-3 rounded-lg  border-2 p-1">
          <div className="font-bold m-2">Connected Tasks</div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex space-x-1">
              <div className="flex-1">
                <FormSelectAsyncInput
                  key={field.id}
                  name={`tasks[${index}]`}
                  label={""}
                  isSearchable
                  fetchOptions={() => TaskService.dropdownOptions()}
                />
              </div>
              {index > 0 && (
                <Button
                  key={field.id}
                  className="mt-2"
                  variant="outline"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" /> Remove
                </Button>
              )}
            </div>
          ))}
          <div className="mt-1 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ value: "", label: "" })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
});

export default ProjectModal;
