import { client } from './client';

type RefreshRes = {
  accessToken: string;
};

export const refresh = async () => {
  const response = await client.post<RefreshRes>('/api/auth/refresh');

  console.log(response.data);

  return response.data;
};

export const logout = async () => {
  const response = await client.post('/api/auth/logout');

  return response.data;
};
