import 'server-only';

export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  tokenCookieName: string;
}

const DEFAULT_TIMEOUT_MS = 30_000;
const MIN_TIMEOUT_MS = 1_000;
const MAX_TIMEOUT_MS = 120_000;
const DEFAULT_TOKEN_COOKIE_NAME = 'access-token';

function parseTimeout(value: string | undefined): number {
  const parsed = value ? Number.parseInt(value, 10) : NaN;
  if (Number.isNaN(parsed)) return DEFAULT_TIMEOUT_MS;

  return Math.max(MIN_TIMEOUT_MS, Math.min(MAX_TIMEOUT_MS, parsed));
}

function validateBaseUrl(url: string): string {
  const parsed = new URL(url);
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('API_BASE_URL deve usar http ou https');
  }
  if (process.env.NODE_ENV === 'production' && parsed.protocol !== 'https:') {
    throw new Error('API_BASE_URL deve usar HTTPS em produção');
  }
  return parsed.toString();
}

let cachedConfig: ApiClientConfig | null = null;

export function getApiConfig(): ApiClientConfig {
  if (cachedConfig) return cachedConfig;

  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) throw new Error('API_BASE_URL não foi definida');

  cachedConfig = {
    baseUrl: validateBaseUrl(baseUrl),
    timeout: parseTimeout(process.env.API_TIMEOUT_MS),
    tokenCookieName: process.env.API_TOKEN_COOKIE_NAME || DEFAULT_TOKEN_COOKIE_NAME,
  };

  return cachedConfig;
}
