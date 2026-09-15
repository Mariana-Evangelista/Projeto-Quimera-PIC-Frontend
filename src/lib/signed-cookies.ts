import 'server-only';

const MAX_TOKEN_BYTES = 4096;

export type SignedCookieOptions = {
  maxAgeSeconds: number;
  httpOnly: true;
  secure: boolean;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
};

type SignedPayload = Record<string, unknown> & {
  iat: number;
  exp: number;
};

function getSecret(name: string): string {
  const secret = process.env[name];
  if (!secret || secret.length < 32) {
    throw new Error(`${name} deve existir e ter pelo menos 32 caracteres`);
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;

  try {
    const padded = value
      .replaceAll('-', '+')
      .replaceAll('_', '/')
      .padEnd(Math.ceil(value.length / 4) * 4, '=');
    const binary = atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

async function getHmacKey(secretEnvName: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret(secretEnvName)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function encodePayload(payload: SignedPayload): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(payload));
}

export async function signCookiePayload<T extends Record<string, unknown>>(
  payload: T,
  secretEnvName: string,
  maxAgeSeconds: number
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payloadBytes = encodePayload({ ...payload, iat: now, exp: now + maxAgeSeconds });
  const key = await getHmacKey(secretEnvName);
  const signature = await crypto.subtle.sign('HMAC', key, payloadBytes as BufferSource);
  return `${toBase64Url(payloadBytes)}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyCookiePayload<T extends Record<string, unknown>>(
  token: string | undefined,
  secretEnvName: string
): Promise<(T & { iat: number; exp: number }) | null> {
  if (!token || token.length > MAX_TOKEN_BYTES) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const payloadBytes = fromBase64Url(parts[0]);
  const signatureBytes = fromBase64Url(parts[1]);
  if (!payloadBytes || !signatureBytes || payloadBytes.length > MAX_TOKEN_BYTES) return null;

  const key = await getHmacKey(secretEnvName);
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes as BufferSource,
    payloadBytes as BufferSource
  );
  if (!valid) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as T & {
      iat: number;
      exp: number;
    };
    const now = Math.floor(Date.now() / 1000);

    if (!Number.isSafeInteger(payload.iat) || !Number.isSafeInteger(payload.exp)) return null;
    if (payload.iat > now + 30 || payload.exp <= now || payload.exp <= payload.iat) return null;

    return payload;
  } catch {
    return null;
  }
}

export const privateCookieDefaults: SignedCookieOptions = {
  maxAgeSeconds: 6 * 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

export function getCookieDeleteOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}
