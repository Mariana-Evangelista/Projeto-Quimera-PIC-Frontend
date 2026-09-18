import { NextRequest, NextResponse } from 'next/server';
import { GetExperimentCookiesValidationProxy } from './features/experiment-access/services/get-experiment-cookies-validation-proxy';

export async function proxy(request: NextRequest) {
  const experimentResponse = await GetExperimentCookiesValidationProxy(request);
  if (experimentResponse) {
    return experimentResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/experiment/:slug/:pin'],
};
