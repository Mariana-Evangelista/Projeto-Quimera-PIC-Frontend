export type ApiErrorKind = 'api' | 'transport' | 'protocol' | 'configuration';

export interface ExternalApiErrorBody {
  code: string;
  message: string;
  type: string;
}

export interface ApiClientError {
  kind: ApiErrorKind;
  status?: number;
  code: string;
  message: string;
  details?: unknown;
  cause?: unknown;
}
