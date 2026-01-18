import { z } from 'zod';

export const addSubscribeSchema = z.object({
  startDate: z.string(),
  reminderDaysBeforeEnd: z.number('알림주기는 최소 1일전 입니다.').int().min(1),
  memo: z.string(),
  dutchPay: z.boolean(),
  dutchPayAmount: z.string().nullable(),
  planId: z.number(),
});

export const addSubscribeRequestSchema = addSubscribeSchema.extend({
  subscriptionId: z.number(),
});

export type AddSubscribeType = z.infer<typeof addSubscribeSchema>;
export type AddSubscribeRequestType = z.infer<typeof addSubscribeRequestSchema>;
