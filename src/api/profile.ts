import type { MyProfileRes } from '@/types/profile';
import { client } from './client';

export const getMyProfile = async () => {
  const response = await client.get<MyProfileRes>('/api/members/me/profile');

  return response.data;
};
