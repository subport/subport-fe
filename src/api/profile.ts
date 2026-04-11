import { type ReminderSettingsRes } from '@/types/profile';
import { client } from './client';

type ReminderReqType =
  | {
      paymentReminderEnabled: true;
      reminderDaysBefore: number;
    }
  | {
      paymentReminderEnabled: false;
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
