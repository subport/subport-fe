import type { AddCustomServicesReq } from '../schemas/custom-services-schema';
import { client } from '@/api/client';
import type {
  SubscriptionServiceByIdRes,
  SubscriptionServiceItem,
} from '../types/api';
import { buildCustomServiceFormData } from '@/lib/utils';

export const addCustomService = async (serviceInfo: AddCustomServicesReq) => {
  const formData = buildCustomServiceFormData(serviceInfo);

  const response = await client.post<{ id: number }>(
    '/api/subscriptions',
    formData,
  );
  return response.data;
};

export const updatedCustomService = async ({
  serviceInfo,
  serviceId,
}: {
  serviceInfo: AddCustomServicesReq;
  serviceId: string;
}) => {
  const formData = buildCustomServiceFormData(serviceInfo);

  const response = await client.put<SubscriptionServiceItem>(
    `/api/subscriptions/${serviceId}`,
    formData,
  );

  return response.data;
};

export const getServiceById = async (id: string) => {
  const response = await client.get<SubscriptionServiceByIdRes>(
    `/api/subscriptions/${id}`,
  );

  return response.data;
};
