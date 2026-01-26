import { useMutation } from "@tanstack/react-query";

type Payload = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
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

export function useRegister() {
  return useMutation<RegisterResponse, Error, Payload>({
    mutationFn: async (payload) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Registration failed");
      }

      return res.json();
    },
  });
}
