'use server';

import { api } from '@/lib/api';

export async function DeleteExperimentsService(id: string) {
  const { data } = await api.delete(`/experiment/${id}`, {
    auth: 'authenticated',
  });

  return data;
}
