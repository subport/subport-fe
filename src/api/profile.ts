import {
  type ReminderSettingsRes,
  type MyAccountRes,
  type MyProfileRes,
} from '@/types/profile';
import { client } from './client';
import type { MyAccountReqType } from '@/schema/my-account-schema';

type ReminderReqType =
  | {
      paymentReminderEnabled: true;
      reminderDaysBefore: number;
    }
  | {
      paymentReminderEnabled: false;
    };

export const getMyProfile = async () => {
  const response = await client.get<MyProfileRes>('/api/members/me/profile');

  return response.data;
};

export const getMyAccount = async () => {
  const response = await client.get<MyAccountRes>('/api/members/me');

  return response.data;
};

export const updatedMyAccount = async (updatedAccount: MyAccountReqType) => {
  const response = await client.put<MyAccountRes>(
    '/api/members/me',
    updatedAccount,
  );

  return response.data;
};

export const getReminderSettings = async () => {
  const response = await client.get<ReminderSettingsRes>(
    '/api/members/me/reminder-settings',
  );

  return response.data;
};

export const updatedReminderSettings = async (
  reminderSettings: ReminderReqType,
) => {
  const response = await client.put<ReminderSettingsRes>(
    '/api/members/me/reminder-settings',
    reminderSettings,
  );

  return response.data;
};

export const deleteProfile = async () => {
  const response = await client.delete('/api/members/me');

  return response.data;
};
