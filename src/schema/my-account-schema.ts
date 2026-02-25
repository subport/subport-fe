import z from 'zod';

export const myAccountSchema = z.object({
  nickname: z.string().min(1, '닉네임은 최소 1글자 이상이어야 됩니다.'),
  email: z.email('이메일 형식이어야 됩니다.'),
});

export type MyAccountReqType = z.infer<typeof myAccountSchema>;
