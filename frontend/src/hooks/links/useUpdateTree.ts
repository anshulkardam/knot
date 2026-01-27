import { CreateLinkTreeInput } from "@/app/(dashboard)/dashboard/link-tree/page";
import { useApi } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query"; 

export function useUpdateTree(treeId: string) {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateLinkTreeInput) => {
      const { data } = await api.patch(`/tree/${treeId}`, payload);
      return data;
    },
  });
}
