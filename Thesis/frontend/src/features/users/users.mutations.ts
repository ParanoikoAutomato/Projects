/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

import UserService from "@/services/user/user.service";

export const useApproveUserMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.approveUser,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User was successfully approved",
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

export const useDeleteUserMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User was successfully deleted",
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

export const useRegisterUserMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.registerUser,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Register was successfully deleted",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
        ),
        duration: 1500,
      });
    },
    onError: (error: Error | any) => {
      if (error.response.data.error === "Username already exists") {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
          ),
          variant: "destructive",
          title: "Username already exists",
        });
      } else {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 data-[state=open]:sm:slide-in-from-top-full"
          ),
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    },
  });
};

export const useChangeUserRoleMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.changeUserRole,
    onSuccess: (_, variables) => {
      variables;
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User role was successfully changed!",
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
