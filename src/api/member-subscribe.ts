import type {
  MeberSubscribeActivateReq,
  MemberSubscribeItem,
} from '@/types/member-subscribe';
import { client } from './client';

export const getMemberSubscribeById = async (memberSubscribeId: string) => {
  const response = await client.get<MemberSubscribeItem>(
    `/api/member-subscriptions/${memberSubscribeId}`,
  );
  return response.data;
};

export const updateMemberSubscribePlan = async ({
  subscribeId,
  planId,
}: {
  subscribeId: string;
  planId: string;
}) => {
  const response = await client.put<MemberSubscribeItem>(
    `/api/member-subscriptions/${subscribeId}/plan`,
    { planId: Number(planId) },
  );

  return response.data;
};

export const updateMemberSubscribeDutchPay = async ({
  memberSubscribeId,
  dutchPay,
  dutchPayAmount,
}: {
  memberSubscribeId: string;
  dutchPay: boolean;
  dutchPayAmount: number | null;
}) => {
  const response = await client.put<MemberSubscribeItem>(
    `/api/member-subscriptions/${memberSubscribeId}/dutch-pay`,
    { dutchPay, dutchPayAmount },
  );

  return response.data;
};

export const deactivateMemberSubscrbe = async ({
  memberSubscribeId,
}: {
  memberSubscribeId: string;
}) => {
  const response = await client.put<MemberSubscribeItem>(
    `/api/member-subscriptions/${memberSubscribeId}/deactivate`,
  );

  return response.data;
};

export const activateMemberSubscribe = async ({
  memberSubscribeId,
  memberSubscribeInfo,
}: {
  memberSubscribeId: string;
  memberSubscribeInfo: MeberSubscribeActivateReq;
}) => {
  const response = await client.put<MemberSubscribeItem>(
    `/api/member-subscriptions/${memberSubscribeId}/activate`,
    memberSubscribeInfo,
  );

  return response.data;
};

export const deleteMemberSubscribe = async ({
  memberSubscribeId,
}: {
  memberSubscribeId: string;
}) => {
  const response = await client.delete(
    `/api/member-subscriptions/${memberSubscribeId}`,
  );

  return response.data;
};
