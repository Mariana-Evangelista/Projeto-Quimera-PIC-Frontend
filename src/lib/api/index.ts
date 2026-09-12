import 'server-only';

import { executeRequest } from './core/client';
import type { ApiRequestOptions } from './core/client';

export type { ApiResponse } from './core/client';

export const api = {
  get<TResponse>(path: string, options: Omit<ApiRequestOptions, 'body'>) {
    return executeRequest<TResponse, never>('GET', path, options as ApiRequestOptions<never>);
  },
  post<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options: Omit<ApiRequestOptions<TBody>, 'body'>
  ) {
    return executeRequest<TResponse, TBody>('POST', path, { ...options, body });
  },
  put<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options: Omit<ApiRequestOptions<TBody>, 'body'>
  ) {
    return executeRequest<TResponse, TBody>('PUT', path, { ...options, body });
  },
  delete<TResponse>(path: string, options: Omit<ApiRequestOptions, 'body'>) {
    return executeRequest<TResponse, never>('DELETE', path, options as ApiRequestOptions<never>);
  },
};
