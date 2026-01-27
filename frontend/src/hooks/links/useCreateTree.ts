import { useApi } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import type { CreateLinkTreeInput } from "@/app/(dashboard)/dashboard/link-tree/page";

type CreateTreeResponse = {
  _id: string;
  username: string;
};

export function useCreateTree() {
  const api = useApi();

  return useMutation<CreateTreeResponse, Error, CreateLinkTreeInput>({
    mutationFn: async (payload) => {
      const { data } = await api.post("tree", payload);
      return data;
    },
  });
}
