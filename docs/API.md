# API integration

The infrastructure is built and unused. Nothing on this marketing site calls a
real backend endpoint today — this doc exists so that when something needs to,
every session wires it up the same way, and that way matches the actual
product app (`signsig-web`), not a pattern invented for this repo alone.

---

## 1. Why it looks like `signsig-web`

`signsig-web` (the SignSig business app, a sibling project) already has a
mature, working API layer — `src/api/*.api.ts` modules, a shared axios
client, generic `getService`/`postService`/etc. wrappers, and a TanStack Query
provider. Same backend, same response envelope. So rather than invent a
second convention, this repo's `src/lib/api/` mirrors it: same function
names, same generic shape, same per-resource hook pattern. A developer moving
between the two repos should recognise this immediately.

**Two deliberate differences**, both because this is a Next.js App Router
site and `signsig-web` is a client-rendered SPA:

- **No auth.** `signsig-web`'s client attaches a bearer token from a cookie
  and redirects to `/login` on a 401. This site has no login and no session —
  it's public. If a protected area is ever added here, that's where a
  request interceptor belongs; see `signsig-web/src/config/client.ts` for the
  shape to copy.
- **No module-level `QueryClient` singleton.** `signsig-web` can get away
  with one `QueryClient` for the whole browser session because it never
  renders on a server shared by multiple visitors. This site does. A
  module-level client here would leak one visitor's cached data into
  another's server-rendered response. `<QueryProvider>` creates the client
  with `useState` instead — once per browser session, the construction
  Next.js's own React Query docs prescribe for the App Router. See the doc
  comment on `lib/api/query-client.ts` for the full reasoning.

---

## 2. The pieces

| File                                   | Role                                                                                                                                                             |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config/site.ts` → `getApiBaseUrl()`   | Reads `NEXT_PUBLIC_API_BASE_URL`. No fallback — an unset URL should fail loudly the first time something calls it, not guess.                                    |
| `lib/api/client.ts`                    | The one axios instance. Throws if the base URL is unset.                                                                                                         |
| `lib/api/methods.ts`                   | `getService` / `postService` / `putService` / `patchService` / `deleteService` — generic, typed, unwrap the `{ status, message, data }` envelope down to `data`. |
| `lib/api/types.ts`                     | `ApiResponse<T>`, `ApiError<T>`, `QueryOptionsWithError<T>`, `MutationOptionsWithError<TVariables, TData>`, pagination types.                                    |
| `lib/api/query-client.ts`              | `createQueryClient()` — the shared defaults (15min stale time, 2 retries).                                                                                       |
| `components/common/query-provider.tsx` | `<QueryProvider>`, already wrapping the whole app in `app/layout.tsx`. Nothing needs to add it again.                                                            |

## 3. Adding a new integration

One file per resource, same as `signsig-web`'s `api/<resource>.api.ts`.
Example — a hypothetical newsletter signup:

```ts
// src/features/newsletter/newsletter.api.ts
import { useMutation } from "@tanstack/react-query";

import { postService } from "@/lib/api/methods";
import type { MutationOptionsWithError } from "@/lib/api/types";

export interface SubscribeRequest {
  email: string;
}

export function useSubscribe(
  options: MutationOptionsWithError<SubscribeRequest, void> = {},
) {
  return useMutation({
    mutationFn: (payload: SubscribeRequest) =>
      postService<SubscribeRequest, void>("/newsletter/subscribe", payload),
    ...options,
  });
}
```

Then in the client component:

```tsx
const { mutate, isPending, error } = useSubscribe({
  onSuccess: () => setSubmitted(true),
});
```

**Do not** call `getService`/`postService` directly from a component. The
`useX` hook wrapper is what gives every consumer TanStack Query's loading /
error / cache state for free, and is the shape `signsig-web` uses — a bare
`fetch()` or a raw service call in a component is a regression to before this
layer existed.

## 4. The worked example: Careers

`features/careers/` is the first feature actually wired to a live endpoint —
GET /Careers/Roles, GET /Careers/Roles/{id}, GET /Careers/ScreeningQuestions
and POST /Careers/Roles/{id}/Apply, per `swagger.json`'s Careers tag. Read
`careers.api.ts` (the three server-side reads) and
`application/careers-application.api.ts` (the client mutation) before wiring
up the next feature — it demonstrates every pattern in this doc at once:

- **Reads are plain async functions, not `useQuery`.** `careers.api.ts` has no
  `"use client"`; its functions run in Server Components and inside
  `generateStaticParams`, which cannot use a hook at all. Wrapped in React's
  `cache()` since `getService` bypasses Next's automatic `fetch()` dedup —
  without it, `generateMetadata` and the page component each independently
  re-fetch the same data.
- **The mutation is a real `useX` hook** — `useSubmitApplication()` — called
  from the client `<ApplicationForm>`, exactly per §3.
- **A live fetch can still fail**, and this site has no interest in crashing a
  public marketing page over it. Every read is wrapped in `.catch(() => null)`
  and the page renders an honest degraded state
  (`<CareersUnavailable>`) rather than a 500 — see the doc comment on
  `app/(marketing)/resources/careers/[role]/page.tsx` for the exact
  fetch-failure vs. genuinely-not-found decision tree.
- **`submit-application.ts` is gone.** It used to return a hardcoded
  `not-configured` result because no endpoint existed; now one does, and
  `useSubmitApplication()` replaced it entirely.

## 5. Checklist before a page calls a real endpoint

- [ ] `NEXT_PUBLIC_API_BASE_URL` set in the target deployment's environment.
- [ ] A `<feature>.api.ts` module exists, following §3 — not an inline `fetch`.
- [ ] The consuming component is a Client Component (`"use client"`) and
      handles `isPending` / `error`, not just the success path.
- [ ] A failure state is rendered inline or otherwise surfaced — never
      swallowed. This site has no toast system; follow the Careers feature's
      pattern (a typed error the component branches on, or an honest
      unavailable state for a failed read), unless the feature genuinely
      needs a toast, in which case that's a design decision to raise, not a
      default to reach for.
