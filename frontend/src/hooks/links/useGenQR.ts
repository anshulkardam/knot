import { useApi } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

type Payload = {
  title: string;
  destination: string;
  backHalf?: string;
};

export function useGenQR() {
  const api = useApi();
  return useMutation<Blob, Error, Payload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("link/qr", payload, {
        responseType: "blob",
      });

      return data;
    },
  });
}
