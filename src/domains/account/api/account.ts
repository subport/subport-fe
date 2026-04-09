import { client } from '@/api/client';

export const deleteProfile = async () => {
  const response = await client.delete('/api/members/me');

  return response.data;
};
