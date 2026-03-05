import { format } from 'date-fns';
import { client } from './client';

export type PaymentDates = Record<number, DailyPaymentStatus>;
export interface SubscriptionSummaryRes {
  totalAmount: number;
  amountDiffFromPreviousMonth: number;
  paymentDates: Record<number, DailyPaymentStatus>;
}

export interface DailyPaymentStatus {
  hasSpending: boolean;
  hasSubscription: boolean;
}

export interface SubscriptionRecordsResponse {
  completedRecords: CompletedRecord[];
  ongoingRecords: OngoingRecord[];
}

export interface SubscriptionRecord {
  subscriptionName: string;
  subscriptionLogoImageUrl: string;
  amount: number;
  period: number;
}

export type CompletedRecord = SubscriptionRecord & {
  spendingRecordId: number;
  memberSubscriptionId: null;
};

export type OngoingRecord = SubscriptionRecord & {
  spendingRecordId: null;
  memberSubscriptionId: number;
};

export const getSpendingRecords = async (yearMonth: Date) => {
  const yearMonthDate = format(yearMonth, 'yyyy-MM');
  const response = await client.get<SubscriptionSummaryRes>(
    `/api/spending-records/summary?yearMonth=${yearMonthDate}`,
  );

  return response.data;
};

export const getSpendingRecordByDate = async (date: Date) => {
  const localeDate = format(date, 'yyyy-MM-dd');

  const response = await client.get<SubscriptionRecordsResponse>(
    `/api/spending-records?date=${localeDate}`,
  );

  return response.data;
};

export const deleteSpendingRecord = async (recordId: string) => {
  const response = await client.delete(`/api/spending-records/${recordId}`);

  return response.data;
};
