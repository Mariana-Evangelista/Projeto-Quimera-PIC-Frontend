import { ApiClientError } from './error-types';

export class ApiError extends Error {
  constructor(public readonly error: ApiClientError) {
    super(error.message);
    this.name = 'ApiError';
  }
}
