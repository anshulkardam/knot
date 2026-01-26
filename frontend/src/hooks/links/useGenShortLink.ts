import { useApi } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

type Payload = {
  title: string;
  destination: string;
  backHalf?: string;
};

type Response = {
  link: {
    id: string;
    title: string;
    destination: string;
    shortUrl: string;
  };
};

export function useGenShortLink() {
  const api = useApi();
  return useMutation<Response, Error, Payload>({
    mutationFn: async (payload) => {
      const { data } = await api.post("link/generate", payload);

      return data;
    },
  });
}
