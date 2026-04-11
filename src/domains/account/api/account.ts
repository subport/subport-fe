import { client } from '@/api/client';
import type { MyAccountRes, MyProfileRes } from '../types/api';
import type { EditAccountValues } from '../schemas/edit-account-schema';

export const getMyProfile = async () => {
  const response = await client.get<MyProfileRes>('/api/members/me/profile');

  return response.data;
};

export const getMyAccount = async () => {
  const response = await client.get<MyAccountRes>('/api/members/me');

  return response.data;
};

export const updatedMyAccount = async (updatedAccount: EditAccountValues) => {
  const response = await client.put<MyAccountRes>(
    '/api/members/me',
    updatedAccount,
  );

  return response.data;
};

export const deleteProfile = async () => {
  const response = await client.delete('/api/members/me');

  return response.data;
};
