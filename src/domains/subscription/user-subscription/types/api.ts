import type { AddUserSubscriptionValues } from '../schemas/add-user-subscription-schema';

export type UserSubscriptionSort =
  | 'type'
  | 'nextPaymentDate'
  | 'createdAt'
  | 'name';

export type UserSubscriptionParams =
  | { active: false }
  | { active: true; sortBy: UserSubscriptionSort };

export type UserSubscriptionItem = {
  id: number;
  name: string;
  logoImageUrl: string;
  amount: number;
  period: number;
  daysUntilPayment: number;
};

export type GroupUserSubscriptions = Record<string, UserSubscriptionItem[]>;

export type FlatUserSubscriptions = UserSubscriptionItem[];

export type UserSubscribeSummary = {
  currentMonthPaidAmount: number;
  currentMonthTotalAmount: number;
  paymentProgressPercent: number;
};

export type GroupedUserSubscriptionRes = {
  subscriptions: GroupUserSubscriptions;
};

export type FlatUserSubscriptionRes = {
  subscriptions: FlatUserSubscriptions;
};

export type SubscriptionsResBySort = {
  type: GroupedUserSubscriptionRes;
  nextPaymentDate: FlatUserSubscriptionRes;
  createdAt: FlatUserSubscriptionRes;
  name: FlatUserSubscriptionRes;
};

export type UserSubscriptionRes<S extends UserSubscriptionSort> =
  SubscriptionsResBySort[S];

export type AddUserSubscriptionReq = AddUserSubscriptionValues & {
  subscriptionId: number;
  price: string;
  amountUnit: 'KRW' | 'USD';
};
