"use client";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "../context/auth-context";

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
