/**
 * API type vocabulary. Deliberately shaped to match `signsig-web`'s
 * `types/interfaces/general.types.ts` — same backend, same envelope, and a
 * developer moving between the two repos should recognise this immediately.
 * See docs/API.md for the full pattern this belongs to.
 */

import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

/** The backend's standard success/failure envelope, on every response. */
export interface ApiResponse<TData> {
  status: boolean;
  message: string;
  data: TData;
}

/** What a failed request rejects with — typed so `error.response?.data?.message` resolves. */
export type ApiError<TData = unknown> = AxiosError<ApiResponse<TData>>;

/**
 * Options for a `useQuery` wrapper, with `queryKey` omitted — each hook
 * supplies its own key, so a caller can only extend it, never contradict it.
 */
export type QueryOptionsWithError<TData> = Omit<
  UseQueryOptions<TData, ApiError<TData>, TData, readonly unknown[]>,
  "queryKey"
>;

/** Options for a `useMutation` wrapper, typed on the variables and the result. */
export type MutationOptionsWithError<TVariables, TData> = UseMutationOptions<
  TData,
  ApiError<TData>,
  TVariables
>;

/** Page-request shape the backend expects on a list endpoint. */
export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

/** Page-response metadata the backend returns alongside `records`. */
export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalRecordCount: number;
  totalPages: number;
}

export interface PaginatedData<TRecord> extends PaginationMetadata {
  records: TRecord[];
}
