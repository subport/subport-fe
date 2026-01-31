import type { AddSubscribeRequestType } from '@/schema/add-subscribe-schema';
import { client } from './client';

import {
  type AddCustomSubscribeReq,
  type subscribeItemRes,
  type subscribeListRes,
} from '@/types/subscribe';
import { buildCustomSubscribeFormData } from '@/lib/utils';

export const getSubscriptions = async (searchTerm: string) => {
  const response = await client.get<subscribeListRes>(
    `/api/subscriptions?name=${encodeURIComponent(searchTerm)}`,
  );

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

export const addCustomSubscribe = async (
  subscribeInfo: AddCustomSubscribeReq,
) => {
  const formData = buildCustomSubscribeFormData(subscribeInfo);

  const response = await client.post<{ id: number }>(
    '/api/subscriptions',
    formData,
  );
  return response.data;
};

export const updatedCustomSubscribe = async ({
  subscribeInfo,
  subscribeId,
}: {
  subscribeInfo: AddCustomSubscribeReq;
  subscribeId: string;
}) => {
  const formData = buildCustomSubscribeFormData(subscribeInfo);

  const response = await client.put<{ id: number }>(
    `/api/subscriptions/${subscribeId}`,
    formData,
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
