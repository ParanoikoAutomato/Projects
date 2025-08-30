import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

import ProjectService from "@/services/projects/project.service";

export const useCreateUpdateProjectMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProjectService.createUpdateProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title:
          variables.id === null
            ? "Project was successfully created"
            : `Project ${variables.title} was successfully updated`,
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

export const useDeleteProjectMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProjectService.deleteProject,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Project was successfully deleted",
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
