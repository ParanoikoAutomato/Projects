import CategoryService from "@/services/category/category.service";

import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: CategoryService.getAll,
  });
};

export const useCategory = ({
  id,
  enabled = true,
}: {
  id: string | null;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => CategoryService.getCategoryById(id),
    enabled,
  });
};
