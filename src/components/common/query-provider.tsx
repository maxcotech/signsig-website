"use client";

import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { createQueryClient } from "@/lib/api/query-client";

/**
 * TanStack Query provider — the client half of the API integration layer in
 * `src/lib/api/`. Every `<feature>.api.ts` hook (`useQuery`/`useMutation`)
 * needs one of these above it in the tree; without it, calling such a hook
 * throws "No QueryClient set".
 *
 * The client is created with `useState`, not at module scope, specifically
 * because this is a Next.js App Router app: a module-level client would be
 * shared across concurrent server-rendered requests from different visitors.
 * `useState`'s initializer runs once per component instance, i.e. once per
 * browser session — see the note in `lib/api/query-client.ts`.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
