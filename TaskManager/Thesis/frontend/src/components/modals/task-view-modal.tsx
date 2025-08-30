/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import Modal from "./modal";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import FormTextInput from "../form-inputs/text-input";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useTaskHistory } from "@/features/tasks/tasks.queries";
import { useCommentTaskMutation } from "@/features/tasks/tasks.mutations";

const TaskViewModal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");
  const taskId = searchParams.get("id") ? String(searchParams.get("id")) : null;
  const isTaskViewModalOpen = mode === "view" && taskId != null;

  const { mutateAsync, isPending } = useCommentTaskMutation();

  const ref = useRef<HTMLFormElement | null>(null);
  const form = useForm<Comment>({
    mode: "onChange",
    defaultValues: {
      value: "",
    },
  });

  const onCommentPress = async (event: any) => {
    event.preventDefault();
    if (form.getValues("value").trim() !== "") {
      await mutateAsync({
        task: taskId,
        comment: form.getValues("value").trim(),
      });
      form.reset();
    } else {
      return;
    }
  };

  const { data: taskHistory = [], isLoading: isTaskHistoryLoading } =
    useTaskHistory({
      id: taskId,
      enabled: isTaskViewModalOpen && taskId != null,
    });

  const closeModal = () => {
    navigate("/");
  };

  if (isTaskHistoryLoading) {
    return <div>Loading</div>;
  }

  if (mode === null) return;

  return (
    <Modal
      modalTitle="View Task"
      isOpen={isTaskViewModalOpen}
      onClose={closeModal}
      actions={[]}
    >
      <ScrollArea className="h-96 w-full">
        {taskHistory.map((action) => (
          <HistoryRow
            key={action.id}
            user={action.user}
            message={action.message}
            date={action.date}
          />
        ))}
      </ScrollArea>
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={onCommentPress}
          className="flex flex-row space-x-2 p-2 border-t border-gray-200"
        >
          <FormTextInput
            name={"value"}
            label={""}
            placeholder={"Add comment"}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <span>Comment</span>
            )}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default TaskViewModal;

type Comment = {
  value: string;
};

function HistoryRow({
  user,
  message,
  date,
}: {
  user: string;
  message: string;
  date: string;
}) {
  return (
    <div className="flex flex-col space-y-2 py-4">
      <span className="text-base">
        <span className="font-bold">{user}</span> {message}
      </span>
      <span className="text-sm text-gray-400">{date}</span>
      <Separator />
    </div>
  );
}
