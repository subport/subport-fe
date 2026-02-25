export type MemberSubscribeItem = {
  id: number;
  subscriptionId: number;
  name: string;
  logoImageUrl: string;
  planId: number;
  planName: string;
  planAmount: number;
  planAmountUnit: 'KRW' | 'USD';
  durationMonths: number;
  daysUntilPayment: number;
  daysSinceStart: number;
  paymentProgressPercent: number;
  paymentDate: number;
  reminderDaysBefore: number;
  active: boolean;
  dutchPay: boolean;
  actualPayment: number;
  spendingRecords: MemberSubscribeSpendingRecord[];
  memo: string;
};

export type MemberSubscribeSpendingRecord = {
  amount: number;
  paymentDate: number;
};

export type MeberSubscribeActivateReq =
  | {
      reusePreviousInfo: true;
      startDate: string;
    }
  | {
      reusePreviousInfo: false;
      planId: number;
      startDate: string;
      memo: string;
      dutchPay: boolean;
      dutchPayAmount: number | null;
    };
