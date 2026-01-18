import type { AddSubscribeRequestType } from '@/schema/add-subscribe-schema';
import { client } from './client';

import {
  type subscribeItemRes,
  type subscribeListRes,
} from '@/types/subscribe';

export const getSubscriptions = async () => {
  const response = await client.get<subscribeListRes>('/api/subscriptions');

  return response.data.subscriptions;
};

export const getSubscriptionsById = async (id: string) => {
  const response = await client.get<subscribeItemRes>(
    `/api/subscriptions/${id}`,
  );

  return response.data;
};

export const addSubscribe = async (subscribeInfo: AddSubscribeRequestType) => {
  const response = await client.post<{ id: number }>(
    '/api/member-subscriptions',
    subscribeInfo,
  );

  return response.data;
};
