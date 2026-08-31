import axios, { type RawAxiosRequestHeaders } from "axios";

import { apiClient } from "@/lib/api/client";
import type { ApiResponse } from "@/lib/api/types";

/**
 * Generic request wrappers every `<feature>.api.ts` module calls through,
 * mirroring `signsig-web`'s `api/methods.ts` one-to-one in name and shape:
 * `getService` / `postService` / `putService` / `patchService` /
 * `deleteService`, each unwrapping the backend's `{ status, message, data }`
 * envelope down to just `data`. A developer who has worked in the business
 * app should be able to write a new API module here without re-learning
 * anything. See docs/API.md for the full pattern and a worked example.
 *
 * Errors are logged and rethrown, not swallowed or toasted — this site has
 * no toast/notification system, and the careers application form
 * (`features/careers/application/careers-application.api.ts`) already
 * renders its own inline error from `useMutation`'s `error` state, which is
 * the right call for a public form. Let the caller decide how to surface a
 * failure; don't decide for it here. React Query's own `onError` / `isError`
 * still work normally on top of this — this only prevents a *silent*
 * failure, not a *presented* one.
 */

export type RequestOptions = {
  params?: Record<string, unknown>;
  headers?: RawAxiosRequestHeaders;
  /** Return the full `{ status, message, data }` envelope instead of just `data`. */
  returnFullResponse?: boolean;
};

function logAndRethrow(context: string, error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error(
      `[api] ${context} failed:`,
      error.response?.data ?? error.message,
    );
  }
  throw error;
}

export async function getService<TData = unknown>(
  url: string,
  options: RequestOptions = {},
): Promise<TData> {
  try {
    const res = await apiClient.get<ApiResponse<TData>>(url, {
      params: options.params,
      headers: options.headers,
    });
    return (options.returnFullResponse ? res.data : res.data.data) as TData;
  } catch (error) {
    logAndRethrow(`GET ${url}`, error);
  }
}

export async function postService<TBody, TData = unknown>(
  url: string,
  body: TBody,
  options: RequestOptions = {},
): Promise<TData> {
  try {
    const res = await apiClient.post<ApiResponse<TData>>(url, body, {
      params: options.params,
      headers: options.headers,
    });
    return (options.returnFullResponse ? res.data : res.data.data) as TData;
  } catch (error) {
    logAndRethrow(`POST ${url}`, error);
  }
}

export async function putService<TBody, TData = unknown>(
  url: string,
  body: TBody,
  options: RequestOptions = {},
): Promise<TData> {
  try {
    const res = await apiClient.put<ApiResponse<TData>>(url, body, {
      params: options.params,
      headers: options.headers,
    });
    return (options.returnFullResponse ? res.data : res.data.data) as TData;
  } catch (error) {
    logAndRethrow(`PUT ${url}`, error);
  }
}

export async function patchService<TBody, TData = unknown>(
  url: string,
  body: TBody,
  options: RequestOptions = {},
): Promise<TData> {
  try {
    const res = await apiClient.patch<ApiResponse<TData>>(url, body, {
      params: options.params,
      headers: options.headers,
    });
    return (options.returnFullResponse ? res.data : res.data.data) as TData;
  } catch (error) {
    logAndRethrow(`PATCH ${url}`, error);
  }
}

export async function deleteService<TData = unknown>(
  url: string,
  options: RequestOptions = {},
): Promise<TData> {
  try {
    const res = await apiClient.delete<ApiResponse<TData>>(url, {
      params: options.params,
      headers: options.headers,
    });
    return (options.returnFullResponse ? res.data : res.data.data) as TData;
  } catch (error) {
    logAndRethrow(`DELETE ${url}`, error);
  }
}
