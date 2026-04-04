import type { AddSubscribeRequestType } from '@/schema/add-subscribe-schema';
import { client } from './client';

import type { subscribeListRes } from '@/types/subscribe';
import type {
  UserSubscriptionParams,
  UserSubscriptionRes,
} from '@/domains/subscription/user-subscription/types/api';

export const getSubscriptions = async (searchTerm: string) => {
  const response = await client.get<subscribeListRes>(
    `/api/subscriptions?name=${encodeURIComponent(searchTerm)}`,
  );

  return response.data.subscriptions;
};

export const addSubscribe = async (subscribeInfo: AddSubscribeRequestType) => {
  const response = await client.post<{ id: number }>(
    '/api/member-subscriptions',
    subscribeInfo,
  );

  return response.data;
};

export const getSubscribeTypes = async () => {
  const response = await client.get<string[]>('/api/subscriptions/types');

  return response.data;
};

export const deleteCustomSubscribe = async (subscribeId: string) => {
  const response = await client.delete(`/api/subscriptions/${subscribeId}`);

  return response;
};

export const getMemberSubscriptions = async <P extends UserSubscriptionParams>(
  params: P,
) => {
  const sortBy = params.active ? params.sortBy : ('name' as const);

  const response = await client.get<UserSubscriptionRes<typeof sortBy>>(
    `/api/member-subscriptions?active=${encodeURIComponent(params.active)}&sortBy=${sortBy}`,
  );

  return response.data;
};
