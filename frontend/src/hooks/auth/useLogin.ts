import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: string;
  data: {
    user: {
      name: string;
      email: string;
      role: string;
      totalVisitCount: number;
    };
    accessToken: string;
  };
};

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      return res.json();
    },
  });
}
