import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

import CategoryService from "@/services/category/category.service";

export const useCreateUpdateCategoryMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CategoryService.createUpdate,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title:
          typeof variables._id === "undefined"
            ? "Category was successfully created"
            : `Category ${variables.name} was successfully updated`,
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

export const useDeleteCategoryMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CategoryService.deleteCategory,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Category was successfully deleted",
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
