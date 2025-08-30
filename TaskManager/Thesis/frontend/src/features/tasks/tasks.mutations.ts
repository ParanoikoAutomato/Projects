import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";
import TaskService from "@/services/task/task.service";

export const useCreateUpdateTaskMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.createUpdateTask,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title:
          typeof variables.id === "undefined"
            ? "Task was successfully created"
            : `Task ${variables.title} was successfully updated`,
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};

export const useAcceptTaskMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.acceptTask,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Task was successfully accepted",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};

export const useCompleteTaskMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.completeTask,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Task was successfully accepted",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};

export const useApproveTaskMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.approveTask,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Task was successfully accepted",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};

export const useRejectTaskMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.rejectTask,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Task was successfully accepted",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};

export const useDeleteTaskMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.deleteTask,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Task was successfully deleted",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};

export const useCommentTaskMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TaskService.addTaskComment,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["task-history"] });
      toast({
        title: "Task was successfully accepted",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: () => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
};
