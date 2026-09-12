import 'server-only';

import type { ApiClientError, ExternalApiErrorBody } from './error-types';

export type { ApiErrorKind, ApiClientError, ExternalApiErrorBody } from './error-types';

function isExternalApiErrorBody(value: unknown): value is ExternalApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).code === 'string' &&
    typeof (value as Record<string, unknown>).message === 'string' &&
    typeof (value as Record<string, unknown>).type === 'string'
  );
}

export function normalizeError(response: Response | null, body: unknown, cause?: unknown): ApiClientError {
  if (!response) {
    return {
      kind: 'transport',
      code: 'API_UNAVAILABLE',
      message: 'Não foi possível conectar à API',
      details: cause,
      cause,
    };
  }

  if (isExternalApiErrorBody(body)) {
    return {
      kind: 'api',
      status: response.status,
      code: body.code,
      message: body.message,
      details: body,
      cause,
    };
  }

  if (!response.ok) {
    return {
      kind: 'api',
      status: response.status,
      code: response.status >= 500 ? 'UPSTREAM_ERROR' : 'CLIENT_ERROR',
      message: `API retornou ${response.status} ${response.statusText}`,
      details: body,
      cause,
    };
  }

  return {
    kind: 'protocol',
    status: response.status,
    code: 'API_INVALID_RESPONSE',
    message: 'Resposta da API em formato inesperado',
    details: body,
    cause,
  };
}

export function createConfigurationError(code: string, message: string): ApiClientError {
  return { kind: 'configuration', code, message };
}

export function createAuthRequiredError(): ApiClientError {
  return createConfigurationError('AUTH_REQUIRED', 'Token de acesso não encontrado no cookie');
}

export class ApiError extends Error {
  constructor(public readonly error: ApiClientError) {
    super(error.message);
    this.name = 'ApiError';
  }
}
