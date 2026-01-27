import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/lib/apiClient";
import { LinkRow } from "@/components/dashboard/links/columns";
import { useAuth } from "@/context/authContext";

export type MyLinksParams = {
  search: string;
  offset: number;
  limit: number;
  qr: boolean;
};

export function useMyLinks({ search, offset, limit, qr }: MyLinksParams) {
  const api = useApi();
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["my-links", search, offset, limit, qr],
    enabled: !!accessToken,
    queryFn: async () => {
      const { data } = await api.get("link/my-links", {
        params: { search, offset, limit, qr },
      });

      return data as {
        status: string;
        data: {
          total: number;
          offset: number;
          limit: number;
          links: LinkRow[];
        };
      };
    },
    staleTime: 30_000,
  });
}
