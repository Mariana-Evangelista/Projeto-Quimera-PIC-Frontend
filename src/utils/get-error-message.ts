import { ApiError } from '@/lib/api/errors/api-error';
import type { ApiClientError } from '@/lib/api/errors/error-types';

type ErrorInput = ApiError | ApiClientError;

export const GetErrorMessage = (error: ErrorInput) => {
  const apiError = error instanceof ApiError ? error.error : error;
  const { code, status, message } = apiError;

  return `${code} (${status ?? 'unknown'}) - ${message}`;
};
