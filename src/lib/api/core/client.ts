import 'server-only';

import { getApiConfig } from './config';
import { readAccessToken } from './cookies';
import { normalizeError, createAuthRequiredError, ApiError } from '../errors';

export type ApiAuthMode = 'public' | 'authenticated';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiRequestOptions<TBody = unknown> {
  auth: ApiAuthMode;
  headers?: Record<string, string>;
  cache?: RequestCache;
  timeout?: number;
  signal?: AbortSignal;
  body?: TBody;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

const DEFAULT_CACHE: RequestCache = 'no-store';

const ALLOWED_CUSTOM_HEADERS = new Set(['accept', 'content-type', 'x-request-id']);

function createAbortController(timeoutMs: number): AbortController {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  controller.signal.addEventListener('abort', () => clearTimeout(timeoutId), { once: true });
  return controller;
}

function buildHeaders(
  auth: ApiAuthMode,
  token: string | null,
  custom?: Record<string, string>
): Headers {
  const headers = new Headers({
    Accept: 'application/json',
    'X-Correlation-ID': crypto.randomUUID(),
  });

  if (custom) {
    for (const [key, value] of Object.entries(custom)) {
      if (ALLOWED_CUSTOM_HEADERS.has(key.toLowerCase())) {
        headers.set(key, value);
      }
    }
  }

  if (auth === 'authenticated' && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

function serializeBody(body: unknown): BodyInit | null {
  if (body === undefined || body === null) return null;
  if (typeof body === 'string') return body;
  if (body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob)
    return body;
  return JSON.stringify(body);
}

async function parseResponse<T>(
  response: Response
): Promise<{ data: T; error: ReturnType<typeof normalizeError> | null }> {
  const text = await response.text();

  if (response.status === 204 || text === '') {
    return { data: undefined as T, error: null };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { data: undefined as T, error: normalizeError(response, text) };
  }

  if (!response.ok) {
    return { data: undefined as T, error: normalizeError(response, parsed) };
  }

  return { data: parsed as T, error: null };
}

export async function executeRequest<TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  options: ApiRequestOptions<TBody>
): Promise<ApiResponse<TResponse>> {
  const config = getApiConfig();
  const {
    auth,
    headers: customHeaders,
    cache = DEFAULT_CACHE,
    timeout = config.timeout,
    signal,
    body,
  } = options;

  let token: string | null = null;
  if (auth === 'authenticated') {
    token = await readAccessToken();
    if (!token) throw new ApiError(createAuthRequiredError());
  }

  const url = new URL(path, config.baseUrl);
  const headers = buildHeaders(auth, token, customHeaders);
  const requestBody = serializeBody(body);

  if (
    requestBody &&
    !headers.has('Content-Type') &&
    typeof body === 'object' &&
    !(body instanceof FormData)
  ) {
    headers.set('Content-Type', 'application/json');
  }

  const controller = createAbortController(timeout);
  const abortSignal = signal ? AbortSignal.any([controller.signal, signal]) : controller.signal;

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body: requestBody,
      signal: abortSignal,
      cache,
      redirect: 'manual',
      credentials: 'omit',
    });
  } catch (cause) {
    throw new ApiError(normalizeError(null, null, cause));
  }

  const { data, error } = await parseResponse<TResponse>(response);
  if (error) throw new ApiError(error);

  return { data, status: response.status, headers: response.headers };
}
