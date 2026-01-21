import { useAuth } from "@/context/authContext";
import { useApi } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  const api = useApi();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["me"],
    enabled: isAuthenticated,
    queryFn: async () => {
      const { data } = await api.get("/me");
      return data;
    },
  });
}
