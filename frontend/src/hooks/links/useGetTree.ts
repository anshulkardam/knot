import { useApi } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export type LinkTreeItem = {
  title: string;
  url: string;
  category: "social" | "link";
  order: number;
  isActive: boolean;
};

export type LinkTree = {
  _id: string;
  username: string;
  title: string;
  bio?: string;
  items: LinkTreeItem[];
};

export function useGetTree() {
  const api = useApi();

  return useQuery<LinkTree | null>({
    queryKey: ["link-tree", "me"],
    queryFn: async () => {
      const { data } = await api.get("/tree/me");
      return data;
    },
  });
}
