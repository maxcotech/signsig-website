import axios from "axios";

import { getApiBaseUrl } from "@/config/site";

/**
 * The shared axios instance every API module calls through.
 *
 * Mirrors `signsig-web`'s `config/client.ts` — same idea (one configured
 * instance, a request interceptor, a response interceptor) — with the pieces
 * that only make sense in an authenticated app removed. This is a public
 * marketing site: there is no login, no session cookie, no token to attach,
 * and no 401 to redirect on. If a protected area is ever added here, that is
 * where a request interceptor reading a session cookie would go — see
 * `signsig-web/src/config/client.ts` for the shape to copy.
 *
 * `baseURL` is read lazily inside a request interceptor, not passed to
 * `axios.create()`, so a missing `NEXT_PUBLIC_API_BASE_URL` throws at the
 * moment something actually tries to call the API — not at import time,
 * which would crash every page that happens to import this module even if
 * nothing on that page makes a request.
 *
 * Named export, unlike `signsig-web`'s `export default client` — this repo's
 * own rule (`no-restricted-exports`, see docs/STRUCTURE.md) forbids default
 * exports outside the Next.js file conventions that require them. Its house
 * rule wins over matching the sibling project byte-for-byte.
 */
export const apiClient = axios.create({ timeout: 30_000 });

apiClient.interceptors.request.use((config) => {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Set it in .env.local (see .env.example) before calling the API.",
    );
  }
  config.baseURL = baseUrl;
  config.headers.set("Accept", "application/json");
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
      console.error(`API request timed out: ${error.config?.url}`);
    }
    return Promise.reject(error);
  },
);
