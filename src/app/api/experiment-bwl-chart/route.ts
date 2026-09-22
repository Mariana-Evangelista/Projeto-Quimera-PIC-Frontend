import { api } from '@/lib/api';
import { ApiError } from '@/lib/api/errors';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { pin: string } }) {
  const { pin } = params;

  try {
    const { data } = await api.get(`/body-water-loss-response/analytics/${pin}`, {
      auth: 'public',
    });

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      const { kind, code, message, status } = error.error;

      return NextResponse.json(
        { kind, code, message },
        { status: status ?? (kind === 'configuration' ? 500 : 502) }
      );
    }

    return NextResponse.json(
      { kind: 'unknown', code: 'INTERNAL_ERROR', message: 'Erro interno' },
      { status: 500 }
    );
  }
}
