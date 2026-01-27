import { useApi } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

type UpdateUserBody = {
  email?: string;
  name?: string;
};

type Response = {
  status: string;
  data: {
    name: string;
    email: string;
    role: string;
    totalVisitCount: number;
  };
};

export function useUpdateUser() {
  const api = useApi();
  return useMutation<Response, Error, UpdateUserBody>({
    mutationFn: async (payload) => {
      const { data } = await api.patch(`/user/current`, payload);

      return data;
    },
  });
}
