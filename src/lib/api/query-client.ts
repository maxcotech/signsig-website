import { QueryClient } from "@tanstack/react-query";

/**
 * Shared TanStack Query defaults. Values match `signsig-web`'s
 * `config/query-client.ts` exactly.
 *
 * ⚠ NOT a module-level singleton, unlike `signsig-web`'s version — and
 * deliberately so. `signsig-web` is a client-rendered SPA (TanStack Start),
 * where one `QueryClient` for the whole browser session is safe. This is a
 * Next.js App Router site, which renders on the server per-request; a
 * module-level client would be shared across every concurrent visitor on the
 * server, leaking one user's cached data into another's response. Instead,
 * `<QueryProvider>` (`src/components/common/query-provider.tsx`) creates one
 * with `useState` inside the component, so each browser session gets its own
 * — the construction Next.js's own React Query docs prescribe for the App
 * Router. This function is that constructor.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 60 * 1000,
        retry: 2,
      },
    },
  });
}
