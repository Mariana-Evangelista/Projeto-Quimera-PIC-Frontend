import { EXPERIMENTS_MAP } from '@/constants/experiments-map';
import * as z from 'zod';

export const ExperimentManageSchema = z.object({
  type: z.enum(EXPERIMENTS_MAP, { error: 'Campo obrigatório' }),
  university: z.string().min(1, 'Campo obrigatório'),
  class: z.string().min(1, 'Campo obrigatório'),
  _id: z.string().optional(),
});

export type ExperimentManageFormData = z.infer<typeof ExperimentManageSchema>;
