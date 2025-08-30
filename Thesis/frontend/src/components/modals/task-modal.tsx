import React, { forwardRef, useRef } from "react";

import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Form } from "../ui/form";
import Modal from "./modal";
import { Task } from "@/services/task/task.types";
import FormTextInput from "../form-inputs/text-input";
import { useCreateUpdateTaskMutation } from "@/features/tasks/tasks.mutations";
import FormTextAreaInput from "../form-inputs/textarea-input";
import FormSelectAsyncInput from "../form-inputs/form-select-async-input";
import CategoryService from "@/services/category/category.service";
import FormDateInput from "../form-inputs/date-input";
import UserService from "@/services/user/user.service";
import { useTask } from "@/features/tasks/tasks.queries";
import FormSelectInput from "../form-inputs/form-select-input";
import { TaskCriticality } from "@/enums/enums";

const createTask: Task = {
  id: null,
  title: "",
  description: "",
  category_id: "",
  date: "",
  criticality: TaskCriticality.LOW,
};

const TaskModal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateUpdateTaskMutation();
  const mode = searchParams.get("mode");
  const taskId = searchParams.get("id") ? String(searchParams.get("id")) : null;
  const isTaskModalOpen =
    mode === "create" || (mode === "edit" && taskId != null);

  const { data: updateTask, isLoading: isTaskLoading } = useTask({
    id: taskId,
    enabled: isTaskModalOpen && taskId != null,
  });

  const task = mode === "create" ? createTask : updateTask;

  const closeModal = () => {
    navigate("/");
  };

  const ref = useRef<HTMLFormElement | null>(null);

  const createUpdateTeacher = async (task: Task) => {
    await mutateAsync(task);
    closeModal();
  };

  if (isTaskLoading) {
    return <div>Loading</div>;
  }

  if (mode === null || mode === "view") return;

  return (
    <Modal
      modalTitle="Add Task"
      isOpen={isTaskModalOpen}
      onClose={closeModal}
      actions={[
        { title: "Cancel", variant: "secondary", onClick: closeModal },
        {
          title: task.id === null ? "Create" : "Update",
          onClick: () => ref.current?.requestSubmit(),
          isPending,
        },
      ]}
    >
      <TaskModalContent onSubmit={createUpdateTeacher} task={task} ref={ref} />
    </Modal>
  );
};

type TaskModalContentProps = {
  onSubmit: (task: Task) => void;
  task: Task;
};

const TaskModalContent = forwardRef<HTMLFormElement, TaskModalContentProps>(
  ({ onSubmit, task }, ref) => {
    const form = useForm<Task>({
      mode: "onChange",
      defaultValues: task,
    });

    return (
      <Form {...form}>
        <form
          ref={ref}
          className="space-y-4 overflow-y-auto p-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormTextInput
            name={"title"}
            label={"Task Name"}
            placeholder={"Task name"}
            validation={{ required: true }}
          />
          <FormTextAreaInput
            name={"description"}
            label={"Description"}
            placeholder={"Description"}
          />
          <FormSelectInput
            name={"criticality"}
            label={"Criticality"}
            isSearchable
            isClearable={false}
            validation={{ required: true }}
            binding="value"
            options={[
              { value: TaskCriticality.LOW, label: "Low" },
              { value: TaskCriticality.MEDIUM, label: "Medium" },
              { value: TaskCriticality.HIGH, label: "High" },
            ]}
          />
          <FormSelectAsyncInput
            name={"category_id"}
            label={"Category"}
            isSearchable
            fetchOptions={() => CategoryService.dropdownOptions()}
            validation={{ required: true }}
          />
          <FormSelectAsyncInput
            name={"assignees"}
            label={"Assignees"}
            isSearchable
            isMulti
            fetchOptions={() => UserService.dropdownOptions()}
            validation={{ required: true }}
          />
          <FormDateInput
            name={"date"}
            label={"Due Date"}
            placeholder={"Due Date"}
            dateFormat={"dd/MM/yyyy"}
            validation={{ required: true }}
          />
        </form>
      </Form>
    );
  }
);

export default TaskModal;
