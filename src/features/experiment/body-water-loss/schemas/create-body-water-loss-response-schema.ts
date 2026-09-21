import * as z from 'zod';

export const BodyWaterLossResponseSchema = z.object({
  option_1: z.object({
    value: z.string(),
    weight: z.number(),
  }),
  option_2: z.object({
    value: z.string(),
    weight: z.number(),
  }),
});

export type BodyWaterLoosResponseFormData = z.infer<typeof BodyWaterLossResponseSchema>;
